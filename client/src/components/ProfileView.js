import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProfile } from "../redux/slices/fetchProfileSlice";
import { updateInitialState } from "../redux/slices/updateProfileSlice";
import About from "./About";
import cover from "../assets/cover.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

export default function ProfileView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userProfile = useSelector(
    (state) => state?.userProfile?.userProfile?.data
  );
  useEffect(() => {
    dispatch(getProfile({ id }));
  }, []);

  useEffect(() => {
    dispatch(updateInitialState({ profile: userProfile }));
  }, [userProfile]);

  return (
    <>
      <div className="bg-[#F2F5FA] min-h-screen">
        <div
          style={{ backgroundImage: `url(${cover})` }}
          className="w-full h-[110px] flex justify-between items-center px-10 bg-cover bg-no-repeat fixed z-10"
        >
          <div className="flex justify-center items-center gap-5 relative">
            {userProfile?.picture !== "" ? (
              <img
                src={userProfile?.picture}
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

            <div className="flex flex-col">
              <p className="font-bold text-2xl">
                {userProfile?.firstName + " " + userProfile?.lastName}
              </p>
              <p className="font-medium">
                {userProfile?.followers?.length} Followers
              </p>
            </div>
            <div>
              <button className="bg-orange-400 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Follow
              </button>
            </div>
          </div>
        </div>
        <div className="px-10 py-6 space-y-5 pt-[134px]">
          {/*ABOUT */}
          <About myProfile={false} />

          <hr />
          {/* On the web part */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="font-bold">ON THE WEB</p>
            </div>
            <div className="flex gap-3">
              <Link to={userProfile?.linkedIn}>
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="text-blue-600 w-8 h-8"
                />
              </Link>
              <Link to={userProfile?.github}>
                <FontAwesomeIcon icon={faGithub} className=" w-8 h-8" />
              </Link>
              <Link to={userProfile?.facebook}>
                <FontAwesomeIcon
                  icon={faFacebook}
                  className=" text-blue-700 w-8 h-8"
                />
              </Link>
              <Link to={userProfile?.instagram}>
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="bg-gradient-to-r from-yellow-300 to-red-500 via-pink-600 to-blue-900 text-white rounded-xl w-8 h-8"
                />
              </Link>
              <Link to={userProfile?.twitter}>
                <FontAwesomeIcon
                  icon={faTwitter}
                  className=" w-8 h-8 text-blue-400"
                />
              </Link>
              <Link to={userProfile?.website}>
                <FontAwesomeIcon icon={faGlobe} className=" w-8 h-8" />
              </Link>
            </div>
            <div className="grid grid-cols-2  text-base gap-x-10 gap-y-4"></div>
          </div>
          <hr />
          {/*INTERESTS */}

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="font-bold">INTERESTS</p>
            </div>
            <div className="flex items-center gap-3">
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
    </>
  );
}
