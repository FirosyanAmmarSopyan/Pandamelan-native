const express = require('express')
const app = express()
const port = process.env.PORT || 4002
const userRoutes = require('./routes/user')
const {connect} = require('./config/mongo')

app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.use('/user' , userRoutes)

connect()
.then(db => {
    console.log(db, "<==== db di app.js")
    app.listen(port , () => {
        console.log("I LOP YU " + port);
    })
})