import { useState } from 'react';
import './index.css'
import Test from './Test';
//lifting part
import Parent from './Parent';
import ModalCoponant from './ModalCoponant';

//

const itemListStyle = {
  textAlign: "center",
  marginTop: "2.5rem",

};

//componant
function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("")
  function addItem() {
    if (input.trim() === "") return;
    const newItem = {
      id: Date.now(),
      name: input
    };
    // setItems([{ ...items, newItem }])
    setItems(prev => [...prev, newItem]);
    setInput("")
  };
  function removeItem(id) {
    setItems(items.filter((item) => item.id !== id));

  }
  return (
    <>
      <Test />
      <hr />

      <div className='container'>
        <h1 style={{ textDecoration: "underline" }}>weolcome to my  Shop</h1>
        <section className="input-group">
          <input type="text" placeholder='add item'
            value={input}
            onChange={(e) => setInput(e.target.value)} />
            
          {/*           <button onClick={addItem}>add item</button> */}

          <button onClick={addItem}>add item</button>

        </section>


        {items.map((item) => <li key={item.id}>{item.name}
          <small onClick={() => removeItem(item.id)}
            title='remove item'>❌</small>
        </li>)}
        <p style={itemListStyle}>{items.length < 1 ? "no items yet" : "items:" + items.length}</p>



      </div>
      <div>
        <ModalCoponant />
        <hr />
        <Parent />
      </div>
    </>
  );
}

export default App;