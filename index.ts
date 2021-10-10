const express = require("express");
const nanoid = require("nanoid");
const validUrl = require("valid-url");
const shortUrlRoute = require("./routes/shorturl")
const getShortenedUrlRoute = require("./routes/getshortenedurl")
const longer = require("./routes/longer")
import {supabase} from './lib/initSupabase';
const axios = require('axios').default;
import cors from 'cors';

const app = express();
app.options('*', cors())
app.use(express.json({}));
const PORT = 80;
app.listen(PORT, () => console.log("Server is listening on port " + PORT));


//app.use(/^\/(?!v1\/shorturl)([a-z0-9/]+)$/, getShortenedUrlRoute);
app.use(getShortenedUrlRoute)



async function t() {
let { data : url, error } = await supabase
.from('links').select('*').eq('urlCode', 'goog').single();
console.log(url)
}

