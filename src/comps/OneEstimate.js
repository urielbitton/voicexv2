import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router,Switch,Route,Link, useHistory } from "react-router-dom"
import { StoreContext } from './StoreContext'

function OneInvoice(props) {

  const {account} = useContext(StoreContext)
 
  const itemrow = props.oneest.itemarr.map(item => {
    return <tr>
      <td><h5>{item.itemname}</h5></td>
      <td><h5>{item.itemdate.toString().split(' ').slice(1,4).join(' ')}</h5></td>
      <td><h5>${item.itemprice}</h5></td>
      <td><h5>{item.itemqty}</h5></td>
      <td><h5><input type="checkbox" checked={item.itempaid}/></h5></td>
      <td><h5>${item.itemtotal}</h5></td> 
      <td><i className="far fa-edit"></i><i className="far fa-trash"></i></td> 
    </tr>
  }) 

  function thousSep(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  } 
  function generatePdf(print) {
    document.querySelector('.appcontainer').style.cssText += 'grid-template-columns: 0 100% 0;'
    document.querySelector('.appcontainer .sidebar').style.opacity = '0'
    document.querySelector('.oneinvactions').style.display = 'none'
    window.print()
    setTimeout(() => {
      document.querySelector('.appcontainer').style.gridTemplateColumns = ''
      document.querySelector('.appcontainer .sidebar').style.opacity = '1' 
      document.querySelector('.oneinvactions').style.display = ''
    }, 500);
  } 
  

  return (
    <div className="oneinvoicepage">
      <div className="oneinvflex">
        <div>
          <h1>Estimate</h1>
          <div className="invheaderinfo">
            <h6>Estimate No: <span>#00{props.oneest.number}</span></h6>
            <h6>Estimate Date: <span>{props.oneest.estdate.toString().split(' ').slice(1,4).join(' ')}</span></h6>
            <h6>Company: <span>{account.company}</span></h6>
            <h6>Address: <span>{account.address}</span></h6>
            <h6>City: <span>{account.city}, {account.provstate}</span></h6>
            <h6>Country: <span>{account.country}</span></h6>
          </div>
        </div>
        <div style={{display: account.settings.show_logo?"block":"none"}}>
          <div className="invoicepiccont">
            <img src={account.companylogo?account.companylogo:"https://i.imgur.com/jpDLNPA.png"} alt="" />
          </div> 
          <Link to="/settings"><small className="editinvoicepiccont">Edit</small></Link>
        </div>
      </div>
      <div className="spacer"></div>
      <div className="oneinvflex">
        <div className="invoicetodiv">
          <h3>Estimate to: </h3>
          <h2>{props.oneest.client.name}</h2>
          <div className="clientinfodiv">
            <h6>Address: <span>{props.oneest.client.address}</span></h6>
            <h6>City: <span>{props.oneest.client.city}, {props.oneest.provstate}</span></h6>
            <h6>Country: <span>{props.oneest.client.country}</span></h6>
            <h6>Phone: <span>{props.oneest.client.phone}</span></h6>
            <h6>Email: <span>{props.oneest.client.email}</span></h6>
          </div>
        </div>
        <div className="clientinfodiv"> 
          <h5>Estimate Information</h5>
          <h6>Tax Rate: <span>{(props.oneest.tax*100).toFixed(0)}%</span></h6>
          <h6>Currency: <span>{props.oneest.currency}</span></h6>
        </div>
      </div>
      
      <table>
        <thead>
          <tr>
            <th><h6>Item</h6></th>
            <th><h6>Date</h6></th>
            <th><h6>Price</h6></th>
            <th><h6>Qty</h6></th>
            <th><h6>Paid</h6></th>
            <th><h6>Total</h6></th>
            <th><h6></h6></th>
          </tr>
        </thead>
        <tbody>
          {itemrow}
        </tbody>
      </table>

      <div className="totalsflex">
        <div className="oneinvflex">
          <div> 
            <h4>Notes</h4>
            <textarea placeholder="Add a note here..."/>
          </div> 
          <div className="oneinvoicetotals"> 
            <h5>Subtotal <span>${thousSep(props.oneest.subtotal.toFixed(2))}</span></h5>
            <h5>Tax <small>({props.oneest.tax*100}%)</small> <span>${thousSep(((props.oneest.tax*props.oneest.subtotal)).toFixed(2))}</span></h5>
            <h5>Discount <span>-${props.oneest.discount>0?props.oneest.discount:0}</span></h5>
            <hr/> 
            <h5 className="bigtotal">Total <span>${thousSep(props.oneest.total.toFixed(2))}</span></h5>
          </div>
        </div>  
      </div>
      <div className="spacer"></div>
      <div className="oneinvactions">
        <button>Send To Client<i class="fal fa-paper-plane"></i></button>
        <button>Download Estimate<i class="fal fa-save"></i></button>
        <button onClick={() => generatePdf('')}>Print Estimate<i class="fal fa-print"></i></button>
      </div>

      <div className="spacer"></div>
    </div>
  ) 
}

export default OneInvoice