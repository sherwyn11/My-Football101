const FootballData = require('footballdata-api-v2').default;
require('dotenv').config(); //To get Key for API
console.log(process.env.myKey)
const footballData = new FootballData(process.env.myKey);
const express = require('express');
const hbs = require('hbs');
var md5 = require('md5');
const path = require('path');
const mongodb = require('mongodb')
require('./db/mongoose')
const User = require('./models/user')

// const Mongoclient = mongodb.MongoClient
// const connectionURL = 'mongodb://127.0.0.1:27017'
// const databaseName = 'football_database'
// const bodyParser = require('body-parser');
// const urlEncodedParser = bodyParser.urlencoded({extended: true});

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//setup for static files
app.use(express.static(path.join(__dirname,'../public')))
app.use(express.json());


let standingsYear = 2018;
let matchDay = 1;
let homeYear = 2019;
let favouriteTeam;

app.post('/signIn', async (req, res) => {
    Name = await req.body.name;
    Contact = await req.body.con;
    Email = await req.body.e;
    pass = await req.body.p;
    FavTeam = await req.body.ft;
    Password = md5(pass)

    console.log(Name)

    const user = new User({
        name: Name,
        contact: Contact,
        email: Email,
        favTeam: FavTeam,
        password: Password
    })
    console.log(user)
    favouriteTeam = FavTeam
    console.log(favouriteTeam)

    user.save().then(() => {
        //console.log(user)
    }).catch((error) =>{
        console.log("error",error.message)
        res.send(error.message)
        //console.log("Error",error.message)
    })

    
    //console.log(req.body)
    // Mongoclient.connect(connectionURL, {useNewUrlParser: true}, (error,client) => {
    //     if(error){
    //        return console.log('Unable to connect to database')
    //     }
    
    //     const db = client.db(databaseName)
        
    //     db.collection('users').insertOne({
    //         Name: name,
    //         Contact: contact,
    //         Email: email,
    //         Password: password,
    //         favouriteTeam: favTeam
    //     }, )

    //     app.use(cookieSession({
    //         name: 'session',
    //         keys: ['key1', 'key2']
    //       }))
    // })
});

app.get('/entry', (req, res) => {
    footballData.getStandingsFromCompetition({
        competitionId: 2021,
        season: standingsYear,
        standingType: 'TOTAL',
    }).then((data) => {
        response = data.standings[0].table;
        res.render('entry', {
            response
        });
    });
});


app.get('/standings', (req, res) => {
    footballData.getStandingsFromCompetition({
        competitionId: 2021,
        season: standingsYear,
        standingType: 'TOTAL',
    }).then((data) => {
        response = data.standings[0].table;
        console.log("RESPONSE",response)
        res.render('standings', {
            response
        });
    });
});

app.get('/get-favourite', (req, res) => {
    res.json({favouriteTeam});
});

app.get('/home',(req,res)=>{
    footballData.getMatchesFromCompetition({
        competitionId: 2021,
        season: homeYear,
        matchday: matchDay,
    }).then((data) => {
        response = data.matches;
        console.log(response)
        res.render('home', {
            response
        });
    });
});

app.post('/set-year', async (req, res) => {
    standingsYear = await req.body.year;
});

app.listen(port, () => {
    console.log("Server is up on port "+port)
});