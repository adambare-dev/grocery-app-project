import React, { useEffect, useState } from 'react'

function Test() {
    const [name, setName] = useState("");
    const [myInput, setMyinput] = useState("");
    function addName() {
        if (myInput.trim() === "") return setName("no result yet");
        setName(myInput);
        setMyinput("");
    };
    //helper function
    const [data, setData] = useState("Loading....");
    function fakeFetch() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("data recieved from server")
            }, 5000);
        })
    };
    
    useEffect(() => {
        fakeFetch()
            .then((result) => setData(result));

    }, [])
    return (
        <div>
            <h1>{data}</h1>
            <input type="text" placeholder='enter something..'
                value={myInput}
                onChange={(e) => {
                    return setMyinput(e.target.value);
                }} />
            <button onClick={addName}>add name</button>
            <p>your name is: {" "}{name}</p>
        </div>
    )
}

export default Test