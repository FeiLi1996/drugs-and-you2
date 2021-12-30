const express = require('express')
const router = express.Router();
const puppeteer = require('puppeteer');


    router.post('/interaction',(req,res)=>{

        let overallInteractionDescription =[];

        const gettingInteractionDescription = async (name) =>{
            
            let interactionDescriptionUrl = `https://www.drugs.com/disease-interactions/${name}`
        
            let browser = await puppeteer.launch()
            let page = await browser.newPage()
            
        
            await page.goto(interactionDescriptionUrl , {waitUntil:'networkidle2'})
        
            const data = await page.evaluate(()=>{

             

                let drugAndDiseasesArrayList
          
                let interactionDescriptionArrayList
                let interactionSeverityArrayList

                try {
                    drugAndDiseasesArrayList = [...document.querySelectorAll('.interactions-reference')]
                    interactionSeverityArrayList = drugAndDiseasesArrayList.map(eachInteraction =>
                        eachInteraction.querySelector('div').querySelector('span').innerText    
                    )
                    interactionDescriptionArrayList = drugAndDiseasesArrayList.map(eachInteraction =>
                        eachInteraction.getElementsByTagName('p')[1].innerText   
                    )

                            
                } catch (error) {
                    console.log(error)
                }

                return{
                    interactionSeverityArrayList,
                    interactionDescriptionArrayList
                   
                }
            })
            await browser.close()

            return   {
                data
            }
        }
        const interactionDescriptionData =   gettingInteractionDescription (req.body.drugName)

        interactionDescriptionData.then(result =>{

            for(let i =0;i<result.data.interactionSeverityArrayList.length;i++ ){
                    overallInteractionDescription.push({
                        'drugName': req.body.drugName,
                        'severity':result.data.interactionSeverityArrayList[i],
                        'description':result.data.interactionDescriptionArrayList[i]
                    })
                }

            res.json(overallInteractionDescription)
        })
        
        
      
    })

module.exports = router;
