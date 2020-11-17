import React, { useEffect, useState, useContext, useRef } from 'react'
import { BrowserRouter as Router,Switch,Route,Link, useHistory } from "react-router-dom"
import { StoreContext } from './StoreContext'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

function OneInvoice(props) {
 
  const {account, setNotifs} = useContext(StoreContext)

  const [itemname, setItemname] = useState('')
  const [itemprice, setItemprice] = useState()
  const [itemqty, setItemqty] = useState()
  const [itemdate, setItemdate] = useState()
  const [itempaid, setItempaid] = useState(false)
  const [itemarr, setItemarr] = useState([])
  const [enableadd1, setEnableadd1] = useState(false)
  const [enableadd2, setEnableadd2] = useState(false)
  const [enableadd3, setEnableadd3] = useState(false)
  const [invoicetotal, setInvoicetotal] = useState(props.oneinv.itemarr.reduce((a,b) => {return a+b.itemtotal},0))
  const [update, setUpdate] = useState(0)
  let inpRef = useRef()
 
  const itemrow = props.oneinv.itemarr.map(item => { 
    return <tr className="oneinvtablerowitem">
      <td><h5><input disabled={item.edit?false:true} value={item.itemname} onChange={(e) => {item.itemname = e.target.value;setUpdate(prev => prev+1)}}/></h5></td>
      <td><h5>{item.itemdate.toString().split(' ').slice(1,4).join(' ')}</h5></td>
      <td><h5><input disabled={item.edit?false:true} value={item.itemprice} onChange={(e) => {item.itemprice = e.target.value;setUpdate(prev => prev+1)}}/></h5></td>
      <td><h5><input disabled={item.edit?false:true} value={item.itemqty} onChange={(e) => {item.itemqty = e.target.value;setUpdate(prev => prev+1)}}/></h5></td>
      <td><h5>${thousSep(item.itemtotal)}</h5></td> 
      <td><h5><input disabled={item.edit?false:true} type="checkbox" checked={item.itempaid} onChange={(e) => {item.itempaid = e.target.checked;setUpdate(prev => prev+1)}}/></h5></td>
      <td><i className={item.edit?"far fa-check-square":"far fa-edit"} onClick={() => item.edit?confirmRow(item):editItemRow(item)}></i><i className="far fa-trash" onClick={() => deleteItemrow(item)}></i></td> 
    </tr>
  }) 
  
  function thousSep(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  } 
  function generatePdf(print) {
    document.querySelector('.appcontainer').style.cssText += 'grid-template-columns: 0 100% 0;'
    document.querySelector('.appcontainer .sidebar').style.opacity = '0'
    document.querySelectorAll('.noprint').forEach(el => el.style.display = 'none')
    setTimeout(() => { window.print()}, 100);
    setTimeout(() => {
      document.querySelector('.appcontainer').style.gridTemplateColumns = ''
      document.querySelector('.appcontainer .sidebar').style.opacity = '1' 
      document.querySelectorAll('.noprint').forEach(el => el.style.display = '')
    }, 500);
  } 
  function addItem() {
    if(enableadd1 && enableadd2 && enableadd3) {
      props.oneinv.itemarr.push({itemid:props.oneinv.itemarr.length, itemname:itemname, itemprice:parseFloat(itemprice), itemqty:itemqty, itemtotal:parseFloat(itemprice*itemqty), itempaid:itempaid, itemdate:itemdate, edit:false}) 
      setInvoicetotal(props.oneinv.itemarr.reduce((a,b) => {return a+b.itemtotal},0))
      setEnableadd1(false)
      setEnableadd2(false)
      setEnableadd3(false) 
      setItemname('')
      setItemprice('')
      setItemqty('')
      setItemdate('') 
      setUpdate(prev => prev+1)
      inpRef.current.focus()
    }  
    else {
      setNotifs(prevNotif => [...prevNotif, {icon:"far fa-exclamation-circle",text:`Enter an item name, price and quantity to add item.` }])
      activateNotif() 
    }
  } 
  function editItemRow(item) {
    item.edit = true
    setUpdate(prev => prev+1)
  }
  function confirmRow(item) {
    item.edit = false 
    item.itemtotal = parseFloat(item.itemprice*item.itemqty)
    setInvoicetotal(props.oneinv.itemarr.reduce((a,b) => {return a+b.itemtotal},0))
    setUpdate(prev => prev+1)
  }
  function deleteItemrow(item) {
    props.oneinv.itemarr.map(el => {
      if(el.itemid===item.itemid) {
        let itemindex = props.oneinv.itemarr.indexOf(item)
        props.oneinv.itemarr.splice(itemindex,1)
      } 
    }) 
    setInvoicetotal(props.oneinv.itemarr.reduce((a,b) => {return a+b.itemtotal},0))
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

  useEffect(() => {
    props.oneinv.total = invoicetotal + (invoicetotal*props.oneinv.tax)
  },[props.oneinv,invoicetotal])

  return (
    <div className="oneinvoicepage">
      <div className="oneinvflex">
        <div>
          <h1>Invoice</h1>
          <div className="invheaderinfo">
            <h4>{account.company} - {account.fname} {account.lname}</h4>
            <h6>Invoice #00{props.oneinv.number}</h6>
            <h6>{props.oneinv.invdate.toString().split(' ').slice(1,4).join(' ')}</h6>
            <h6>{account.address}</h6>
            <h6>{account.city} ({account.provstate}),&emsp;{account.postal}</h6>
            <h6>{account.country}</h6>
          </div>
        </div>
        <div style={{display: account.settings.show_logo?"block":"none"}}>
          <div className="invoicepiccont">
            <img src={account.companylogo?account.companylogo:"https://i.imgur.com/jpDLNPA.png"} alt="" />
          </div> 
          <Link to="/settings"><small className="editinvoicepiccont noprint">Edit</small></Link>
        </div>
      </div>
      <div className="spacer"></div>
      <div className="oneinvflex">
        <div className="invoicetodiv">
          <h3>Invoice to: </h3>
          <h2>{props.oneinv.client.name}</h2>
          <div className="clientinfodiv">
            <h6>{props.oneinv.client.address}</h6>
            <h6 style={{display: props.oneinv.client.city?"block":"none"}}>{props.oneinv.client.city} ({props.oneinv.client.provstate}),&emsp;{props.oneinv.client.postal}</h6>
            <h6>{props.oneinv.client.phone}</h6>
            <h6>{props.oneinv.client.email}</h6>
            <h6>{props.oneinv.client.country}</h6>
          </div>
        </div>
        <div className="clientinfodiv"> 
          <h5>Invoice Information</h5>
          <h6>{account.taxrate.custom1.name} <span>{account.taxrate.custom1.name}</span></h6>
          <h6>{account.taxrate.custom2.name} <span>{account.taxrate.custom2.name}</span></h6>
          <h6>Currency: <span>{props.oneinv.currency}</span></h6>
          <h6>Invoice Due: <span>{props.oneinv.invdate.toString().split(' ').slice(1,4).join(' ')}</span></h6>
        </div>
      </div>
      
      <table>
        <thead>
          <tr>
            <th><h6>Item</h6></th>
            <th><h6>Date</h6></th>
            <th><h6>Price</h6></th>
            <th><h6>Qty</h6></th>
            <th><h6>Total</h6></th>
            <th><h6>Paid</h6></th>
            <th><h6></h6></th>
          </tr>
        </thead>
        <tbody>
          {itemrow}
          <tr className="templateitemrow noprint">
            <td><input ref={inpRef} placeholder="Enter name..." value={itemname} onChange={(e) => setItemname(e.target.value, e.target.value?setEnableadd1(true):setEnableadd1(false))} /></td>
            <td><DatePicker placeholderText="Add a date" selected={itemdate} onChange={date => setItemdate(date)} dateFormat="MMMM d,yyyy" /></td>
            <td><input placeholder="Enter price" className="mediuminp" type="number" value={itemprice} onChange={(e) => setItemprice(e.target.value, e.target.value?setEnableadd2(true):setEnableadd2(false))} /></td>
            <td><input placeholder="Add qty" className="smallinp" type="number" value={itemqty} onChange={(e) => setItemqty(e.target.value, e.target.value?setEnableadd3(true):setEnableadd3(false))} /></td>
            <td><span className="smallinp"></span></td>
            <td><input type="checkbox" checked={itempaid} onChange={(e) => setItempaid(e.target.checked)}/></td>
            <td><span className="smallinp"></span></td> 
          </tr>
          <button className="noprint" onClick={() => addItem()}>Add Item</button>
        </tbody>
      </table>

      <div className="extraitemscont">

      </div>

      <div className="totalsflex">
        <div className="oneinvflex">
          <div>  
            <h4>Notes</h4>
            <textarea placeholder="Add a note here..."/>
          </div> 
          <div className="oneinvoicetotals"> 
            <h5>Subtotal <span>${thousSep(invoicetotal.toFixed(2))}</span></h5>
            <h5>{account.taxrate.custom1.name} <small>({(account.taxrate.custom1.rate*100).toFixed(2)}%)</small> <span>${thousSep(((account.taxrate.custom1.rate*invoicetotal)).toFixed(2))}</span></h5>
            <h5>{account.taxrate.custom2.name} <small>({(account.taxrate.custom2.rate*100).toFixed(2)}%)</small> <span>${thousSep(((account.taxrate.custom2.rate*invoicetotal)).toFixed(2))}</span></h5>
            <h5>Discount <span>-${props.oneinv.discount>0?props.oneinv.discount:0}</span></h5>
            <hr/> 
            <h5 className="bigtotal">Total <span>${thousSep(((props.oneinv.tax*invoicetotal)+(invoicetotal)).toFixed(2))}</span></h5>
          </div>
        </div>  
      </div>
      <div className="spacer"></div>
      <div className="oneinvactions noprint">
        <button>Send To Client<i class="fal fa-paper-plane"></i></button>
        <button>Download Invoice<i class="fal fa-save"></i></button>
        <button onClick={() => generatePdf('')}>Print Invoice<i class="fal fa-print"></i></button>
      </div>

      <div className="spacer"></div>
    </div>
  ) 
}

export default OneInvoice