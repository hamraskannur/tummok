import { useState } from "react";
import loginImg from "../assets/login.jpg";
import eyeSlash from "../assets/eye-slash.png";
import { registerUser } from "../axios/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../components/validation/validation";

function Signup() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [signupData, setSignupData] = useState([]);
  const [showPassword, setShowPassword] = useState(true);

  const handleChange = async (e) => {
    const { value, name } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isValid = validateForm(setErrors, signupData);
      if (isValid) {
        const response = await registerUser(signupData);
        if (!response.status) {
          toast.error(response.message);
        }
        if (response.message && response.status) {
          toast.success(response.message);
          navigate("/login");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full  flex h-screen justify-center items-center  grid-cols-2">
      <div className="w-full h-full  grid  lg:p-0 lg:grid-cols-2">
        <div className="p-10 w-full hidden  lg:block">
          <img
            className="rounded-xl h-full w-full object-cover object-center"
            src={loginImg}
            alt="loginImg"
          />
        </div>
        <div className=" pt-32">
          <h2 className="text-xl text-gray-500">Welcome</h2>
          <h1 className="text-4xl">Sign up</h1>
          <form>
            <div className="w-full grid grid-cols-2"></div>
            <div className="grid grid-cols-1 gap-5 w-full mt-8 p-2">
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div>
                  <label htmlFor="fullName" className="text-base text-gray-500">
                    Full name
                  </label>{" "}
                  {errors.fullName && (
                    <span className="text-red-500 text-xs">{`*${errors.fullName}`}</span>
                  )}
                  <input
                    className="border w-full p-3 rounded-md"
                    id="fullName"
                    type="text"
                    placeholder="john Doe"
                    name="fullName"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-base text-gray-500">
                    Email
                  </label>{" "}
                  {errors.emailAddress && (
                    <span className="text-red-500 text-xs">{`*${errors.emailAddress}`}</span>
                  )}
                  <input
                    className="border w-full p-3 rounded-md"
                    id="email"
                    type="text"
                    placeholder="todo@gmail.com"
                    name="emailAddress"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div>
                  <label htmlFor="password" className="text-base text-gray-500">
                    Password
                  </label>{" "}
                  {errors.password && (
                    <span className="text-red-500 text-xs">{`*${errors.password}`}</span>
                  )}
                  <input
                    className="border w-full p-3 rounded-md"
                    id="password"
                    type="password"
                    placeholder="*********"
                    name="password"
                    onChange={handleChange}
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="confirmPassword"
                    className="text-base text-gray-500"
                  >
                    Confirm password
                  </label>{" "}
                  {errors.confirmPassword && (
                    <span className="text-red-500 text-xs">{`*${errors.confirmPassword}`}</span>
                  )}
                  <input
                    className="border w-full p-3 rounded-md"
                    id="confirmPassword"
                    type={`${showPassword ? "password" : "text"}`}
                    placeholder="*********"
                    name="confirmPassword"
                    onChange={handleChange}
                  />
                  <img
                    className="absolute right-2 top-1/2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                    src={eyeSlash}
                    alt=""
                  />
                </div>
              </div>
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="text-base text-gray-500"
                  >
                    Phone Number
                  </label>{" "}
                  {errors.phoneNumber && (
                    <span className="text-red-500 text-xs">{`*${errors.phoneNumber}`}</span>
                  )}
                  <input
                    className="border w-full p-3 rounded-md"
                    id="phoneNumber"
                    type="text"
                    placeholder="+91-9876543210"
                    name="phoneNumber"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <button
              className="bg-[#6f6f6f] text-white px-36 py-4 rounded-md mt-8 hover:bg-white duration-300 border border-[#6f6f6f] hover:text-[#6f6f6f]"
              onClick={handleSubmit}
            >
              Sign up
            </button>
          </form>
          <div className="mt-2">
            <span className="text-sm text-gray-400">
              Already have an account?
            </span>
            <button
              className="text-blue-600 text-sm ml-2 underline underline-offset-1"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
