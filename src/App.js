import React, { useContext, useState } from "react"
import { BrowserRouter as Router,Switch,Route,Link,useHistory, Redirect } from "react-router-dom"
import "./styles.css"
import AppContainer from "./comps/AppContainer"
import Login from "./comps/Login"
import Register from "./comps/Register"
import StoreContextProvider from "./comps/StoreContext"
 
function App() {

  const [loggedin, setLoggedin] = useState(true)
  let history = useHistory()

  function allowAccess() {
    setLoggedin(true) 
  }

  return (
    <div className="app">
      <StoreContextProvider>
        <Router>
          <Route path="/">
            {loggedin ? <AppContainer logout={() => setLoggedin(false)} />: <Redirect to="/login" /> }
          </Route>
          <Route path="/login">
            <Login allowaccess={allowAccess}/>
          </Route>
          <Route path="/register">
            <Register allowaccess={allowAccess}/>
          </Route>
        </Router>
      </StoreContextProvider>
    </div>
  )
}

export default App
