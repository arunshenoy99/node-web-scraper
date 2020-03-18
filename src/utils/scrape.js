const request = require('request')

const scrape = (url, callback) => {
    url = url.trim()
    if (url.startsWith('http://') || url.startsWith('https://')) {
        url = url
    } else {
        url = "http://" + url
    }
    request.get({ url }, (error, response) => {
        if (error) {
            return callback(error, undefined)
        }
        callback(undefined, response.body)
    })
}

module.exports = scrape