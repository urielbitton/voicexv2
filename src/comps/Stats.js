import React from 'react'
import { BrowserRouter as Router,Switch,Route,Link, useHistory } from "react-router-dom"
import { Helmet } from 'react-helmet'

function Stats() {
  return (
    <div className="statspage">
      <div className="pageheaders">
        <div>
          <h2>Stats</h2>
        </div>
      </div>

      <Helmet><title>Voicex - Stats</title></Helmet>
    </div>
  ) 
}

export default Stats