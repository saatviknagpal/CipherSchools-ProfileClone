import React, { Fragment, useState } from "react";
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
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import ProfessionalInformation from "./ProfessionalInformation";
import { currently, highestEducation } from "../data/data";

export default function Landing() {
  return (
    <div className="bg-[#F2F5FA] ">
      {/*ABOUT */}

      <div
        style={{ backgroundImage: `url(${cover})` }}
        className="w-full h-[100px] flex justify-between items-center px-10 bg-cover bg-no-repeat fixed z-50"
      >
        <div className="flex justify-center items-center gap-5 ">
          <img
            src="https://ui-avatars.com/api/?background=random"
            alt=""
            className="rounded-full "
          />
          <div className="flex flex-col">
            <p className="text-lg">Hello,</p>
            <p className="font-bold text-2xl">User Name</p>
            <p className="text-base">User Email</p>
          </div>
        </div>
        <div className="text-lg ">0 Followers</div>
      </div>
      <div className="px-10 py-6 space-y-5 pt-[124px]">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="font-bold">ABOUT ME</p>
            <button className="px-8 py-1 bg-[#F2912F] text-white rounded-md text-sm">
              Edit
            </button>
          </div>
          <textarea
            name=""
            id=""
            cols="30"
            className="w-full rounded-md p-4 resize-none"
            rows="5"
            placeholder="Add something about you"
          ></textarea>
        </div>
        <hr />
        {/*update this*/}
        <div className="space-y-4">
          <p className="font-bold">CIPHER MAP</p>
          <div className="w-full mx-auto h-max pt-4">
            <CalendarHeatmap
              startDate={new Date("2016-01-01")}
              endDate={new Date("2016-12-31")}
              showWeekdayLabels={true}
              values={[
                { date: "2016-01-01", count: 12 },
                { date: "2016-01-22", count: 122 },
                { date: "2016-01-30", count: 38 },
              ]}
            />
          </div>
        </div>
        <hr />
        {/* On the web part */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="font-bold">ON THE WEB</p>
            <button className="px-8 py-1 bg-[#F2912F] text-white rounded-md text-sm">
              Edit
            </button>
          </div>
          <div className="grid grid-cols-2  text-base gap-x-10 gap-y-4">
            <label
              htmlFor="linkedIn"
              className="font-medium flex flex-col gap-1 relative"
            >
              Linkedin
              <input
                type="url"
                name="linkedIn"
                id="linkedIn"
                placeholder="LinkedIn"
                className="bg-white rounded-md placeholder-gray-400 px-10 py-3"
              />
              <FontAwesomeIcon
                icon={faLinkedin}
                className="absolute top-10 w-6 h-6 rounded-full left-2 text-[#808090]"
              />
            </label>
            <label
              htmlFor="github"
              className="flex flex-col gap-1 font-medium relative"
            >
              Github
              <input
                type="url"
                name="github"
                id="github"
                placeholder="Github"
                className="bg-white rounded-md placeholder-gray-400 px-10 py-3"
              />
              <FontAwesomeIcon
                icon={faGithub}
                className="absolute top-10 w-6 h-6 rounded-full left-2 text-[#808090]"
              />
            </label>
            <label
              htmlFor="facebook"
              className="flex flex-col gap-1 font-medium relative"
            >
              Facebook
              <input
                type="url"
                name="facebook"
                id="facebook"
                placeholder="Facebook"
                className="bg-white rounded-md placeholder-gray-400 px-10 py-3"
              />
              <FontAwesomeIcon
                icon={faFacebook}
                className="absolute top-10 w-6 h-6 rounded-full left-2 text-[#808090]"
              />
            </label>
            <label
              htmlFor="twitter"
              className="flex flex-col gap-1 font-medium relative"
            >
              Twitter
              <input
                type="url"
                name="twitter"
                id="twitter"
                placeholder="Twitter"
                className="bg-white rounded-md placeholder-gray-400 px-10 py-3"
              />
              <FontAwesomeIcon
                icon={faTwitter}
                className="absolute top-10 w-6 h-6 rounded-full left-2 text-[#808090]"
              />
            </label>
            <label
              htmlFor="instagram"
              className="flex flex-col gap-1 font-medium relative"
            >
              Instagram
              <input
                type="url"
                name="instagram"
                id="instagram"
                placeholder="Instagram"
                className="bg-white rounded-md placeholder-gray-400 px-10 py-3"
              />
              <FontAwesomeIcon
                icon={faInstagram}
                className="absolute top-10 w-6 h-6 rounded-full left-2 text-[#808090]"
              />
            </label>
            <label
              htmlFor="website"
              className="flex flex-col gap-1 font-medium relative"
            >
              Website
              <input
                type="url"
                name="website"
                id="website"
                placeholder="Website"
                className="bg-white rounded-md placeholder-gray-400 px-10 py-3"
              />
              <FontAwesomeIcon
                icon={faGlobe}
                className="absolute top-10 w-6 h-6 rounded-full left-2 text-[#808090]"
              />
            </label>
          </div>
        </div>
        <hr />
        {/*PROFESSIONAL INFORMATION */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="font-bold">PROFESSIONAL INFORMATION</p>
            <button className="px-8 py-1 bg-[#F2912F] text-white rounded-md text-sm">
              Edit
            </button>
          </div>
          <div className="grid grid-cols-2 relative text-base gap-x-10 gap-y-4">
            <ProfessionalInformation
              heading={"Highest Education"}
              list={highestEducation}
            />
            <ProfessionalInformation
              heading={"What do you do currently?"}
              list={currently}
            />
          </div>
        </div>
        <hr />
        {/*CHANGE PASSWORD */}

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="font-bold">PASSWORD & SECURITY</p>
            <button className="px-8 py-1 bg-[#F2912F] text-white rounded-md text-sm">
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
            <button className="px-8 py-1 bg-[#F2912F] text-white rounded-md text-sm">
              Edit
            </button>
          </div>
          <div className="flex items-center gap-3">
            <p className="bg-[#F3EBE7] py-2 px-3 text-[#F3935F] font-bold text-xs rounded-md">
              Web Development
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
