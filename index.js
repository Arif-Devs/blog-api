const express = require('express')
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDoc = YAML.load('./swagger.yaml')   

const app = express()   
app.use(express.json())
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))


app.get('/health', (req, res) => {
    res.status(200).json({massage: 'okay'})
})

app.get('/api/v1/articles', (req, res) => {
    res.status(200).json({path: '/articles', method: 'get'})
})
app.post('/api/v1/articles', (req, res) => {
    res.status(200).json({path: '/articles', method: 'post'})
})

app.get('/api/v1/articles/:id', (req, res) => {
    res.status(200).json({path: '/articles', method: 'get'})
})

app.put('/api/v1/articles/:id', (req, res) => {
    res.status(200).json({path: '/articles/{id}', method: 'put'})
})
app.patch('/api/v1/articles/:id', (req, res) => {
    res.status(200).json({path: '/articles/{id}', method: 'patch'})
})
app.delete('/api/v1/articles/:id', (req, res) => {
    res.status(200).json({path: '/articles/{id}', method: 'delete'})
})



app.listen(4000, ()=>{
    console.log('listening on  port 4000')
})