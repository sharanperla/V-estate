import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase.jsx'

function Profile() {
  const fileRef=useRef(null);
  const {currentUser}=useSelector(state=>state.user);
  const [files,setFiles]=useState(undefined);
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

  
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
    <form className='flex flex-col gap-4'>
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

      <input type="text" name="" id="username" placeholder='username' className='border p-3 rounded-lg ' />
      <input type="text" name="" id="email" placeholder='email' className='border p-3 rounded-lg ' />
      <input type="text" name="" id="password" placeholder='password' className='border p-3 rounded-lg ' />
      <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
    </form>
    <div className='flex justify-between mt-5'>
      <span className='text-red-700 cursor-pointer  '>Delete Account</span>
      <span className='text-red-700 cursor-pointer  '>Sign Out</span>
    </div>
    </div>
  ) 
}

export default Profile
