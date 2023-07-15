const Article = require('../models/Article')

const findArticles = async ({page = 1, limit= 5, sortType='asc',sortBy='updatedAt', searchTerm='' }) =>
{
const articleInstance = new Article()
await articleInstance.init()
let articles


if (searchTerm){
    articles =await articleInstance.search(searchTerm)
} else{
    articles =await articleInstance.find()
}

  //sorting
  articles = await articleInstance.sort(articles, sortType, sortBy)  

 
  // pagination
  const {
      result,
      totalItems,
      totalPage,
      hasNext,
      hasPrev
  } = await articleInstance.pagination(articles,page, limit)
  return{
    totalItems,
    totalPage,
    hasNext,
    hasPrev,
    articles: result
}
}
const transformArticle = ({articles = []}) =>{
   return articles.map((article) =>{
        const transformed = {...article}
        transformed.author = {
            id: transformed.authorId
            // TODO: find author name
        }
        transformed.link = `/articles/${transformed.id}`
        delete transformed.body
        delete transformed.authorId
        
        return transformed
            
     })
}






module.exports = {
    findArticles,
    transformArticle
}