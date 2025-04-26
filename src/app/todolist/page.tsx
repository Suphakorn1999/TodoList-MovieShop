"use client";
import { useState } from "react";
import { useTodoStore } from "@/stores/useTodoStore";
import { Button } from "@headlessui/react";
import { FaTrash, FaEdit, FaRegSave, FaPlus } from "react-icons/fa";

export default function TodoListPage() {
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodoStore();

  const handleAddTodo = () => {
    if (input.trim() === "") return;
    addTodo(input);
    setInput("");
  };

  const handleEditTodo = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleSaveEdit = (id: number) => {
    if (editText.trim() === "") return;
    editTodo(id, editText);
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold mb-10 text-center">
        📝 Todo List Today
      </h1>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mb-8">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          placeholder="Add new task..."
        />
        <Button
          onClick={handleAddTodo}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 cursor-pointer focus:ring-2 focus:ring-indigo-500"
        >
          <FaPlus size={12} /> Add
        </Button>
      </div>

      <div className="w-full max-w-lg space-y-3">
        {todos.map((todo, index) => (
          <div
            key={todo.id}
            className="flex items-center justify-between border-b border-gray-300 py-2 px-4 rounded-lg bg-white shadow-sm hover:shadow-md transition duration-200 h-[30%]"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 accent-indigo-600 cursor-pointer"
              />
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 w-48 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              ) : (
                <span
                  className={`text-lg ${
                    todo.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {index + 1}.{todo.text}
                </span>
              )}
            </div>

            <div className="flex gap-2">
              {editingId === todo.id ? (
                <Button
                  onClick={() => handleSaveEdit(todo.id)}
                  className="flex items-center gap-2 bg-emerald-600 text-white px-3 py-2 rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 transition"
                >
                  <FaRegSave size={14} />
                  <span>Save</span>
                </Button>
              ) : (
                <Button
                  onClick={() => handleEditTodo(todo.id, todo.text)}
                  className="flex items-center gap-2 bg-sky-600 text-white px-3 py-2 rounded-lg hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 transition"
                >
                  <FaEdit size={14} />
                  <span>Edit</span>
                </Button>
              )}

              <Button
                onClick={() => deleteTodo(todo.id)}
                className="flex items-center gap-2 bg-rose-600 text-white px-3 py-2 rounded-lg hover:bg-rose-700 focus:ring-2 focus:ring-rose-500 transition"
              >
                <FaTrash size={14} />
                <span>Delete</span>
              </Button>
            </div>
          </div>
        ))}

        {todos.length === 0 && (
          <p className="text-center text-gray-400 text-sm">
            No tasks yet. Add one!
          </p>
        )}
      </div>
    </div>
  );
}
