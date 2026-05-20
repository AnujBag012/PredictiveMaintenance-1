import { useNavigate } from "react-router-dom";
import {
  Bell,
  User,
  Box,
  Cpu,
  Wrench,
  Zap,
  LogOut,
  Activity,
  AlertTriangle,
} from "lucide-react";

const Dashboard = () => {

  const navigate = useNavigate();
  const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  navigate("/login");
};

  const cards = [
    {
      title: "Mechanical Components",
      value: "128",
      icon: <Box size={32} />,
      route: "/dashboard/Mechanical",
    },

    {
      title: "Electrical Components",
      value: "96",
      icon: <Zap size={32} />,
      route: "/dashboard/Electrical",
    },

    {
      title: "Electronic Components",
      value: "74",
      icon: <Cpu size={32} />,
      route: "/dashboard/Electronic",
    },

    {
      title: "Pneumatic Components",
      value: "61",
      icon: <Wrench size={32} />,
      route: "/dashboard/Pneumatic",
    },
  ];

  return (

    <div className="min-h-screen bg-[#eef2ff] flex">

      {/* Sidebar */}
      <div className="w-[280px] bg-gradient-to-b from-[#0037c8] via-[#001f8f] to-[#00124d] text-white flex flex-col justify-between p-6">

        {/* Top */}
        <div>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-14">
            <div className="w-12 h-12 rounded-full bg-white" />

            <div>
              <h1 className="text-3xl font-bold leading-none">
                YOUR
              </h1>

              <h1 className="text-3xl font-bold leading-none">
                LOGO
              </h1>
            </div>
          </div>

          {/* Menus */}
          <div className="space-y-5">

            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl px-5 py-4 flex items-center gap-4 shadow-lg">
              <Box />
              <span className="text-xl">Dashboard</span>
            </button>

            <button className="w-full px-5 py-4 flex items-center gap-4 hover:bg-white/10 rounded-2xl transition-all duration-300">
              <Cpu />
              <span className="text-xl">Components</span>
            </button>

            <button className="w-full px-5 py-4 flex items-center gap-4 hover:bg-white/10 rounded-2xl transition-all duration-300">
              <Activity />
              <span className="text-xl">
                Predictive Analysis
              </span>
            </button>

            <button className="w-full px-5 py-4 flex items-center gap-4 hover:bg-white/10 rounded-2xl transition-all duration-300">
              <Wrench />
              <span className="text-xl">Maintenance</span>
            </button>

            <button className="w-full px-5 py-4 flex items-center gap-4 hover:bg-white/10 rounded-2xl transition-all duration-300">
              <Bell />
              <span className="text-xl">Alerts</span>
            </button>

          </div>
        </div>

        {/* Logout */}
        <button
  onClick={handleLogout}
  className="border border-white/30 rounded-2xl py-4 flex items-center justify-center gap-3 hover:bg-white/10 transition-all duration-300"
>
  <LogOut />
  Logout
</button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">

        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-10">

          <h1 className="text-5xl font-extrabold text-[#001c72]">
            Predictive Maintenance
          </h1>

          <div className="flex items-center gap-5">

            <button className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center relative">
              <Bell className="text-blue-700" />

              <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            <button className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center">
              <User className="text-blue-700" />
            </button>

            <div className="bg-white px-5 py-3 rounded-2xl shadow-lg flex items-center gap-4">

              <div className="w-14 h-14 rounded-full bg-blue-700 text-white flex items-center justify-center text-2xl font-bold">
                A
              </div>

              <div>
                <h1 className="font-bold text-lg">
                  Admin User
                </h1>

                <p className="text-gray-500 text-sm">
                  Administrator
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* Component Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

          {cards.map((item, index) => (

            <div
              key={index}
              onClick={() => navigate(item.route)}
              className="bg-white rounded-3xl p-7 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
            >

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-800 text-white flex items-center justify-center mb-5">
                {item.icon}
              </div>

              <h1 className="text-2xl font-bold text-[#001c72] leading-tight">
                {item.title}
              </h1>

              <h2 className="text-5xl font-extrabold mt-5 text-[#001c72]">
                {item.value}
              </h2>


              <div className="mt-6 h-[3px] rounded-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-300" />

            </div>

          ))}

        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {/* Health Overview */}
          <div className="bg-gradient-to-br from-[#001f8f] to-[#00124d] rounded-3xl p-8 text-white shadow-xl">

            <div className="flex items-center gap-4 mb-10">

              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center">
                <Activity />
              </div>

              <h1 className="text-3xl font-bold">
                Number of Components
              </h1>

            </div>

            <div className="flex items-center justify-center">

              <div className="w-[260px] h-[260px] rounded-full border-[30px] border-green-500 flex items-center justify-center relative">

                <div className="absolute w-[230px] h-[230px] rounded-full border-[25px] border-yellow-400 border-r-red-500 border-t-blue-400" />

                <div className="text-center z-10">
                  <h1 className="text-6xl font-extrabold">
                    359
                  </h1>

                  <p className="text-2xl mt-2">
                    Total
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Alerts */}
          <div className="bg-gradient-to-br from-[#001f8f] to-[#00124d] rounded-3xl p-8 text-white shadow-xl">

            <div className="flex justify-between items-center mb-10">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center">
                  <AlertTriangle />
                </div>

                <h1 className="text-3xl font-bold">
                  Recent Alerts
                </h1>

              </div>

              <button className="text-cyan-300 text-xl">
                View All
              </button>

            </div>

            <div className="space-y-5">

              <div className="bg-[#082a9d] rounded-2xl p-6 flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-semibold">
                    High Vibration Detected
                  </h1>

                  <p className="text-gray-300 mt-1">
                    Compressor Unit #3
                  </p>
                </div>

                <p className="text-red-400 font-bold">
                  10 min ago
                </p>
              </div>

              <div className="bg-[#082a9d] rounded-2xl p-6 flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-semibold">
                    Temperature Threshold Exceeded
                  </h1>

                  <p className="text-gray-300 mt-1">
                    Motor Unit #7
                  </p>
                </div>

                <p className="text-yellow-400 font-bold">
                  1 hour ago
                </p>
              </div>

              <div className="bg-[#082a9d] rounded-2xl p-6 flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-semibold">
                    Abnormal Pressure Level
                  </h1>

                  <p className="text-gray-300 mt-1">
                    Hydraulic System
                  </p>
                </div>

                <p className="text-red-400 font-bold">
                  3 hours ago
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;