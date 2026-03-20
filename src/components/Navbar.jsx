import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white fixed w-full top-0 left-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-xl font-bold">Mcar</div>

          {/* Hamburger (mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="px-3 py-2 border rounded border-gray-500"
            >
              {menuOpen ? "✖" : "☰"}
            </button>
          </div>

          {/* Menu */}
          <div
            className={`flex-col md:flex md:flex-row md:items-center md:space-x-6 absolute md:static bg-gray-900 w-full md:w-auto left-0 transition-all duration-300 ${
              menuOpen ? "top-16 flex" : "top-[-500px] hidden md:flex"
            }`}
          >
            {/* Vehicles */}
            <div className="relative group">
              <button className="px-3 py-2 hover:bg-gray-700 rounded w-full text-left md:w-auto">
                Vehicles
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 md:block">
                <Link
                  to="/sell-car"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Sell Your Car
                </Link>
                <Link
                  to="/buy-car"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Buy a Car
                </Link>
              </div>
            </div>

            {/* Spare Parts */}
            <div className="relative group">
              <button className="px-3 py-2 hover:bg-gray-700 rounded w-full text-left md:w-auto">
                Spare Parts
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 md:block">
                <Link
                  to="/sell-spareparts"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Sell Spare Parts
                </Link>
                <Link
                  to="/buy-spareparts"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Buy Spare Parts
                </Link>
              </div>
            </div>

            {/* Garage */}
            <div className="relative group">
              <Link
                to="/garage"
                className="block px-3 py-2 hover:bg-gray-700 rounded"
              >
                Garage
              </Link>
            </div>

            {/* Mechanics */}
            <div className="relative group">
              <button className="px-3 py-2 hover:bg-gray-700 rounded w-full text-left md:w-auto">
                Mechanics
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 md:block">
                <Link
                  to="/find-mechanic"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Find a Mechanic
                </Link>
                <Link
                  to="/become-mechanic"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Become a Mechanic
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;