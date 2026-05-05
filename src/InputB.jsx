
import React from 'react'

function InputB({ myInput, setMyinput, item, setItItme, addItem  }) {
  return (
    <div>
      <input type="text" value={myInput}
      placeholder='input b'
        onChange={(e) => setMyinput(e.target.value)} />
      <button onClick={addItem}>click us</button>
      <p>searched:{myInput}</p>

    </div>
  )
}

export default InputB