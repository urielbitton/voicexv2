import React, { useContext, useState, useRef, useEffect } from 'react'
import { BrowserRouter as Router,Switch,Route,Link, useHistory } from "react-router-dom"
import { StoreContext } from './StoreContext'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from 'react-helmet'

function Estimates(props) {

  const {estimates, notifs, setNotifs, clients, account, trash} = useContext(StoreContext)
  
  const [openslide, setOpenSlide] = useState(false)
  const [showcheck, setShowcheck] = useState(false)
  const [number, setNumber] = useState(0)
  const [id, setId] = useState(0)
  const [name, setName] = useState('')
  const [service, setService] = useState('')
  const [paid, setPaid] = useState('') 
  const [balance, setBalance] = useState('')
  const [total, setTotal] = useState('')
  const [invdate, setInvdate] = useState('')
  const [startdate, setStartDate] = useState(new Date())
  const [update, setUpdate] = useState(0)
  const [currentid, setCurrentid] = useState()
  const [addcont, setAddcont] = useState(false)
  const history = useHistory() 
 
  const estimatesrow = estimates.map(est => {
    return <div className="flexrowcont" key={est.id}>
    <div className="flexrowpad" onDoubleClick={() => dblClickEstimate(est)}> 
    <div className="flexrowhead"> 
      <h5>Estimate Number</h5><h5>Estimate Name</h5><h5>Amount</h5><h5 className="datetitle">Date</h5><h5>Details</h5><h5>Actions</h5>
    </div> 
    <div className="flexrow">  
      <div>#00{est.number}</div><div>{est.name}</div><div>${thousSep(parseFloat(est.total))}</div><div className="datepicker"><DatePicker disabled selected={est.invdate} onChange={date=> setStartDate(date)} dateFormat="MMMM d,yyyy"/></div><div><h6 className="invstatuscolor"><div></div><span>{est.status}</span></h6></div><div><button className="infoopts" onClick={() => openInfoOpts(est)}>Details<i className="far fa-angle-up" style={{transform: est.open?"rotate(180deg)":"rotate(0)"}}></i></button></div><div className="optsrow"><i class="far fa-edit" onClick={() => editEstimate(est)}></i><i class="far fa-trash moreopts" onClick={() => deletEstimate(est)}></i><input type="checkbox"/></div>
    </div>
    </div>
    <div className="flexrowinfo" style={{height: est.open?"200px":"0", opacity: est.open?"1":"0", padding: est.open?"20px":"0 20px"}}>
      <div><h5>Estimate Items</h5><ul className="flexinfoitems hidescroll">{est.itemarr.map(el => <li><span>{el.itemname}</span> <span>${thousSep(parseFloat(est.total))}</span></li>)}</ul></div>
      <div><h5>Client Info</h5><h6>{est.client.name}</h6><h6>{est.client.email}</h6><h6>{est.client.company}</h6><button className="invaddclientbtn" onClick={() => {setCurrentid(est.id);setAddcont(true)}}>{est.client.name?"Change":"Add Client"}</button></div>
      <div className="infoinvdetails"> <div> <h5>Service</h5> <h6>{est.service}</h6> <h5>Estimate ID</h5> <h6>EST#{est.id}</h6> </div><div></div></div>
      <div className="invtotalinfodiv"><h5>Estimate Total</h5><h3>${thousSep(parseFloat(est.total).toFixed(2))}</h3><Link to="/estimate"><button onClick={() => {sendOneEstim(est);est.open=false}}>More Details</button></Link></div>
    </div>
  </div> 
  }) 

  const clientrow = clients.map(cli => {
    return <div className="clientrow">
      <h6><i class="fas fa-user-alt"></i>{cli.name}</h6>
      <h6>{cli.email}</h6>
      <h6>{cli.phone}</h6> 
      <h6>{cli.address}</h6>
      <h6>{cli.city}, {cli.provstate}</h6>
      <button onClick={() => linkToEstimate(cli, setAddcont(false))}>Add</button> 
    </div>
  })
  function dblClickEstimate(est) {
    if(account.settings.dblclick_estimates) {
      history.push('/estimate')
      sendOneEstim(est)
      est.open=false
    }
  }
  function sendOneEstim(est) {
    props.sendoneestimate(est)
  }
  function editEstimate(est) {
    setId(est.id)
    setNumber(est.number)
    setName(est.name)
    setService(est.service)
    setPaid(est.paid)
    setBalance(est.balance)
    setTotal(est.total)
    setStartDate(est.estdate)
    setOpenSlide(true)
  }
  function saveEstimate(estid) {
    estimates.map(est => {
      if(estid === est.id) {
        est.number = number
        est.name = name
        est.service = service
        est.paid = paid
        est.balance = balance
        est.total = total
        est.invdate = invdate
      }
    })
    props.updatepinned() 
    setUpdate(prev => prev+1)
  }
  function closeEditEstimate() {
    setOpenSlide(false)
  }
  function linkToEstimate(cli) {
    cli.estimatelinked = !cli.estimatelinked
    if(cli.estimatelinked) {
      estimates.map(est => {
        if(est.id === currentid) {
          est.client = cli
          cli.estimate.push(est)
        }
      })
    } 
    setUpdate(prev => prev+1)
  } 
  function thousSep(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  } 
  function openInfoOpts(est) {
    est.open = !est.open
    setUpdate(prev => prev+1)
  }
  function deletEstimate(estimate) {
    trash[1].push(estimate)
    estimates.map(est => {
      if(est.id === estimate.id) {
        let cliindex = estimates.indexOf(est)
        estimates.splice(cliindex,1)
        setUpdate(prev => prev+1)
      }
    }) 
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

  return (
    <div className="estimatespage">
      <div className="pageheaders">
        <div>
          <h2>Estimates</h2>
          <Link to="/addestimate"><button><i className="fal fa-plus"></i>Add Estimate</button></Link>
          <button><i className="fal fa-plus"></i>Import</button>
        </div>
        <label><input placeholder="Find estimates"/><div><i className="far fa-search"></i></div></label>
      </div>
 
      <div className="invoicestablecont">
        {estimatesrow}
      </div>
      <div style={{display: estimates.length?"none":"block"}} className="emptymsg">
        <h5>Add an estimate to get started.</h5>
      </div> 

      <div className="invaddclientcont estaddclientcont" style={{display: addcont?"flex":"none"}}>
        <i className="fal fa-times" onClick={() => setAddcont(false)}></i>
        <div className="invaddclient">
          <h3>Add Client To Estimate</h3>
          <p style={{display: clients.length?"none":"block"}}>You have no clients yet. Add one to get started<br/><Link to="/addclient"><button>Add Clients</button></Link></p>
          <div className="clientrowcont">
            {clientrow}
          </div>
        </div> 
      </div>

      <Helmet><title>Voicex - Estimates</title></Helmet>
    </div>
  )
}

export default Estimates