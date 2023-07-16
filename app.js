require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDoc = YAML.load('./swagger.yaml')  
const OpenApiValidator = require ('express-openapi-validator')
const User = require('./model/User')
//const {seeduser} = require('./seed')
//const Article = require('./models/Article')

//express 
const app = express()   
app.use(express.json())
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))
app.use(
    OpenApiValidator.middleware({
      apiSpec: './swagger.yaml',
      
    }),
  );



app.use((err, req, res, next) => {
    // format error
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
    });
  });
 
 let connectionURL = process.env.DB_CONNECTION_URL
 connectionURL = connectionURL.replace('<username>', process.env.DB_USERNAME)
 connectionURL= connectionURL.replace('<password>', process.env.DB_PASSWORD)
 connectionURL= `${connectionURL}/${process.env.DB_USERNAME}?${process.env.DB_URL_QUERY}`

mongoose.connect(connectionURL).then(()=>{
    console.log('database connected')
    app.listen(4000,async ()=>{
        console.log('listening on  port 4000')
        //seeduser()
        // const users = await User.find({})
        // console.log(users)
    })
}).catch((e)=>{
    console.log('database connection failed')
    console.log(e.message)
})

