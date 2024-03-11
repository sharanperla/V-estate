import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase.jsx'
import { updateUserStart,updateUserSuccess,updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutStart, signInFailure, signOutFailure, signOutSuccess } from '../redux/user/userSlice.js';


function Profile() {
  const dispatch=useDispatch();
  const fileRef=useRef(null);
  const {currentUser,loading,error}=useSelector(state=>state.user);
  const [files,setFiles]=useState(undefined);
  const [updateSuccess,setUpdateSuccess]=useState(false);
  const [filePerc,setFileperc]=useState(0)
  const [fileUploadError,setFileUploadError]=useState(false)
  const [formData,setFormData]=useState({});
  console.log(filePerc);
  console.log(formData);
  console.log(fileUploadError); 
  // service firebase.storage {
  //   match /b/{bucket}/o {
  //     match /{allPaths=**} {
  //       allow read;
  //       allow write:if request.resource.size < 2 * 1024 * 1024 &&
  //                     request.resource.contentType.matches('image/.*')
  //     }
  //   }
  // }

 const handleChange=(e)=>{
  setFormData({...formData,[e.target.id]:e.target.value})
  console.log(formData); 
 }

 const handleSubmit=async(e)=>{
   try {
  e.preventDefault();
  
  dispatch(updateUserStart());

  const res=await fetch(`/api/user/update/${currentUser._id}`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
     },
    body: JSON.stringify(formData),
  
  });
  const data=await res.json();
  console.log(data);
  if(data.success===false){
    dispatch(updateUserFailure(data.message))
    return; 
  }
  console.log('success');
  dispatch(updateUserSuccess(data));
  setUpdateSuccess(true);
} catch (error) {
  console.log(error);
  dispatch(updateUserFailure(error.message))
}
 }
  useEffect(()=>{
    if(files){
      handleFileUpload(files);
    }
  },[files]);

 

  const handleFileUpload = (files) => {
    if (!files) {
      console.log('no file');
      console.log(files);
      return; // Return early if files are not defined
    }
    const storage = getStorage(app);
    console.log(files);
    const fileName = new Date().getTime() + files.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, files);
    console.log('im inside handlefileuplaod');
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFileperc(Math.round(progress));
    },
   (error)=>{
    setFileUploadError(true);
   },
   ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((downloadurl)=>{
      setFormData({...formData,avatar:downloadurl});
    })
    
   }
    )
  }


  const handleDeleteUser=async()=>{
    try {
      dispatch(deleteUserStart());
      const res=await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
      })

      const data=await res.json();
      if(data.success===false){
        dispatch(deleteUserFailure(data.message))
        return;
      }
      dispatch(deleteUserSuccess(data));
      
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }



  const handleSignOut=async()=>{
     try {
      dispatch(signOutStart());
      const res=await fetch('/api/auth/signout'); 
      const data=await res.json();
      if(data.success===false)
      {
         dispatch(signOutFailure(data.message));
         return;
      }
      dispatch(signOutSuccess(data));
     } catch (error) {
      dispatch(signOutFailure(error.message))
     }


  }
  console.log(error);
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <input type="file" ref={fileRef} hidden accept='image/*' 
      onChange={ (e)=>{
          
          setFiles(e.target.files[0])
          console.log(files);
        
        }
        }/>
     
     <img onClick={() =>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
     <p className='text-sm self-center font-bold'>
      {fileUploadError?(<span className='text-red-700'>Error in uploading image(size should be less than 2mb)</span>) : filePerc > 0 && filePerc <100 ? (<span className='text-slate-700'>{`uploading ${filePerc}%`}</span>) : filePerc===100?(<span className='text-green-700'>Succesfully uploaded</span>):''}

      </p>

      <input onChange={handleChange} type="text" name="" id="username" placeholder='username' className='border p-3 rounded-lg '  defaultValue={currentUser.username}/>
      <input onChange={handleChange} type="text" name="" id="email" placeholder='email' className='border p-3 rounded-lg ' defaultValue={currentUser.email}/>
      <input onChange={handleChange} type="password" name="" id="password" placeholder='password' className='border p-3 rounded-lg ' />
      <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>{loading?'Loading...':'Update'}</button>
    </form>
    <div className='flex justify-between mt-5'>
      <span className='text-red-700 cursor-pointer  ' onClick={handleDeleteUser}>Delete Account</span>
      <span className='text-red-700 cursor-pointer  ' onClick={handleSignOut}>Sign Out</span>
    </div>
    <p className='text-red-700 mt-5 text-center'>
      {error? error : ''}
    </p>
    <p className='text-green-700 mt-5 text-center'>
      {updateSuccess? 'user updated successfully' : ''}
    </p>
    </div>
  ) 
}

export default Profile
