import React, { useState } from 'react'
import InputA from './InputA';
import InputB from './InputB';

function Parent() {
    const [myInput, setMyinput] = useState("");
    const [item, setItItme] = useState("")

    function addItem() {
        if (myInput === "") return;
        setItItme(myInput);
        setMyinput("");
    }
    return (
        <div>
            <InputA myInput={myInput} setMyinput={setMyinput}
                item={item} setItItme={setItItme} 
                addItem={addItem}/>
            <InputB myInput={myInput} setMyinput={setMyinput}
                item={item} setItItme={setItItme} />
        </div>
    )
}

export default Parent