import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../redux/slices/updateProfileSlice";

export default function SocialMedia({ title, icon, value, toggleSocial }) {
  const dispatch = useDispatch();
  const profileDetails = useSelector((state) => state.profileForm);
  return (
    <>
      <label
        htmlFor={value}
        className="font-medium flex flex-col gap-1 relative"
      >
        {title}
        <input
          type="url"
          name={value}
          id={value}
          disabled={!toggleSocial}
          placeholder={title}
          value={profileDetails[value]}
          onChange={(e) =>
            dispatch(updateDetails({ name: value, value: e.target.value }))
          }
          className="bg-white rounded-md placeholder-gray-400 font-normal text-sm px-11 py-3"
        />
        <FontAwesomeIcon
          icon={icon}
          className="absolute top-10 w-5 h-5 rounded-full left-4 text-[#808090]"
        />
        {toggleSocial ? (
          <FontAwesomeIcon
            icon={faPencil}
            className="absolute top-[60%] right-5"
          />
        ) : null}
      </label>
    </>
  );
}
