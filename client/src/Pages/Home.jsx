import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react'
import 'swiper/css/bundle'
import swiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import ListingItem from '../Components/ListingItem'

function Home() {
  swiperCore.use([Navigation])

  const [offerListing,setOfferListing]=useState([]);
  const [salesListing,setSalesListing]=useState([]);
  const [rentListing,setRentListing]=useState([]);

  console.log(offerListing);

  useEffect(()=>{
    const fetchOfferListing=async ()=>{
       try {

        const res=await fetch('/api/listing/get?offer=true&limit=4');
        const data=await res.json();
        setOfferListing(data);
        fetchRentListings();
        
       } catch (error) {
        console.log(error);
        
       }
    }

    const fetchRentListings=async ()=>{
        try {
          const res=await fetch('/api/listing/get?type=rent&limit=4');
          const data=await res.json();
          setRentListing(data);
          fetchSalesListings();
          
        } catch (error) {
          console.log(error)
        }

    }

    const fetchSalesListings= async ()=>{
      try {
        const res=await fetch('/api/listing/get?type=sell&limit=4');
        const data=await res.json();
        setSalesListing(data);
      
        
      } catch (error) {
        console.log(error)
      }
    }

    fetchOfferListing();
  },[])

  return (
    <div className='bg-slate-50'>
     {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 mx-auto max-w-6xl'>
        <h1 className='text-slate-700 font-bold  text-3xl lg:text-6xl  '>
          Find your next <span className='text-slate-500'>perfect</span>
          <br/>
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm '>
        View Estate is the best place to find your next perfect place to live
        <br/>
        we have wide range of properties for you to choose  from .

      </div>
      <Link to={"/search"} className='text-blue-800 text-xs sm:text-sm font-bold hover:underline'> Lets get started</Link>
      </div>
      




     {/* swiper */}

     <Swiper navigation>
     {
      offerListing && offerListing.length>0 && offerListing.map((listing)=>(
      <SwiperSlide>
        <div style={{background:`url${listing.imageUrl[0]} center no-repeat`,backgroundSize:'cover'}} className='h-[500px]'></div>
        {console.log(listing.imageUrl[0])}
        </SwiperSlide>
        ))
     }
     </Swiper>



     {/* lsiting */}


     <div className='max-w-6xl mx-auto p-3 flex-col gap-8 my-10 '>
     {
        offerListing && offerListing.length > 0 &&(
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link  className='text-sm text-blue-800 hover:underline' to={'/search?offer=true '}>show more </Link>
            </div>
            <div className='flex flex-wrap gap-4 '>
              {
                offerListing.map((listing)=>(
                  <ListingItem listing={listing} key={listing._id} />
                ))
              }
            </div>
          </div>
        )

      }

      {
        rentListing && rentListing.length > 0 &&(
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link  className='text-sm text-blue-800 hover:underline' to={'/search?type=rent '}>show more </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {
                rentListing.map((listing)=>(
                  <ListingItem listing={listing} key={listing._id} />
                ))
              }
            </div>
          </div>
        )

      }
      {
        salesListing && salesListing.length > 0 &&(
          <div className=''>
            <div className='my-3 gap-4'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link  className='text-sm text-blue-800 hover:underline' to={'/search?type=sell '}>show more </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {
                salesListing.map((listing)=>(
                  <ListingItem listing={listing} key={listing._id} />
                ))
              }
            </div>
          </div>
        )

      }
      

     </div>
    </div>
  )
}

export default Home
