const express = require('express')
const path = require('path')
const hbs = require('hbs')
const fs = require('fs')
const { parse } = require('node-html-parser')
const validator = require('validator')

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

app.get('/check', (req,res) => {
    const url = req.query.url
    const isValid = validator.isURL(url.trim())
    if (isValid) {
        res.send("Valid")
    } else {
        res.status(400).send('Invalid')
    }
})

app.get('/scrape', (req, res) => {
    const url = req.query.url
    scrape(decodeURIComponent(url), (error, html) => {
        if (error) {
            console.log(error)
            return res.status(400).send()
        }
        const root = parse(html)
        const title = (root.querySelector('title').childNodes[0].rawText)
        const filePath = webFilesPath + `/${title}.html`
        fs.writeFileSync(filePath, html)
        res.download(filePath, function (err) {
            fs.unlinkSync(filePath)
        })
    })
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Server is up and running on port ' + PORT)
})


