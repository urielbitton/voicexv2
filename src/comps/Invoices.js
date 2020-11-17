import React, { useContext, useState, useRef, useEffect } from 'react'
import { BrowserRouter as Router,Switch,Route,Link, useHistory } from "react-router-dom"
import { Helmet } from 'react-helmet'
import { StoreContext } from './StoreContext'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import InvoiceRow from './InvoiceRow'

function Invoices(props) {

  const {invoices, setInvoices, notifs, setNotifs, pinned, setPinned} = useContext(StoreContext)

  const [update, setUpdate] = useState(0)
  const [keyword, setKeyword] = useState('')
  const pattern = new RegExp('\\b' + keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
  let invoicepaidnum = 0, invoiceunpaidnum = 0 
 
  
  const invoicetotal = invoices.map(el => el.total) 
  const invoicepaid = invoices.map(el => el.paid)
  const invoicebalance = invoices.map(el => el.balance)
  invoices.map(el => {
    if(el.status==="Paid")
      return invoicepaidnum++ 
  }) 
  invoices.map(el => {
    if(el.status==="Not Paid" || el.status==="In Process")
      return invoiceunpaidnum++
  })
 
  return (
    <div className="invoicespage">
      <div className="pageheaders">
        <div> 
          <h2>Invoices</h2>
          <Link to="/addinvoice"><button className="addinvoicebtn"><i className="fal fa-plus"></i>New Invoice</button></Link>
          <button><i className="fal fa-plus"></i>Import</button>
        </div>
        <label><input placeholder="Find invoices" onChange={(e) => setKeyword(e.target.value)}/><div><i className="far fa-search"></i></div></label>
      </div> 

      <div className="invoicestablecont estimatestablecont" data-update={update}>
        <div className="flextable">
          <div> 
            <InvoiceRow sendoneinvoice={props.sendoneinvoice} updatepinned={props.updatepinned} numshow={Infinity} searchkey={pattern}/>
          </div> 
          <div>
            <div className="footerinfo" colSpan="9" style={{display: invoices.length?"block":"none"}}>
              <small>Invoices: <span>{invoices.length}</span></small>
              <small>Total Billed: <span>${invoicetotal.reduce((a,b) => a+b,0)}</span></small>
              <small>Total Paid: <span>${invoicepaid.reduce((a,b) => a+b,0)}</span></small>
              <small>Total Owed: <span>${invoicebalance.reduce((a,b) => a+b,0)}</span></small>
              <small>Paid Invoices: <span>{invoicepaidnum}</span></small>
              <small>Unpaid Invoices: <span>{invoiceunpaidnum}</span></small>
            </div>
            <div style={{display: invoices.length?"none":"block"}} className="emptymsg">
              <h5>Add an invoice to get started.</h5>
            </div>
          </div>
        </div>
      </div>

      
      <Helmet><title>Voicex - Invoices</title></Helmet>
    </div>
  )
}

export default Invoices