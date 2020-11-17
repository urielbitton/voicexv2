import React, { useContext, useEffect, useState, useRef } from 'react'
import { BrowserRouter as Router,Switch,Route,Link, useHistory } from "react-router-dom"
import { StoreContext } from './StoreContext'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Calculator from './Calculator'

function Navbar(props) {

  const {pinned, reminders, invoices, setReminders, notifs, setNotifs, account} = useContext(StoreContext)

  const [remid, setRemid] = useState()
  const [remtext, setRemtext] = useState()
  const [reminder, setReminder] = useState('')
  const [reminderon, setReminderon] = useState(false)
  const [remdate, setRemdate] = useState(new Date())
  const [update, setUpdate] = useState(0)
  const [editmode, setEditmode] = useState(false)
  const [navopen, setNavopen] = useState(false)
  const [hidecalc, setHidecalc] = useState(true)
  const [hidetime, setHidetime] = useState(true)
  const [hidecalen, setHidecalen] = useState(true)
  const [hidetoolslide, setHidetoolslide] = useState(true)
  const formRef = useRef()

  const pinnedinvoices = pinned.map(pin => {
    return <div className="reminderbox">
      <div><i className="far fa-file-invoice-dollar"></i></div>
      <Link to="/invoice" onClick={() => {
        props.sendoneinvoice(
          invoices.map(inv => {
            if(inv.id===pin.id) {
              return inv
            }
          })
        )
      }}>
      <h5>#{pin.number} - {pin.name}<small>{pin.date}</small></h5></Link>
      <i className="fas fa-ellipsis-h"></i> 
    </div> 
  })
  const recentreminders = reminders.map(rem => {
    return <div className="reminderbox" data-id={rem.id}>
      <div><i className="far fa-bell"></i></div>
      <h5>{rem.text}<small>{rem.date}</small></h5>
      <i className="fas fa-ellipsis-h" onClick={() => openRemOptions(rem)}></i>
      <div className="boxoptions" style={{right: rem.opts?"0":"-100%"}}>
        <i className="far fa-trash" onClick={() => deleteReminder(rem)}></i>
        <i className="far fa-edit" onClick={() => editReminder(rem)}></i>
        <i className="far fa-times" onClick={() => closeRemOptions(rem)}></i>
      </div>
    </div> 
  })

  function genDate() {
    let amonth = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    return amonth[new Date().getMonth()] +" "+  new Date().getDate() +" "+ new Date().getFullYear() 
  }
  function createReminder() {
    setReminder(remtext)
    setReminders(prevRem => [...prevRem, {id:reminders.length, text: remtext, date: remdate.toString().split(' ').slice(1,4).join(' '), opts: false}])
    setReminderon(false)
    setRemdate(new Date())
    formRef.current.reset()
    setNotifs(prevNotif => [...prevNotif, {icon:"far fa-check-circle",text:`Reminder: "${remtext}" has been successfully added to your reminders.` }])
    activateNotif()
  } 
  function deleteReminder(rem) {
    reminders.map(el => {
      if(el.id === rem.id) {
        let remindex = reminders.indexOf(rem)
        reminders.splice(remindex, 1)
      }
    })  
    setUpdate(prev => prev+1)
  }
  function openRemOptions(rem) {
    rem.opts = true
    setUpdate(prev => prev+1)
  }
  function editReminder(rem) {
    rem.opts = false
    setUpdate(prev => prev-1) 
    setReminderon(true)
    setEditmode(true)
    setRemtext(rem.text)
    setRemid(rem.id)
  }
  function editModeReminder() {
    setReminderon(false)
    reminders.map(rem => {
      if(rem.id === remid) {
        rem.text = remtext
        rem.date = remdate.toString().split(' ').slice(1,4).join(' ')
      }
    })
    setUpdate(prev => prev+1)
    setNotifs(prevNotif => [...prevNotif, {icon:"far fa-check-circle",text:`Reminder: "${remtext}" has been saved.` }])
    activateNotif() 
  } 
  function closeRemOptions(rem) {
    rem.opts = false
    setUpdate(prev => prev-1)
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
  function foldNav() { 
    props.foldnav(true)
    setNavopen(true)
  }   
  function unfoldNav() {
    props.foldnav(false)
    setNavopen(false) 
  } 
 
  useEffect(() => {
    document.querySelector('.addremindercont input').onchange = (e) => {
      let enter = e.keyCode
      if(enter === 13) {
        e.preventDefault()
        document.querySelector('.addremindercont button').click()
      }
    }  
    

  },[]) 

  return ( 
    <nav>
      <div className="navhead">
        <div className="navtools">
          <i className="far fa-stream" onClick={() => account.settings.widelock?"":navopen?unfoldNav():foldNav()} title="Collapse side bars"></i>
          <i className="fas fa-ellipsis-h" title="More options"></i>
        </div>
        <div className="proficoncont">
          <i className="fas fa-user-alt proficon"></i>
          <i className="fas fa-angle-down"></i>
          <div className="profdropdown">
            <Link to="/settings"><h6><i class="far fa-user-circle"></i>My Account</h6></Link>
            <Link to="/settings/general"><h6><i class="far fa-sliders-h"></i>Settings</h6></Link>
            <h6 onClick={() => props.logout()}><i class="far fa-sign-out-alt"></i>Logout</h6>
          </div>
        </div>
      </div>
      <div className="innernav">
      <div className="navinfo">
        <div className="profcont" data-update={props.update}>
          <div className="imgcont">
            <img src={account.profimg?account.profimg:"https://i.imgur.com/bcCbeiE.jpg"} alt=""/>
          </div>
          <h5>{account.fname} {account.lname}</h5>
          <h6>{account.jobtitle}</h6> 
          <small style={{display: account.city?"block":"none"}}><i className="fad fa-map-marker-alt"></i> {account.city}, {account.country}</small>
        </div>
      </div> 

      <div className="navreminders" data-update={update} style={{display: account.settings.reminders?"block":"none"}}>
        <h4><span>Reminders</span><button onClick={() => setReminderon(true)}><i className="fal fa-plus"></i>Add</button></h4> 
        <div className="innernavreminders hidescroll">
          {recentreminders}
        </div>
      </div>
      <div className="navreminders" data-pin={props.pin} style={{display: account.settings.pinned?"block":"none"}}>
        <h4><span>Pinned Invoices</span></h4> 
        <div className="innernavreminders hidescroll">
          {pinnedinvoices}
        </div>
      </div>
      </div>

      <div className="addremindercont" style={{display: reminderon?"block":"none"}}>
        <div> 
          <h2>Add A Reminder</h2>
          <p>Reminders will remind you to send invoices on due dates, collect money from clients or write up your freelancer invoices.</p>
          <label>
            <form onSubmit={(e) => e.preventDefault()} ref={formRef}>
              <input placeholder="Write up invoice for Intellisense Inc." value={remtext} onChange={(e) => setRemtext(e.target.value)}/>
              <button onClick={() => editmode?editModeReminder():createReminder()}>{editmode?"Edit":"Add"}</button>
              <DatePicker className="reminderdateinp" showTimeSelect selected={remdate} onChange={date => setRemdate(date)} dateFormat="MMMM d,yyyy" />
            </form></label>
          <small className="closeaddremcont" onClick={() => setReminderon(false, setRemdate(new Date()))}><i className="fal fa-times"></i>Close</small>
        </div>
      </div> 

      <Calculator hidecalc={hidecalc} closecalc={() => setHidecalc(true)}/>

      <div className="quicktools">
        <i style={{color: hidecalc?"#aaa":"var(--color)"}} className="far fa-calculator" title="Calculator" onClick={() => setHidecalc(false)}></i>
        <i style={{color: hidetime?"#aaa":"var(--color)"}} className="far fa-clock" title="Clock" onClick={() => {setHidetime(false);setHidetoolslide(prev => !prev);setHidecalen(true)}}></i>
        <i style={{color: hidecalen?"#aaa":"var(--color)"}} className="far fa-calendar-alt" title="Calendar" onClick={() => {setHidecalen(false);setHidetoolslide(prev => !prev);setHidetime(true)}}></i>
      </div> 

      <div className="toolsslide" style={{display: hidetoolslide?"none":"flex"}}>
        <div style={{display: hidetime?"none":"block"}} className="mainclock">
          <DatePicker selected={new Date()} disabled dateFormat="h:mm aa" />
        </div>
        <div style={{display: hidecalen?"none":"block"}}>
          <DatePicker inline disabled selected={new Date()} />
        </div>
      </div>
 
    </nav>
  ) 
} 

export default Navbar
