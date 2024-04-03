import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ListingItem from "../Components/ListingItem";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

function Home() {
  SwiperCore.use([Navigation]);

  const [offerListing, setOfferListing] = useState([]);
  const [salesListing, setSalesListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);

  console.log(offerListing);

  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListing(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListing(data);
        fetchSalesListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSalesListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sell&limit=4");
        const data = await res.json();
        setSalesListing(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListing();
  }, []);

  return (
    <div className="bg-slate-100">
      {/* top */}

      <div className=" bg-red-400 flex flex-col gap-6 p-28 px-4 md:px-[4rem] lg:px-[13rem] mx-auto bg-img bg-no-repeat bg-cover relative bg-bottom md:h-screen ">
        <h1 className="text-white font-bold  text-3xl lg:text-6xl  ">
           Discover your next  <span className="text-blue-200">ideal</span>
          <br />
          location effortlessly.
        </h1>
        <div className="text-white text-xs sm:text-sm ">
        View Estate is your premier destination for discovering your next ideal living space. 
          <br />
          With a diverse selection of properties, we offer ample options for you to find your perfect home
        </div>
        <Link
          to={"/search"}
          className="text-white text-xs sm:text-lg font-bold hover:underline "
        >
          <div className="bg-blue-700 w-[10rem] flex  items-center justify-center p-3 rounded-md">
            {" "}
            Get started
          </div>
        </Link>
      </div>

      {/* swiper */}

      {/* <Swiper navigation>
        {offerListing &&
          offerListing.length > 0 &&
          offerListing.map((listing) => (
            
            <SwiperSlide key={listing._id}>
             { console.log(listing)}
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
              ></div>
              {console.log(listing.imageUrls[0])}
            </SwiperSlide>
          ))}
      </Swiper> */}

      {/* lsiting */}

      <div className="max-w-6xl mx-auto p-3 flex-col gap-8 mb-10  ">
        {offerListing && offerListing.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true "}
              >
                show more{" "}
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 ">
              {offerListing.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListing && rentListing.length > 0 && (
          <div className="mt-10">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent "}
              >
                show more{" "}
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListing.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {salesListing && salesListing.length > 0 && (
          <div className="mt-10">
            <div className="my-3 gap-4">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sell "}
              >
                show more{" "}
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {salesListing.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
