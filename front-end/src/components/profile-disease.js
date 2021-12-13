import React,{useState,useContext} from 'react'


import { GlobalContext } from '../GlobalContext'
import { DiseaseForm } from './forms'
import httpClient from '../helper/httpClient'

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
       console.log(event.target.disease_name.value)

       httpClient.post("http://localhost:5000/diseaseName", {
        "diseaseName":event.target.disease_name.value
        }).then(response=>{
  

            let diseaseNameSingle=response.data.diseaseNameSingle
            let diseaseNameMultipleArrayList=response.data.diseaseNameMultipleArrayList
            
            let diseaseNameSingleCondition=diseaseNameSingle.includes('Check')
            let diseaseNameMultipleArrayListCondition=diseaseNameMultipleArrayList.includes('Check')
            console.log(diseaseNameSingleCondition,'single')
            console.log(diseaseNameMultipleArrayListCondition,'multiple')
            console.log(response.data)
            if( !diseaseNameSingleCondition  && diseaseNameMultipleArrayListCondition){
                setSearchResult ([diseaseNameSingle])
            }
            else if(diseaseNameSingleCondition && !diseaseNameMultipleArrayListCondition){
                setSearchResult (diseaseNameMultipleArrayList)
            }
            else{
                if( diseaseNameSingleCondition &&  diseaseNameMultipleArrayListCondition){
                    setSearchResult (["Check your spelling"])
                }

            }
            

        //setSearchResult(response.data.drugName)   
        }).catch(error=>{
            console.log(error)
        })
       //setSearchResult([event.target.disease_name.value])   

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