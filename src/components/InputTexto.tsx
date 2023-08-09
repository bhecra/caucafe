import { useEffect, useState } from "react";
import React from 'react';
export default function InputTexto ({nombre}:{nombre:string}){
    return(
        <div className="inputs">
            <label htmlFor="fname"> {nombre} </label>
            <input type="text" className="fname" name="fname"/> <br></br>
        </div>
    )
};