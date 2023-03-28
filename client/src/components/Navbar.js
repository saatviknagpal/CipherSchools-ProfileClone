import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCoins, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  faUserCircle,
  faCompass,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { Menu, Switch, Transition } from "@headlessui/react";
import logo from "../assets/Cipherschools_Logo.png";
import { useSelector } from "react-redux";

function Navbar() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const userProfile = useSelector(
    (state) => state?.userProfile?.userProfile?.data
  );
  return (
    <nav className="bg-[#FFFEFE] z-[20] fixed w-full">
      <div className="  px-2 sm:px-4 ">
        <div className="flex justify-between h-14">
          {/* Left side of the navbar */}
          <div className="flex justify-center items-center gap-2">
            <a href="/" className="flex justify-center items-center gap-2">
              <img src={logo} alt="Logo" className="h-10 w-10" />
              <p className="font-bold text-xl">CipherSchools</p>
            </a>
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
          <div className="flex justify-center items-center space-x-3 md:space-x-4">
            {/* Search bar */}
            <div className="flex-shrink-0 border rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex justify-start items-center gap-2 bg-[#F2F5FA] lg:w-80 w-10">
              <FontAwesomeIcon icon={faSearch} />
              <input
                type="text"
                className="bg-inherit text-sm w-full focus:outline-none"
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
            <div className=" ">
              <Menu as="div" className="relative inline-block text-left z-50">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md  bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      className="h-5 w-5 text-gray-600"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2  w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/"
                            className={`${
                              active
                                ? "bg-orange-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            My Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/login"
                            onClick={() => {
                              localStorage.removeItem("token");
                              localStorage.removeItem("id");
                            }}
                            className={`${
                              active
                                ? "bg-orange-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            Logout
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            {/* Coins logo and dark mode toggle */}
            <div className="lg:flex lg:gap-2 lg:justify-center lg:items-center hidden">
              <FontAwesomeIcon
                icon={faCoins}
                className="h-5 w-5 text-gray-600"
              />
              <p className="text-orange-500">0</p>
            </div>
            <Switch
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
              className={`${
                isDarkMode ? "bg-black" : "bg-gray-200"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  isDarkMode ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
