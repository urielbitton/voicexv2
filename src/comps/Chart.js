import React, { useEffect, useContext } from 'react'
import Chart from 'chart.js';
import { StoreContext } from './StoreContext'

function Charts(props) { 

  useEffect(() => {
    let chart = document.getElementById('line-chart').getContext('2d')
    let gradientpurp = chart.createLinearGradient(0, 0, 0, 400)
    gradientpurp.addColorStop(0, 'rgba(104, 43, 255,0.5)')
    gradientpurp.addColorStop(0.5, 'rgba(104, 43, 255,0.1')
    gradientpurp.addColorStop(1, 'rgba(104, 43, 255,0)')


    //line chart
    new Chart(document.getElementById("line-chart"), {
      type: 'line', 
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [{ 
            data: [12.0,11.0,32.4,45.7,40.59,32.0,43.3,41.5,22.0,33.1,67,34,69],
            label: "Revenue",
            borderColor: "#682bff",
            fill: true,
            backgroundColor: gradientpurp
          },
        ]   
      },      
      options: { 
        responsive:true,
        maintainAspectRatio: false,
        title: {
          display: false,
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: '#f5f5f5'
            }, 
            ticks: {
              fontColor: '#777'
            }
          }],
          yAxes: [{
            gridLines: {
              color: '#f5f5f5'
            },
            ticks: {
              stepSize: 5,
              fontColor: '#777'
              //beginAtZero: true,
            } 
          }],
        }  
      } 
    })

    //bar chart    
    new Chart(document.getElementById("bar-chart"), {
      type: 'bar',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [{ 
            data: [12.0,11.0,32.4,45.7,40.59,32.0,43.3,41.5,22.0,33.1,56,45],
            label: "Invoices",
            borderColor: "#fafafa",
            fill: true,
            backgroundColor: "rgba(252, 83, 77,0.7)"
          }, { 
            data: [12,15,30,21,5,50,43,76,23,12,42.5,12.0,35.1],
            label: "Estimates",
            borderColor: "#fafafa",
            fill: true,
            backgroundColor: "rgba(249, 191, 10,0.7)"  
          }, { 
            data: [10,3,1,20,45,50,62,35,10,22,37.5,21.0,38.1],
            label: "Clients",
            borderColor: "#fafafa",
            fill: true,
            backgroundColor: "rgba(18, 148, 255,0.7)"   
          }
        ]   
      },      
      options: { 
        responsive:true,
        maintainAspectRatio: false,
        title: {
          display: false,
        },
        scales:{
          xAxes: [{
            stacked: true,
            barPercentage: 0.2,
            gridLines: {
              color: '#f5f5f5'
            },
          }],
          yAxes: [{
            stacked: true,
            gridLines: {
              color: '#f5f5f5'
            },
          }]
        }
      }
    });  
    
 
  },[])

  return (
    <>
      <canvas id={props.type}></canvas>
    </> 
  )
}

export default Charts