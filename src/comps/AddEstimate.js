import React, {useState, useEffect, useRef, useContext} from 'react'
import { BrowserRouter as Router,Switch,Route,Link, useHistory } from "react-router-dom"
import { StoreContext } from './StoreContext'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import RangeSlider from './RangeSlider'

function AddEstimate() { 

  const {estimates, notifs, setNotifs, setEstimates, clients, account, revenues} = useContext(StoreContext)

  const [client, setClient] = useState({})
  const [number, setNumber] = useState('000'+(estimates.length+1))
  const [name, setName] = useState('')
  const [service, setService] = useState('')
  const [currency, setCurrency] = useState(account.currency)
  const [estdate, setEstdate] = useState(new Date()) 
  const [itemname, setItemname] = useState('')
  const [itemprice, setItemprice] = useState()
  const [itemqty, setItemqty] = useState()
  const [itemdate, setItemdate] = useState()
  const [itempaid, setItempaid] = useState(false)
  const [update, setUpdate] = useState(0)
  const [itemarr, setItemarr] = useState([])
  const [enableadd1, setEnableadd1] = useState(false)
  const [enableadd2, setEnableadd2] = useState(false)
  const [enableadd3, setEnableadd3] = useState(false)
  const [estimatetotal, setEstimatetotal] = useState(0)
  const [estimatetax, setEstimatetax] = useState(account.taxrate.custom1.rate+account.taxrate.custom2.rate)
  const [discountinp, setDiscountinp] = useState(0)
  const [estimatediscount, setEstimatediscount] = useState(0)
  const formRef = useRef()
  const inpRef = useRef()
  const estNumRef = useRef()
  const history = useHistory() 
  let subtotal = parseFloat(itemarr.reduce((prev, cur) => {return prev + cur.itemtotal}, 0))
  let undef
  
  const itemrow = itemarr.map(item => {  
    return <tr className="generateditems">
    <td><input disabled={item.edit?false:true} placeholder={item.itemname} onChange={(e) => item.itemname=e.target.value} /></td>
    <td><DatePicker disabled={item.edit?false:true} placeholderText="Item date" selected={item.itemdate} onChange={date => {item.itemdate=date;setUpdate(prev=>prev+1)}} dateFormat="MMMM d,yyyy" /></td>
    <td><input disabled={item.edit?false:true} placeholder={item.itemprice} className="mediuminp" type="number" onChange={(e) => item.itemprice=e.target.value} /></td>
    <td><input disabled={item.edit?false:true} placeholder={item.itemqty} className="smallinp" type="number" onChange={(e) => item.itemqty=e.target.value} /></td>
    <td><span className="mediuminp">${thousSep(item.itemtotal)}</span></td>
    <td><input type="checkbox" disabled={item.edit?false:true} checked={item.itempaid} onChange={(e) => setItempaid(e.target.checked)}/></td>
    <td><i className={item.edit?"fal fa-check-square":"fal fa-edit"} onClick={() => item.edit?confirmItemrow(item):editItemrow(item)}></i><i className="fal fa-trash" onClick={() => deleteItemrow(item)}></i></td> 
  </tr>  
  })  
  const clientrow = clients.slice(0,10).map(cli => {
    return <tr className="availclientsrow">
      <td>{cli.name}</td>
      <td>{cli.email}</td>
      <td>{cli.address}</td> 
      <td>{cli.phone}</td> 
      <td>{cli.company}</td>
      <td><button onClick={() => addClient(cli)}>{cli.estimatelinked?<i class='fas fa-check'></i>:"Add"}</button></td>
    </tr>
  })
  
  function createEstimate() {  
    if(estNumRef.current.value.length && (estdate!==undef && estdate!==null)) {
      formRef.current.reset()
      setEstimates(prevEst => [...prevEst,{id: number+Math.floor(Math.random()* 9999 + 1), client:client, number: parseInt(number,10), name: name, service: service,subtotal:subtotal, total: (subtotal+(subtotal*(estimatetax))-estimatediscount), estdate: estdate, currency: currency, tax: estimatetax, discount: estimatediscount, open: false, itemarr: itemarr}])
      setNotifs(prevNotif => [...prevNotif, {icon:"far fa-check-circle",text:`Estimate #${number} has been successfully created.` }])
      activateNotif()
      history.push('/estimates')
    } 
    else {
      setNotifs(prevNotif => [...prevNotif, {icon:"far fa-exclamation-circle",text:"Fields marked with a * must be filled in. Please fill in required fields and try again."}])
      activateNotif()
    }  
  }  
  function addItem() {
    if(enableadd1 && enableadd2 && enableadd3) {
      itemarr.push({itemid:itemarr.length, itemname:itemname, itemprice:parseFloat(itemprice), itemqty:itemqty, itemtotal:parseFloat(itemprice*itemqty), itempaid:itempaid, itemdate:itemdate, edit:false}) 
      setEstimatetotal(itemarr.reduce((a,b) => {return a+b.itemtotal},0))
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
  function editItemrow(item) {
    item.edit = true
    setUpdate(prev => prev+1)
  }
  function confirmItemrow(item) {
    item.edit = false
    item.itemtotal = parseFloat(item.itemprice*item.itemqty)
    setEstimatetotal(itemarr.reduce((a,b) => {return a+b.itemtotal},0))
    setUpdate(prev => prev+1)
  }
  function deleteItemrow(item) {
    itemarr.map(el => {
      if(el.itemid===item.itemid) {
        let itemindex = itemarr.indexOf(item)
        itemarr.splice(itemindex,1)
      }
    }) 
    setEstimatetotal(itemarr.reduce((a,b) => {return a+b.itemtotal},0))
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
  function genInvNumber() {
    setNumber(
      estimates.length<10?"000"+(estimates.length+1):
      estimates.length<100?"000"+(estimates.length+1):
      estimates.length<1000?"00"+(estimates.length+1):
      estimates.length<10000?"0"+(estimates.length+1):
      estimates.length+1 
    )
  }
  function thousSep(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  } 
  function addClient(cli) {
    cli.estimatelinked = !cli.estimatelinked
    if(cli.estimatelinked) {
      setClient(cli)
      clients.map(el => {
        if(el.id === cli.id) {
          el.estimate.push({id: number+Math.floor(Math.random()* 9999 + 1), number: parseInt(number,10), name: name, service: service, total: (subtotal+(subtotal*(estimatetax/100))-estimatediscount), estdate: estdate, currency: currency, tax: estimatetax, discount: estimatediscount, open: false, itemarr: itemarr})
        }   
      })   
    }
    else {
      setClient('')
    }
    setUpdate(prev => prev+1) 
  }
  function rangeValue(val) {
    setEstimatetax(val)
  } 

  return (
    <div className="addinvoicepage">
      <div className="pageheaders">
        <div>  
          <h2>New Estimate</h2>
        </div> 
      </div> 
    <div className="addinvoicecont">  
      <form ref={formRef}>
        <label className="invnumberlabel"><h6><i className="far fa-hashtag"></i>Estimate Number *</h6><input ref={estNumRef} value={number} className="invoicenuminp" type="number" onChange={(e) => setNumber(e.target.value)}/><i title="Assign Number" className="fal fa-random gennum" onClick={() => genInvNumber()}></i></label>
        <label><h6><i className="fas fa-user-alt"></i>Estimate Name (Optional)</h6><input onChange={(e) => setName(e.target.value)}/></label>
        <label onClick={e => e.preventDefault()}><h6><i className="far fa-calendar-alt"></i>Date Billed *</h6><DatePicker selected={estdate} onChange={date => setEstdate(date)} dateFormat="MMMM d,yyyy" placeholderText="Click to select a date" /></label>
        <label><h6><i className="far fa-store"></i>Service Provided</h6><input onChange={(e) => setService(e.target.value)}/></label>
        <label><h6><i className="far fa-usd-circle"></i>Tax (%)</h6><RangeSlider rangevalue={rangeValue} marks={true} default={estimatetax} steps={0.01} min={0} max={1} /></label>
        <label><h6><i className="far fa-dollar-sign"></i>Currency</h6><select value={account.currency} onChange={(e) => setCurrency(e.target.value)}>
          <option selected>Choose a Currency</option>
          <option value="USD">United States Dollar (USD)</option>
          <option value="CAD">Canadian Dollar (CAD)</option>
          <option value="EUR">Euro (&euro;)</option>
          <option value="GBP">British Pound (&pound;)</option> 
          <option value="JPY">Japanese Yen (&yen;)</option>   
          </select>
        </label>
      </form> 
      <div className="spacer"></div>
      <h6 className="tabletitle">Estimate Items</h6>
      <table data-update={update}>
        <thead>
          <th>Item</th>
          <th className="smallinp">Item Date</th>
          <th className="mediuminp">Unit Price</th>
          <th className="smallinp">Qty</th>
          <th className="mediuminp">Total</th> 
          <th className="smallinp">Paid</th>
          <th>Actions</th> 
        </thead>
        <tbody> 
          {itemrow}
          <tr className="templateitemrow">
            <td><input ref={inpRef} placeholder="Enter name..." value={itemname} onChange={(e) => setItemname(e.target.value, e.target.value?setEnableadd1(true):setEnableadd1(false))} /></td>
            <td><DatePicker placeholderText="Add a date" selected={itemdate} onChange={date => setItemdate(date)} dateFormat="MMMM d,yyyy" /></td>
            <td><input placeholder="Enter price" className="mediuminp" type="number" value={itemprice} onChange={(e) => setItemprice(e.target.value, e.target.value?setEnableadd2(true):setEnableadd2(false))} /></td>
            <td><input placeholder="Add qty" className="smallinp" type="number" value={itemqty} onChange={(e) => setItemqty(e.target.value, e.target.value?setEnableadd3(true):setEnableadd3(false))} /></td>
            <td><span className="smallinp"></span></td>
            <td><input type="checkbox" checked={itempaid} onChange={(e) => setItempaid(e.target.checked)}/></td>
            <td></td>
          </tr>    
          <button onClick={() => addItem()}>Add Item</button>  
        </tbody>
      </table>
      <div className="spacer"></div>

      <h6 className="tabletitle">Add Client</h6>
      <div className="addclienttable">
      <table data-update={update}>
        <thead>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Phone</th> 
          <th>Company</th>
          <th>Actions</th> 
        </thead>
        <tbody>
          {clientrow}    
        </tbody>
      </table>
      </div>

      <div className="spacer"></div>

      <div className="invtotalcont">
        <div> 
          <label>
            <h6 className="tabletitle">Discount</h6>
            <input placeholder="Enter amount" onChange={(e) => setDiscountinp(parseFloat(e.target.value))}/>
            <button onClick={() => setEstimatediscount(discountinp)}>Add</button>
          </label>
        </div>
        <div className="totalsdiv" data-update={update}>
          <h5>Subtotal <span>${(estimatetotal)<0?0:thousSep((estimatetotal).toFixed(2))}</span></h5>
          <h5>Tax <small>({(estimatetax*100).toFixed(2)}%)</small><span>${(estimatetotal*(estimatetax)).toFixed(2)}</span></h5>
          <h5>Discount <span>${estimatediscount.toFixed(2)}</span></h5>
          <hr/> 
          <h5 className="bigtotal">Total <span>${thousSep((estimatetotal-estimatediscount+(estimatetotal*(estimatetax))).toFixed(2))}</span></h5>
        </div> 
      </div> 
      <div className="spacer"></div>
      <button className="maincreateinv" onClick={() => createEstimate()}>Create Estimate</button>
      <div className="spacer"></div>
    </div>
    </div>
  )
}

export default AddEstimate
