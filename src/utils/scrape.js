const request = require('request')

const scrape = (url, callback) => {
    request.get({ url }, (error, { body } = undefined) => {
        if (error) {
            return callback(error, undefined)
        }
        console.log(body)
    })
}

module.exports = scrape