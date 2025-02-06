import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { ReactSVG } from "react-svg";
import logo from "../../assets/prutl.svg";
import lightModeSvg from "../../assets/lightMode.svg";
import darkModeSvg from "../../assets/darkMode.svg";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    document.body.classList.toggle("dark-mode", savedMode);
  }, []);

  useEffect(() => {
    // Check localStorage for user data first
    let userID = localStorage.getItem("user_id");
    let tokenInLogin = localStorage.getItem("token");

    // If not found in localStorage, check sessionStorage
    if (!userID) {
      userID = sessionStorage.getItem("user_id");
      console.log("userId from session++++++++++", userID);
    } else {
      console.log("userId from local++++++++++", userID);
    }

    if (!tokenInLogin) {
      tokenInLogin = sessionStorage.getItem("token");
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.body.classList.toggle("dark-mode", newMode);
  };
  // Check localStorage for user data first

  let userID = localStorage.getItem("user_id");
  let tokenInLogin = localStorage.getItem("token");

  // If not found in localStorage, check sessionStorage

  if (!userID) {
    userID = sessionStorage.getItem("user_id");
    // console.log("userId from session++++++++++", userID)
  }
  if (!tokenInLogin) {
    tokenInLogin = sessionStorage.getItem("token");
  }

  return (
    <Disclosure as="nav" className="navbar sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-10 items-center justify-between">
          <div className="absolute inset-y-0 pl-28 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>

          <Link
            to="/"
            className=" navbarLogo items-center text-2xl font-bold hover:no-underline"
          >
            <div className=" flex flex-shrink-0 items-left ">
              <img
                alt="PRUTL"
                src={logo}
                className="h-8 w-auto navbar-logo-svg"
              />
              PRUTL
            </div>
          </Link>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end ">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="block mt-2 lg:mt-0 lg:ml-4 text-lg hover:text-hoverLinkColor hover:no-underline navlinks  "
                >
                  Home
                </Link>

                {user && tokenInLogin ? (
                  <>
                    {userID==="12" ? (
                      <><Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 mt-2 lg:mt-0 lg:mx-0 text-lg hover:text-hoverLinkColor hover:no-underline navlinks">
                            Manage
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="-mr-1 mt-1 h-5 w-5 hover:text-hoverLinkColor"
                            />
                          </MenuButton>
                        </div>

                        <MenuItems
                          transition
                          className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in max-h-60 overflow-y-auto"
                        >
                          <div className="py-1">
                            <MenuItem>
                              <Link
                                to="/user-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                User Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/membership-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Membership Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/organization-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Organization Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/event-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Event Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/competition-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Competition Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/event-schedule-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Event Schedule Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/stream-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Stream Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/participants-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Participant Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/sponsors-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Sponsor Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/teams-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Team Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/committees-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Committee Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/committee-members-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Committee Members Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/awards-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Awards Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/scores-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Scores Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/sponsorships-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Sponsorships Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/passion-framework-dimensions-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Passion Framework Dimension Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/dimension-scores-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Dimension Scores Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/user-groups-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                User Groups Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/families-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Family Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/family-members-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Family Members Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/ai-insights-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                AI Insights Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/venues-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                venues Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/halls-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Halls Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/event-bookings-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Event Bookings Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/guest-services-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Guest Services Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/booking-services-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Booking Services Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/categories-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Categories Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/roles-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Roles Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/team-members-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Team Members Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/prutl-framework-dimensions-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Prutl Framework Dimensions Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/vehicles-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Vehicles Management
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to="/parking-areas-management"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                              >
                                Parking Area Management
                              </Link>
                            </MenuItem>
                            {/* Add more MenuItems here */}
                          </div>
                        </MenuItems>
                      </Menu>
                      <Link
                      to="/dashboard"
                      className="block mt-2 lg:mt-0 lg:mx-4 text-lg hover:text-hoverLinkColor hover:no-underline navlinks"
                    >
                      DashBoard
                    </Link>
                    <Link
                      to="/aboutUs"
                      className="block mt-2 lg:mt-0 lg:mx-4 text-lg hover:text-hoverLinkColor hover:no-underline navlinks"
                    >
                      About Us
                    </Link>
                      </>
                    ):(<> <Link
                      to="/dashboard"
                      className="block mt-2 lg:mt-0 lg:mx-4 text-lg hover:text-hoverLinkColor hover:no-underline navlinks"
                    >
                      DashBoard
                    </Link>
                    <Link
                      to="/aboutUs"
                      className="block mt-2 lg:mt-0 lg:mx-4 text-lg hover:text-hoverLinkColor hover:no-underline navlinks"
                    >
                      About Us
                    </Link></>)}

                    {/* <Link
                      to="/projectCollaboration"
                      className="block mt-2 lg:mt-0 lg:mx-4 text-lg hover:text-hoverLinkColor hover:no-underline navlinks"
                    >
                      Project Collaboration
                    </Link> */}
                     {/* <Link
                      to="/dashboard"
                      className="block mt-2 lg:mt-0 lg:mx-4 text-lg hover:text-hoverLinkColor hover:no-underline navlinks"
                    >
                      DashBoard
                    </Link>
                    <Link
                      to="/aboutUs"
                      className="block mt-2 lg:mt-0 lg:mx-4 text-lg hover:text-hoverLinkColor hover:no-underline navlinks"
                    >
                      About Us
                    </Link> */}
                   
                  </>
                ) : (
                  <>
                    {/* <Link
                      to="/projectCollaboration"
                      className="block mt-2 lg:mt-0 lg:mx-4 text-lg  hover:text-hoverLinkColor hover:no-underline navlinks"
                    >
                      Project Collaboration
                    </Link> */}
                    <Link
                      to="/aboutUs"
                      className="block mt-2 lg:mt-0 lg:mx-4 text-lg  hover:text-hoverLinkColor hover:no-underline navlinks"
                    >
                      About Us
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              onClick={toggleDarkMode}
              type="button"
              className="relative hover:text-hoverLinkColor  "
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Dark/Light mode</span>
              <ReactSVG
                src={darkMode ? lightModeSvg : darkModeSvg}
                className="w-6 h-6 "
              />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3 ">
              <div>
                <MenuButton className="relative flex text-sm ">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <div className="navlinks hover:text-hoverLinkColor">
                    &#8942;
                  </div>
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                {tokenInLogin && (
                  <MenuItem>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 hover:no-underline"
                    >
                      Your Profile
                    </Link>
                  </MenuItem>
                )}
                {tokenInLogin && (
                  <MenuItem>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 hover:no-underline"
                    >
                      Dashboard
                    </Link>
                  </MenuItem>
                )}

                <MenuItem>
                  <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 hover:no-underline"
                  >
                    Settings
                  </Link>
                </MenuItem>
                {!tokenInLogin && (
                  <MenuItem>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 hover:no-underline"
                    >
                      Login
                    </Link>
                  </MenuItem>
                )}
                {!tokenInLogin && (
                  <MenuItem>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 hover:no-underline"
                    >
                      Signup
                    </Link>
                  </MenuItem>
                )}
                {tokenInLogin && (
                  <MenuItem>
                    <div className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 hover:no-underline">
                      <button onClick={handleLogout}>Sign out</button>
                    </div>
                  </MenuItem>
                )}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {userID && tokenInLogin ? (
            <>
            {userID==="12" ? 
            (<>
             <Link
                to="/"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 hover:no-underline w-full justify-center gap-x-1.5 mt-2 lg:mt-0 lg:mx-4  navlinks "
              >
                Home
              </Link>
            <Menu as="div" className="relative inline-block text-left pl-3">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 mt-2 lg:mt-0 lg:mx-4 text-lg  hover:no-underline navlinks px-3 py-2  font-medium hover:text-white hover:bg-gray-700">
                    Manage
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 mt-1 h-5 w-5 hover:text-white ml-24"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute  right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in max-h-60 overflow-y-auto "
                >
                  <div className="py-1">
                    <MenuItem>
                      <Link
                        to="/user-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        User Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/membership-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Membership Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/organization-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Organization Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/event-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Event Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/competition-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Competition Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/event-schedule-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Event Schedule Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/stream-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Stream Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/participants-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Participant Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/sponsors-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Sponsor Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/teams-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Team Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/committees-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Committee Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/committee-members-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Committee Members Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/awards-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Awards Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/scores-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Scores Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/sponsorships-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Sponsorships Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/passion-framework-dimensions-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Passion Framework Dimension Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/dimension-scores-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Dimension Scores Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/user-groups-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        User Groups Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/families-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Family Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/family-members-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Family Members Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/ai-insights-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        AI Insights Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/venues-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Venues Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/halls-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Halls Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/event-bookings-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Event Bookings Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/guest-services-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Guest Services Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/booking-services-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Booking Services Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/categories-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Categories Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/roles-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Roles Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/team-members-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Team Members Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/prutl-framework-dimensions-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Prutl Framework Dimensions Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/vehicles-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Vehicles Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/parking-areas-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Parking Areas Management
                      </Link>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 hover:no-underline w-full justify-center gap-x-1.5 mt-2 lg:mt-0 lg:mx-4  navlinks "
              >
                Dashboard
              </Link>

              <Link
                to="/aboutUs"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 hover:no-underline w-full justify-center gap-x-1.5 mt-2 lg:mt-0 lg:mx-4  navlinks "
              >
                About Us
              </Link>
              </>):(<> <Link
                to="/aboutUs"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 hover:no-underline w-full justify-center gap-x-1.5 mt-2 lg:mt-0 lg:mx-4  navlinks "
              >
                About Us
              </Link>
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 hover:no-underline w-full justify-center gap-x-1.5 mt-2 lg:mt-0 lg:mx-4  navlinks "
              >
                Dashboard
              </Link>
              </>)}
              {/* <Menu as="div" className="relative inline-block text-left pl-3">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 mt-2 lg:mt-0 lg:mx-4 text-lg  hover:no-underline navlinks px-3 py-2  font-medium hover:text-white hover:bg-gray-700">
                    Manage
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 mt-1 h-5 w-5 hover:text-white ml-24"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute  right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in max-h-60 overflow-y-auto "
                >
                  <div className="py-1">
                    <MenuItem>
                      <Link
                        to="/user-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        User Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/membership-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Membership Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/organization-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Organization Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/event-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Event Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/competition-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Competition Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/event-schedule-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Event Schedule Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/stream-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Stream Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/participants-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Participant Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/sponsors-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Sponsor Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/teams-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Team Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/committees-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Committee Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/committee-members-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Committee Members Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/awards-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Awards Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/scores-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Scores Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/sponsorships-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Sponsorships Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/passion-framework-dimensions-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Passion Framework Dimension Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/dimension-scores-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Dimension Scores Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/user-groups-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        User Groups Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/families-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Family Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/family-members-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Family Members Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/ai-insights-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        AI Insights Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/venues-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Venues Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/halls-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Halls Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/event-bookings-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Event Bookings Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/guest-services-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Guest Services Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/booking-services-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Booking Services Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/categories-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Categories Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/roles-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Roles Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/team-members-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Team Members Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/prutl-framework-dimensions-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Prutl Framework Dimensions Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/vehicles-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Vehicles Management
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/parking-areas-management"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:no-underline"
                      >
                        Parking Areas Management
                      </Link>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu> */}
              
              {/* <Link
                to="/projectCollaboration"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 hover:no-underline w-full justify-center gap-x-1.5 mt-2 lg:mt-0 lg:mx-4  navlinks  "
              >
                Project Collaboration
              </Link> */}
              {/* <Link
                to="/aboutUs"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 hover:no-underline w-full justify-center gap-x-1.5 mt-2 lg:mt-0 lg:mx-4  navlinks "
              >
                About Us
              </Link> */}
            </>
          ) : (
            <>
              <Link
                to="/"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 hover:no-underline w-full justify-center gap-x-1.5 mt-2 lg:mt-0 lg:mx-4  navlinks "
              >
                Home
              </Link>
              {/* <Link
                to="/projectCollaboration"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 hover:no-underline w-full justify-center gap-x-1.5 mt-2 lg:mt-0 lg:mx-4  navlinks "
              >
                Project Collaboration
              </Link> */}
              <Link
                to="/aboutUs"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 hover:no-underline w-full justify-center gap-x-1.5 mt-2 lg:mt-0 lg:mx-4  navlinks "
              >
                About Us
              </Link>
            </>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
