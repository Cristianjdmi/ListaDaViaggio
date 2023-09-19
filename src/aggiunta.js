import React, { useState } from 'react'

const Aggiunta = () => {
    const [valoreInput, setValoreInput] = useState(1)
    const [count, setCount] = useState(1)
    const [prova, setProva] = useState("")
  return (
    <>

        <h2>{valoreInput}</h2>
    <div>
     <button onClick={()=>setValoreInput(Number(valoreInput + 1))}>+</button>

        <input value={valoreInput} type='range' max={10} min={1} onChange={(e)=>
          setValoreInput(e.target.value) } />
        <button onClick={() =>setValoreInput(Number(valoreInput - 1))}>-</button>

    </div>

    <div>

       
    </div>
    <button onClick={()=> setCount(Number(count + valoreInput))}>+</button>

    <input value={count} type='number' onChange={(e)=>setCount(e.target.value)} />

    <button onClick={()=> setCount(Number(count - valoreInput))}>-</button>

    {valoreInput !== 1 || count !== 1 ? <button onClick={()=>(setCount(1),setValoreInput(1))}>reset</button>: ""}

    <input  placeholder='scrivi qualcosa' value={prova} onChange={(e)=>setProva(e.target.value)}/>
    <h2>{prova}</h2>
  </>
  )
}
export default Aggiunta
