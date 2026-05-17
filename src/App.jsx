import { useState } from 'react';
//import './index.css'
import Test from './Test';
//lifting part
import Parent from './Parent';
import ModalCoponant from './ModalCoponant';
import { FaTrashAlt } from 'react-icons/fa';
import { FaPlus, FaTrash } from 'react-icons/fa6';
import Groceries from './Groceries';
//
import './grocery_app.css'

const itemListStyle = {
  textAlign: "center",
  marginTop: "2.5rem",

};

//componant
function App() {

  return (
    <>


      <div>

        <Groceries />
        <footer>
          <p>Groceries Tracker . &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </>
  );
}

export default App;