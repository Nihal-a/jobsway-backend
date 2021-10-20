var jwt = require('jsonwebtoken')

const auth = async (req,res,next) => {
    try {
        const token = req.header.Authorization.split(" ")[1];
        let decodedData = jwt.verify(token,'secret')

        req.userId = decodedData?.id

        next()
    } catch (error) {
        console.log({error:error.message});
    }
}