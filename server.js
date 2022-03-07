const express = require('express')
const { resolve } = require('path')

const app = express()

app.use('/', express.static(resolve(__dirname, './build')))
app.use('/books', express.static(resolve(__dirname, './build')))
app.use('/publishers', express.static(resolve(__dirname, './build')))
app.use('/users', express.static(resolve(__dirname, './build')))
app.use('/rents', express.static(resolve(__dirname, './build')))

app
.listen(process.env.PORT || 3000, (err) => {
    if(err){
        return console.error(err)
    }
    console.log('listening on port')
})