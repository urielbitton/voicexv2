import React, { useEffect, useContext, useState, useRef } from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink } from "react-router-dom"
import { Helmet } from 'react-helmet'
import SettingsAccount from './SettingsAccount'
import SettingsGeneral from './SettingsGeneral'
import SettingsInvoices from './SettingsInvoices'
import SettingsTheme from './SettingsTheme'
import SettingsSupport from './SettingsSupport'
import { StoreContext } from "./StoreContext"
import Trash from './Trash'

function Settings(props) {

  const {account, notifs, setNotifs, invoices} = useContext(StoreContext)

  const [update, setUpdate] = useState(0)
  const [showdynam, setShowdynam] = useState([true,false,false,false])
  const [support, setSupport] = useState(false)
  const [supportmsg, setSupportmsg] = useState('')
  const [profimg, setProfimg] = useState(account.profimg)
  const formRef = useRef()

  function uploadImg() {
    var file = document.querySelector(".uploadpic").files[0];
    var reader = new FileReader();
    reader.onloadend = function(){
      setProfimg(reader.result)
      account.profimg = reader.result
      props.updateaccount() 
    } 
    if(file) {
        reader.readAsDataURL(file);
      } 
  }
  function showNotif(msg) {
    setNotifs(prevNotif => [...prevNotif, {icon:"fas fa-check-circle",text:msg}])
    activateNotif()
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
  function setDynamicContent(t1,t2,t3,t4) {
    setShowdynam([t1,t2,t3,t4])
  }
  function thousSep(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  } 
  function handleSupport() {
    if(supportmsg.length) {
      setSupport(false)
      showNotif('Your message has been sent. We will be in touch shortly.')
      formRef.current.reset()
    }
    else {
      showNotif('Please enter a message to send to our support team.')
    }
  }

  return (
    <div className="settingspage">
      <div className="pageheaders">
        <div>
          <h2>Settings</h2>
        </div>
      </div> 

      <div className="settingsgrid">
        <div className="dashbox settingsprofbox" data-update={update}>
          <h6>Profile</h6>
          <Link to="/settings"><small>Edit</small></Link>
          <div className="settingsimgcont"> 
          <label>
            <div className="uploadercont" style={{backgroundImage: profimg?("url("+profimg+")"):"url(https://i.imgur.com/bcCbeiE.jpg)"}}><input className="uploadpic" type="file" onChange={uploadImg}/></div>
            <i className="fal fa-camera"></i>
          </label>
          </div>
          <div style={{textAlign: "center"}}>
            <h4>{account.fname+" "} {account.lname}</h4>
            <span className="jobtitle">{account.jobtitle}</span>
          </div> 
          <hr/> 
          <div className="profstats">
          <h5>Location: <span style={{opacity: account.city?"1":"0"}}>{account.city}, {account.country}</span></h5>
          <h5>Profile ID: <span>#{account.id}</span></h5>
          <h5>Invoices: <span>{invoices.length}</span></h5>
          </div>
          <hr/>
          <div className="infostats">
            <h6>Quick View</h6>
            <div style={{display: showdynam[0]?"block":"none"}}>
              <h5>Address</h5>
              <span style={{opacity: account.address?"1":"0"}}>{account.address} ({account.postal})</span>
              <h5>Email</h5>
              <span>{account.email}</span>
              <h5>Phone</h5> 
              <span style={{opacity: account.phone?"1":"0"}}>({account.phone.slice(0,3)})-{account.phone.slice(3,6)}-{account.phone.slice(6,10)}</span>
              <h5>Website</h5>
              <span><a href={"https://"+account.website} target="_blank" rel="noreferrer">{account.website}</a></span>
            </div>
            <div style={{display: showdynam[1]?"block":"none"}}>
              <h5>Dark Mode</h5>
              <span>{account.settings.darkmode?"On":"Off"}</span>
              <h5>Notifications</h5>
              <span>On</span>
              <h5>Monthly Goal</h5>
              <span>${thousSep(account.goals)}</span>
            </div>
            <div style={{display: showdynam[2]?"block":"none"}}>
              <h5>Taxes</h5> 
              <span>{account.taxrate.taxes?"Enabled":"Disabled"}</span>
              <div style={{display: account.taxrate.taxes?"block":"none"}}>
              <h5>{account.taxrate.custom1.name}: {account.taxrate.custom1.num}</h5>
              <span>{(account.taxrate.custom1.rate*100).toFixed(2)}%</span>
              <h5>{account.taxrate.custom2.name}: {account.taxrate.custom2.num}</h5>
              <span>{(account.taxrate.custom2.rate*100).toFixed(2)}%</span>
              </div>
              <h5>Currency</h5>
              <span>{account.currency}</span>
            </div>
            <div style={{display: showdynam[3]?"block":"none"}}>
              <h5>Theme Style</h5>
              <span>{account.settings.main_theme}</span>
              <h5>Button Style</h5>
              <span>{account.settings.btn_theme}</span>  
            </div>
            <div className="infonav">
              <i className={showdynam[0]?"activeinfonav":""} onClick={() => setDynamicContent(true,false,false,false)}>1</i>
              <i className={showdynam[1]?"activeinfonav":""} onClick={() => setDynamicContent(false,true,false,false)}>2</i>
              <i className={showdynam[2]?"activeinfonav":""} onClick={() => setDynamicContent(false,false,true,false)}>3</i>
              <i className={showdynam[3]?"activeinfonav":""} onClick={() => setDynamicContent(false,false,false,true)}>4</i>
            </div>
          </div>
          <hr/>
          <div className="supportdiv">
            <p>Need help? Support is here.</p>
            <button onClick={() => setSupport(true)}><i class="fal fa-user-headset"></i>Contact Support</button>
          </div>
        </div>
        <div className="dashbox settingswindow">
          <div className="tabheaders">
            <NavLink exact to="/settings/" activeClassName="activesetlink"><h5>Account<hr/></h5></NavLink>
            <NavLink to="/settings/general" activeClassName="activesetlink"><h5>General<hr/></h5></NavLink>
            <NavLink to="/settings/invoices" activeClassName="activesetlink"><h5>Invoices<hr/></h5></NavLink>
            <NavLink to="/settings/theme" activeClassName="activesetlink"><h5>Theme<hr/></h5></NavLink>
            <NavLink to="/settings/support" activeClassName="activesetlink"><h5>Support<hr/></h5></NavLink>
          </div> 
          <div className="tabcontent">
          <Switch>
            <Route exact path="/settings/"> 
              <SettingsAccount updateaccount={() => {setUpdate(prev => prev+1);props.updateaccount()}} shownotif={showNotif} setdynamic={setDynamicContent} />
            </Route>
            <Route path="/settings/general">
              <SettingsGeneral shownotif={showNotif} setdynamic={setDynamicContent} updateaccount={() => {setUpdate(prev => prev+1);props.updateaccount()}} updatemain={props.updatemain} />
            </Route>
            <Route path="/settings/invoices">
              <SettingsInvoices shownotif={showNotif} setdynamic={setDynamicContent} updateaccount={() => {setUpdate(prev => prev+1);props.updateaccount()}} updatemain={props.updatemain} />
            </Route>
            <Route path="/settings/theme">
              <SettingsTheme shownotif={showNotif} setdynamic={setDynamicContent} updateaccount={() => {setUpdate(prev => prev+1);props.updateaccount()}} updatemain={props.updatemain} />
            </Route> 
            <Route path="/settings/support">
              <SettingsSupport shownotif={showNotif} setdynamic={setDynamicContent} />
            </Route>
          </Switch>
          </div>
        </div>  
      </div>
      <div className="spacer"></div>

      <div className="supportcont" style={{top: support?"0":"-550px"}}>
        <h3>Contact Support</h3>
        <i className="fal fa-times" onClick={() => setSupport(false)}></i>
        <form ref={formRef}>
          <label>
            <h6>Subject</h6>
            <input placeholder="Subject"/>
          </label>
          <label>
            <h6>Message</h6>
            <textarea placeholder="Message here..." onChange={(e) => setSupportmsg(e.target.value)}/>
          </label>
        </form>
        <button onClick={() => handleSupport()}>Send</button>
      </div>

      <Helmet><title>Voicex - Settings</title></Helmet>
    </div>
  ) 
}

export default Settings