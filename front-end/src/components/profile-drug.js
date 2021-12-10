import React, { useContext,useState } from 'react'
import { GlobalContext } from '../GlobalContext'
import { DrugForm } from './forms'

const ProfileDrug = () => {
    const {drugProfile,setDrugProfile} = useContext(GlobalContext)
    const [searchResult,setSearchResult] = useState('')

    //const {diseaseProfile,setDiseaseProfile} = useContext(GlobalContext)
   //api calls
   function deleteDrugFromProfile(idx){
        let tempCopy
        tempCopy = JSON.parse(JSON.stringify(drugProfile));
        tempCopy.splice(idx,1)
        setDrugProfile(tempCopy)
   }
   function addDrugProfile (event){
    event.preventDefault()
    let tempCopy;
    let newDrug = event.target.drug_name.value
    tempCopy = JSON.parse(JSON.stringify(drugProfile));
    setDrugProfile([...tempCopy,newDrug])     
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
            
            <DrugForm addDrugProfile={addDrugProfile}/>
            {/* <div onClick = {()=>setDrugProfile([...drugProfile,'asp'])}>click me</div> */}
        </div>
    )


}

export default ProfileDrug