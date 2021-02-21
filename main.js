const express = require('express')
const bodyParser = require('body-parser')
var path = require('path')

const PORT = 4000

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/public", express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.redirect('/login')
})

app.get('/login', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') })
})

app.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  if (username === 'admin' && password === 'admin') {
    res.redirect('/dashboard')
  } else {
    res.status(401).sendFile('loginfail.html', { root: path.join(__dirname, 'public') })
  }
})

app.get('/dashboard', (req, res) => {
  res.sendFile('dashboard.html', { root: path.join(__dirname, 'public') })
})

app.get('/heartbeat', (req, res) => {
  res.send({uptime: process.uptime()})
})

app.listen(PORT, () => console.log(`Server is running`))
