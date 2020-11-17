import React, { useContext, useState, useRef, useEffect } from 'react'
import { BrowserRouter as Router,Switch,Route,Link, useHistory } from "react-router-dom"
import { StoreContext } from './StoreContext'
import { Helmet } from 'react-helmet'

function Clients(props) {
 
  const {clients, setClients, setNotifs, account, trash} = useContext(StoreContext)

  const [update, setUpdate] = useState(0)
  const [keyword, setKeyword] = useState('')
  const pattern = new RegExp('\\b' + keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
  const history = useHistory() 

  const clientrow = clients.map(cli => {
    return <div className="flexrowcont" key={cli.id}> 
      <div className="flexrowpad" onDoubleClick={() => dblClickClient(cli)}> 
      <i class="fas fa-heart hearticon" style={{display: cli.favorite?"block":"none"}}></i>
      <div className="flexrowhead">  
        <h5>Name</h5><h5>Email</h5><h5>Phone</h5><h5>Address</h5><h5>Postal Code</h5><h5>City/Province</h5><h5>Country</h5><h5>Details</h5><h5>Actions</h5>
      </div>
      <div className="flexrow"> 
        <div>{cli.name}</div><div>{cli.email}</div><div>{cli.phone}</div><div>{cli.address}</div><div>{cli.postal}</div><div>{cli.city}, {cli.provstate}</div><div>{cli.country}</div><div><button className="infoopts" onClick={() => openInfoOpts(cli)}>Details<i className="far fa-angle-up" style={{transform: cli.open?"rotate(180deg)":"rotate(0)"}}></i></button></div><div className="optsrow"><i class="far fa-edit"></i><i class="far fa-trash moreopts" onClick={() => deleteClient(cli)}></i><input type="checkbox"/></div>
      </div>
      </div>
      <div className="flexrowinfo" style={{height: cli.open?"200px":"0", opacity: cli.open?"1":"0", padding: cli.open?"20px":"0 20px"}}>
        <div><h5>Client Details</h5><h6><span>Name:</span> {cli.name}</h6><h6><span>Company:</span> {cli.company}</h6><h6><span>Category:</span> {cli.category}</h6></div>
        <div className="infoinvdetails"><div><h5>File Number</h5><h6>{cli.filenum}</h6><h5>Client ID</h5><h6>#{cli.id}</h6></div><div><h5>Invoices Processed</h5><h6>{cli.invoicesnum}</h6><h5>Highest Bill</h5> <h6>{thousSep(cli.highestbill)}</h6></div></div>
        <div className="invtotalinfodiv"><div className="totalscouple"><div><h5>Total Billed</h5><h3>${thousSep(parseFloat(cli.totalbilled).toFixed(2))}</h3></div><div><h5>Total Paid</h5><h3>{parseFloat(cli.paid)}</h3></div></div><Link to="/client"><button onClick={() => {sendOneClient(cli);cli.open=false}}>More Details</button></Link></div>
      </div>
    </div> 
  })  
  function dblClickClient(cli) {
    if(account.settings.dblclick_clients) {
      history.push('/client')
      sendOneClient(cli)
      cli.open=false
    }
  }
  function openInfoOpts(cli) {
    cli.open = !cli.open
    setUpdate(prev => prev+1)
  }
  function thousSep(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  function sendOneClient(cli) {
    props.sendoneclient(cli)
  } 
  function deleteClient(client) {
    trash[2].push(client)
    clients.map(cli => {
      if(cli.id === client.id) {
        let cliindex = clients.indexOf(cli)
        clients.splice(cliindex,1)
        setUpdate(prev => prev+1)
      }
    }) 
  } 
 
  return (
    <div className="clientspage"> 
      <div className="pageheaders">
        <div>
          <h2>Clients</h2>
          <Link to="/addclient"><button><i className="fal fa-plus"></i>Add Client</button></Link>
          <button><i className="fal fa-plus"></i>Import</button>
        </div>
        <label><input placeholder="Find clients" onChange={(e) => setKeyword(e.target.value)}/><div><i className="far fa-search"></i></div></label>
      </div>

      <div className="clientsrowgrid invoicestablecont" data-update={update}>
        {clientrow}
      </div>
      <div style={{display: clients.length?"none":"block"}} className="emptymsg">
        <h5>Add a client to get started.</h5>
      </div>


      <Helmet><title>Voicex - Clients</title></Helmet>
    </div>
  )
}

export default Clients