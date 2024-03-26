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

  const [formData, setformData] = useState({
    imageUrls: [],
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
    setformData({
      ...formData,
      imageUrls:formData.imageUrls.filter((_,i)=>i!==index)
    })
  }

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        create listing
      </h1>
      <form action="" className="flex flex-col sm:flex-row gap-4">
        
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className="border p-3 rounded-lg"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            className="border p-3 rounded-lg"
            required
          />
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Address"
            className="border p-3 rounded-lg"
            required
          />
          <div className="flex gap-6  flex-wrap">
            <div className=" flex gap-2">
              <input type="checkbox" name="" id="sell" className="w-5" />
              <span>Sell</span>
            </div>
            <div className=" flex gap-2">
              <input type="checkbox" name="" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className=" flex gap-2">
              <input type="checkbox" name="" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className=" flex gap-2">
              <input type="checkbox" name="" id="funished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className=" flex gap-2">
              <input type="checkbox" name="" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex  items-center gap-2">
              <input
                className="p-3 border border-gray-300 rounded-lg"
                type="number"
                name=""
                id="bedrooms"
                min="1"
                max="10"
                required
              />
              <p>Beds</p>
            </div>
            <div className="flex  items-center gap-2">
              <input
                className="p-3 border border-gray-300 rounded-lg"
                type="number"
                name=""
                id="bathrooms"
                min="1"
                max="10"
                required
              />
              <p>Baths</p>
            </div>

            <div className="flex  items-center gap-2">
              <input
                className="p-3 border border-gray-300 rounded-lg"
                type="number"
                name=""
                id="regularPrice"
                min="1"
                max="10"
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
                name=""
                id="discountPrice"
                min="1"
                max="10"
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
            create listing
          </button>
        </div>
      </form>
     
        

    </main>
  );
}

export default CreateListing;
