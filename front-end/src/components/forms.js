import React from "react";


// export function DrugForm (prop){

//     return(

//         <form onSubmit={(e)=>prop.handleDrugFormSubmission(e)} autoComplete ='off'>
//         <div>
//             <div>
//                 <label>Drug Name: </label>
//                 <input
//                     type="text"
//                     name='drug_name'
//                     placeholder="Drug Name"
//                 />
           
//             </div>
//             <button type="submit">Submit</button>
//         </div>
//     </form>
//     )
// }



// export function DiseaseForm (prop){

//     return(

//         <form onSubmit={(e)=>prop.handleDiseaseFormSubmission(e)} autoComplete ='off'>
//         <div>
//             <div>
//                 <label>Disease Name: </label>
//                 <input
//                     type="text"
//                     name='disease_name'
//                     placeholder="Disease Name"
//                 />
           
//             </div>
//             <button type="submit">Submit</button>
//         </div>
//     </form>
//     )
// }

export function DynamicForm (props){

    return(

        <form onSubmit={(e)=>props.handleFormSubmission(e)} autoComplete ='off'>
        <div>
            <div>
                <label>{props.labelName} </label>
                <input
                    type="text"
                    name={props.inputName}
                    placeholder={props.placeholder}
                />
           
            </div>
            <button type="submit">Submit</button>
        </div>
    </form>
    )
}
