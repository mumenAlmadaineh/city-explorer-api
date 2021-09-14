"use strict";

const express=require('express');
const app=express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const weatherInfo=require('./data/weather.json');
const PORT=process.env.PORT;

app.listen(PORT, ()=>{
    console.log("Hello world");
})



app.get('/weather',(req,res)=>{
    let lat=Number(req.query.lat);
    let lon=Number(req.query.lon);

    
    if (lat&&lon){
        let cityValue=[];
        weatherInfo.find(item=>{
            if(item.lat===lat&&item.lon===lon){
                cityValue.push(item)
            }
        })
        let city=cityValue[0];
        if (cityValue.length>0){
            let foreCast=city.data.map(item=>{
                return {
                    date:item.datetime,
                    description:item.weather.description
                }
            })
            res.status(200).json(foreCast);
        }else{
            res.status(404).send("Error: Your enter not math name of real city")
        }

    }else{
        res.status(400).send("Error: Some of data came from you it's worng");
    }

})