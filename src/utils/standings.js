const request = require('request')

const standings = (callback) => {
    const url = 'https://apifootball.com/api/?action=get_standings&league_id=62&APIkey=1ebd09c1f3fbb60dc41a4e861e7a3c97cb0594ca880c9965e4369f4560e2081a'

    request({url, json: true},(error,response)=>{
        callback(undefined,{
            stuff: response.body
        })
    })
}
module.exports = standings