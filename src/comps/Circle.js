import React from 'react'

function Circle(props) {
  return ( 
    <div className="progcircle" data-aos="percentage">
        <svg viewBox="0 0 36 36">
        <path className="circle-bg" d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"></path>
        <path className="circle" strokeDasharray={props.percent} d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"></path>
        <text x="18" y="22.5" className="percentage"></text>
        </svg> 
    </div> 
  )  
}

export default Circle