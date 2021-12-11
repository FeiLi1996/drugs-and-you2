import React, { useState,useContext } from 'react'
import { GlobalContext } from '../GlobalContext'


const Interactions = () => {
    const {diseaseProfile,drugProfile} = useContext(GlobalContext)
    let [interactionsInfo,setInteractionsInfo] =useState([

        {   
            drugName:'aspirin',
            diseaseName:'Asthma',
            description:'blah',
            severity:'mod'
        },
        {   
            drugName:'aspirin',
            diseaseName:'Fluid Retention',
            description:'blah',
            severity:'med'
        },
   
        ]);
    
    let displayedDescriptionAndSeverity = interactionsInfo.map(eachDrug =>{
        
            return(

                <ul>
                    <span>{eachDrug.drugName}</span><span>{eachDrug.diseaseName}</span><span>Severity:{eachDrug.severity}</span>
                    <li>Description:{eachDrug.description}</li>
                 </ul>
            )
    })
    
        
    return(


        <div>

            <h1>Interactions</h1>
            
            <button>Check Interactions</button>
            <button> Clear Interactions</button>


          
            {displayedDescriptionAndSeverity}
            <ul>
                <span>Drug name</span><span>Disease Name</span><span>Severity</span>
                <li>Description</li>
            </ul>
       
        </div>
    )


}

export default Interactions