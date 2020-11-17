import React, { useContext, useEffect, useState } from "react"
import {Inputs} from './Inputs'
import { StoreContext } from "./StoreContext"

function SettingsAccount(props) {

  const {account} = useContext(StoreContext)

  const [id, setId] = useState(Math.floor(Math.random()* 10000 + 100))
  const [fname, setFname] = useState(account.fname)
  const [lname, setLname] = useState(account.lname)
  const [email, setEmail] = useState(account.email)
  const [phone, setPhone] = useState(account.phone)
  const [fax, setFax] = useState(account.fax)
  const [address, setAddress] = useState(account.address)
  const [postal, setPostal] = useState(account.postal)
  const [city, setCity] = useState(account.city)
  const [provstate, setProvstate] = useState(account.provstate)
  const [country, setCountry] = useState(account.country)
  const [company, setCompany] = useState(account.company)
  const [jobtitle, setJobtitle] = useState(account.jobtitle)
  const [website, setWebsite] = useState(account.website)
  const [regnumber, setRegnumber] = useState(account.regnumber)
  const [companylogo, setCompanylogo] = useState(account.companylogo)

  function saveAccountInfo() {
    account.id = id
    account.fname = fname
    account.lname = lname
    account.email = email
    account.phone = phone
    account.fax = fax
    account.address = address
    account.postal = postal
    account.city = city
    account.provstate = provstate
    account.country = country 
    account.company = company
    account.jobtitle = jobtitle
    account.website = website
    account.regnumber = regnumber
    props.updateaccount()
    props.shownotif("Your account settings have been successfully saved.")
  }
  function uploadPicLogo() {
    var file = document.querySelector(".uploadpiclogo").files[0]
    var reader = new FileReader()
    reader.onloadend = function(){
        setCompanylogo(reader.result) 
        account.companylogo = reader.result
    } 
    if(file) {
        reader.readAsDataURL(file)
      } 
  }
  useEffect(() => {
    props.setdynamic(true,false,false,false)
  },[])
 
  return ( 
    <div className="settingsaccount">
      <h5 className="settingstitle">Contact Information</h5>
      <Inputs title="First Name" value={fname} placeholder="Your first name" onchange={(val) => setFname(val)}/>
      <Inputs title="Last Name" value={lname} placeholder="Your last name" onchange={(val) => setLname(val)}/>
      <Inputs title="Email" value={email} placeholder="Your email" onchange={(val) => setEmail(val)}/>
      <Inputs title="Phone Number" value={phone} placeholder="Your phone number" onchange={(val) => setPhone(val)}/>
      <Inputs title="Fax Number" value={fax} placeholder="Your fax number" onchange={(val) => setFax(val)}/>
      <Inputs title="Address" value={address} placeholder="Your address" onchange={(val) => setAddress(val)}/>
      <Inputs title="Postal Code" value={postal} placeholder="Your postal code" onchange={(val) => setPostal(val)}/>
      <Inputs title="City" value={city} placeholder="Your city" onchange={(val) => setCity(val)}/>
      <Inputs title="Province/State" value={provstate} placeholder="Your province/state" onchange={(val) => setProvstate(val)}/>
      <Inputs title="Country" value={country} placeholder="Your country" onchange={(val) => setCountry(val)}/>

      <h5 className="settingstitle">Professional Information</h5>
      <Inputs title="Company Name" value={company} placeholder="Your company name" onchange={(val) => setCompany(val)}/>
      <Inputs title="Job Title" value={jobtitle} placeholder="Your job title" onchange={(val) => setJobtitle(val)}/>
      <Inputs title="Website" value={website} placeholder="Your website url" onchange={(val) => setWebsite(val)}/>
      <Inputs title="Business/Registration Number (BN/RN)" value={regnumber} placeholder="Your registration number" onchange={(val) => setRegnumber(val)}/> 
      <div className="invoicepiccont">
        <h6>Company Logo</h6> 
          <div style={{backgroundImage: "url("+companylogo+")"}}>
            <label><input type="file" className="uploadpiclogo" onChange={() => uploadPicLogo()}/></label>
            <div style={{display: companylogo?"none":"block"}}>
              <h4><i class="far fa-image"></i></h4>
              <h4>Company Logo</h4> 
            </div> 
          </div>
        </div>

      <button onClick={() => saveAccountInfo()}>Save</button>

    </div>
  )
} 

export default SettingsAccount