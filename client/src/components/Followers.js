import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFollowers } from "../redux/slices/fetchFollowersSlice";
import { updateDetails } from "../redux/slices/updateProfileSlice";
import FollowerCards from "./FollowerCards";
import Loader from "./Loader";
import Pagination from "./Pagination";

export default function Followers() {
  const followers = useSelector(
    (state) => state.followersReducers.userFollowers?.data
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [followersPerPage] = useState(3);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.followersReducers.loading);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      dispatch(getFollowers());
    }
  }, []);

  useEffect(() => {
    dispatch(updateDetails({ name: "followers", value: followers }));
  }, [followers]);

  const indexOfLastFollower = currentPage * followersPerPage;
  const indexOfFirstFollower = indexOfLastFollower - followersPerPage;
  const currentFollowers = followers?.slice(
    indexOfFirstFollower,
    indexOfLastFollower
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {loading ? (
        <div className="bg-[#F2F5FA] min-h-screen pt-20 ">
          <Loader />
        </div>
      ) : (
        <div className="bg-[#F2F5FA] py-4 px-10 min-h-screen">
          <p className="text-xl font-medium">Users Following You</p>
          {followers?.length === 0 ? (
            <div className="flex justify-center items-center">
              <p className="text-5xl my-auto text-gray-300 font-bold">
                NO ONE FOLLOWING YOU
              </p>
            </div>
          ) : (
            <>
              <FollowerCards data={currentFollowers} />
              <Pagination
                followersPerPage={followersPerPage}
                totalFollowers={followers?.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}
