const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/football_database_new',{
    useNewUrlParser: true,
    useCreateIndex: true
})


//  users.save().then(() => {
//     console.log(users)
//  }).catch((error) =>{
//     console.log("Error",error)
//  })