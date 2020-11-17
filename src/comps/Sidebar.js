import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router,Switch,Route,Link, useHistory, NavLink } from "react-router-dom"

function Sidebar() {

  const [active, setActive] = useState(0)

  return (
    <div className="sidebar">
      <h3 className="logocont"><div className="logo"></div><span>voicex</span></h3>
      <div className="innersidebar"> 
        <div className="sidemenu">
          <NavLink exact to="/" activeStyle={{color: "var(--color)"}}><h6><i className="fad fa-th-large"></i><span>Home</span></h6></NavLink>
          <NavLink to="/invoices" activeStyle={{color: "var(--color)"}}><h6><i className="fad fa-file-invoice-dollar"></i><span>Invoices</span></h6></NavLink>
          <NavLink to="/estimates" activeStyle={{color: "var(--color)"}}><h6><i className="fad fa-file-alt"></i><span>Estimates</span></h6></NavLink>
          <NavLink to="/clients" activeStyle={{color: "var(--color)"}}><h6><i className="fas fa-user-friends"></i><span>Clients</span></h6></NavLink>
          <NavLink to="/stats" activeStyle={{color: "var(--color)"}}><h6><i className="fad fa-chart-bar"></i><span>Stats</span></h6></NavLink>
          <NavLink to="/settings" activeStyle={{color: "var(--color)"}}><h6><i className="fal fa-sliders-v"></i><span>Settings</span></h6></NavLink>
        </div>
        <hr/>
      </div>

      <Link to="/addinvoice"><button className="sidecreateinv"><i className="fal fa-plus"></i><span>Create Invoice</span></button></Link>

    </div>
  )
}

export default Sidebar