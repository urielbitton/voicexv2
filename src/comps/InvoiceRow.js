import React, { useContext, useState } from 'react'
import { BrowserRouter as Router,Switch,Route,Link, useHistory } from "react-router-dom"
import { StoreContext } from './StoreContext'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

function InvoiceRow(props) {

  const {invoices, notifs, clients, setNotifs, pinned, setPinned, account, trash} = useContext(StoreContext)

  const [openslide, setOpenSlide] = useState(false)
  const [showcheck, setShowcheck] = useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [number, setNumber] = useState(0)
  const [filenum, setFilenum] = useState(0)
  const [id, setId] = useState(0)
  const [name, setName] = useState('')
  const [service, setService] = useState('')
  const [paid, setPaid] = useState('')
  const [balance, setBalance] = useState('')
  const [total, setTotal] = useState('')
  const [invdate, setInvdate] = useState('') 
  const [status, setStatus] = useState('')
  const [update, setUpdate] = useState(0)
  const [addcont, setAddcont] = useState(false)
  const [currentid, setCurrentid] = useState()
  const history = useHistory()

  const invoicerow = invoices.slice(0,props.numshow).map(inv => { 
    return <div className="flexrowcont" key={inv.id}>
        <i class="far fa-map-pin pinicon" style={{color: inv.pinned?"var(--color)":"#aaa"}} onClick={() => inv.pinned?unpinInvoice(inv):pinInvoice(inv)}></i>
        <div className="flexrowpad" onDoubleClick={() => dblClickInvoice(inv)}> 
        <div className="flexrowhead"> 
          <h5>Invoice Number</h5><h5>Invoice Name</h5><h5>Amount</h5><h5 className="datetitle">Date</h5><h5>Status</h5><h5>Details</h5><h5>Actions</h5>
        </div> 
        <div className="flexrow"> 
          <div>#00{inv.number}</div><div>{inv.name}</div><div>${thousSep(inv.total)}</div><div className="datepicker"><DatePicker disabled selected={inv.invdate}onChange={date=> setStartDate(date)}dateFormat="MMMM d,yyyy"/></div><div><h6 className="invstatuscolor"><div></div><span>{inv.status}</span></h6></div><div><button className="infoopts" onClick={() => openInfoOpts(inv)}>Details<i className="far fa-angle-up" style={{transform: inv.open?"rotate(180deg)":"rotate(0)"}}></i></button></div><div className="optsrow"><i class="far fa-edit" onClick={() => editInvoice(inv)}></i><i class="far fa-trash moreopts" onClick={() => deleteInvoice(inv)}></i><input type="checkbox"/></div>
        </div>
        </div>
        <div className="flexrowinfo" style={{height: inv.open?"200px":"0", opacity: inv.open?"1":"0", padding: inv.open?"20px":"0 20px"}}>
          <div><h5>Invoice Items</h5><ul className="flexinfoitems hidescroll">{inv.itemarr.map(el => <li><span>{el.itemname}</span> <span>${thousSep(el.itemtotal)}</span></li>)}</ul></div>
          <div><h5>Client Info</h5><h6>{inv.client.name}</h6><h6>{inv.client.email}</h6><h6>{inv.client.company}</h6><button className="invaddclientbtn" onClick={() => {setCurrentid(inv.id);setAddcont(true)}}>{inv.client.name?"Change":"Add Client"}</button></div>
          <div className="infoinvdetails"> <div> <h5>File Number</h5> <h6>{inv.filenum}</h6> <h5>Invoice ID</h5> <h6>INV#{inv.id}</h6> </div><div> <h5>Amount Paid</h5> <h6>${parseFloat(inv.paid).toFixed(2)}</h6><h5>Balance</h5> <h6>${parseFloat(inv.balance).toFixed(2)}</h6> </div></div>
          <div className="invtotalinfodiv"><h5>Invoice Total</h5><h3>${thousSep(parseFloat(inv.total).toFixed(2))}</h3><Link to="/invoice"><button onClick={() => {sendOneInvoice(inv);inv.open=false}}>More Details</button></Link></div>
        </div>
      </div>   
  })  
 
  const clientrow = clients.map(cli => {
    return <div className="clientrow">
      <h6>{cli.name}</h6>
      <h6>{cli.email}</h6>
      <h6>{cli.phone}</h6>
      <h6>{cli.address}</h6>
      <h6>{cli.city}, {cli.provstate}</h6>
      <button onClick={() => linkToInvoice(cli, setAddcont(false))}>Add</button> 
    </div>
  }) 
  function dblClickInvoice(inv) {
    if(account.settings.dblclick_invoices) {
      history.push('/invoice')
      sendOneInvoice(inv)
      inv.open = false
    }
  }
  function openInfoOpts(inv) {
    inv.open = !inv.open
    setUpdate(prev => prev+1)
  }
  function pinInvoice(inv) {
    inv.pinned = true
    setNotifs(prevNotif => [...prevNotif, {icon:"far fa-check-circle",text:`Invoice #${inv.number} has been pinned to sidebar.` }])
    activateNotif()
    let stringdate = inv.invdate.toString().split(' ').slice(1,4).join(" ")
    setPinned(prevPin => [...prevPin, {id:inv.id, name:inv.name, number:inv.number, date:stringdate}])
    setUpdate(prev => prev+1)
    props.updatepinned() 
  }
  function unpinInvoice(inv) {
    inv.pinned = false
    setNotifs(prevNotif => [...prevNotif, {icon:"far fa-check-circle",text:`Invoice #${inv.number} has been unpinned from sidebar.`}])
    pinned.map(el => {
      if(el.id === inv.id) {
          let pinindex = pinned.indexOf(el)
          pinned.splice(pinindex, 1)
      }
    })
    activateNotif()
    setUpdate(prev => prev+1)
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
  function sendOneInvoice(inv) {
    props.sendoneinvoice(inv)
  }
  function thousSep(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  function editInvoice(inv) {
    setId(inv.id)
    setNumber(inv.number)
    setName(inv.name)
    setService(inv.service)
    setPaid(inv.paid)
    setBalance(inv.balance)
    setTotal(inv.total)
    setInvdate(inv.invdate)
    setStatus(inv.status)
    setOpenSlide(true)
  }
  function deleteInvoice(invoice) {
    trash[0].push(invoice)
    invoices.map(inv => { 
      if(inv.id === invoice.id) {
        let cliindex = invoices.indexOf(inv)
        invoices.splice(cliindex,1)
        setUpdate(prev => prev+1)
      }
    }) 
  } 
  function saveInvoice(invid) {
    invoices.map(inv => {
      if(invid === inv.id) {
        inv.number = number
        inv.name = name
        inv.service = service
        inv.paid = paid
        inv.balance = balance
        inv.total = total
        inv.invdate = invdate
        inv.status = status
      }
    })
    pinned.map(pin => {
      if(invid === pin.id) { 
        pin.number = number
        pin.name = name
        let stringdate = invdate.toString().split(' ').slice(1,4).join(" ") 
        pin.date = stringdate 
      }
    }) 
    props.updatepinned()
    setUpdate(prev => prev+1)
  }
  function closeEditInvoice() {
    setOpenSlide(false)
  }
  function linkToInvoice(cli) {
    cli.invoicelinked = !cli.invoicelinked
    if(cli.invoicelinked) {
      invoices.map(inv => {
        if(inv.id === currentid) {
          inv.client = cli
          cli.invoice.push(inv)
        }
      })
    } 
    setUpdate(prev => prev+1)
  } 
 
  return (
    <>
      <div data-update={update}>
        {invoicerow}
      </div>
      <div className="editslidercont" style={{right: openslide?"0":"-550px"}}>
        <i className="fal fa-times" onClick={() => closeEditInvoice()}></i>
        <h2>Quick Edit</h2>
        <form>
          <label><h6>Invoice Number</h6><input value={number} className="invoicenuminp" type="number" onChange={(e) => setNumber(e.target.value)}/></label>
          <label><h6>Invoice Name</h6><input value={name} onChange={(e) => setName(e.target.value)}/></label>
          <label><h6>Service Provided</h6><input value={service} onChange={(e) => setService(e.target.value)}/></label>
          <label><h6>Date Billed</h6><DatePicker selected={invdate} onChange={date => setInvdate(date)} dateFormat="MMMM d,yyyy" /></label>
          <label><h6>Status</h6><select value={status} onChange={(e) => setStatus(e.target.value)}><option value="">Choose a Value</option><option value="Paid">Paid</option><option value="In Process">In Process</option><option value="Not Paid">Not Paid</option></select></label>
        </form>
        <button onClick={() => {saveInvoice(id);setShowcheck(true); setTimeout(() => {setOpenSlide(false);setShowcheck(false)},500)}}>Save Invoice<i className="far fa-check" style={{display: showcheck?"inline":"none"}}></i></button>
      </div>
      <div className="invaddclientcont" style={{display: addcont?"flex":"none"}}>
        <i className="fal fa-times" onClick={() => setAddcont(false)}></i>
        <div className="invaddclient">
          <h3>Add Client To Invoice</h3>
          <p style={{display: clients.length?"none":"block"}}>You have no clients yet. Add one to get started<br/><Link to="/addclient"><button>Add Clients</button></Link></p>
          <div className="clientrowcont">
            {clientrow}
          </div>
        </div>
      </div>
    </> 
  )
}

export default InvoiceRow