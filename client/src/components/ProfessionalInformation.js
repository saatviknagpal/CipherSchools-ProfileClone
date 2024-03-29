import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faLinkedIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCheck,
  faChevronDown,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { highestEducation } from "../data/data";
import { Listbox, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../redux/slices/updateProfileSlice";

export default function ProfessionalInformation({
  heading,
  list,
  title,
  toggleProfessional,
}) {
  const dispatch = useDispatch();
  const profileForm = useSelector((state) => state.profileForm);
  return (
    <>
      <label htmlFor={title} className="font-medium flex flex-col gap-1">
        {heading}
        <Listbox
          value={profileForm[title] === "" ? list[0] : profileForm[title]}
          onChange={(selected) =>
            dispatch(updateDetails({ name: title, value: selected }))
          }
        >
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">
                {profileForm[title] === "" ? list[0] : profileForm[title]}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            {toggleProfessional ? (
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {list.map((education, educationIdx) => (
                    <Listbox.Option
                      key={educationIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                      value={education}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {education}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            ) : null}
          </div>
        </Listbox>
      </label>
    </>
  );
}
