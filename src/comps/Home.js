import React, { useContext, useEffect, useState } from "react"
import {BrowserRouter as Router,Switch,Route,Link,useHistory} from "react-router-dom"
import Charts from "./Chart"
import Circle from "./Circle"
import { Helmet } from "react-helmet"
import { StoreContext } from "./StoreContext"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import InvoiceRow from "./InvoiceRow"

function Home(props) {
  const {invoices, estimates, clients, revenues, account } = useContext(StoreContext)

  const [progwidth, setProgwidth] = useState(revenues.total/account.goals)
  const [startdate, setStartDate] = useState()

  const recentinvoices = invoices.map((inv) => {
    return (
      <tr data-invid={inv.id}>
        <td>#{inv.number}</td>
        <td>{inv.name}</td>
        <td>{inv.service}</td>
        <td>{inv.paid}</td>
        <td>{inv.balance}</td>
        <td>{inv.total}</td>
        <td className="datepicker"><DatePicker disabled selected={inv.invdate} onChange={(date) => setStartDate(date)} dateFormat="MMMM d,yyyy" /></td>
        <td><button>{inv.status}</button></td>
      </tr>
    )
  })

  function genDate() {
    let amonth=[ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return ( amonth[new Date().getMonth()] + " " + new Date().getDate() + " " + new Date().getFullYear() )
  }
  function thousSep(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  useEffect(() => {
    setProgwidth(revenues.total/account.goals)
  }, [])

  return ( 
    <div className="homepage">
      <div className="pageheaders">
        <h2>Good morning, Uriel<small>{genDate()}</small></h2>
        <label>
          <input placeholder="Find invoices, estimates, clients..." />
          <div>
            <i className="far fa-search"></i>
          </div>
        </label>
      </div>
      <div className="homegrid">
        <div className="dashsmallgrid">
        <div className="dashbox dashsmall">
          <small>
            <Link to="/stats">more<i class="far fa-long-arrow-alt-right"></i></Link>
          </small>
          <div>
            <h5>Revenue</h5>
            <h3>${thousSep(revenues.total)}</h3>
            <small className="purple">${thousSep(revenues.total)} this week</small>
          </div>
          <div className="icondiv purplebg">
            <i className="fas fa-dollar-sign"></i>
          </div>
        </div>
        <div className="dashbox dashsmall">
          <small>
            <Link to="/invoices">
              more<i class="far fa-long-arrow-alt-right"></i>
            </Link>
          </small>
          <div>
            <h5>Invoices</h5>
            <h3>{invoices.length}</h3>
            <small className="red">{invoices.length} new this week</small>
          </div>
          <div className="icondiv redbg">
            <i className="fal fa-file-invoice-dollar"></i>
          </div>
        </div>
        <div className="dashbox dashsmall">
          <small>
            <Link to="/estimates">
              more<i class="far fa-long-arrow-alt-right"></i>
            </Link>
          </small>
          <div>
            <h5>Estimates</h5>
            <h3>{estimates.length}</h3>
            <small className="yellow">{estimates.length} new this week</small>
          </div>
          <div className="icondiv yellowbg">
            <i className="fal fa-file-alt"></i>
          </div>
        </div>
        <div className="dashbox dashsmall">
          <small>
            <Link to="/clients">
              more<i class="far fa-long-arrow-alt-right"></i>
            </Link>
          </small>
          <div>
            <h5>Clients</h5>
            <h3>{clients.length}</h3>
            <small className="blue">{clients.length} new this week</small>
          </div>
          <div className="icondiv bluebg">
            <i className="fas fa-user-friends"></i>
          </div>
        </div>
      </div>
      <div className="rowgrid">
        <div className="dashbox earningsbox">
          <h4>Revenue</h4>
          <small>
            <Link to="/stats">
              more<i class="far fa-long-arrow-alt-right"></i>
            </Link>
          </small>
          <div className="earningschart">
            <Charts type="line-chart" />
          </div>
        </div>
        <div className="dashbox progressbox" style={{display: account.settings.enable_goals?"block":"none"}}>
          <h4>Monthly Goal</h4>
          <small>
            <Link to="/settings">
              more<i class="far fa-long-arrow-alt-right"></i>
            </Link>
          </small>
          <div className="circlecont">
            <Circle percent={Math.round(progwidth*100)} icon="far fa-wallet" />
            <div className="progicondiv">
              <i className="fas fa-wallet"></i>
            </div>
          </div>
          <div className="progtubecont">
            <h5>{Math.round(progwidth*100)}%</h5>
            <div className="progtube">
              <div
                className="progfill"
                style={{ width: Math.round(progwidth*100) + "%" }}
              ></div>
            </div>
            <div className="prognumbers">
              <small>${thousSep(revenues.total)}</small>
              <small>${thousSep(account.goals)}</small>
            </div>
          </div>
        </div>
        </div>

        <div className="rowgrid">
        <div className="dashbox invstats">
          <h4>Stats</h4>
          <small>
            <Link to="/stats">
              more<i class="far fa-long-arrow-alt-right"></i>
            </Link>
          </small>
          <div className="invoicechart">
            <Charts type="bar-chart" />
          </div>
        </div>
        <div className="dashbox updatesbox" style={{display: account.settings.show_updates?"block":"none"}}>
          <h4>Updates</h4>
          <small><Link to="#">
            more<i class="far fa-long-arrow-alt-right"></i></Link>
          </small>
          <div className="updateitem">
            <div className="updatecolor redbg"></div>
            <div>
              <h6>Inv #0068 has been paid</h6>
              <small>{genDate()}</small>
            </div>
            <i class="fas fa-ellipsis-h"></i>
          </div>
          <div className="updateitem">
            <div className="updatecolor bluebg"></div>
            <div>
              <h6>You added a new client</h6>
              <small>{genDate()}</small>
            </div>
            <i class="fas fa-ellipsis-h"></i>
          </div>
          <div className="updateitem">
            <div className="updatecolor purplebg"></div>
            <div>
              <h6>You have just reached 75% of your monthly goal</h6>
              <small>{genDate()}</small>
            </div>
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>
        </div>

        <div className="dashbox recentinvoices">
          <small>
            <Link to="/invoices">
              more<i class="far fa-long-arrow-alt-right"></i>
            </Link>
          </small>
          <h4>Recent Invoices</h4>
          <div className="invoicestablecont">
            <InvoiceRow sendoneinvoice={props.sendoneinvoice} updatepinned={props.updatepinned} numshow="5"/>
          </div>
        </div>
      </div>
      <div className="spacerl"></div>
      <Helmet>
        <title>Voicex - Manage your invoices intelligently</title>
      </Helmet>

    </div>
  )
}

export default Home
