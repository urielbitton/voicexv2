import React, { useContext, useState, useEffect } from 'react'
import { Inputs, Switchs } from './Inputs'
import RangeSlider from './RangeSlider'
import {StoreContext} from './StoreContext'

function SettingsInvoices(props) { 

  const {account} = useContext(StoreContext)

  const [taxrate1, setTaxrate1] = useState(account.taxrate.custom1.rate)
  const [taxrate2, setTaxrate2] = useState(account.taxrate.custom2.rate)
  const [taxname1, setTaxname1] = useState(account.taxrate.custom1.name)
  const [taxname2, setTaxname2] = useState(account.taxrate.custom2.name)
  const [taxnum1, setTaxnum1] = useState(account.taxrate.custom1.num)
  const [taxnum2, setTaxnum2] = useState(account.taxrate.custom2.num)
  const [taxes, setTaxes] = useState(account.taxrate.taxes)
  const [currency, setCurrency] = useState(account.currency)

  function saveInvoicesInfo() {
    account.taxrate.custom1.rate = taxrate1
    account.taxrate.custom2.rate = taxrate2
    account.taxrate.custom1.name = taxname1
    account.taxrate.custom2.name = taxname2
    account.taxrate.custom1.num = taxnum1
    account.taxrate.custom2.num = taxnum2
    account.taxrate.taxes = taxes
    account.currency = currency
    props.updatemain()
    props.updateaccount()
    props.shownotif("Your invoice settings have been successfully saved.")
  }
   
  useEffect(() => {
    props.setdynamic(false,false,true,false)
  },[]) 
 
  return (
    <div className="settingsinvoices"> 
      <h5 className="settingstitle">Invoicing Data<small>Manage invoices data settings</small></h5>
      <Switchs title="Show my address on invoices" onchange={(val) => {account.settings.show_address_inv = val;props.updatemain()}} checked={account.settings.show_address_inv} />
      <Switchs title="Show my phone number on invoices" onchange={(val) => {account.settings.show_phone_inv = val;props.updatemain()}} checked={account.settings.show_phone_inv} />
      <Switchs title="Show my company logo on invoices" onchange={(val) => {account.settings.show_logo = val;props.updatemain()}} checked={account.settings.show_logo} />
      <h5 className="settingstitle">Taxes<small>Manage your tax rates</small></h5>
      <div className="taxinputdiv">
        <Inputs title="Tax Rate 1 Name" value={taxname1} onchange={(val) => setTaxname1(val)} />
        <Inputs title="Tax Rate 1 Number" placeholder="938429924" value={taxnum1} onchange={(val) => setTaxnum1(val)} /> 
      </div>
      <div className="altsetcont">
        <small>Set Tax Rate 1</small>
        <RangeSlider rangevalue={(val) => setTaxrate1(val)} marks={false} default={account.taxrate.custom1.rate} min={0} max={1} steps={0.01}/>
      </div>
      <div className="taxinputdiv">
        <Inputs title="Tax Rate 2 Name" value={taxname2} onchange={(val) => setTaxname2(val)}/>  
        <Inputs title="Tax Rate 2 Number" placeholder="312339924" value={taxnum2} onchange={(val) => setTaxnum2(val)}/> 
      </div>
      <div className="altsetcont">
        <small>Set Tax Rate 2</small> 
        <RangeSlider rangevalue={(val) => setTaxrate2(val)} marks={false} default={account.taxrate.custom2.rate} min={0} max={1} steps={0.01}/>
      </div> 
      <Switchs title="Enable taxes" checked={taxes} onchange={(val) => setTaxes(val)} />
      <h5 className="settingstitle">Currencies<small>Set the currency for your invoices</small></h5>
      <div className="altsetcont noborder">
        <small>Main Currency</small> 
        <select className="altsetcont" value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option selected>Choose a Currency</option>
          <option value="USD">United States Dollar (USD)</option>
          <option value="CAD">Canadian Dollar (CAD)</option>
          <option value="EUR">Euro (&euro;)</option>
          <option value="GBP">British Pound (&pound;)</option>
          <option value="JPY">Japanese Yen (&yen;)</option>   
        </select>
      </div>
       
      
      <button onClick={() => saveInvoicesInfo()}>Save</button>
 
    </div>
  ) 
}

export default SettingsInvoices