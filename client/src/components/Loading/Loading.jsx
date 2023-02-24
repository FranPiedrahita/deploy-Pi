import React from "react";
import'./Loading.css'
import '../Home/Home.css'

export default function Loading () {
    return (
        <div id={"home"}>
        <div className="loading">
            <img className="imgcerdo"  src="https://media.baamboozle.com/uploads/images/125978/1629738053_29014_gif-url.gif" alt="" />
            <p style={{color:"white"}}>Wait a second ...</p>
            
        </div>
        </div>
    )
}