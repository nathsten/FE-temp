const scedule = require('node-schedule');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const updateFintechFantacy = require('./Yahoo');
const PORT = process.env.PORT || 6789;
const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config({path: './.env'});

const PWD = process.env.PWD;
const uri = process.env.API_KEY.replace(/\<(.*?)\>/, PWD);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect();

const app = express();

app.use('/', express.static('public'));
app.use(cors());

app.listen(PORT, e => e ? console.log(e) : console.log(`Server running on port:${PORT}`));

const rule = new scedule.RecurrenceRule();
rule.minute = new scedule.Range(0,59, 15);

const job = scedule.scheduleJob(rule, async () => {
    const getDate = await fetch("https://www.timeapi.io/api/Time/current/zone?timeZone=Europe/Oslo");
    const dateData = await getDate.json();
    const DATE = new Date(dateData.dateTime);
    const HOUR = DATE.getHours();
    const DAY = DATE.getDay();
    // Sjekker at det er en ukedag (man-fre) mellom kl. 09:00 og 17:00. 
    if(HOUR >= 9 && HOUR <= 16 && DAY >= 1 && DAY <= 5)
        // updateFunds();
        updateFintechFantacy();

    else{
        console.log("Outside openings...")
    }
})

app.get('/getFunds', async (req, res) => {
    try{
        const dataset = await (await client.db('Cluster0').collection('FintechFantacy').find({}).toArray()).sort(( a, b ) => a.date - b.date).slice(0, 216);
        res.send({status: "OK", dataset});
    }
    catch(err){
        res.send({status: "Klarte ikke hente dataset, vennligst oppdater siden."});
        console.log(err);
    }
});

// (async () => {
//     const dataset = await client.db('Cluster0').collection('FantacyFondDates').find({}).toArray();
//     await client.db('Cluster0').collection('FantacyFondDatesExtra').insertMany(dataset);
// })()

// Lage program som fikser det med dato i Clusteret. 

// const { readFileSync } = require('fs');

// const data = JSON.parse(readFileSync('tst.json'));

// const entries = Object.keys(data);
// delete data[entries[0]];

// console.log("Starting...");

// entries.forEach(async e => {
//     const p = data[e];
//     const time = e.replaceAll(".", "").replaceAll(",", "").split(" ");
//     const [ day, date, month, year, klstr, klFull ] = time;
//     var [ hour, min ] = klFull.split(":");

//     const dateObj = new Date( year, MONTHS.indexOf(month), date, +hour+1, +min );
//     console.log({time: e, price: p, date: dateObj})

//     await client.db('Cluster0').collection('FantacyFondDates').insertOne({time: e, price: p, date: dateObj});
// })


// (async () => {
//     const dataset = (await client.db('Cluster0').collection('FantacyFond').find({}).toArray());
//     dataset.forEach(async data => {
//         const time = data.time.replaceAll(".", "").replaceAll(",", "").split(" ");
//         const [ day, date, month, year, klstr, klFull ] = time;
//         const [ hour, min ] = klFull.split(":");

//         const dateObj = new Date( year, MONTHS.indexOf(month), date, +hour, +min );
//         await client.db('Cluster0').collection("FantacyFondDates").insertOne({time: data.time, price: data.price, date: dateObj });
//     })
    
// })();
