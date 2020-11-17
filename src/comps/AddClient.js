import React, {useState, useEffect, useRef, useContext} from 'react'
import { BrowserRouter as Router,Switch,Route,Link, useHistory } from "react-router-dom"
import { StoreContext } from './StoreContext'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

function AddClient() { 
 
  const {invoices, notifs, setNotifs, clients, setClients} = useContext(StoreContext)

  const [id, setId] = useState(clients.length)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [postal, setPostal] = useState('')
  const [city, setCity] = useState('')
  const [provstate, setProvstate] = useState('')
  const [country, setCountry] = useState('')
  const [dateadded, setDateadded] = useState(new Date())
  const [invoicesnum, setInvoicesnum] = useState(0)
  const [paid, setPaid] = useState(0)
  const [totalbilled, setTotalbilled] = useState(0)
  const [items, setItems] = useState(0)
  const [company, setCompany] = useState('')
  const [open, setOpen] = useState(false)
  const [highestbill, setHighestbill] = useState(0)
  const [invoicelinked, setInvoicelinked] = useState(false)
  const [category, setCategory] = useState('None')
  const [favorite, setFavorite] = useState(false)
  const [filenum, setFilenum] = useState('')
  const [notes, setNotes] = useState('')
  const [rating, setRating] = useState(1)
  const [invoice, setInvoice] = useState([])
  const [estimate, setEstimate] = useState([])
  const history = useHistory()  
 
  function createClient() {
    if(document.querySelector('.clientnameinp').value.length) {
      setClients(prevCli => [...prevCli,{id: name.split(' ')[0].toLowerCase()+Math.floor(Math.random()* 9999 + 1),filenum:filenum, name:name, invoice:invoice,estimate:estimate, email:email, phone:phone, address:address, postal:postal, city:city, provstate:provstate, country:country, dateadded:dateadded, invoicesnum:invoicesnum, paid:paid, totalbilled:totalbilled, items:items, company:company, open:open, highestbill:highestbill, invoicelinked:invoicelinked, category:category, favorite:favorite, notes:notes, rating:rating }])
      setNotifs(prevNotif => [...prevNotif, {icon:"far fa-check-circle",text:`Client ${name} has been successfully added.`}])
      activateNotif()
      history.push('/clients')
    } 
    else {
      setNotifs(prevNotif => [...prevNotif, {icon:"far fa-exclamation-circle",text:"Client name cannot be empty. Please fill in the client's name and try again."}])
      activateNotif()
    }  
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
  function thousSep(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  } 
  function addFavorites() {
    setFavorite(prev => prev=!favorite)
  }
    
  return (
    <div className="addinvoicepage">
      <div className="pageheaders">
        <div> 
          <h2>New Client</h2>
        </div>  
      </div> 
    <div className="addinvoicecont"> 
      <form>
        <label><h6><i className="far fa-user-alt"></i>Name</h6><input value={name} className="clientnameinp" onChange={(e) => setName(e.target.value)}/></label>
        <label><h6><i className="far fa-envelope"></i>Email</h6><input value={email} onChange={(e) => setEmail(e.target.value)}/></label>
        <label><h6><i className="far fa-mobile-android"></i>Phone</h6><input value={phone} onChange={(e) => setPhone(e.target.value)}/></label>
        <label><h6><i className="fal fa-address-book"></i>Address</h6><input value={address} onChange={(e) => setAddress(e.target.value)}/></label>
        <label><h6><i className="far fa-mailbox"></i>Postal Code</h6><input value={postal} onChange={(e) => setPostal(e.target.value)}/></label>
        <label><h6><i className="far fa-city"></i>City</h6><input value={city} onChange={(e) => setCity(e.target.value)}/></label>
        <label><h6><i className="far fa-flag"></i>Province/State</h6><input value={provstate} onChange={(e) => setProvstate(e.target.value)}/></label>
        <label><h6><i className="far fa-globe-asia"></i>Country</h6><input value={country} onChange={(e) => setCountry(e.target.value)}/></label>
        <label><h6><i className="fas fa-building"></i>Company Name</h6><input value={company} onChange={(e) => setCompany(e.target.value)}/></label>
        <label><h6><i className="far fa-file"></i>File Number</h6><input value={filenum} onChange={(e) => setFilenum(e.target.value)}/></label>
      </form>
      <div className="spacer"></div>

      <div className="invtotalcont">
        <div>
          <label>
            <h6 className="tabletitle">Favorites</h6>
            <button className="addfavbtn" onClick={() => addFavorites()}>{favorite?<>Added<i class="far fa-check"></i></>:"Add To Favorites"}</button>
          </label> 
        </div>
        <div className="totalsdiv">
          <h5>Date Added: <span>{dateadded.toString().split(' ').slice(1,4).join(' ')}</span></h5>
          <h5>Invoices <span>{invoicesnum}</span></h5>
          <h5>Items <span>{items}</span></h5>
          <h5>Total Billed <span>{totalbilled}</span></h5>
        </div> 
      </div>
      <div className="spacer"></div>
      <div className="addclientnotescont">
        <h6 className="tabletitle">Notes</h6>
        <textarea placeholder="Add notes here..." onChange={(e) => setNotes(e.target.value)}/>
      </div>
      <div className="spacer"></div>
      <button className="maincreateinv" onClick={() => createClient()}>Create Client</button>
      <div className="spacer"></div>
    </div>
    
    </div>
  )
}

export default AddClient
