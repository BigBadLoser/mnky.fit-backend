const express = require("express");
import { nanoid } from 'nanoid';
const validUrl = require("valid-url");
const config = require("config");
const Url = require("../model/url");

var shortUrlRoute = express.Router();

shortUrlRoute.post("/", async (request, response)=>{
    const longUrl = request.body.longUrl;
    const baseUrl = config.get("baseURL");
    if(!validUrl.isUri(baseUrl)){
        return response.status(401).json("Internal error. Please come back later.");
    }

    const urlCode = nanoid(4);

    if(validUrl.isUri(longUrl)){

        try{
            var url = await Url.findOne({longUrl : longUrl});
            if(url){
                return  response.status(200).json(url);
            }else{

                const shortUrl = baseUrl + "/" + urlCode;
                url  = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    clickCount: 0
                });
                
                await url.save()
                return response.status(201).json(url);
            }
        }catch(err){
            console.error(err.message);
            return response.status(500).json("Internal Server error " + err.message);
        }
    }else{
        response.status(400).json("This URL is invalid, please enter a valid URL.");
    }    
});

module.exports = shortUrlRoute;