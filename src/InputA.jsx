
import React from 'react'

function InputA({ myInput, setMyinput, item, setItItme, addItem }) {
    return (
        <div>
            <input type="text" value={myInput}
            placeholder='inputA'
                onChange={(e) => setMyinput(e.target.value)} />
            <button onClick={addItem}>click us</button>
            <p>searched:{myInput}</p>

        </div>
    )
}

export default InputA