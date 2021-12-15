import React, { useState,useContext } from 'react'
import { GlobalContext } from '../GlobalContext'

import httpClient from '../helper/httpClient'


const Interactions = () => {
    const {diseaseProfile,drugProfile} = useContext(GlobalContext)
    let [toggleDescriptionDisplay,setToggleDescriptionDisplay] = useState('noShow')
    let [toggleDescriptionDisplayBoolean,setToggleDescriptionDisplayBoolean] = useState(false)
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
        let [loadingMessage,setLoadingMessage] =useState('')
    
    async function handleDrugDiseaseAnalysis (){

        if(Array.isArray(drugProfile) && drugProfile.length && Array.isArray(diseaseProfile) && diseaseProfile.length){

            console.log(drugProfile)
            console.log(diseaseProfile)
            
            setLoadingMessage('Loading...Sip a coffee.')
            
            var promiseArray=drugProfile.map(eachDrug =>{
                return httpClient.post("http://localhost:5000/interaction", {
                    "drugName":eachDrug
                    })})
            var ArrayOfResults = await Promise.all(promiseArray);
            console.log(ArrayOfResults);
            ArrayOfResults.map(result=>
                
                setInteractionsInfo(interactionsInfo=>[...interactionsInfo,...result.data]),
                setLoadingMessage('')
            )
        }
        else{
            setLoadingMessage('At least 1 drug and disease profile must be filled')
            return
        }
        
        
        
    }




    let displayedDescriptionAndSeverity = interactionsInfo.map((eachDrug,idx) =>{
            let eachDrugDescription = eachDrug.description.toLowerCase()
            
            for(let disease of diseaseProfile){
                let tempDiseaseName = disease.toLowerCase()

                if(tempDiseaseName.includes(',')){
                    tempDiseaseName =tempDiseaseName.split(',')[0]
                    //console.log(tempDiseaseName)
                }
                if(tempDiseaseName.length >= 10){
                    tempDiseaseName = tempDiseaseName.substring(0,tempDiseaseName.length-2)
                }
     
                if(eachDrugDescription.includes("'s")){
                    eachDrugDescription= eachDrugDescription.replace(/'s/g, '')
                    //console.log(eachDrugDescription)
                }
                
                if(eachDrugDescription.includes(tempDiseaseName)){

                    return(

                        <ul key ={idx} className='individualInteraction_wrapper'>
                            <div className='description_header' >
                                <span id='interaction_drugName'>{eachDrug.drugName}</span><span id='preposition'>With</span><span id='interaction_diseaseName'>{disease}</span><span id='interaction_severity'>Severity:<span id='severity_category'>{eachDrug.severity}</span></span>
                            </div>
                            <li className={`interaction_description ${toggleDescriptionDisplay}`}>Description:{eachDrug.description}</li>
                        </ul>
                    )
                }
            }

        return null
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
    // console.log(interactionsInfo,'test2')
    // console.log(displayedDescriptionAndSeverity,'if no empty result...')
        

    function toggleDescription() {
        setToggleDescriptionDisplayBoolean(toggleDescriptionDisplayBoolean => !toggleDescriptionDisplayBoolean)
        console.log(toggleDescriptionDisplayBoolean)
        if(!toggleDescriptionDisplayBoolean){
            setToggleDescriptionDisplay('yesShow')
        }
        else{
            setToggleDescriptionDisplay('noShow')
        }

    } 

    return(


        <div className="interaction_wrapper_overall">
            <div className='component_name_title'>
                <h1>Interactions</h1>
            </div>
            <div className='interaction_buttons'>
                <button onClick={handleDrugDiseaseAnalysis}>Check Interactions</button>
                <button onClick={()=>setInteractionsInfo([])}> Clear Interactions</button>
                <button onClick={toggleDescription}> Toggle Reveal</button>
            </div>
            <div id='loading_message'>
                {loadingMessage}
            </div>

            <div className='interactionInformations_wrapper'>
                {displayedDescriptionAndSeverity}
            </div>

            
          
       
        </div>
    )


}

export default Interactions