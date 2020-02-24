const express = require('express')
const path = require('path')
const hbs = require('hbs')

const scrape = require('./utils/scrape')

const app = express()

const staticPath = path.join(__dirname, '../public')
const webFilesPath = path.join(__dirname, '../html')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(staticPath))

app.get('', (req, res) => {
    res.render('index')
})

app.get('/scrape', (req, res) => {
    const url = req.query.url
    scrape(url, (error, response) => {
        if (error) {
            return res.status(400).send()
        }
        res.send("hello")
    })
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Server is up and running on port ' + PORT)
})


