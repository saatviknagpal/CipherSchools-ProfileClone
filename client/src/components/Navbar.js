import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCoins, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  faUserCircle,
  faCompass,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { Menu, Transition } from "@headlessui/react";
import logo from "../assets/Cipherschools_Logo.png";

function Navbar() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  return (
    <nav className="bg-[#FFFEFE] z-50 fixed w-full">
      <div className="  px-2 sm:px-4 ">
        <div className="flex justify-between h-14">
          {/* Left side of the navbar */}
          <div className="flex justify-center items-center gap-2">
            <img src={logo} alt="Logo" className="h-10 w-10" />
            <p className="font-bold text-xl">CipherSchools</p>
            <div className="hidden md:block">
              <div className="ml-5 flex items-baseline space-x-4">
                <Menu as="div" className="relative inline-block text-left">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="inline-flex justify-center items-center gap-3 w-full   px-4 py-2  text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  ">
                          <FontAwesomeIcon icon={faCompass} />
                          Browse
                          <FontAwesomeIcon icon={faChevronDown} />
                        </Menu.Button>

                        <Transition
                          show={open}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="/"
                                    className={`${
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700"
                                    } block px-4 py-2 text-sm`}
                                  >
                                    Item 1
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="/"
                                    className={`${
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700"
                                    } block px-4 py-2 text-sm`}
                                  >
                                    Item 2
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="/"
                                    className={`${
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700"
                                    } block px-4 py-2 text-sm`}
                                  >
                                    Item 3
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </div>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </div>

          {/* Right side of the navbar */}
          <div className="flex justify-center items-center space-x-8">
            {/* Search bar */}
            <div className="flex-shrink-0 border rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex justify-start items-center gap-2 bg-[#F2F5FA] w-80">
              <FontAwesomeIcon icon={faSearch} />
              <input
                type="text"
                className="bg-inherit text-sm"
                placeholder="Search and Learn"
              />
            </div>

            {/* Notification bell */}
            <button className="ml-4 relative">
              <FontAwesomeIcon
                icon={faBell}
                className="h-5 w-5 text-gray-600"
              />
              <span className="absolute -top-2 right-0 left-4 bg-orange-500 rounded-full text-white text-xs w-4">
                0
              </span>
            </button>

            {/* User profile image */}
            <button className="ml-4 relative">
              <FontAwesomeIcon
                icon={faUserCircle}
                className="h-5 w-5 text-gray-600"
              />
            </button>

            {/* Coins logo and dark mode toggle */}
            <div className="ml-4 flex gap-2 justify-center items-center">
              <FontAwesomeIcon
                icon={faCoins}
                className="h-5 w-5 text-gray-600"
              />
              <p className="text-orange-500">0</p>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="ml-4 relative inline-flex items-center justify-center h-6 w-11 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${
                    isDarkMode ? "translate-x-5" : "translate-x-0"
                  } inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
