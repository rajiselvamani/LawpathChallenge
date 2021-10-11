
//import dependencies
const express = require('express');
const request = require('request');
const cors = require('cors')


//using express and cors
const app = express();
app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

//header with api key
var headers = {
    'Content-Type': 'application/json',
    'AUTH-KEY': '872608e3-4530-4c6a-a369-052accb03ca8'
};

//calling external api

app.get('/postcode/search/:Postcode', (req, res) => {
    request.get({ url: `https://digitalapi.auspost.com.au/postcode/search?q=${req.params.Postcode}`, headers: headers }, function (error, response, body) {
        if (response.statusCode !== 200) {
            return res.status(500).json({ message: "failed to fetch" });
        }
        return res.status(200).json({ body });
    });

});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));