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
    <div className="p-8">
      <input
        value={query}
        onChange={handleChange}
        className="border-2 border-black mr-2"
        placeholder="Enter the task"
      />
      <button onClick={Add} className="border-2 px-2 py-1">
        Add
      </button>

      <ul className="mt-4">
        {item.map((task, index) => (
          <li key={index} className="my-2">
            {editIndex === index ? (
              <>
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="border border-black mr-2"
                />
                <button
                  onClick={handleUpdate}
                  className="border border-green-600 px-2 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditIndex(null)}
                  className="border border-gray-500 px-2"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                {task}
                <button
                  onClick={() => handleEdit(index)}
                  className="border border-blue-500 px-2 ml-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="border border-red-500 px-2 ml-2"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;