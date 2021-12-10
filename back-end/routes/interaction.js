const express = require('express')
const router = express.Router();
const puppeteer = require('puppeteer');




    router.post('/interaction',(req,res)=>{
        console.log(req.body)
        

        const gettingInteractionDescription = async (name) =>{
            
            let interactionDescriptionUrl = `https://www.drugs.com/disease-interactions/${name}`
        
            let browser = await puppeteer.launch()
            let page = await browser.newPage()
            
        
            await page.goto(interactionDescriptionUrl , {waitUntil:'networkidle2'})
        
            const data = await page.evaluate(()=>{

                let drugAndDiseasesNodeList1
                let drugAndDiseasesNodeList2
                let drugAndDiseasesArrayList
                let drugAndDiseasesSeverityClassArrayList
                let interactionDescriptionNodeList
                let interactionDescriptionArrayList
                let interactionDescriptionSeverityArrayList
                try{
                    interactionDescriptionNodeList = [...document.querySelectorAll('.interactions-reference')]
                    interactionDescriptionArrayList = interactionDescriptionNodeList.map(oneInteraction =>
                        oneInteraction.getElementsByTagName('p')[1].innerHTML
                    )
                    interactionDescriptionSeverityArrayList = interactionDescriptionNodeList.map(oneInteraction =>
                        oneInteraction.getElementsByTagName('p')[0].innerHTML
                    )
                }
                catch(err){
                    interactionDescriptionArrayList = "Check your spelling"
                }
                
                try{
                    drugAndDiseasesNodeList1 = document.querySelector("ul.interactions")
                    drugAndDiseasesNodeList2 = [...drugAndDiseasesNodeList1.querySelectorAll('li')]
                    drugAndDiseasesArrayList = drugAndDiseasesNodeList2.map(oneInteraction =>
                        oneInteraction.innerText
                    )
                    drugAndDiseasesSeverityClassArrayList = drugAndDiseasesNodeList2.map(oneInteraction =>
                        oneInteraction.getAttribute("class")
                    )
                }
                catch(err){
                    drugAndDiseasesArrayList = "Check your spelling"
                }






               
                return{
                    drugAndDiseasesArrayList,
                    drugAndDiseasesSeverityClassArrayList,
                    interactionDescriptionArrayList,
                    interactionDescriptionSeverityArrayList
                }
            })
            await browser.close()
            return   {
                data
            }
        }
        const interactionDescriptionData =   gettingInteractionDescription (req.body.drugName)
        //console.log(drugNameTest)
        interactionDescriptionData.then(result =>
            //console.log(result.data)
            res.json(result.data)

        )
      
    })

module.exports = router;
