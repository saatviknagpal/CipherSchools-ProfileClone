import { Dialog, Listbox, Transition } from "@headlessui/react";
import axios from "axios";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { interests } from "../data/data";
import { updateDetails } from "../redux/slices/updateProfileSlice";
import Spinner from "./Spinner";

export default function InterestsModal(props) {
  const dispatch = useDispatch();
  const profileInterests = useSelector((state) => state.profileForm.interests);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = { interests: profileInterests };
      const postDetails = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/profile/update_profile`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const res = postDetails.data;
      if (res.status === "success") {
        toast.success(res.message);
        setLoading(false);
        props.setIsOpen(false);
      }
    } catch (error) {
      setLoading(false);
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                  <Listbox
                    value={profileInterests}
                    onChange={(selected) =>
                      dispatch(
                        updateDetails({ name: "interests", value: selected })
                      )
                    }
                    multiple
                  >
                    <Listbox.Options static={true} open={true}>
                      <div className="grid grid-cols-2 gap-3">
                        {interests.map((interest, index) => (
                          <Listbox.Option
                            key={index}
                            className={
                              profileInterests.includes(interest)
                                ? "bg-orange-400 text-white rounded-lg text-sm cursor-pointer py-2 px-4"
                                : "bg-[#F3F5FB] text-black rounded-lg text-sm cursor-pointer py-2 px-4"
                            }
                            value={interest}
                          >
                            {interest}
                          </Listbox.Option>
                        ))}
                      </div>
                    </Listbox.Options>
                  </Listbox>
                  <div className="mt-4 flex justify-end items-end gap-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-black px-6 py-1 text-sm font-medium text-white "
                      onClick={() => props.setIsOpen(false)}
                    >
                      Cancel
                    </button>
                    {loading ? (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-orange-400 px-6 py-1 text-sm font-medium text-white"
                        disabled
                      >
                        <Spinner />
                        Saving...
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-orange-400 px-6 py-1 text-sm font-medium text-white"
                        onClick={handleSubmit}
                      >
                        Save
                      </button>
                    )}
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
