import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/authSlice'
import { useDispatch } from 'react-redux';

function Header({user}) {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.clear()
        dispatch(logout());
        navigate('/login')
    }
    return (
        <>
        <div className="navBar flex justify-between items-center shadow-lg p-[1rem]">
          <div onClick={() => navigate("/")} className="flex gap-2 logoDiv px-10 cursor-pointer">
           
            <h1 className="logo text-[25px] text-blueColor">
              <strong>Tummok</strong>App
            </h1>
          </div>
          <div className="menu flex gap-8 pr-10">
            <li
              onClick={() => navigate("/profile")}
              className="menuList text-[#6f6f6f] hover:text-blueColor cursor-pointer" 
            >
              Profile
            </li>
            <button
              className="bg-[#6f6f6f] text-white px-4 py-1 rounded-lg hover:bg-white duration-300 border border-[#6f6f6f] hover:text-[#6f6f6f]"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </>
    )
}

export default Header