import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePoke } from "../../redux/actions";
import "./NavBar.css";

export default function NavBar({setCurrentPage}) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  
  

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getNamePoke(name,()=>{setName("")}));
    setCurrentPage(1)
    
  }
  return (
    <div className="barraCaja">
    <input  type="text" value={name} onChange={handleInputChange} placeholder="𝘽𝙪𝙨𝙘𝙖𝙧 𝙋𝙤𝙠𝙚𝙢𝙤𝙣..."/> 
    <input type="submit"onClick={handleSubmit} value="🔍"/>
      
    </div>
  );
} 