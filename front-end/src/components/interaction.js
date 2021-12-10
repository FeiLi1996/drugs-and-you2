import React, { useState,useContext } from 'react'
import { GlobalContext } from '../GlobalContext'


const Interactions = () => {
    const {diseaseProfile,drugProfile} = useContext(GlobalContext)
    let [interactionsInfo,setInteractionsInfo] =useState([
            {
                drugName:'test',
                interactionDescriptionAndSeverity:[
                                    {   
                                        diseaseName:'Asthma',
                                        description:'blah',
                                        severity:'blah'
                                    },
                                    {   
                                        diseaseName:'Fluid Retention',
                                        description:'blah',
                                        severity:'blah'
                                    },
                ]
            }
        ]);

    return(


        <div>

            <h1>Interactions</h1>
            
            <button>Check Interactions</button>
            <button> Clear Interactions</button>


            <ul>
                <span>{drugProfile[0]}</span><span>{diseaseProfile[0]}</span><span>Severity</span>
                <li>Description</li>
            </ul>

            <ul>
                <span>Drug name</span><span>Disease Name</span><span>Severity</span>
                <li>Description</li>
            </ul>
            <ul>
                <span>{interactionsInfo[0].drugName}</span><span>{interactionsInfo[0].interactionDescriptionAndSeverity[0].diseaseName}</span><span>Severity</span>
                <li>Description</li>
            </ul>
        </div>
    )


}

export default Interactions