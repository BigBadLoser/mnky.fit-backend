/* eslint-disable @typescript-eslint/no-unused-vars */
const express = require("express");
const config = require("../config");
const shortUrlRoute = require("./shorturl")
import cors from 'cors';
import { supabase } from '../lib/initSupabase'

const getShortenUrlRoute = express.Router();
getShortenUrlRoute.get('/:shortUrl', cors(), async (request: any, response: any, next: any) => {
    const shortUrlCode = request.params.shortUrl;
    let { data: url, error } = await supabase
        .from('links').select('*').eq('urlCode', shortUrlCode).single();

    try {
        if (url) {
            let timesClicked : number = url.timesClicked;
            timesClicked++;

            const {error } = await supabase
            .from('links')
            .update({ 'timesClicked': timesClicked })
            .eq('urlCode', shortUrlCode)
            return response.redirect(url.longUrl);
        } else {
            if(request.url.length == 5){
                return response.status(400).json("The short url doesn't exists in our system.");
            }
            else {
                next();
            }
        }
    }
    catch (err) {
        console.error(err);
        //return response.status(500).json("There is some internal error.");
        next();
    }
})
getShortenUrlRoute.use("/v1/shorturl", shortUrlRoute);
getShortenUrlRoute.use("/", express.static("public"));
getShortenUrlRoute.get('/*', async (request: any, response: any, next: any) => {
    response.send("hello world");
})

module.exports = getShortenUrlRoute;


