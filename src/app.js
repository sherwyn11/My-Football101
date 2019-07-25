const FootballData = require('footballdata-api-v2').default;
require('dotenv').config(); //To get Key for API
const footballData = new FootballData(process.env.myKey);
const express = require('express');
const hbs = require('hbs');
const path = require('path');
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
let homeYear = 2018;
let favouriteTeam = 'Arsenal FC';

app.post('/signIn', (req, res) => {
    console.log(req.body);
    //Add to database here
});

app.get('/entry', (req, res) => {
    res.render('entry',{});
});


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
        res.render('home', {
            response: response,
            favTeam: favouriteTeam
        });
    });
});

app.post('/set-year', async (req, res) => {
    standingsYear = await req.body.year;
});

app.listen(port, () => {
    console.log("Server is up on port "+port)
});