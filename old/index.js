require('dotenv').config()
const express = require('express')
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDoc = YAML.load('./swagger.yaml')  
const OpenApiValidator = require ('express-openapi-validator') 

//const connection = require('./db')
const Article = require('./models/Article')
const articleService = require ('./service/article')
//express 
const app = express()   
app.use(express.json())
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))
app.use(
    OpenApiValidator.middleware({
      apiSpec: './swagger.yaml',
      
    }),
  );


app.get('/health', (req, res) => {
    res.status(200).json({massage: 'okay'})
})

app.get('/api/v1/articles', async (req, res) => {
const page = +req.query.page || 1
const limit = +req.query.limit || 10
let { 
    totalItems,
    totalPage,
    hasNext,
    hasPrev,
    articles
} = await articleService.findArticles({...req.query, page, limit})
// Get articles from the database

 const response = {
    data: articleService.transformArticle({articles}),
    pagination:{
        page,
        limit,
        totalPage,
        totalItems
    },
    links:{
        self: req.url,
       
    }
}

if (hasPrev){
    response.pagination.prev = page - 1
    response.links.prev = `/articles?page=${page - 1}&limit=${limit}`
}

if (hasNext){
    response.pagination.next = page + 1
    response.links.next = `/articles?page=${page +1}&limit=${limit}`
}


    res.status(200).json({response})
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
app.use((err, req, res, next) => {
    // format error
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
    });
  });


app.listen(4000, ()=>{
    console.log('listening on  port 4000')
})