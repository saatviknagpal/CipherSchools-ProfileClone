import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { updateDetails } from "../redux/slices/updateProfileSlice";

export default function ChangeProfileModal(props) {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  const dispatch = useDispatch();
  const profileDetails = useSelector((state) => state.profileForm);
  const userProfile = useSelector(
    (state) => state.userProfile.userProfile.data
  );
  const handleChange = (e) => {
    dispatch(updateDetails({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const finalData = {};
      const data = new FormData();
      data.append("file", selectedFile);

      for (const key in profileDetails) {
        if (userProfile[key] !== profileDetails[key])
          finalData[key] = profileDetails[key];
      }
      delete finalData.__v;
      const arr = Object.keys(finalData);
      for (let i = 0; i < arr.length; i++) {
        data.append(arr[i], finalData[arr[i]]);
      }
      const postDetails = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/profile/upload`,
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const res = postDetails.data;
      if (res.status === "success") {
        toast.success(res.message);
        props.setIsOpen(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <ToastContainer />
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => props.setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center z-50">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="font-bold text-lg">
                    Profile Update
                  </Dialog.Title>
                  <div className="flex justify-between items-center gap-8">
                    <div className="flex justify-center items-center relative mx-auto">
                      {selectedFile ? (
                        <img
                          src={preview}
                          alt=""
                          className="w-40 h-32 rounded-full "
                        />
                      ) : profileDetails?.picture !== "" ? (
                        <img
                          src={profileDetails?.picture}
                          alt=""
                          className="w-40 h-32 rounded-full "
                        />
                      ) : (
                        <img
                          src={`https://ui-avatars.com/api/?background=random&name=${
                            profileDetails?.firstName +
                            " " +
                            profileDetails?.lastName
                          }`}
                          alt=""
                          className="w-40 h-32 rounded-full "
                        />
                      )}
                      <label htmlFor="picture">
                        <FontAwesomeIcon
                          icon={faPencilAlt}
                          className="w-4 h-4 cursor-pointer absolute -bottom-3 left-12 bg-white rounded-full p-[6px] text-black shadow-lg"
                        />
                      </label>
                      <input
                        type="file"
                        name="picture"
                        id="picture"
                        onChange={onSelectFile}
                        className="hidden"
                        accept="image/png, image/gif, image/jpeg"
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="firstName"
                        className="font-medium flex flex-col gap-2 relative my-2"
                      >
                        First Name
                        <input
                          type="text"
                          name="firstName"
                          onChange={(e) => handleChange(e)}
                          id="firstName"
                          value={profileDetails?.firstName}
                          placeholder="First Name"
                          className="bg-[#F3F5FB] rounded-lg placeholder-gray-400 font-normal text-sm px-4 py-2"
                        />
                      </label>

                      <label
                        htmlFor="lastName"
                        className="font-medium flex flex-col gap-2 relative my-2"
                      >
                        Last Name
                        <input
                          type="text"
                          onChange={(e) => handleChange(e)}
                          name="lastName"
                          value={profileDetails?.lastName}
                          id="lastName"
                          placeholder="Last Name"
                          className="bg-[#F3F5FB] rounded-lg placeholder-gray-400 font-normal text-sm px-4 py-2"
                        />
                      </label>
                      <label
                        htmlFor="email"
                        className="font-medium flex flex-col gap-2 relative my-2"
                      >
                        Email Address
                        <input
                          type="email"
                          onChange={(e) => handleChange(e)}
                          name="email"
                          id="email"
                          placeholder="Email Address"
                          className="bg-[#F3F5FB] rounded-lg placeholder-gray-400 font-normal text-sm px-4 py-2"
                          value={profileDetails?.email}
                        />
                      </label>
                      <label
                        htmlFor="mobile"
                        className="font-medium flex flex-col gap-2 relative my-2"
                      >
                        Mobile Number
                        <input
                          type="tel"
                          name="mobile"
                          onChange={(e) => handleChange(e)}
                          value={profileDetails?.mobile}
                          id="mobile"
                          placeholder="Mobile Number"
                          className="bg-[#F3F5FB] rounded-lg placeholder-gray-400 font-normal text-sm px-4 py-2"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end items-end gap-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-black px-6 py-1 text-sm font-medium text-white "
                      onClick={() => props.setIsOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-orange-400 px-6 py-1 text-sm font-medium text-white"
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
