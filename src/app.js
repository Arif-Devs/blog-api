const express = require('express')
const applyMiddleWare = require('./middleware')
const routes = require('./routes')




const app = express() 
applyMiddleWare(app)
app.use(routes)

app.get('/health', (req, res) => {
    res.status(200).json({
        health: 'ok',
        user:req.user
    })
})



app.use((err, req, res, next) => {
    // format error
    console.log(err)
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
    });
  });
 
module.exports = app


