import { useState } from "react";

function Todo() {
  const storeData = localStorage.getItem("list");
  const parseData: string[] = storeData ? JSON.parse(storeData) : [];

  const [query, setQuery] = useState<string>("");
  const [item, setItem] = useState<string[]>(parseData);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  // Save to localStorage on change
  localStorage.setItem("list", JSON.stringify(item));

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function Add() {
    if (query.trim()) {
      setItem([...item, query.trim()]);
      setQuery("");
    }
  }

  function handleDelete(index: number) {
    setItem(item.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
    }
  }

  function handleEdit(index: number) {
    setEditIndex(index);
    setEditValue(item[index]);
  }

  function handleUpdate() {
    if (editIndex !== null && editValue.trim()) {
      const updated = [...item];
      updated[editIndex] = editValue.trim();
      setItem(updated);
      setEditIndex(null);
      setEditValue("");
    }
  }

  return (
    <div className="min-h-screen bg-blue-300 p-4 flex items-center justify-center">
      <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Todo List</h1>

        <div className="relative mb-4">
          <input
            value={query}
            onChange={handleChange}
            className="w-full border border-black p-3 rounded-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the task"
          />
          <button
            onClick={Add}
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm sm:text-base"
          >
            Add
          </button>
        </div>

        <div className="space-y-3">
          {item.map((task, index) => (
            <li
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-gray-300 bg-gray-100 px-4 py-3 rounded-lg text-sm sm:text-base"
            >
              {editIndex === index ? (
                <div className="flex flex-col sm:flex-row w-full gap-2">
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-1 border border-black p-2 rounded-md w-full"
                  />
                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md w-full sm:w-auto"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditIndex(null)}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span className="flex-1 break-words">{task}</span>
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Todo;
