import React, { useContext, useEffect, useState } from "react"
import { BrowserRouter as Router,Switch,Route,Link, useHistory, NavLink } from "react-router-dom"
import { Inputs, Switchs } from './Inputs'
import { StoreContext } from "./StoreContext"
import RangeSlider from './RangeSlider'
import Trash from "./Trash"

function SettingsGeneral(props) {

  const {account, setAccount} = useContext(StoreContext)

  const [goals, setGoals] = useState(account.goals)

  function saveGeneralInfo() {
    account.goals = goals
    props.updateaccount()
    props.shownotif("Your general settings have been successfully saved.")
  }
  function resetGeneralInfo() {
    props.shownotif("General settings have been reset to their default")
  }

  useEffect(() => {
    props.setdynamic(false,true,false,false)
  },[]) 
  
  return (
    <div className="settingsgeneral">
 
      <h5 className="settingstitle">Preferences<small>Manage general app preferences</small></h5>
      <Switchs title="Lock wide mode" onchange={(val) =>  {account.settings.widelock = val;props.updatemain()}} checked={account.settings.widelock}/>
      <Switchs title="Monthly progress bar" onchange={(val) => {account.settings.monthbar = val;props.updatemain()}} checked={account.settings.monthbar} />
      <Switchs title="Enable dark mode" onchange={(val) => {account.settings.darkmode = val;props.updatemain()}} checked={account.settings.darkmode} />
      <Switchs title="Track revenue" onchange={(val) => {account.settings.track_revenue = val;props.updatemain()}} checked={account.settings.track_revenue} />
      <Switchs title="Track client spendings" onchange={(val) => {account.settings.track_client_spending = val;props.updatemain()}} checked={account.settings.track_client_spending} />
      <Switchs title="Enable Reminders" onchange={(val) => {account.settings.reminders = val;props.updatemain()}} checked={account.settings.reminders} />
      <Switchs title="Enable Pinned Invoices" onchange={(val) => {account.settings.pinned = val;props.updatemain()}} checked={account.settings.pinned} />
      <Switchs title="Double click to open invoices" onchange={(val) => {account.settings.dblclick_invoices = val;props.updatemain()}} checked={account.settings.dblclick_invoices} />
      <Switchs title="Double click to open estimates" onchange={(val) => {account.settings.dblclick_estimates = val;props.updatemain()}} checked={account.settings.dblclick_estimates} />
      <Switchs title="Double click to open clients" onchange={(val) => {account.settings.dblclick_clients = val;props.updatemain()}} checked={account.settings.dblclick_clients} />

      <h5 className="settingstitle">Notifications<small>Manage app notifications</small></h5>
      <Switchs title="Enable email notifications" onchange={(val) => {account.settings.email_notifs = val;props.updatemain()}} checked={account.settings.email_notifs} />
      <Switchs title="Enable revenue notifications" onchange={(val) => {account.settings.revenue_notifs = val;props.updatemain()}} checked={account.settings.revenue_notifs} />

      <h5 className="settingstitle">Updates<small>Updates features on dashboard</small></h5>
      <Switchs title="Display updates" onchange={(val) => {account.settings.show_updates = val;props.updatemain()}} checked={account.settings.show_updates} />

      <h5 className="settingstitle">Goals<small>Goals help track your monthly revenue goals</small></h5>
      <Switchs title="Enable Goals" onchange={(val) => {account.settings.enable_goals = val;props.updatemain()}} checked={account.settings.enable_goals} />
      <div className="altsetcont">
        <small>Set Monthly Goal</small>
        <RangeSlider rangevalue={(val) => setGoals(val)} marks={false} default={account.goals} min={1000} max={100000}/>
      </div>

      <h5 className="settingstitle">Trash<small>Retrieve deleted invoices, estimates & clients</small></h5>
        <Link to="/settings/general/trash/"><button className="trashbtn">View Trash</button></Link>
      <div></div><div></div>

      <div className="btngroup">
        <button onClick={() => saveGeneralInfo()}>Save</button>
        <button onClick={() => resetGeneralInfo()}>Reset</button>
      </div>
      <Route path="/settings/general/trash/">
        <Trash />
      </Route>
    </div>   
  )
}

export default SettingsGeneral