

const authenticate =(req,res,next) => {
    req.user={
    id: '64cbbacab5e420563e2785d4',
    name: 'arif',
    email: 'arif@gmail.com',
    role: 'user',
    
}
next()
}

module.exports = authenticate