module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const article = {...req.body}

        if(!article.id) article.id = req.params.id

        try {
            existsOrError(article.name, 'Nome do artigo não informado')
            existsOrError(article.description, 'Descrição Obrigatória')
            existsOrError(article.content, 'content não informado')
            existsOrError(article.userId, 'Id do usuario não informado')
            existsOrError(article.categoryId, 'Id da categoria não informado')


        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(!article.id) {
            app.db('articles')
                .insert({
                    name: article.name,
                    description: article.description,
                    imgIrl: article.imgUrl,
                    content: article.content,
                    userId: article.userId,
                    categoryId: article.categoryId
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('articles')
                .update(article)
                .where('id', article.id)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        
        try {
            const articleFromDB = await app.db('articles').where('id', req.params.id)
            existsOrError(articleFromDB, 'Artigo não foi encontrado no banco de dados!')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        await app.db('articles')
            .where('id', req.params.id)
            .del()
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    const limit = 10

    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('articles').count('id').first()
        const count = parseInt(result.count)

        await app.db('articles')
            .select('id', 'name', 'description')
            .limit(limit).offset(page * limit - limit)
            .then(articles => res.json({data: articles, count, limit}))
            .catch(err => res.status(500).send(err))
    }
    const getById = async (req, res) => {
        await app.db('articles')
            .select('id', 'name', 'description')
            .where('id', req.params.id)
            .then(article => res.json(article))
            .catch(err => res.status(500).send(err))
    }

    const getByCategory = async (req, res) => {
        app.db('articles')
            .select('id', 'name', 'description')
            .where('categoryId', req.params.catId)
            .then(article => res.json(article))
            .catch(err => res.status(500).send(err))

    }
    const countArticle = (req, res) => {
        app.db('articles')
            .count('id')
            .then(articles => res.json(articles))
            .catch(err => res.status(500).send('Erouu', err))
    }
    return { save, remove, get, getById, getByCategory, countArticle }
}