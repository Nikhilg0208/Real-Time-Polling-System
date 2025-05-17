import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useSignInMutation } from "../redux/api/authAPI";
import { setAuth } from "../redux/reducer/authReducer";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [signin] = useSignInMutation();

  const handleSubmit = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      console.log(user);
      // You can add additional logic here to handle user info
    } catch (error) {
      console.error(error.message);
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-300 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 font-sans">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-2">
          Welcome to Polling App!
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Please enter your details to login
        </p>

        <div className="space-y-5">
          {/* Gender Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender <sup className="text-red-600">*</sup>
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth <sup className="text-red-600">*</sup>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 transition"
          >
            <FcGoogle className="h-5 w-5" />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
