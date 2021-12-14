import React, { useContext,useState } from 'react'



import { GlobalContext } from '../GlobalContext'
import {DynamicForm} from './forms'
import httpClient from '../helper/httpClient'

const ProfileDrug = () => {
    const {drugProfile,setDrugProfile} = useContext(GlobalContext)
    const [searchResult,setSearchResult] = useState('Search a drug')

    //const {diseaseProfile,setDiseaseProfile} = useContext(GlobalContext)
   //api calls
   function deleteDrugFromProfile(idx){
        let tempCopy
        tempCopy = JSON.parse(JSON.stringify(drugProfile));
        tempCopy.splice(idx,1)
        setDrugProfile(tempCopy)
   }
   function addDrugProfile (newDrug){

    // let tempCopy;

    // tempCopy = JSON.parse(JSON.stringify(drugProfile));
    setDrugProfile([...drugProfile,newDrug])
    setSearchResult('Search a drug')
   }
   function handleDrugFormSubmission(event){
       event.preventDefault()


       httpClient.post("http://localhost:5000/drugName", {
        "drugName":event.target.drug_name.value
        }).then(response=>{

            //console.log(response.data.drugName)
        setSearchResult(response.data.drugName)   
        }).catch(error=>{
            console.log(error)
        })

   }
    
    return(


        <div>

            <h1>ProfileDrug</h1>
            <div>
                <ul  className="medication_list">
                    {drugProfile.map((drug,idx)=>
                    <li   className="medication" key={idx}> 
                        {drug} <span  className="drug_modal_action" onClick = {()=>deleteDrugFromProfile(idx)}> X</span>
                    </li>

                    )}
                                
                </ul>   
            </div>
          
            {drugProfile}
            
            <DynamicForm handleFormSubmission={handleDrugFormSubmission} labelName = "Drug Name:" inputName="drug_name" placeholder ="Drug Name"/>
            {/* <div onClick = {()=>setDrugProfile([...drugProfile,'asp'])}>click me</div> */}

            {(searchResult) && !searchResult.includes("Check") && !searchResult.includes("Search") ?
                (<ul>
                    <li>{searchResult} <span onClick = {()=>addDrugProfile(searchResult)}>+</span></li>
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

export default ProfileDrug