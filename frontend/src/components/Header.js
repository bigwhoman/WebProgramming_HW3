import React from 'react';
import {useNavigate} from "react-router-dom";

function Header({handleDarkMode,setToken}) {
    const navigate = useNavigate();
    return (
        <div className={"header"}>
            <h1>Notes</h1>
            <button
                className={"save"}
                onClick={()=>handleDarkMode((prev)=>!prev)}
            >
                Toggle Mode
            </button>
            <button
                className={"save"}
                onClick={()=> {
                    navigate("/");
                    setToken(undefined)
                }}
            >
                Logout
            </button>
        </div>
    );
}

export default Header;