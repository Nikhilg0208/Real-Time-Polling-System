import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlusCircle,
  FaPollH,
  FaVoteYea,
  FaBookmark,
} from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const AdminSidebar = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(location.pathname);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleSetActive = (path) => {
    setActiveSection(path);
  };

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully");
    } catch {
      toast.error("Sign out failed");
    }
  };

  const linkClasses = (path) =>
    `flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
      activeSection === path
        ? "bg-gray-700 font-bold ring-1 ring-gray-500"
        : "bg-gray-800 hover:bg-gray-700"
    }`;

  return (
    <div
      className={`min-h-full flex flex-col bg-gray-900 text-white ${
        isCollapsed ? "min-w-12 max-w-12" : "min-w-52 max-w-52"
      } transition-all duration-300`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end p-2">
        <button onClick={toggleSidebar} className="text-white">
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* Sidebar Header */}
      <h2
        className="text-2xl font-bold text-center mb-8 border-b border-gray-700 pb-4 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        {isCollapsed ? "P" : "Polling App"}
      </h2>

      {/* Menu */}
      <div className="flex flex-col space-y-2 flex-grow">
        <Link to="/dashboard" onClick={() => handleSetActive("/dashboard")}>
          <div className={linkClasses("/dashboard")}>
            <MdOutlineDashboardCustomize />
            {!isCollapsed && <span>Dashboard</span>}
          </div>
        </Link>

        <Link to="/createpoll" onClick={() => handleSetActive("/createpoll")}>
          <div className={linkClasses("/createpoll")}>
            <FaPlusCircle className="text-blue-400" />
            {!isCollapsed && <span>Create Poll</span>}
          </div>
        </Link>

        <Link to="/mypools" onClick={() => handleSetActive("/mypools")}>
          <div className={linkClasses("/mypools")}>
            <FaPollH className="text-green-400" />
            {!isCollapsed && <span>My Pools</span>}
          </div>
        </Link>

        <Link to="/votedpolls" onClick={() => handleSetActive("/votedpolls")}>
          <div className={linkClasses("/votedpolls")}>
            <FaVoteYea className="text-yellow-400" />
            {!isCollapsed && <span>Voted Polls</span>}
          </div>
        </Link>

        <Link to="/bookmarks" onClick={() => handleSetActive("/bookmarks")}>
          <div className={linkClasses("/bookmarks")}>
            <FaBookmark className="text-purple-400" />
            {!isCollapsed && <span>Bookmarks</span>}
          </div>
        </Link>

        <button onClick={logoutHandler} className="w-full text-left mt-auto">
          <div className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-300 bg-gray-800 hover:bg-gray-700">
            <FiLogOut className="text-red-400" />
            {!isCollapsed && <span>Log Out</span>}
          </div>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
