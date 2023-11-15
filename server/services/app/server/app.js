if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
const express = require('express')
const app = express()
// const port = 3000
const cors = require('cors')
const port = process.env.PORT || 4001;
const indexRoutes = require('./routes/indexRoutes')
const jobRoutes = require('./routes/jobRoutes')
const companyRoutes = require('./routes/companyRoutes');
const clientRoutes = require('./routes/clientRoutes')

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use('/' , indexRoutes)

// app.use('/client' , clientRoutes)
app.use('/company' , companyRoutes)
app.use('/jobs' , jobRoutes)


app.listen(port, () => {
  console.log(`I LOP YU  ${port}`)
})