import React, { useContext, useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router,Switch,Route,Link, useHistory, NavLink } from "react-router-dom"
import { StoreContext } from './StoreContext'

function Trash() {

  const {trash, invoices, estimates, clients, setNotifs} = useContext(StoreContext)
  const [update, setUpdate] = useState(0)
  let pageRef = useRef()

  const trashrowinv = trash[0].map(item => {
    return <div className="trashitem">
      <small>#00{item.number}</small>
      <small>{item.name}</small>
      <small>${item.total.toFixed(2)}</small>
      <small>{item.invdate.toString().split(' ').slice(1,4).join(" ") }</small>
      <small>{item.status}</small>
      <small><button onClick={() => restoreItem(item,0,"Invoice")}>Restore</button><i class="fas fa-trash" onClick={() => deleteItem(item,0,"Invoice")}></i></small>
    </div>
  }) 
  const trashrowest = trash[1].map(item => {
    return <div className="trashitem">
      <small>#00{item.number}</small>
      <small>{item.name}</small>
      <small>${item.total.toFixed(2)}</small>
      <small>{item.estdate.toString().split(' ').slice(1,4).join(" ") }</small>
      <small><button onClick={() => restoreItem(item,1,"Estimate")}>Restore</button><i class="fas fa-trash" onClick={() => deleteItem(item,1,"Estimate")}></i></small>
    </div>
  }) 
  const trashrowcli = trash[2].map(item => {
    return <div className="trashitem">
      <small>{item.id}</small>
      <small>{item.name}</small>
      <small>{item.email}</small>
      <small>${item.phone}</small>
      <small>{item.address}</small>
      <small>{item.city}, {item.provstate}</small>
      <small><button onClick={() => restoreItem(item,2,"Client")}>Restore</button><i class="fas fa-trash" onClick={() => deleteItem(item,2,"Client")}></i></small>
    </div>
  }) 
 
  function restoreItem(item,index,type) {
    index===0?invoices.push(item):index===1?estimates.push(item):clients.push(item)
    trash[index].map(el => {
      if(el.id === item.id) {
        let itemindex = trash[index].indexOf(el)
        trash[index].splice(itemindex,1)
        if(type==="Client") {
          setNotifs(prevNotif => [...prevNotif, {icon:"far fa-check-circle",text:`Client "${item.name}" has been restored to your clients.` }])
        }
        else {
          setNotifs(prevNotif => [...prevNotif, {icon:"far fa-check-circle",text:`${type} #00${item.number} has been restored to your ${type}s.` }])
        }
        activateNotif()
      } 
    })
  }   
  function deleteItem(item, index,type) {
    trash[index].map(el => {
      if(el.id === item.id) {
        let itemindex = trash[index].indexOf(el)
        trash[index].splice(itemindex,1)
        if(type==="Client") {
          setNotifs(prevNotif => [...prevNotif, {icon:"far fa-check-circle",text:`Client "${item.name}" has been permanently deleted.` }])
        }
        else {
          setNotifs(prevNotif => [...prevNotif, {icon:"far fa-check-circle",text:`${type} #00${item.number} has been permanently deleted.` }])
        }
        activateNotif()
      } 
    }) 
  }
  function activateNotif() {
    setTimeout(() => { 
      document.querySelector('.notifscont .notifs').style.cssText += 'opacity:1;left:0'
      setTimeout(() => {
        document.querySelector('.notifscont .notifs').style.cssText += 'opacity:0;left:-40px'
        setTimeout(() => { setNotifs([]) }, 200)
      }, 3000)
    }, 100) 
  }

  useEffect(() => {
    pageRef.current.style.bottom = '0'
  },[])

  return (    
    <div className="trashpage" ref={pageRef}>
      <Link to="/settings/general" className="closetrash"><i className="far fa-angle-down"></i></Link>
      <h3>Trash</h3>
      <div className="trashcont">
        <div className="trashhead">
          <NavLink activeClassName="trashactivelink" exact to="/settings/general/trash/">Invoices</NavLink>
          <NavLink activeClassName="trashactivelink" exact to="/settings/general/trash/estimates">Estimates</NavLink>
          <NavLink activeClassName="trashactivelink" exact to="/settings/general/trash/clients">Clients</NavLink>
        </div>
        <div className="trashcontent">
          <Route exact path="/settings/general/trash/">
            {trashrowinv}
          </Route>
          <Route path="/settings/general/trash/estimates">
            {trashrowest}
          </Route>
          <Route path="/settings/general/trash/clients">
            {trashrowcli}
          </Route>
        </div>
      </div>
    </div>
  )
}

export default Trash