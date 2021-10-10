/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
import { nanoid } from 'nanoid';
const validUrl = require("valid-url");
const config = require("../config");

import Url from "../model/Url";
import { supabase } from '../lib/initSupabase';
import util from 'util';
import cors from 'cors';

const shortUrlRoute = express.Router();

shortUrlRoute.post("/", cors(), async (request: any, response: any, next: any)=>{
    const longUrl : string = request.body?.longUrl;
    const baseUrl = config.baseUrl;

    /*
    if(!validUrl.isUri(baseUrl)){
        return response.status(401).json("Internal error. Please come back later.");
    }
    */

    const urlCode = nanoid(4);
    console.log(util.inspect(request.body))
    if(validUrl.isUri(longUrl)){

        try{
            const { data : url, error } = await supabase
            .from('links').select('*').eq('longUrl', longUrl).single();
            if(url){
                return response.status(200).json(url);
            }else{

                const shortUrl = baseUrl + "/" + urlCode;
                const url  = new Url(
                    urlCode,
                    longUrl,
                    shortUrl,
                    0
                );
                
                const { data, error } = await supabase
                .from('links')
                .upsert(url);


                return response.status(201).json(url);
            }
        }catch(err){
            console.error(err);
            return response.status(500).json("Internal Server error " + err);
        }
    }else{
        response.status(400).json("This URL is invalid, please enter a valid URL.");
    }    
});

module.exports = shortUrlRoute;