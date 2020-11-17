import React, { useContext, useState, useEffect } from 'react'
import { Inputs, Switchs } from './Inputs'
import RangeSlider from './RangeSlider'
import {StoreContext} from './StoreContext'

function SettingsTheme(props) {

  const {account} = useContext(StoreContext)

  const [maintheme, setMaintheme] = useState(account.settings.main_theme) 
  const [btntheme, setBtntheme] = useState(account.settings.btn_theme) 


  function saveThemeInfo() {
    account.settings.main_theme = maintheme
    account.settings.btn_theme = btntheme
    props.updateaccount() 
    props.shownotif("Your theme & styles settings have been successfully saved.")
    themeColors()
    btnStyle()
  }
  function themeColors() {
    if(maintheme === "Purple") {
      document.documentElement.style.setProperty('--color', '#682bff')
      document.documentElement.style.setProperty('--red', '#fc534d')
      document.documentElement.style.setProperty('--yellow', '#f9bf0a')
      document.documentElement.style.setProperty('--blue', '#1294ff')
      document.documentElement.style.setProperty('--btnshadow', 'rgba(102,51,255,0.5)')
      document.documentElement.style.setProperty('--btn', '#682bff')
    }
    else if(maintheme === 'Skyblue') {
      document.documentElement.style.setProperty('--color', '#21b5ff')
      document.documentElement.style.setProperty('--red', '#ff216b')
      document.documentElement.style.setProperty('--yellow', '#ffda21')
      document.documentElement.style.setProperty('--blue', '#ff24ed')
      document.documentElement.style.setProperty('--btnshadow', 'rgba(33, 181, 255,0.5)')
      document.documentElement.style.setProperty('--btn', '#21b5ff')
    }
    else if(maintheme === 'Cherryred') {
      document.documentElement.style.setProperty('--color', '#ff2457')
      document.documentElement.style.setProperty('--red', '#57ff24')
      document.documentElement.style.setProperty('--yellow', '#248aff')
      document.documentElement.style.setProperty('--blue', '#ff7824')
      document.documentElement.style.setProperty('--btnshadow', 'rgba(255, 36, 87,0.5)')
      document.documentElement.style.setProperty('--btn', '#ff2457')
    }
    else if(maintheme === 'Craftsman') {
      document.documentElement.style.setProperty('--color', '#fca816')
      document.documentElement.style.setProperty('--red', '#b57201')
      document.documentElement.style.setProperty('--yellow', '#ffc65f')
      document.documentElement.style.setProperty('--blue', '#fee6b6')
      document.documentElement.style.setProperty('--btnshadow', 'rgba(252, 168, 22,0.5)')
      document.documentElement.style.setProperty('--btn', '#fca816')
    }
  }
  function btnStyle() {
    if(btntheme === 'Purple') {
      document.documentElement.style.setProperty('--btn', '#682bff')
    }
    else if(btntheme === 'Skyblue') {
      document.documentElement.style.setProperty('--btn', '#21b5ff')
    }
    else if(btntheme === 'Cherryred') {
      document.documentElement.style.setProperty('--btn', '#ff2457')
    }
    else if(btntheme === 'Craftsman') {
      document.documentElement.style.setProperty('--btn', '#fca816')
    }
  }

  useEffect(() => {
    props.setdynamic(false,false,false,true)
  },[])

  return (
    <div className="settingsinvoices">
      <h5 className="settingstitle">App Theme<small>Change the app theme and styles</small></h5>
      <div className="altsetcont noborder">
        <small>Main Theme</small>
        <select className="altsetcont" value={maintheme} onChange={(e) => setMaintheme(e.target.value)}>
          <option selected>Default Theme</option>
          <option value="Purple">Purple (Default)</option>
          <option value="Skyblue">Skyblue</option>
          <option value="Cherryred">Cherryred</option>  
          <option value="Craftsman">Craftsman</option>
        </select>
      </div> 
      <div className="altsetcont noborder" style={{display: account.settings.main_theme==="Craftsman"?"none":"block"}}>
        <small>Buttons Theme</small>
        <select className="altsetcont" value={btntheme} onChange={(e) => setBtntheme(e.target.value)}>
          <option selected>Default Buttons</option>
          <option value="Purple">Purple (Default)</option>
          <option value="Skyblue">Skyblue</option>
          <option value="Cherryred">Cherryred</option>  
        </select> 
      </div>
      <Switchs title="Rounded Corners" onchange={(val) => {account.settings.round_corners = val;props.updatemain()}} checked={account.settings.round_corners} />      

      <button onClick={() => saveThemeInfo()}>Save</button>

    </div>
  )
}

export default SettingsTheme