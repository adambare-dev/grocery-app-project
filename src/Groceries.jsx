import React, { useEffect } from "react";

import "./grocery_app.css";
//import "./App.css";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { useState } from "react";
import {
  FaTrashAlt,
  FaEdit,
  FaRegSave,
  FaTimes,
  FaSearch,
} from "react-icons/fa";
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
      i.id === editId
        ? {
            ...i,
            name: editText,
            addetTime: new Date().toLocaleTimeString("en-us", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
              second: "2-digit",
            }),
          }
        : i,
    );
    setItems(newItems);
    seteditId(null);
  }

  function addItem() {
    if (input.trim() === "") return;
    const adddAt = new Date().toLocaleTimeString("en-us", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const newItem = {
      id: Date.now(),
      name: input,
      bought: false,
      addetTime: adddAt,
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
  const [search, setSearch] = useState("");
  const filtredItems = items.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase()),
  );
  const itemsBought = items.filter((i) => i.bought);
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

        <section className="inputs">
          <article className="search-grpoup">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="search item"
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </article>

          <div className="add-group">
            <input
              type="text"
              placeholder="add item"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={hundleKeyDown}
              className="grocery-input"
            />
            <FaPlus onClick={addItem} className="add-icon"></FaPlus>
          </div>
        </section>

        <section className="grocery-list-cont">
          {filtredItems.length === 0 && (
            <p style={{ textAlign: "center", marginTop: "1rem" }}>
              No items yet
            </p>
          )}
          <ul>
            {filtredItems.length > 0 &&
              filtredItems.map((item) => (
                <li key={item.id} className={item.bought ? "bought" : ""}>
                  {editId === item.id ? (
                    <section className="edit-sect">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => seteditText(e.target.value)}
                        className="edit-input"
                        onKeyDown={(e) => e.key === "Enter" && updateItems()}
                      />
                      <FaRegSave
                        onClick={updateItems}
                        className="save-icon"
                        title="save"
                      >
                        Save
                      </FaRegSave>
                      <FaTimes
                        className="cancel-icon"
                        onClick={() => seteditId(null)}
                        title="click to cancel"
                      >
                        cancel
                      </FaTimes>
                    </section>
                  ) : (
                    <div className="items-list-card">
                      <article>
                        <p
                          title={`items status: ${item.bought ? "purchased" : "pending"}`}
                          className="item-text"
                        >
                          {item.name}
                        </p>
                        <small>Added at: {item.addetTime}</small>
                      </article>

                      <FaEdit
                        onClick={() => editItem(item.id)}
                        className="edit-icon"
                        title={`edit ${item.name}`}
                      >
                        edit
                      </FaEdit>
                      <input
                        type="checkbox"
                        onChange={() => toggleItem(item.id)}
                        title={`${item.bought ? "item purchased" : "mark as bought"}`}
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
          <section className="items-status">
            <p>
              Total Items: <span className="status-count">{items.length}</span>
            </p>
            <p>
              Items bought:{" "}
              <span className="status-count">{itemsBought.length}</span>
            </p>
            {/*  <p className="items-count">
              {items.length === 0
                ? "Add your items"
                : items.length === 1
                  ? "you have 1 item"
                  : "items purchased: " + items.length + " items"}
            </p> */}
          </section>

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
