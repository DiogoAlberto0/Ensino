const admin = require('./admin')
module.exports = (app) => {

    app.post('/singup', app.api.user.save)
    app.post('/singin', app.api.auth.singin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.get))
    app.route('/users/count')
        .all(app.config.passport.authenticate())
        .get(app.api.user.countUsers)
    
    
    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getById))
        .delete(admin(app.api.user.remove))
    
    app.route('/categories')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.category.get))
        .post(admin(app.api.category.save))
        
    app.route('/categories/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getTree)

    app.route('/categories/count')
        .all(app.config.passport.authenticate())
        .get(app.api.category.countCategory)

    // cuidado com ordem!
    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getByID)
        .put(admin(app.api.category.save))
        .delete(admin(app.api.category.remove))

    app.route('/articles')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.article.get))
        .post(admin(app.api.article.save))

    app.route('/articles/count')
        .all(app.config.passport.authenticate())
        .get(app.api.article.countArticle)

    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getById)
        .put(admin(app.api.article.save))
        .delete(admin(app.api.article.remove))

    app.route('/articles/category/:catId')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.article.getByCategory))

}