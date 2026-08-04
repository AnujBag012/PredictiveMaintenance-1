
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

const Signup = () => {
  
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const [role, setRole] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if(role != '' && role != 'Choose Role' && name != '' && email != '' && password != ''){
          axios.post('https://predictivemaintenance-1.onrender.com/signup', {role, name, email, password})
          .then(result=>{console.log(result)
              navigate('/Login')
          })
          .catch(err=>console.log(err))
        }
    }

  const pages = [
    
    {
      title: 'Smart Factory Access',
      subtitle: 'Secure your industrial workflow with real-time insights.',
      gradient: 'from-orange-500 via-pitch-600 to-black',
      accent: 'bg-orange-400',
      button: 'bg-orange-300 hover:bg-orange-200 text-black',
    },
    
  ];

  return (
  <div className="min-h-screen bg-[#f4f6fb] flex items-center justify-center px-6 py-10">
    {pages.map((page, index) => (
      <div
        key={index}
        className="w-full max-w-6xl bg-white rounded-[24px] overflow-hidden shadow-2xl grid lg:grid-cols-2"
      >
        
        {/* Left Section */}
        <div className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 p-10 lg:p-14 flex flex-col justify-between overflow-hidden">

          {/* Decorative Lines */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-0 w-full h-[2px] bg-white rotate-[-20deg]" />
            <div className="absolute top-32 left-0 w-full h-[2px] bg-cyan-200 rotate-[-20deg]" />
            <div className="absolute top-56 left-0 w-full h-[2px] bg-blue-200 rotate-[-20deg]" />
            <div className="absolute top-80 left-0 w-full h-[2px] bg-cyan-100 rotate-[-20deg]" />
          </div>

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white" />
            <h1 className="text-2xl font-bold tracking-wide">
              A.S
            </h1>
          </div>

          {/* Main Content */}
          <div className="relative z-10 mt-10">
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
              Hello, <br />
              welcome!
            </h1>

            <p className="mt-6 text-gray-200 max-w-md text-lg leading-relaxed">
              Secure your industrial workflow with real-time insights.
            </p>

            {/* Role Select */}
            <div className="mt-8 max-w-sm">
              <label className="block mb-3 text-lg font-semibold">
                Select Role
              </label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-5 py-3 rounded-xl bg-white/20 border border-white/30 text-white backdrop-blur-md outline-none focus:ring-2 focus:ring-white"
              >
                <option className="text-black">
                  Choose Role
                </option>

                <option className="text-black">
                  Admin
                </option>

                <option className="text-black">
                  Supervisor
                </option>

                <option className="text-black">
                  Employee
                </option>
              </select>
            </div>

            {/* <button className="mt-8 bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
              View more
            </button> */}
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-[#f7f8fc] flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md">

            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Create Account
            </h2>

            <p className="text-gray-500 mb-8">
              Join the future of predictive maintenance.
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 shadow-sm"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 shadow-sm"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Create password"
                  className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 shadow-sm"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-900 to-cyan-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                Sign Up
              </button>
            </form>

            {/* Login */}
            <div className="mt-8 text-center text-gray-500">
              Already have an account?

              <Link
                to="/login"
                className="ml-2 text-blue-700 font-semibold hover:underline"
              >
                Login
              </Link>
            </div>

          </div>
        </div>
      </div>
    ))}
  </div>
)
}

export default Signup