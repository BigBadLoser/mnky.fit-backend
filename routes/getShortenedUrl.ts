/* eslint-disable @typescript-eslint/no-unused-vars */
const express = require("express");
const config = require("../config");
//const Url = require("../model/url");
import cors from 'cors';
import { supabase } from '../lib/initSupabase'

const getShortenUrlRoute = express.Router();
getShortenUrlRoute.get('/:shortUrl', cors(), async (request: any, response: any) => {
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
            return response.status(400).json("The short url doesn't exists in our system.");
        }
    }
    catch (err) {
        console.error("Error while retrieving long url for shorturlcode " + shortUrlCode);
        return response.status(500).json("There is some internal error.");
    }
})

module.exports = getShortenUrlRoute;