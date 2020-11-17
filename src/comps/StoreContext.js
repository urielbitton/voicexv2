import React, {createContext, useState} from 'react'

export const StoreContext = createContext()

const StoreContextProvider = (props) => {

  const [invoices, setInvoices] = useState([
   
  ])
  const [estimates, setEstimates] = useState([

  ])
  const [clients, setClients] = useState([
     
  ])
  const [revenues, setRevenues] = useState(
    {
      total: 0,
    }
  )
  const [reminders, setReminders] = useState([
    
  ])
  const [general, setGeneral] = useState([

  ])
  const [pinned, setPinned] = useState([

  ])
  const [notifs, setNotifs] = useState([
    
  ])
  const [trash, setTrash] = useState([
    [],[],[]
  ])
  const [account, setAccount] = useState({
    id: null,
    profimg: "",
    fname: "",
    lname: "",
    email: "",
    phone: "",
    address: "",
    postal: "",
    city: "",
    provstate: "",
    country: "",
    company: "",
    website: "", 
    regnumber: null,
    taxrate: {
      taxes: true,
      custom1: {
        rate: 0.09970,
        name: "",
        num: null,
      },
      custom2: {
        rate: 0.05,
        name: "",
        num: null,
      },
    },
    currency: "CAD",
    jobtitle: "",
    goals: 10000,
    companylogo: "",
    settings: {
      widelock: false,
      monthbar: true,
      darkmode: false,
      track_revenue: true,
      track_client_spending: true,
      reminders: true,
      pinned: true,
      dblclick_invoices: true,
      dblclick_estimates: true,
      dblclick_clients: true,
      email_notifs: true,
      revenue_notifs: true,
      show_updates: true,
      enable_goals: true,
      show_address_inv: true,
      show_phone_inv: true,
      show_logo: true,
      enable_taxes: true,
      main_theme: "Purple",
      btn_theme: "Purple",
      round_corners: true,
    } 
  })
 


  return (
    <StoreContext.Provider value={{invoices, setInvoices, estimates, setEstimates, clients, revenues, setRevenues, setClients, reminders, setReminders, general, setGeneral, pinned, setPinned, notifs, setNotifs, account, setAccount, trash,setTrash}}>
      {props.children}
    </StoreContext.Provider>
  )

}

export default StoreContextProvider