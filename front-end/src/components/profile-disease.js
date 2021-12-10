import React,{useState,useContext} from 'react'


import { GlobalContext } from '../GlobalContext'
import { DiseaseForm } from './forms'

const ProfileDisease = () => {
    const {diseaseProfile,setDiseaseProfile} = useContext(GlobalContext)
    const [searchResult,setSearchResult] = useState([])

    
   //api calls
   function deleteDiseaseFromProfile(idx){
        let tempCopy
        tempCopy = JSON.parse(JSON.stringify(diseaseProfile));
        tempCopy.splice(idx,1)
        setDiseaseProfile(tempCopy)
   }
   function addDiseaseProfile (newDisease){

    // let tempCopy;

    // tempCopy = JSON.parse(JSON.stringify(drugProfile));
    setDiseaseProfile([...diseaseProfile,newDisease])
 
   }
   function handleDiseaseFormSubmission(event){
       event.preventDefault()
       setSearchResult([event.target.disease_name.value])   

   }
   console.log('hello')
    return(


        <div>

            <h1>ProfileDisease</h1>
            <h6>Please Read</h6>

            <div>
                <ul  className="disease_list">
                    {diseaseProfile.map((disease,idx)=>
                    <li   className="disease" key={idx}> 
                        {disease} <span  className="drug_modal_action" onClick = {()=>deleteDiseaseFromProfile(idx)}> X</span>
                    </li>

                    )}
                                
                </ul>   
            </div>
            <DiseaseForm handleDiseaseFormSubmission ={handleDiseaseFormSubmission}/>
            {(searchResult) && !searchResult.includes("Check") ?
                (<ul className="disease_search_list">
                    {searchResult.map((disease,idx)=>
                        <li   className="search_disease" key={idx}> 
                            {disease} <span  className="drug_modal_action" onClick = {()=>addDiseaseProfile(disease)}> +</span>
                        </li>

                    )}
                </ul>
                )
            :
            (
                (<ul>
                    <li>{searchResult} </li>
                </ul>
                )
            )}
   
                 
                                
        
            
        </div>
    )


}

export default ProfileDisease