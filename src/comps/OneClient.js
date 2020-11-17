import React, { useContext, useEffect, useState } from 'react'
import {StoreContext} from './StoreContext'

function OneClient(props) {

  const {clients} = useContext(StoreContext)

  const [rating, setRating] = useState(props.onecli.rating)
  const [notes, setNotes] = useState(props.onecli.notes)

  function thousSep(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  } 
  function setClientNotes(cli) {
    clients.map(el => {
      if(el.id === cli.id) {
        el.notes = notes
      }
    }) 
  }
  function updateStars() {
    props.onecli.rating = rating
    
  }

  useEffect(() => {
    const allstars = document.querySelectorAll('.starsdiv i')
    allstars.forEach(el => {
      el.onclick = () => {
        let starlevel = el.getAttribute('data-star')
        allstars.forEach(el2 => {
          if(starlevel < el2.getAttribute('data-star')) {
            el2.classList.remove('fas')
            el2.classList.add('fal')
          } 
          else {
            el2.classList.remove('fal')
            el2.classList.add('fas')
          }
        })
        setRating(parseFloat(starlevel))
      }
    })
    allstars.forEach(el => {
      allstars.forEach(el2 => {
        if(rating < el2.getAttribute('data-star')) {
          el2.classList.remove('fas')
          el2.classList.add('fal')
        } 
        else {
          el2.classList.remove('fal')
          el2.classList.add('fas')
        }
      })
    })
    const taber = document.querySelectorAll('.clienttabscont [data-taber]')
    const tab = document.querySelectorAll('.clienttabscont [data-tab]')
    taber.forEach(el => {
     el.onclick = () => {
        let tabtitle = el.getAttribute('data-taber')
        tab.forEach(el2 => el2.style.display = 'none')
        document.querySelector('[data-tab="'+tabtitle+'"]').style.display = 'block'
        taber.forEach(el2 => {el2.style.color = '#999';el2.querySelector('hr').style.opacity = '0'})
        el.style.color = 'var(--color)'
        el.querySelector('hr').style.opacity = '1'
     }
    })
  },[])

  return (
    <div className="oneclientpage">
      <div className="oneinvflex">
        <h1>Client</h1>
      </div>

      <div className="clientcardcont">
        <div className="innerclientcard">
          <div className="clientleft">
            <label>
              <img src="https://i.imgur.com/bcCbeiE.jpg" alt=""/>
            </label>
            <h6>Contact Information<hr/></h6>
            <div>
              <h5>Address</h5>
              <p><span>Address:</span>{props.onecli.address}</p>
              <p><span>Postal Code:</span>{props.onecli.postal}</p>
              <p><span>City:</span>{props.onecli.city}, {props.onecli.provstate}</p>
              <p><span>Country:</span>{props.onecli.country}</p>
              <h5>Contact</h5>
              <p><span>Phone:</span>{props.onecli.phone}</p>
              <p><span>Email:</span>{props.onecli.email}</p>
              <p><span>Company:</span>{props.onecli.company}</p>
            </div> 
            <h6>Client Notes<hr/></h6>
            <textarea placeholder="Add notes here..." value={notes} onChange={(e) => setNotes(e.target.value, setClientNotes(props.onecli))}/>
            <div className="oneclientactions">
              <h5>Linking</h5>
              <button>Add Client To Invoices</button>
            </div>
          </div>
          <div className="clientright">
            <div className="titlesdiv">
              <h3>{props.onecli.name}</h3>
              <h4>{props.onecli.company}</h4>
              <small><i className="far fa-map-marker-alt"></i>{props.onecli.city}, {props.onecli.provstate}</small>
            </div>
            <div className="ratingdiv">
              <h6>Ratings<hr/></h6>
              <big>{rating.toFixed(1)} 
                <div className="starsdiv" onClick={() => updateStars()}>
                  <i className="fal fa-star" data-star="1"></i>
                  <i className="fal fa-star" data-star="2"></i>
                  <i className="fal fa-star" data-star="3"></i>
                  <i className="fal fa-star" data-star="4"></i>
                  <i className="fal fa-star" data-star="5"></i> 
                </div>
              </big>
              <div className="clientactionable">
                <a href={"mailto:"+props.onecli.email}><button><i className="far fa-envelope"></i>Email</button></a>
                <a href={"tel:"+props.onecli.phone}><button><i className="far fa-phone-alt"></i>Call</button></a> 
                <small>{props.onecli.favorite?<><i className="fas fa-heart"></i>Favorite</>:""}</small>
              </div>
              <div className="spacer"></div>
              <div className="clienttabscont">
                <div className="clienttabshead">
                  <small data-taber="invoicing"><i class="fas fa-user-alt"></i>Profile<hr/></small>
                  <small data-taber="events"><i class="fas fa-calendar-alt"></i>Events<hr/></small>
                </div>
                <div className="clienttabsbody">
                  <div data-tab="invoicing">
                    <h6>Invoices Data<hr/></h6>
                    <p><span>Date Added:</span>{props.onecli.dateadded.toString().split(' ').slice(1,4).join(' ')}</p>
                    <p><span>Invoices Processed:</span>{props.onecli.invoicesnum}</p>
                    <p><span>Invoices Items:</span>{props.onecli.items}</p>
                    <h6>Revenue<hr/></h6>
                    <p><span>Highest Bill:</span>{props.onecli.highestbill}</p> 
                    <p><span>Total Billed:</span>{props.onecli.totalbilled}</p>
                    <p><span>Total Paid:</span>{props.onecli.paid}</p>
                    <h6>Personal Information<hr/></h6>
                    <p><span>Client ID:</span>#{props.onecli.id}</p>
                    <p><span>Gender:</span>N/A</p>
                    <p><span>Date Of Birth:</span>N/A</p>
                  </div>
                  <div data-tab="events">
                    <h6>Events<hr/></h6>
                    <h5>Invoices</h5>
                    <div className="eventinvhead"><small>Invoice #</small><small>Name</small><small>Date</small><small>Service</small><small>Total</small><small>Status</small></div>
                    {props.onecli.invoice.map(inv => {
                      return <div className="eventinvrow"><small>#00{inv.number}</small><small>{inv.name}</small><small>{inv.invdate.toString().split(' ').slice(1,4).join(' ')}</small><small>{inv.service}</small><small>${thousSep(inv.total)}</small><small>{inv.status}</small></div>
                    })}
                    <h5>Estimates</h5>
                    <div className="eventinvhead"><small>Estimate #</small><small>Name</small><small>Date</small><small>Service</small><small>Total</small><small>Sent</small></div>
                    {props.onecli.estimate.map(est => {
                      return <div className="eventinvrow"><small>#00{est.number}</small><small>{est.name}</small><small>{est.estdate.toString().split(' ').slice(1,4).join(' ')}</small><small>{est.service}</small><small>${thousSep(est.total)}</small><small></small></div>
                    })}
                  </div>
                </div> 
        

                <div className="spacerl"></div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default OneClient