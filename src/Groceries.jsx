import React, { useEffect } from 'react'
//import './index.css'
import './grocery_app.css'
import { FaPlus, FaTrash } from 'react-icons/fa6';
import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { FaShoppingBasket, FaShoppingCart, FaShoppingBag } from 'react-icons/fa';



function Groceries() {
    const [items, setItems] = useState(JSON.parse(localStorage.getItem("Item")) || []);
    const [input, setInput] = useState("")
    function addItem() {
        if (input.trim() === "") return;
        const newItem = {
            id: Date.now(),
            name: input,
            bought: false
        };
        // setItems([{ ...items, newItem }])
        setItems(prev => [...prev, newItem]);
        setInput("")
    };
    function removeItem(id) {
        setItems(items.filter((item) => item.id !== id));

    }
    function toggleItem(id) {
        setItems(prev => prev.map((item) => {
            if (item.id === id) {
                return { ...item, bought: !item.bought }
            }
            return item;
        }))
    };
    useEffect(() => {
        localStorage.setItem("Item", JSON.stringify(items));
    }, [items])
    function hundleKeyDown(e) {
        if (e.key === "Enter") {
            addItem();
        }
    }
    return (
        <>
            <div className='container'>
                <div className='header'>
                    <h1>Groceries List</h1>

                    <FaShoppingCart className='cart-icon' />

                </div>


                <section className="input-group">
                    <input type="text" placeholder='add item'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={hundleKeyDown}
                        className='grocery-input' />

                    {/*           <button onClick={addItem}>add item</button> */}

                    <FaPlus onClick={addItem} className='add-icon'></FaPlus>

                </section>


                <section>
                    {items.map((item) => <li key={item.id}
                        className={item.bought ? "bought" : ""}>
                        <input type="checkbox"
                            onChange={() => toggleItem(item.id)} />
                        {item.name}
                        <small onClick={() => removeItem(item.id)}
                            title='remove item'><FaTrashAlt className='trash-icon' /></small>
                    </li>)}
                    {/* <p className='items-count'>{items.length < 1 ? " No items yet" : "you have: " + items.length === 1 ? " item" : + " items"}</p> */}
                    <p className='items-count'>{items.length === 0 ? "No items yet" : items.length === 1 ? "you have 1 item"
                        : "you have " + items.length + " items"}</p>
                </section>

            </div>

        </>
    )


}

export default Groceries