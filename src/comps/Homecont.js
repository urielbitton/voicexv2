import React, { useState } from 'react'
import { BrowserRouter as Router,Switch,Route,Link, useHistory } from "react-router-dom"
import Estimates from './Estimates'
import Home from './Home'
import Invoices from './Invoices'
import Clients from './Clients'
import Stats from './Stats'
import Settings from './Settings'
import Navbar from './Navbar'
import AddInvoice from './AddInvoice'
import AddEstimate from './AddEstimate'
import AddClient from './AddClient'
import Notifs from './Notifs'
import OneInvoice from './OneInvoice'
import OneClient from './OneClient'
import OneEstimate from './OneEstimate'

function Homecont(props) {

  const [oneinv, setOneinv] = useState()
  const [onecli, setOnecli] = useState()
  const [oneest, setOneest] = useState()

  function sendOneInvoice(inv) {
    setOneinv(inv)
  }
  function sendOneEstimate(est) {
    setOneest(est)
  }
  function sendOneClient(cli) {
    setOnecli(cli)
  }

  return (
    <div className="homecont">
      <div className="innerhomecont">
        <Switch>
          <Route exact path="/">
            <Home updatepinned={props.updatepinned} sendoneinvoice={sendOneInvoice} />
          </Route>
          <Route path="/invoices">
            <Invoices updatepinned={props.updatepinned} sendoneinvoice={sendOneInvoice} />
          </Route>
          <Route path="/estimates">
            <Estimates sendoneestimate={sendOneEstimate}/>  
          </Route>
          <Route path="/clients">
            <Clients sendoneclient={sendOneClient} />
          </Route>
          <Route path="/stats">
            <Stats /> 
          </Route>
          <Route path="/settings">
            <Settings updateaccount={props.updateaccount} updatemain={props.updatemain} />
          </Route>
          <Route path="/addinvoice">
            <AddInvoice />
          </Route>
          <Route path="/invoice">
            <OneInvoice oneinv={oneinv} />
          </Route>
          <Route path="/addclient">
            <AddClient />
          </Route>
          <Route path="/addestimate">
            <AddEstimate />
          </Route>
          <Route path="/client">
            <OneClient onecli={onecli} />
          </Route>
          <Route path="/estimate">
            <OneEstimate oneest={oneest} />
          </Route> 
        </Switch> 
      </div> 
      <Notifs />
    </div>
  )
}

export default Homecont