import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const DynamicW2Jobs = () => {
  const [fields, setField] = useState<{ name: string; hours: string }[]>([]);

  const addField = () => {
    const updatedFields = [...fields, { name: "", hours: "" }];
    setField(updatedFields);
  };

  const deleteField = (index: number) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setField(updatedFields);
  };

  const changeField = (
    index: number,
    key: "name" | "hours" | "rating",
    value: string,
  ) => {
    const updatedFields = [...fields]; // Create a copy of the original array
    updatedFields[index] = { ...updatedFields[index], [key]: value }; // Update the specific field
    setField(updatedFields); // Set the state with the updated array
  };

  return (
    <>
      <h2 className="mb-2 text-sm">
        If you work any W2 jobs, what are they and how many hours do you spend
        on it a week?
      </h2>

      {fields.map((field, index) => (
        <div
          key={index}
          className="flex flex-col text-stone-800 text-xs font-['Inter']"
        >
          <label>App Name</label>
          <input
            className="p-3 w-72 h-9 rounded border border-stone-300 mb-2"
            type="text"
            name="name"
            onChange={(e) => changeField(index, "name", e.target.value)}
            value={field.name}
          />

          <label>Hours per Week</label>
          <input
            className="p-3 w-72 h-9 rounded border border-stone-300 mb-2"
            type="text"
            name="hours"
            onChange={(e) => changeField(index, "hours", e.target.value)}
            value={field.hours}
          />

          <button
            className="mb-4 text-left text-red-500/100"
            onClick={() => {
              deleteField(index);
            }}
          >
            Delete <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}

      <button className="text-left text-sm mb-6 font-bold" onClick={addField}>
        + Add
      </button>
    </>
  );
};
