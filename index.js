// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
    res.json({ greeting: 'hello API' });
});

app.get('/api', function (req, res) {
    const currDate = new Date();
    // Convert the date to UTC string format
    const utcString = currDate.toUTCString();

    // Convert the date to Unix timestamp in milliseconds
    const unixTimestamp = currDate.getTime();

    // Return the JSON object with the Unix timestamp and UTC string
    res.json({ unix: unixTimestamp, utc: utcString });
});

// Route to handle requests to /api/:date
app.get('/api/:date', function (req, res) {
    let inputDate;

    if (+req.params.date) {
        inputDate = +req.params.date;
    } else {
        inputDate = req.params.date;
    }

    // Check if the input date is in a valid format
    const dateObject = new Date(inputDate);
    if (isNaN(dateObject.getTime())) {
        return res.status(400).json({ error: 'Invalid date format' });
    }

    // Convert the date to UTC string format
    const utcString = dateObject.toUTCString();

    // Convert the date to Unix timestamp in milliseconds
    const unixTimestamp = dateObject.getTime();

    // Return the JSON object with the Unix timestamp and UTC string
    res.json({ unix: unixTimestamp, utc: utcString });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
