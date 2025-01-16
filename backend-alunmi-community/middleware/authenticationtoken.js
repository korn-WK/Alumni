const jwt = require('jsonwebtoken')
const alumnicode = `${process.env.ALUMNI_CODE || 'DevmodeAlumni'}`;
const admincode = `${process.env.ADMIN_CODE || 'DevmodeAdmin'}`;
const administratorcode = `${process.env.AMINISTRATOR_CODE || 'DevmodeAdministratorcode'}`;




exports.auth = async (req, res, next) => {
    try {
        //code
        let token = req.headers["authorization"]
        if (!token) {
            return res.status(401).send('No token')
        }
        token = token.split(' ')[1]
        if(token){
        jwt.verify(token, `${alumnicode}`, function(err, decoded) {
            if(err){
                throw new Error(err.message);
            }
        });
        }
        next();
    } catch (err) {
        // err
        console.log(err)
        res.send('Token Invalid').status(500)
    }
}


exports.authadmin = async (req, res, next) => {
    try {
        //code
        let token = req.headers["authorization"]
        if (!token) {
            return res.status(401).send('No token')
        }
        token = token.split(' ')[1]
        if(token){
        jwt.verify(token,`${admincode}`, function(err, decoded) {
            if(err){
                jwt.verify(token,`${administratorcode}`, function(err, decoded) {
                    if(err){
                    throw new Error(err.message);
                }
                });
        }
        });
    }
        next();
    } catch (err) {
        // err
        console.log(err)
        res.send('Token Invalid').status(500)
    }
}


exports.authadministrator = async (req, res, next) => {
    try {
        //code
        let token = req.headers["authorization"]
        if (!token) {
            return res.status(401).send('No token')
        }
        token = token.split(' ')[1]
        if(token){
        jwt.verify(token, `${administratorcode}`, function(err, decoded) {
            if(err){
                throw new Error(err.message);
            }
        });
    }
        next();
    } catch (err) {
        // err
        console.log(err)
        res.send('Token Invalid').status(500)
    }
}


exports.adminandalumni = async (req, res, next) => {
    try {
        //code
        let token = req.headers["authorization"]
        if (!token) {
            return res.status(401).send('No token')
        }
        token = token.split(' ')[1]
        
        if(token){
        jwt.verify(token, `${alumnicode}`, function(err, decoded) {
            if(err){
                jwt.verify(token, `${admincode}`, function(err, decoded) {
                    if(err){
                        jwt.verify(token, `${administratorcode}`, function(err, decoded) {
                            if(err){
                                throw new Error(err.message);
                            }
                        })
                    }
                })
            }
        });
    }
        next();
    } catch (err) {
        // err
        console.log(err)
        res.send('Token Invalid').status(500)
    }
}