import React, { useState } from 'react'

function ModalCoponant() {
    const [isOpen, setIsOpen] = useState(false);
    function openModel() {
        setIsOpen((prev) => !prev);
    }
    return (
        <div>
            <button onClick={openModel} title={isOpen ? " click to close model" : "click to open model"}>{isOpen ? "close model" : "open model"}</button>
            {isOpen ? <div>
                <h3>hello mdel is oppend</h3>
                <p>model opened</p>
                <button onClick={() => setIsOpen(false)}>close modal</button>
            </div> : <p>model closed🔒</p>}
        </div>
    )
}

export default ModalCoponant