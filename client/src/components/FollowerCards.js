import React from "react";
import { Link } from "react-router-dom";

export default function FollowerCards({ data }) {
  return (
    <>
      <div className="pt-5 flex flex-wrap justify-center items-center gap-4">
        {data?.map((element, index) => (
          <div
            className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow-lg"
            key={index}
          >
            <Link to={`/profile/${element.user_id}`}>
              <div className="flex flex-col items-center pt-4 pb-10">
                {element?.picture === "" ? (
                  <img
                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                    src={`https://ui-avatars.com/api/?background=random&name=${
                      element?.firstName + " " + element?.lastName
                    }`}
                    alt=""
                  />
                ) : (
                  <img
                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                    src={element?.picture}
                    alt=""
                  />
                )}

                <h5 className="mb-1 text-xl text-start font-medium text-gray-900 ">
                  {element?.firstName + " " + element?.lastName}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {element?.currently}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {element?.followers?.length} followers
                </span>
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-orange-500 rounded-lg  w-[80%] mt-4  justify-center">
                  Follow
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
