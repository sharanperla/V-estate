import React from "react";
import {FaSearch} from 'react-icons/fa'
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'
function Header() {
  const   {currentUser}=useSelector(state=>state.user)
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to='/'>
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Vrindhavan</span>
          <span className="text-slate-700">Estates</span>
        </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
            <input type="text" name="" id="" placeholder="Search..." className="bg-transparent focus:outline-none w-24 sm:w-64" />
            <FaSearch className="text-slate-600"/>
        </form>
        <ul className="flex gap-4">
            <Link to='/'><li className="hidden sm:inline text-slate-700  hover:underline">Home</li></Link>
            <Link to='/about'><li className="hidden sm:inline text-slate-700  hover:underline">About</li></Link>


            {/* <Link to='/sign-in'> */}
            <Link to='/profile'>
              {/* {console.log(currentUser.avatar)} */}
            {currentUser?( <img src={currentUser.avatar} className="h-7 w-7 rounded-full object-cover" alt="profile" srcset="" /> ):(<li className="sm:inline text-slate-700  hover:underline">Sign in</li>)}
            
            
            </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
