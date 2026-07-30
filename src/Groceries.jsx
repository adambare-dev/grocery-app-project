import React, { useEffect } from "react";

import "./grocery_app.css";
//import "./App.css";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { useState } from "react";
import { FaTrashAlt, FaEdit, FaRegSave, FaTimes } from "react-icons/fa";
import {
  FaShoppingBasket,
  FaShoppingCart,
  FaShoppingBag,
} from "react-icons/fa";

function Groceries() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("Item")) || [],
  );
  const [input, setInput] = useState("");
  //update states
  const [editId, seteditId] = useState(null);
  const [editText, seteditText] = useState("");
  function editItem(id) {
    const item = items.find((i) => i.id == id);
    seteditId(id);
    seteditText(item.name);
  }
  function updateItems() {
    const newItems = items.map((i) =>
      i.id === editId ? { ...i, name: editText } : i,
    );
    setItems(newItems);
    seteditId(null);
  }

  function addItem() {
    if (input.trim() === "") return;
    const newItem = {
      id: Date.now(),
      name: input,
      bought: false,
    };
    // setItems([{ ...items, newItem }])
    setItems((prev) => [...prev, newItem]);
    setInput("");
  }
  function removeItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }
  function toggleItem(id) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, bought: !item.bought };
        }
        return item;
      }),
    );
  }
  useEffect(() => {
    localStorage.setItem("Item", JSON.stringify(items));
  }, [items]);
  function hundleKeyDown(e) {
    if (e.key === "Enter") {
      addItem();
    }
  }
  return (
    <>
      <div className="grocery-app-con">
        <section className="header">
          <header className="groc-header">
            <h1>Groceries List</h1>
            <FaShoppingCart className="cart-icon" />
            <p> Everything you need all in one place</p>
          </header>
        </section>

        <section className="input-group">
          <input
            type="text"
            placeholder="add item"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={hundleKeyDown}
            className="grocery-input"
          />
          <FaPlus onClick={addItem} className="add-icon"></FaPlus>
        </section>

        <section className="grocery-list-cont">
          <ul>
            {items.map((item) => (
              <li key={item.id} className={item.bought ? "bought" : ""}>
                {editId === item.id ? (
                  <section className="edit-sect">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => seteditText(e.target.value)}
                      className="edit-input"
                    />
                    <FaRegSave onClick={updateItems} className="save-icon">
                      Save
                    </FaRegSave>
                    <FaTimes
                      className="cancel-icon"
                      onClick={() => seteditId(null)}
                    >
                      cancel
                    </FaTimes>
                  </section>
                ) : (
                  <div className="items-list-card">
                    <p> {item.name}</p>
                    <FaEdit onClick={() => editItem(item.id)}>edit</FaEdit>
                    <input
                      type="checkbox"
                      onChange={() => toggleItem(item.id)}
                    />

                    <small
                      onClick={() => removeItem(item.id)}
                      title="remove item"
                    >
                      <FaTrashAlt className="trash-icon" />
                    </small>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* <p className='items-count'>{items.length < 1 ? " No items yet" : "you have: " + items.length === 1 ? " item" : + " items"}</p> */}
          <p className="items-count">
            {items.length === 0
              ? "Add your items"
              : items.length === 1
                ? "you have 1 item"
                : "you have " + items.length + " items"}
          </p>

          <button
            className="clear-all-btn"
            onClick={() => setItems([])}
            title="are you sure you want to clear all your tasks❗"
          >
            Clear all task
          </button>
        </section>
      </div>
    </>
  );
}

export default Groceries;
