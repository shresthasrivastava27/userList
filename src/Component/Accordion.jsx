import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { FcCancel } from "react-icons/fc";





const Accordion = ({ person, editableFields, handleDelete, isOpen, toggleAccordion}) => {
  const [dontEdit, setDontEdit] = useState(false)
  const [isEditing, setIsEditing] = useState(false);
  const [editedPerson, setEditedPerson] = useState(person);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [originalPerson, setOriginalPerson] = useState(person);

  useEffect(() => {
    setIsEditing(false);
    setIsSaveDisabled(true);
    setOriginalPerson(person);
    if (calculateAge(editedPerson.dob) >= 18) {
      setDontEdit(false);
    } else {
      setDontEdit(true);
    }
  }, [person]);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    toggleAccordion();
    setOriginalPerson(editedPerson);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedPerson(originalPerson);
    setIsSaveDisabled(true);
    toggleAccordion();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'country' && /\d/.test(value)) {
      return;
    }
  
    setEditedPerson((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  
    const isAnyFieldEmpty = Object.values({
      ...editedPerson,
      [name]: value,
    }).some((val) => val === '');
  
    setIsSaveDisabled(isAnyFieldEmpty);
  };
  

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      handleDelete(editedPerson.id);
    }
  };

  return (
    <div className="border rounded-md mb-4">
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={ isEditing ? "" : toggleAccordion}
      >
        <div className="flex justify-between items-center">
          <img
            className="w-12 h-12 rounded-full mr-4"
            src={editedPerson.picture}
            alt={`${editedPerson.first} ${editedPerson.last}`}
          />
          {isEditing ? (
            <>
              <input
                type="text"
                value={editedPerson.first}
                onChange={handleInputChange}
                className="text-lg font-semibold border-b border-transparent focus:outline-none"
                name="first"
              />
              <input
                type="text"
                value={editedPerson.last}
                onChange={handleInputChange}
                className="text-lg font-semibold border-b border-transparent focus:outline-none"
                name="last"
              />
            </>
          ) : (
            <h2 className="text-lg font-semibold">
              {editedPerson.first} {editedPerson.last}
            </h2>
          )}
        </div>
        <svg
          className={`w-6 h-6 transition-transform transform ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 6.293a1 1 0 011.414 0L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="p-4 border-t">
          <div className="grid grid-cols-3 gap-4">
            {editableFields.slice(2).map((field) => (
              <div key={field} className={`mb-4 ${field === "description" ? "col-span-3" : "flex-grow"}`}>
                <label className="block mb-1 font-semibold" htmlFor={field}>
                  {field === "dob" ? "Age" : field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                {field === "gender" && isEditing ? (
                  <select
                    id={field}
                    name={field}
                    value={editedPerson[field]}
                    onChange={handleInputChange}
                    className="border rounded-md p-2 w-[90%]"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                    <option value="Rather not say">Rather not say</option>
                    <option value="Other">Other</option>
                  </select>
                ) : isEditing ? (
                  <input
                    type={field === "dob" ? "date" : "text"}
                    id={field}
                    name={field}
                    value={editedPerson[field]}
                    onChange={handleInputChange}
                    className="border rounded-md p-2 w-full"
                  />
                ) : (
                  <>
                    {field === "dob" ? (
                      <p>{field === "dob" ? `${calculateAge(editedPerson[field])} years` : calculateAge(editedPerson[field])}</p>
                    ) : !field === "gender" ? (
                      <select
                        id={field}
                        name={field}
                        value={editedPerson[field]}
                        onChange={handleInputChange}
                        className="border rounded-md p-2 w-[90%]"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Transgender">Transgender</option>
                        <option value="Rather not say">Rather not say</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <div >
                        <p>{editedPerson[field]}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <>
              <button
                onClick={handleSaveClick}
                className={`px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2 ${
                  isSaveDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSaveDisabled}
              >
                <IoCheckmarkDoneCircleOutline />

              </button>
              <button
                onClick={handleCancelClick}
                className="px-3 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 mr-2"
              >
                <FcCancel />

              </button>
            </>
          )}
          {!isEditing && (
            <>
              <button
                onClick={handleEditClick}
                disabled={dontEdit}
                className="px-3 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 mr-2"
              >
                <FaRegEdit />

              </button>
              <button
                onClick={handleDeleteClick}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                <MdOutlineDeleteOutline />

              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Accordion;
