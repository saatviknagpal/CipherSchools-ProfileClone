import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../redux/slices/updateProfileSlice";

export default function About({ myProfile }) {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const editedDetails = useSelector((state) => state.profileForm);
  const userDetails = useSelector(
    (state) => state.userProfile.userProfile.data
  );

  const handleSubmit = async () => {
    const finalData = {};
    for (const key in userDetails) {
      if (userDetails[key] !== editedDetails[key])
        finalData[key] = editedDetails[key];
    }
    delete finalData.__v;
    //   console.log(finalData);
    const postAbout = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/profile/update_profile`,
      finalData,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  };

  const handleClick = () => {
    setToggle(!toggle);
    if (toggle) {
      handleSubmit();
    }
  };
  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="font-bold">ABOUT ME</p>
          {myProfile ? (
            <button
              className="px-8 py-1 bg-[#F2912F] text-white rounded-md text-sm"
              onClick={handleClick}
            >
              {toggle ? "Save" : "Edit"}
            </button>
          ) : null}
        </div>
        <div className="relative">
          <textarea
            name=""
            id=""
            cols="30"
            disabled={!toggle}
            className="bg-white w-full rounded-md p-4 resize-none "
            rows="5"
            value={editedDetails?.bio}
            onChange={(e) =>
              dispatch(updateDetails({ name: "bio", value: e.target.value }))
            }
            placeholder={myProfile ? `Add something about you` : ``}
          ></textarea>
          {toggle ? (
            <FontAwesomeIcon
              icon={faPencil}
              className="absolute top-[40%] right-5"
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
