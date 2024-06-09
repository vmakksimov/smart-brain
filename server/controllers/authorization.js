const redisClient = require('./signin').redisClient;

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    console.log('token after deleting', typeof(authorization))
    if (authorization === 'null') {
        console.log('here to throw error')
        return res.status(401).json('Unathorized')
    }

    await redisClient.connect()
    await redisClient.get(authorization, async (err, reply) => {
        if (err || !reply) {
            return res.status(401).json('Unauthorized');
        }
        
    })

    await redisClient.quit()
    return next()


}


module.exports = {
    requireAuth: requireAuth
}