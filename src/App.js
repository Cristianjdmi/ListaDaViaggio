import React, { useState } from 'react'
import { Logo } from './Logo'



const App = () => {
  const [items, setItems] = useState([])
  let handleDeleteAll = ()=>{
    let conferma = window.confirm("sei sicuro di voler eliminare il tutto?")
    {conferma  ? setItems([]): console.log("ok")}
  }
  let handleToggleItem = (id)=>{
    setItems((items) => items.map(item => item.id === id ? {...item, packed:!item.packed} : item))
  }

  let handleDeleteItems = (id)=>{
    setItems((items)=>items.filter(item=> item.id !== id))
  }

  return <div className='app'>
          <Logo />
          <Form setItems = {setItems} />
          <PackingList items = {items} onDeleteItems = {handleDeleteItems} onToggleItems = {handleToggleItem} onDeleteAll = {handleDeleteAll}/>
          <Stats items = {items}/>
  </div>
}

let Form = ({setItems})=>{ 
  const [description,setDescription]= useState("")
  const [quantity,setQuantity]= useState(5)

  let handleAddItems = (item)=>{
    setItems((items)=> [...items, item])
    
  }
 

  let handleSubmit = (e)=>{
    e.preventDefault()

    if (!description) return;
    const newItem = {description, quantity, packed:false, id: Date.now()}
    console.log(newItem);
    handleAddItems(newItem)
  }

 
  return <form className='add-form' onSubmit={handleSubmit}>
              <h3>cosa hai bisogno per la tua 😍 Vacanza!</h3>
              <select value={quantity} onChange={(e)=>setQuantity(e.target.value)}>
               {Array.from({length:20}, (_,i)=> i + 1).map(num =><option value={num} key={num}>{num}</option>)}
              </select>
              <input type='text' placeholder='Oggetto....' value={description} onChange={(e)=> setDescription(e.target.value)} />
              <button className=''>AGGIUNGI</button>
          </form>
}

let PackingList = ({items,setItems,onDeleteItems, onToggleItems, onDeleteAll})=>{
  const [sortby, setSortBy] = useState("input")
  let itemOrdinati;
  if (sortby === "input") itemOrdinati = items;
  if (sortby === "packed") itemOrdinati = items.slice().sort((a,b)=> Number(a.packed)- Number(b.packed));

  return (
    <div className='list'>
      <ul>
        {itemOrdinati.map(item=><Item item ={item} key = {item.id} setItems = {setItems} onDeleteItems={onDeleteItems} onToggleItems= {onToggleItems} />)}
      </ul>
      
      <div className='action'>
        <select value={sortby} onChange={(e)=> setSortBy(e.target.value)}>
          <option value="input">Ordina in base al input</option>
          <option value="packed">Ordina se l'hai impacchettato</option>
        </select>
        <button onClick={()=>onDeleteAll()}>Pulisci</button>
      </div>

    </div>
  )
}

let Stats = ({items})=>{
  if(!items.length)return <p className='stats'><em>Inserisci Qualcosa che ti serve per il tuo viaggio! 🚀</em></p>
  let numItems = items.length
  let numPacked = items.filter(item => item.packed).length
  let numPercentuale = Math.round((numPacked / numItems )*100);


  return( <footer className='stats'>
    {numPercentuale === 100 ? <em>"Hai inserito tutto per il tuo bellissimo viaggio🛫!!"</em>: <em>🧳hai {numItems}   oggetti nella tua lista , e ne hai già messi {numPacked} ({numPercentuale === isNaN ? 0 : numPercentuale}%)</em>}
    
    </footer>
    )
}
let Item = ({item, onDeleteItems, onToggleItems})=>{
  return (
  <li>
    <input className='' type='checkbox' value={item.packed} onChange={()=>onToggleItems(item.id)}/>
    <span style={item.packed ? {textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
        <button onClick={()=>onDeleteItems(item.id)}>❌</button>
    </span>
  </li>
  )
}


export default App