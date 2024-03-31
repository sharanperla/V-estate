import React from "react";

function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form action="" className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap" htmlFor="searchTerm">
              Search Term
            </label>
            <input
              type="text"
              id="searchTerm"
              placeHolder="search...."
              className="border rounded-lg p-3 w-full"
            ></input>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="whitespace-nowrap font-semibold" htmlFor="Type">
              Type
            </label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="Rent" className="w-5" />
              <span>Rent </span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="Sale" className="w-5" />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="Offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="whitespace-nowrap font-semibold" htmlFor="Type">
              Amenities:
            </label>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="" className="font-semibold">Sort</label>
            <select name="" id="order" className="border rounded-lg p-3">
                <option>Price High to low</option>
                <option>Price low to high</option>
                <option>Latest</option>
                <option>oldest</option>
            </select>
          </div>
          <button className="bg-slate-700  text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">results</div>
    </div>
  );
}

export default Search;
