import React from "react";


export function DrugForm (prop){

    return(

        <form onSubmit={(e)=>prop.handleDrugFormSubmission(e)} autoComplete ='off'>
        <div>
            <div>
                <label>Drug Name: </label>
                <input
                    type="text"
                    name='drug_name'
                    placeholder="Drug Name"
                />
           
            </div>
            <button type="submit">Submit</button>
        </div>
    </form>
    )
}

