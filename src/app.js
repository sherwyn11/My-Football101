const FootballData = require('footballdata-api-v2').default;
require('dotenv').config(); //To get Key for API
const footballData = new FootballData(process.env.myKey);
const express = require('express');
const hbs = require('hbs');
var md5 = require('md5');
const path = require('path');
const mongodb = require('mongodb')
require('./db/mongoose')
const User = require('./models/user')

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


function sort (response){
    i = 0
    while(i < response.length){
        if(response[i].homeTeam.name === favouriteTeam){
            response.unshift(response[i])
        }
        i++;
    }

    return response
}

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
    //console.log(favouriteTeam)

    user.save().then(() => {
        res.send(user)
    }).catch((error) =>{
        console.log("error",error.message)
        res.status(400).send(error.message)
    })

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


app.get('/login', (req, res) => {
    res.render('login',{
    });
});

app.post('/LogIn', async (req, res) => {
    Email = await req.body.e;
    pass = await req.body.p;
    Password = md5(pass)

    console.log(Email,pass)

    // User.find({email:Email}).then((users)=>{
    //     console.log(users)
    // }).catch((e) => {
    //     res.status(500).send()
    // })

    gotuser = []
    obj = {}

    User.find({email:Email,password:Password}).then((user)=>{ 
        if(user.length == 0){
            return res.send(true)
        }else{
            //favouriteTeam = user[0].favTeam
            return res.send(false)
        }     
    }).catch((e)=>{
        console.log(e)
        res.status(500).send()
    })
});

app.get('/users',(req,res) => {
    User.find({}).then((users)=>{
        console.log(users)
    }).catch((e) => {

    })
})

app.get('/standings', (req, res) => {
    footballData.getStandingsFromCompetition({
        competitionId: 2021,
        season: standingsYear,
        standingType: 'TOTAL',
    }).then((data) => {
        response = data.standings[0].table;
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
        // console.log(response[0].homeTeam.name)
        response = sort(response)
        console.log('SORTEDD?')
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