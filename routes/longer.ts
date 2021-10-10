/* eslint-disable @typescript-eslint/no-unused-vars */
const express = require("express");
const config = require("../config");
//const Url = require("../model/url");
import cors from 'cors';
import { supabase } from '../lib/initSupabase'

const longer = express.Router();
longer.get('/', cors(), async (request: any, response: any, next: any) => {
    response.send("v1");
});

module.exports = longer;


