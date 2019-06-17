const validator = require('validator')
const request = require('request')

const entry = (callback) => {
    request({json: true},(error,response)=>{
        callback(undefined,{
            data: 'hello'
        })
    })
}


module.exports = entry