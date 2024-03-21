const jwt = require("jsonwebtoken")

exports.checkemployeeAuth = (request, response, next) => {
    const headerData = request.headers.authorization.split(" ")
    const token = headerData[1]

    if (!token) {
        return response.status(401).json({
            status:"error",
            msg:"401 not Auth"
        })
    }else{
        jwt.verify(token, '2039AM', (error, data) => {
            if (error) {
                return response.status(401).json({
                    status:"error",
                    msg:"401 not Auth"
                })
            } else {
                next()
            }
        })
    }

}

exports.checkbuyerAuth=(request,response,next)=>{
const headerData=request.headers.authorization.split(" ")
const token =headerData[1]
if (!token) {
    return response.status(401).json({
    status:"error",
    msg:"401 not Auth"

})}

else {
    jwt.verify(token,(error, data)=>{
if (error)
{ return response.status(401).json({
    status:"error",
    msg:"401 not Auth"
})
}
else { next() }
    })

}

}



exports.checkSellerAuth = (request, response, next) => {
    const headerData = request.headers.authorization.split(" ")
    const token = headerData[1]

    if (!token) {
        return response.status(401).json({
            status:"error",
            msg:"401 not Auth"
        })
    }else{
        jwt.verify(token, '1999mg', (error, data) => {
            if (error) {
                return response.status(401).json({
                    status:"error",
                    msg:"401 not Auth"
                })
            } else {
                next()
            }
        })
    }

}

exports.checkCompanyAuth = (request, response, next) => {
    const headerData = request.headers.authorization.split(" ")
    const token = headerData[1]

    if (!token) {
        return response.status(401).json({
            status:"error",
            msg:"401 not Auth"
        })
    }else{
        jwt.verify(token, '2000az', (error, data) => {
            if (error) {
                return response.status(401).json({
                    status:"error",
                    msg:"401 not Auth"
                })
            } else {
                next()
            }
        })
    }

}