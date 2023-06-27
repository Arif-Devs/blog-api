require('dotenv').config()
const express = require('express')
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDoc = YAML.load('./swagger.yaml')   
const connection = require('./db.js')
const app = express()   
app.use(express.json())
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))


app.get('/health', (req, res) => {
    res.status(200).json({massage: 'okay'})
})

app.get('/api/v1/articles', async (req, res) => {
const page = +req.query.page || 1
const limit = +req.query.limit || 10
const sortType = req.query.sortType || 'asc'
const sortBy = req.query.sort_By || 'UpdatedAt'
const searchTerm = req.query.search || ''
const db = await connection.getDB()
let articles = db.articles

 // filter based on search term
 if (searchTerm){
     articles = articles.filter(article => article.title.toLowerCase().includes(searchTerm))
 }
// sorting
// articles = articles.sort((a, b)=>{
//     if(sortType === 'asc')
//     return a[sortBy].toString().localeCompare(b[sortBy].toString())
//     if (sortType === 'dsc')
//     return b[sortBy].toString().localeCompare(a[sortBy].toString())
// })   

articles = articles.sort((a, b)=>{
    if (sortType === 'asc'){
        if (a[sortBy] > b[sortBy]){
            return 1
        }else if(a[sortBy] < b[sortBy]){
            return -1
        }else {
            return 0
        }
    }else if (sortType === 'dsc'){
        if (b[sortBy] > a[sortBy]){
            return 1
        }else if(b[sortBy] < a[sortBy]){
            return -1
        }else {
            return 0
        }
     }else{
         return 0
     }
    
})


const transformedArticles = articles.map((article) =>{
   const transformed = {...article}
    transformed.author = {
        id: transformed.authorId
        // TODO: find author name
    }
    transformed.links= `/articles/${transformed.id}`
    delete transformed.body
    delete transformed.authorId

    return transformed
    
})





const response = {
    data: transformedArticles,
    pagination:{
        page,
        limit,
        next: 3,
        prev: 2,
        totalPage : Math.ceil(articles.length/limit),
        totalItems: articles.length
    },
    links:{
        self: req.url,
        next: `/articles?page=${page+1}&limit=${limit}`,
        prev: `/articles?page=${page-1}&limit=${limit}`
    }
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



app.listen(4000, ()=>{
    console.log('listening on  port 4000')
})