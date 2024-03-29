import React, { useEffect, useState } from "react";
import cover from "../assets/cover.png";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faPencil } from "@fortawesome/free-solid-svg-icons";
import ProfessionalInformation from "./ProfessionalInformation";
import { currently, highestEducation } from "../data/data";
import ChangePasswordModal from "./ChangePasswordModal";
import InterestsModal from "./InterestsModal";
import SocialMedia from "./SocialMedia";
import ChangeProfileModal from "./ChangeProfileModal";
import About from "./About";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/slices/fetchProfileSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateInitialState } from "../redux/slices/updateProfileSlice";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";

export default function Landing() {
  const [isOpen, setIsOpen] = useState(false);
  const [isInterest, setIsInterest] = useState(false);
  const [isPfp, setIsPfp] = useState(false);
  const [toggleSocial, setToggleSocial] = useState(false);
  const [toggleProfessional, setToggleProfessional] = useState(false);

  const dispatch = useDispatch();
  const userProfile = useSelector(
    (state) => state?.userProfile?.userProfile?.data
  );
  const loading = useSelector((state) => state?.userProfile.loading);
  const profileDetails = useSelector((state) => state.profileForm);

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      dispatch(getProfile({ id }));
    }
  }, [isInterest, isPfp]);

  useEffect(() => {
    dispatch(updateInitialState({ profile: userProfile }));
  }, [userProfile, isInterest, isPfp]);

  const handleSubmit = async () => {
    try {
      const finalData = {};
      for (const key in userProfile) {
        if (userProfile[key] !== profileDetails[key])
          finalData[key] = profileDetails[key];
      }
      delete finalData.__v;
      const postDetails = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/profile/update_profile`,
        finalData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const res = postDetails.data;
      if (res.status === "success") {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClick = (state) => {
    state === "toggleSocial"
      ? setToggleSocial(!toggleSocial)
      : setToggleProfessional(!toggleProfessional);
    if (toggleSocial || toggleProfessional) {
      handleSubmit();
    }
  };

  return (
    <>
      {loading ? (
        <div className="bg-[#F2F5FA] min-h-screen pt-20 ">
          <Loader />
        </div>
      ) : (
        <div className="bg-[#F2F5FA] ">
          <ToastContainer />
          <ChangePasswordModal isOpen={isOpen} setIsOpen={setIsOpen} />
          <InterestsModal isOpen={isInterest} setIsOpen={setIsInterest} />
          <ChangeProfileModal isOpen={isPfp} setIsOpen={setIsPfp} />
          <div
            style={{ backgroundImage: `url(${cover})` }}
            className="w-full h-[110px] flex justify-between items-center px-5 md:px-10 bg-cover bg-no-repeat fixed z-10"
          >
            <div className="flex justify-center items-center gap-5 relative">
              {userProfile?.picture !== "" ? (
                <img
                  src={profileDetails?.picture}
                  alt=""
                  className="w-20 h-20 rounded-full "
                />
              ) : (
                <img
                  src={`https://ui-avatars.com/api/?background=random&name=${
                    userProfile?.firstName + " " + userProfile?.lastName
                  }`}
                  alt=""
                  className="w-20 h-20 rounded-full "
                />
              )}

              <FontAwesomeIcon
                icon={faPencil}
                className="w-3 h-3 cursor-pointer absolute -bottom-2 left-7 bg-black rounded-full p-[6px] text-white"
                onClick={() => setIsPfp(!isPfp)}
              />
              <div className="flex flex-col">
                <p className="text-lg">Hello,</p>
                <p className="font-bold text-2xl">
                  {userProfile?.firstName + " " + userProfile?.lastName}
                </p>
                <p className="text-base">{userProfile?.email}</p>
              </div>
            </div>
            <Link to="/followers" className="hidden md:block">
              <div className="text-lg">
                {userProfile?.followers?.length} followers
              </div>
            </Link>
          </div>
          <div className="px-4 md:px-10 py-6 space-y-5 pt-[134px]">
            {/*ABOUT */}
            <About />
            <hr />
            {/*update this*/}
            <div className="space-y-4">
              <p className="font-bold">CIPHER MAP</p>
              <div className="w-full mx-auto h-max pt-4">
                <CalendarHeatmap
                  endDate={new Date("2023-03-28")}
                  numDays={365}
                  showWeekdayLabels={true}
                  values={[
                    { date: "2023-03-25", count: 4 },
                    { date: "2023-03-26", count: 1 },
                    { date: "2023-03-27", count: 3 },
                    { date: "2023-03-28", count: 3 },
                  ]}
                  classForValue={(value) => {
                    if (!value) {
                      return "color-empty";
                    }
                    return `color-orange`;
                  }}
                />
                <div className="flex justify-end items-center gap-1">
                  <span style={{ padding: 10 }}>Less</span>
                  <svg width="12" height="12">
                    <rect
                      width="12"
                      height="12"
                      fill="#ffffff"
                      padding-left="10"
                    ></rect>
                  </svg>
                  <svg width="12" height="12">
                    <rect
                      width="12"
                      height="12"
                      fill="#F9C996"
                      padding="10"
                    ></rect>
                  </svg>
                  <svg width="12" height="12">
                    <rect
                      width="12"
                      height="12"
                      fill="#F9C996"
                      padding="10"
                    ></rect>
                  </svg>
                  <svg width="12" height="12">
                    <rect
                      width="12"
                      height="12"
                      fill="#F6AC63"
                      padding="10"
                    ></rect>
                  </svg>
                  <svg width="12" height="12">
                    <rect
                      width="12"
                      height="12"
                      fill="#F2902E"
                      padding="10"
                    ></rect>
                  </svg>
                  <span style={{ padding: 10 }}>More</span>
                </div>
              </div>
            </div>
            <hr />
            {/* On the web part */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="font-bold">ON THE WEB</p>
                <button
                  className="px-8 py-1 bg-[#F2912F] text-white rounded-md text-sm"
                  onClick={() => handleClick("toggleSocial")}
                >
                  {toggleSocial ? "Save" : "Edit"}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2  text-base gap-x-10 gap-y-4">
                <SocialMedia
                  title="LinkedIn"
                  icon={faLinkedin}
                  value="linkedIn"
                  toggleSocial={toggleSocial}
                />
                <SocialMedia
                  title="Github"
                  icon={faGithub}
                  value="github"
                  toggleSocial={toggleSocial}
                />
                <SocialMedia
                  title="Facebook"
                  icon={faFacebook}
                  value="facebook"
                  toggleSocial={toggleSocial}
                />
                <SocialMedia
                  title="Twitter"
                  icon={faTwitter}
                  value="twitter"
                  toggleSocial={toggleSocial}
                />
                <SocialMedia
                  title="Instagram"
                  icon={faInstagram}
                  value="instagram"
                  toggleSocial={toggleSocial}
                />
                <SocialMedia
                  title="Website"
                  icon={faGlobe}
                  value="website"
                  toggleSocial={toggleSocial}
                />
              </div>
            </div>
            <hr />
            {/*PROFESSIONAL INFORMATION */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="font-bold">PROFESSIONAL INFORMATION</p>
                <button
                  className="px-8 py-1 bg-[#F2912F] text-white rounded-md text-sm"
                  onClick={() => handleClick("toggleProfessional")}
                >
                  {toggleProfessional ? "Save" : "Edit"}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 relative text-base gap-x-10 gap-y-4">
                <ProfessionalInformation
                  heading={"Highest Education"}
                  list={highestEducation}
                  title="highestEducation"
                  toggleProfessional={toggleProfessional}
                />
                <ProfessionalInformation
                  heading={"What do you do currently?"}
                  list={currently}
                  title="currently"
                  toggleProfessional={toggleProfessional}
                />
              </div>
            </div>
            <hr />
            {/*CHANGE PASSWORD */}

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="font-bold">PASSWORD & SECURITY</p>
                <button
                  type="button"
                  className="px-8 py-1 bg-[#F2912F] text-white rounded-md text-sm"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Change
                </button>
              </div>
              <div className="text-base gap-x-10 gap-y-4">
                <label
                  htmlFor="password"
                  className="font-medium flex flex-col gap-1"
                >
                  Password
                  <input
                    type="password"
                    name="password"
                    id="password"
                    disabled
                    placeholder="*********"
                    className="bg-white rounded-md placeholder-gray-400 px-4 py-2"
                  />
                </label>
              </div>
            </div>
            <hr />
            {/*INTERESTS */}

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="font-bold">INTERESTS</p>
                <button
                  className="px-8 py-1 bg-[#F2912F] text-white rounded-md text-sm"
                  onClick={() => setIsInterest(!isInterest)}
                >
                  Edit
                </button>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                {userProfile?.interests?.map((element, index) => (
                  <p
                    className="bg-[#F3EBE7] py-2 px-3 text-[#F3935F] font-bold text-xs rounded-md"
                    key={index}
                  >
                    {element}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
