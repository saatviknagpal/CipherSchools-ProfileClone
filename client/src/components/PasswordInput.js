import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateDetails } from "../redux/slices/updateProfileSlice";

export default function PasswordInput({ title, value }) {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <label
        htmlFor={value}
        className="font-medium flex flex-col gap-2 relative my-2"
      >
        {title}
        <input
          type={toggle ? "text" : "password"}
          name={value}
          id={value}
          onChange={(e) =>
            dispatch(updateDetails({ name: value, value: e.target.value }))
          }
          placeholder={title}
          className="bg-[#F3F5FB] rounded-lg placeholder-gray-400 font-normal text-sm px-4 py-2"
        />
        <FontAwesomeIcon
          icon={toggle ? faEyeSlash : faEye}
          onClick={() => setToggle(!toggle)}
          className="absolute top-10 w-5 h-5 rounded-full right-2 cursor-pointer text-[#808090]"
        />
      </label>
    </>
  );
}
