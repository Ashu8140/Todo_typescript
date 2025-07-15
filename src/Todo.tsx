import { useState } from "react";

function Todo() {
  const storeData = localStorage.getItem("list");
  const parseData: string[] = storeData ? JSON.parse(storeData) : [];

  const [query, setQuery] = useState<string>("");
  const [item, setItem] = useState<string[]>(parseData);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  // Update localStorage every time items change
  // Good practice: useEffect can be used in real apps for side-effects like this
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
      setEditIndex(null); // cancel edit if the item being edited is deleted
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
    <div className="bg-blue-300  h-screen p-20  shadow-lg justify-center ">
      <div className="bg-white p-10 rounded-xl shadow-md w-auto text-center ">
        
     <div className="relative w-full max-w-md mx-auto mt-6">
  <input
    value={query}
    onChange={handleChange}
    className="w-full border border-black p-2  rounded-3xl"
    placeholder="Enter the task"
  />
  <button
    onClick={Add}
    className="absolute right-0 top-1/2 -translate-y-1/2 bg-green-500 text-white px-4 py-2 rounded-3xl"
  >
    Add
  </button>
</div>

      <ul className="mt-4">
  {item.map((task, index) => (
    <li
      key={index}
      className="flex justify-between text-start border border-black py-2 px-4 text-gray-800"
    >
      {editIndex === index ? (
        <div className="flex w-full items-center gap-2">
          <input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="border border-black px-2 py-1 rounded-md flex-1"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-3 py-1 rounded-md"
          >
            Save
          </button>
          <button
            onClick={() => setEditIndex(null)}
            className="bg-gray-400 text-white px-3 py-1 rounded-md"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <span className="flex-1">{task}</span>
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(index)}
              className="bg-blue-500 text-white px-3 py-1 rounded-md"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(index)}
              className="bg-red-500 text-white px-3 py-1 rounded-md"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  ))}
</ul>

    
    </div>
    </div>
  );
}

export default Todo;