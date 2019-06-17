const request = require('request')
const express = require('express')
const hbs = require('hbs')
const nodemailer = require('nodemailer')
const standings = require('./utils/standings.js')
const entry = require('./utils/entry.js')
const home = require('./utils/home.js')
const matchstats = require('./utils/matchstats.js')
//const sendEmail = require('../public/js/check.js')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
app.set('view engine','hbs')

const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//setup for static files
app.use(express.static(path.join(__dirname,'../public')))

teams = []

// sendEmail = (email)=>{
//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: 'sherwyndsouza1999@gmail.com',
//           pass: 'sshheerr11D'
//         }
//       });
      
//       var mailOptions = {
//         from: 'sherwyndsouza1999@gmail.com',
//         to: email,
//         subject: 'Sending Email using Node.js',
//         text: 'That was easy!'
//       };

//       transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//           console.log(error);
//         } else {
//           console.log('Email sent: ' + info.response);
//         }
//       });
// }


function bubble_Sort(data){

    var len = 20,
        i, j, stop;

    for (i=0; i < len-1; i++){
        for (j=0; j<len-1; j++){
            if (data.stuff[j].overall_league_PTS < data.stuff[j+1].overall_league_PTS){
                    var b = data.stuff[j];
                    data.stuff[j] = data.stuff[j+1];
                    data.stuff[j+1] = b;
                
            }
        }
    }
    console.log("New Start")
    console.log(data)
    console.log("New End")
    return data;
}

function select(data){
    for(i=0;i<10;i++){
        if(data.stuff[i].match_hometeam_name === 'Manchester City' || data.stuff[i].match_awayteam_name === 'Manchester City'){
            console.log("New RESULT START")
            console.log(data.stuff[i])
            console.log("New RESULT END")
            return data.stuff[i]
        }
    }
}


app.get('',(req,res)=>{
    entry((error,data) =>{
        res.render('entry',{data})
    })
})

app.get('/standings',(req,res) =>{
    standings((error,data) =>{
        console.log('Start')
        console.log(data.stuff[0].team_name)
        bubble_Sort(data)
        console.log('end')
        console.log("TYPE",typeof(data.stuff[0]))
        res.render('standings',{
            data0:data.stuff[0],
            data1:data.stuff[1],
            data2:data.stuff[2],
            data3:data.stuff[3],
            data4:data.stuff[4],
            data5:data.stuff[5],
            data6:data.stuff[6],
            data7:data.stuff[7],
            data8:data.stuff[8],
            data9:data.stuff[9],
            data10:data.stuff[10],
            data11:data.stuff[11],
            data12:data.stuff[12],
            data13:data.stuff[13],
            data14:data.stuff[14],
            data15:data.stuff[15],
            data16:data.stuff[16],
            data17:data.stuff[17],
            data18:data.stuff[18],
            data19:data.stuff[19]

        })
    
    })
})

app.get('/home',(req,res)=>{
    home((error,data) =>{
        console.log("RESULT START")
        console.log(data)
        console.log("RESULT END")
        console.log("LENGTH",data.stuff.length)
        const team = select(data)
        console.log("TEAM START")
        console.log(team)
        console.log("TEAM END")
        res.render('home',{
            team: team,
            result0: data.stuff[0],
            result1: data.stuff[1],
            result2: data.stuff[2],
            result3: data.stuff[3],
            result4: data.stuff[4],
            result5: data.stuff[5],
            result6: data.stuff[6],
            result7: data.stuff[7],
            result8: data.stuff[8],
            result9: data.stuff[9],
        })
    })
})

app.get('/matchstats',(req,res) => {
    matchstats((error,data) => {
        
    })
})





app.listen(port, () => {
    console.log("Sever is up on port "+port)
})