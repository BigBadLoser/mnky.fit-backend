const express = require("express");
const nanoid = require("nanoid");
const validUrl = require("valid-url");
const shortUrlRoute = require("./routes/shorturl")
const getShortenedUrlRoute = require("./routes/getshortenedurl")
import {supabase} from './lib/initSupabase';
const axios = require('axios').default;
import cors from 'cors';

const app = express();
app.options('*', cors())
app.use(express.json({}));
const PORT = 8000;
app.listen(PORT, () => console.log("Server is listening on port " + PORT));


app.use("/",getShortenedUrlRoute)
app.use("/v1/shorturl", shortUrlRoute);

/*
axios({
    method: 'post',
    url: 'http://localhost:8000/v1/shorturl',
    data: {
        longUrl: 'https://treygaulin.com/',
    },
    headers: {
        'Content-Type': 'application/json'
    }
}).then(function (response: any) {
    console.log(response);
}).catch(function (error: any) {
    //console.log(error);
});

*/



async function t() {
let { data : url, error } = await supabase
.from('links').select('*').eq('urlCode', 'goog').single();
console.log(url)
}

