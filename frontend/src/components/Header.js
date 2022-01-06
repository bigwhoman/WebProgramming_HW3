import React from 'react';

function Header({handleDarkMode}) {
    return (
        <div className={"header"}>
            <h1>Notes</h1>
            <button
                className={"save"}
                onClick={()=>handleDarkMode((prev)=>!prev)}
            >
                Toggle Mode
            </button>
        </div>
    );
}

export default Header;