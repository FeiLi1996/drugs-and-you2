import React, { useContext } from 'react'
import { GlobalContext } from '../GlobalContext'

const ProfileDrug = () => {
    const {drugProfile,setDrugProfile} = useContext(GlobalContext)
    const {diseaseProfile,setDiseaseProfile} = useContext(GlobalContext)
    console.log(drugProfile)
    return(


        <div>

            <h1>ProfileDrug</h1>
            <h6>Please Read</h6>
            {drugProfile}
            {diseaseProfile}
            <div onClick = {()=>setDrugProfile([...drugProfile,'asp'])}>click me</div>
        </div>
    )


}

export default ProfileDrug