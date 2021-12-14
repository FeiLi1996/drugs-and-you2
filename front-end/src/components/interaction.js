import React, { useState,useContext } from 'react'
import { GlobalContext } from '../GlobalContext'

import httpClient from '../helper/httpClient'


const Interactions = () => {
    const {diseaseProfile,drugProfile} = useContext(GlobalContext)
    let [interactionsInfo,setInteractionsInfo] =useState([

        {   
            drugName:'aspirin',
            diseaseName:'Asthma',
            description:'blah',
            severity:'mod'
        },
        // {   
        //     drugName:'aspirin',
        //     diseaseName:'Fluid Retention',
        //     description:'blah',
        //     severity:'med'
        // },
   
        ]);
    
    async function handleDrugDiseaseAnalysis (){
        console.log(drugProfile)
        console.log(diseaseProfile)
        
        var promiseArray=drugProfile.map(eachDrug =>{
            return httpClient.post("http://localhost:5000/interaction", {
                "drugName":eachDrug
                })})
        var ArrayOfResults = await Promise.all(promiseArray);
        console.log(ArrayOfResults);
        ArrayOfResults.map(result=>
               
            setInteractionsInfo(interactionsInfo=>[...interactionsInfo,...result.data])
        )
        
        
        
    }
    let displayedDescriptionAndSeverity = interactionsInfo.map(eachDrug =>{
            for(let disease of diseaseProfile){
                let tempDiseaseName = disease.toLowerCase()

                if(tempDiseaseName.includes(',')){
                    tempDiseaseName =tempDiseaseName.split(',')[0]
                    console.log(tempDiseaseName)
                }
                if(tempDiseaseName.length >= 10){
                    tempDiseaseName = tempDiseaseName.substring(0,tempDiseaseName.length-2)
                }
                
                if(eachDrug.description.includes(tempDiseaseName)){

                    return(

                        <ul>
                            <span>{eachDrug.drugName}</span><span>{disease}</span><span>Severity:{eachDrug.severity}</span>
                            <li>Description:{eachDrug.description}</li>
                        </ul>
                    )
                }
            }
    })
    // let displayedDescriptionAndSeverity      
    // for(let disease of diseaseProfile){
    //         if(disease.includes(',')){
    //             disease =disease.split(',')[0]
    //             console.log(disease)
    //         }
    //         displayedDescriptionAndSeverity = interactionsInfo.map(eachDrug =>{
            
                
    //             if(eachDrug.description.includes(disease.toLowerCase()))
    //                 return(

    //                     <ul>
    //                         <span>{eachDrug.drugName}</span><span>{disease}</span><span>Severity:{eachDrug.severity}</span>
    //                         <li>Description:{eachDrug.description}</li>
    //                     </ul>
    //                 )
                
            
    //     })
    // }
    console.log(interactionsInfo,'test2')
    console.log(displayedDescriptionAndSeverity)
        
    return(


        <div>

            <h1>Interactions</h1>
            
            <button onClick={handleDrugDiseaseAnalysis}>Check Interactions</button>
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