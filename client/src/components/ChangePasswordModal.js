import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PasswordInput from "./PasswordInput";

export default function ChangePasswordModal(props) {
  const selector = useSelector((state) => state.profileForm);
  const handleSubmit = async () => {
    if (selector?.newPassword === selector?.confirmPassword) {
      try {
        const formData = {
          password: selector.password,
          newPassword: selector.newPassword,
        };
        const postDetails = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/profile/change_password`,
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
          props.setIsOpen(false);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("New Password and Confirm Password doesn't match");
    }
  };
  return (
    <>
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
                  <PasswordInput title={"Current Password"} value="password" />
                  <PasswordInput title={"New Password"} value="newPassword" />
                  <PasswordInput
                    title={"Confirm Password"}
                    value="confirmPassword"
                  />
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
