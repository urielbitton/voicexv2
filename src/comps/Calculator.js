import React from 'react'

function Calculator(props) {
  return (
    <div className="calculatorcont" style={{display: props.hidecalc?"none":"flex"}}>
      <div className="calculator">
        <iframe src="https://flexrweb.com/calculator/" title="Calculator"></iframe>
      </div>
      <button onClick={() => props.closecalc()}>Close</button>
    </div>
  )
}

export default Calculator