import React,{useState} from 'react'


import { GlobalContext } from '../GlobalContext'
import Interactions from '../components/interaction'
import ProfileDisease from '../components/profile-disease'
import ProfileDrug from '../components/profile-drug'
import Introduction from '../components/intro'


const HomePage = () => {
    const [drugProfile,setDrugProfile] = useState(['ibuprofen','sushi']);
    const [diseaseProfile,setDiseaseProfile] = useState(['Asthma']);
    const [drugDiseaseInteractionInfo,setDrugDiseaseInteractionInfo] = useState([]);
  
    // let INITIAL_STATE={
    //     drugProfile:[],
    //     diseaseProfile:[],
    //     drugDiseaseInteractionInfo:[
    //         {
    //             drugName:'ibuprofen',
    //             interactionList:[],
    //             interactionDescriptionAndSeverity:[
    //                 {   
    //                     diseaseName:'Asthma',
    //                     description:'blah',
    //                     severity:'blah'
    //                 },
    //                 {   
    //                     diseaseName:'Fluid Retention',
    //                     description:'blah',
    //                     severity:'blah'
    //                 },
    //             ]
    //         }
    //     ]
    // }
    return(


        <div>

            <GlobalContext.Provider value = {{drugProfile,setDrugProfile,diseaseProfile,setDiseaseProfile}}>
                < Introduction/>
                <ProfileDrug />
                <ProfileDisease />

                <Interactions />
            </GlobalContext.Provider>
        </div>
    )


}

export default HomePage