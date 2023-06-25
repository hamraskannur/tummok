import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { loginSuccess } from "../redux/authSlice";
import { useDispatch } from 'react-redux';

function Redirect() {
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const token = new URLSearchParams(location.search).get('token');
  localStorage.setItem("token", token);
  dispatch(loginSuccess({ token }));

  useEffect(() => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Successfully logged in',
      showConfirmButton: false,
      timer: 1500
    });
   
    setTimeout(() => {
        navigate("/");
      }, 2500);
  }, []);

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className="div">
        <img className='w-28 h-28' src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="" />
        <h3 className='text-center font-bold'>Logged in</h3>
      </div>
    </div>
  );
}

export default Redirect;
