import React, { useEffect, useState, useContext } from 'react'
import Homecont from './Homecont'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { StoreContext } from "./StoreContext"

function AppContainer(props) {

  const {account, main} = useContext(StoreContext)
 
  const [monthwidth, setMonthwidth] = useState(0)
  const [oneinvpin, setOneinvpin] = useState()
  const [pin, setPin] = useState(0)
  const [update, setUpdate] = useState(0)
  const [mobapp, setMobapp] = useState(false)

  function updatePinned() {
    setPin(prev => prev+1)
  } 
  function sendOneInvoice(inv) {
    setOneinvpin(inv)
  }
  function updateAccount() {
    setUpdate(prev => prev+1)
  }
  function foldNav(val) {
    setMobapp(val) 
  } 
  function updateMain() {
    setUpdate(prev => prev+1)
  } 

  useEffect(() => {
    setMonthwidth((new Date().getDate() / 0.3)+'%') 
  },[])  
 
  return (
    <div className={account.settings.darkmode?mobapp?"appcontainer mobapp darkapp":"appcontainer darkapp":mobapp?"appcontainer mobapp":"appcontainer"}>
      <div className="monthlyprog" style={{width: account.settings.monthbar?monthwidth:0}} title="Monthly progress"></div>
        <Sidebar /> 
        <Homecont updatepinned={updatePinned} oneinvpin={oneinvpin} updateaccount={updateAccount} updatemain={updateMain}/>
        <Navbar pin={pin} sendoneinvoice={sendOneInvoice} update={update} foldnav={foldNav} logout={props.logout}/>
    </div>
  )
}

export default AppContainer