import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { app } from "../firebase";

function CreateListing() {
  const [files, setFiles] = useState([]);
  const [uploading,setUploading]=useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(false);

  const [formData, setFormData] = useState({
    imageUrls: [],
    name:'',
    description:'',
    address:'',
    type:'rent',
    bedrooms:1,
    bathrooms:1,
    regularPrice:50,
    discountPrice:50,
    offer:false,
    parking:false,
    furnished:false,
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  console.log(formData);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setformData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false)
         
        })
        .catch((error) => {
          setImageUploadError("image upload filed(2mb max per image)");
          setUploading(false)
        });
    } else {
      setImageUploadError("you can only upoad 6 images per listing");
      setUploading(false)
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };


  const handleRemoveImage=(index)=>{
    setFormData({
      ...formData,
      imageUrls:formData.imageUrls.filter((_,i)=>i!==index)
    })
  }

  const handleChange=(e)=>{
     if( e.target.id === "sell" || e.target.id === "rent")
     {
      setFormData({
        ...formData,
        type: e.target.id
      })
     }
     if(e.target.id==="parking" || e.target.id==="furnished" || e.target.id=== "offer")
     {
      setFormData({
        ...formData,
        [e.target.id]:e.target.checked
      })
     }

     if(e.target.type==='text' || e.target.type==="number" || e.target.type==="textarea")
     {
      setFormData({
        ...formData,
        [e.target.id]:e.target.value
      })
     }
  }

  const handleSubmit= async (e)=>{
    e.preventDefault()
    try {
      setError(false);
      setLoading(true); 
      const res=await fetch('/api/listing/create',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data=await res.json();
      setLoading(false);
      if(data.success === false){
        setError(data.message)
      }
    } catch (error) {
      setError(error.message);
      setLoading(false)
    }
  }

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        create listing
      </h1>
      <form  onSubmit={handleSubmit} action="" className="flex flex-col sm:flex-row gap-4">
        
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className="border p-3 rounded-lg"
            maxLength="62"
            minLength="10"
            onChange={handleChange}
            value={formData.name}
            required
          />
          <textarea
            type="textarea"
            name="description"
            id="description"
            placeholder="Description"
            className="border p-3 rounded-lg"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Address"
            className="border p-3 rounded-lg"
            onChange={handleChange}
            value={formData.address}
            required
          />
          <div className="flex gap-6  flex-wrap">
            <div className=" flex gap-2">
              <input type="checkbox" name="" id="sell" className="w-5" onChange={handleChange}
            checked={formData.type === "sell"} />
              <span>Sell</span>
            </div>
            <div className=" flex gap-2">
              <input type="checkbox" name="" id="rent" className="w-5" onChange={handleChange}
            checked={formData.type === "rent"}  />
              <span>Rent</span>
            </div>
            <div className=" flex gap-2">
              <input type="checkbox" name="" id="parking" className="w-5" onChange={handleChange}
            checked={formData.parking} />
              <span>Parking spot</span>
            </div>
            <div className=" flex gap-2">
              <input type="checkbox" name="" id="furnished" className="w-5" onChange={handleChange}
            checked={formData.furnished}  />
              <span>Furnished</span>
            </div>
            <div className=" flex gap-2">
              <input type="checkbox" name="" id="offer" className="w-5" onChange={handleChange}
            checked={formData.offer}  />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex  items-center gap-2">
              <input
                className="p-3 border border-gray-300 rounded-lg"
                type="number"
                name="bedrooms"
                id="bedrooms"
                min="1"
                max="10"
                onChange={handleChange}
            value={formData.bedrooms} 
                required
              />
              <p>Beds</p>
            </div>
            <div className="flex  items-center gap-2">
              <input
                className="p-3 border border-gray-300 rounded-lg"
                type="number"
                name="bathrooms"
                id="bathrooms"
                min="1"
                onChange={handleChange}
            checked={formData.bathrooms} 
                max="10"
                required
              />
              <p>Baths</p>
            </div>

            <div className="flex  items-center gap-2">
              <input
                className="p-3 border border-gray-300 rounded-lg"
                type="number"
                name="regularPrice"
                id="regularPrice"
                min="50"
                max="100000"
                onChange={handleChange}
            value={formData.regularPrice} 
                required
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex  items-center gap-2">
              <input
                className="p-3 border border-gray-300 rounded-lg"
                type="number"
                name="discountPrice"
                id="discountPrice"
                min="50"
                max="1000000"
                onChange={handleChange}
            value={formData.discountPrice}
                required
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The FIrst Image will be the cover (max 6){" "}
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              name=""
              id="images"
              accept="images/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading?'uploading..':'upload'}
            </button>
          </div>

          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length>0&&formData.imageUrls.map((url,index)=>{
            return  <div className="flex justify-between p-3 border items-center">
              <img src={url} key={index} alt='listing image' className="w-40 h-40 object-cover rounded-lg border border-b-2"/>
              <button type='button' onClick={()=>handleRemoveImage(index)} className="p-3 text-red-700 rounded-lg  uppercase hover:opacity-75">Delete</button>
              </div>

          })
            }
           { console.log(formData.imageUrls.length)}
         
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
           {loading? 'Creating...': 'create listing'}
          </button>
          {error? error.message : ''}
        </div>
      </form>
     
        

    </main>
  );
}

export default CreateListing;
