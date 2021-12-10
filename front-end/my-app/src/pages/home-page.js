import React from 'react'
import Interactions from '../components/interaction'
import ProfileDisease from '../components/profile-disease'
import ProfileDrug from '../components/profile-drug'


const HomePage = () => {


    return(


        <div>

            <h1>Drugs and You2</h1>
            <h6>Please Read</h6>

            <ProfileDrug />
            <ProfileDisease />

            <Interactions />
        </div>
    )


}

export default HomePage