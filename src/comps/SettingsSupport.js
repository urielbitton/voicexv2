import React from 'react'
import { BrowserRouter as Router,Switch,Route,Link, useHistory } from "react-router-dom"


function SettingsSupport() {
  return (
    <div className="settingsinvoices settingssupport">
      <div>
        <h5 className="settingstitle"><i class="far fa-print"></i>Print your invoices</h5>
        <p>
        You can print and view invoices that you create by going to <Link to="/invoices">invoices</Link>, then clicking
        on the details button of the desired invoice. This will open the invoice details. You can then click on "More Details" and
        a new page will open with the full printable invoice. Navigate towards the bottom where you will find the "Print" button.
        </p>
      </div>
      <div>
        <h5 className="settingstitle"><i class="fas fa-user-plus"></i>Add a client to an invoice</h5>
        <p>
          Adding a client or contact to your invocies is simple. Head over to <Link to="/invoices">invoices</Link> and expand the invoice
          by clicking on "details". To the left you will see a button to "Add Client". Clicking this option will bring up a list of your clients.
          Simply search for a client you wish to add and do so by clicking the "add" button to the right of that client. The client is now added 
          to the invoice. View their information by opening the invoice or viewing their full contact card here <Link to="/clients">clients</Link>
        </p>
      </div>
      <div>
        <h5 className="settingstitle"><i class="far fa-file-invoice-dollar"></i>View a client's invoices</h5>
        <p>
          If you have created a client, navigate to your created clients on the <Link to="/clients">clients</Link> page. 
          Hit "Details" on the client you wish to expand and then "more details". This will bring you to the client's profile. Find the section 
          titled "events", clicking on that will bring up your client' invoice and estimates history.
        </p>
      </div>
      <div>
        <h5 className="settingstitle"><i class="far fa-dollar-sign"></i>Setting your tax rates</h5>
        <p>
          You can set two custom tax rates from your settings. On this current page, simply navigate to <Link to="/settings/invoices">invoices</Link> settings
          and scroll down until you find the "taxes" section. You can set your currencies and other invoice options on this page as well.
        </p>
      </div>

    </div>
  )
}

export default SettingsSupport