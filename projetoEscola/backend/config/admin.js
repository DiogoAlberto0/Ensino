module.exports = (middleware, ...cargoId) => {
    return (req, res) => {
        try {

            for(i in cargoId) {
                switch(req.user.cargoId){
                    case cargoId[i]:
                        middleware(req, res, middleware.next ? next : false)
                }
            }
        } catch(e) {
            res.status(401).send('Usuario não autorizado')

        }
    }
}