
export default function InputTexto ({nombre,Id}:{nombre:string,Id:string}){
    return(
        <div className="inputs">
            <label htmlFor="fname"> {nombre} </label>
            <input type="text" className="fname" name="fname" id={Id}/> <br></br>
        </div>
    )
};