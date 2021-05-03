module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {

        const category = {...req.body }

        if(req.params.id) category.id = req.params.id

        try {
            existsOrError(category.name, 'Nome não informado')



        } catch(msg) {
            res.status(400).send(msg)
        }

        if(category.id) {
            app.db('categories')
                .update({
                    name: category.name
                })
                .where({ id: category.id })
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('categories')
                .insert({
                    name: category.name,
                    parentId: category.parentId
                })
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
    
    
    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código da Categoria não informado.')
            
            const subcategory = await app.db('categories')
            .where('parentId', req.params.id)
            notExistsOrError(subcategory, 'Categoria possui subcategorias.')
            
            const articles = await app.db('articles')
            .where('categoryId', req.params.id)
            notExistsOrError(articles, 'Categoria possui artigos.')
            
            const rowsDeleted = await app.db('categories')
            .where( 'id', req.params.id )
            existsOrError(rowsDeleted, 'Categoria não foi encontrada.')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        app.db('categories')
            .where( 'id', req.params.id )
            .del()
            .then(_=> res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    const withPath = categories => {
        const getParent = (categories, parentId) => {
            const parent = categories.filter(parent => parent.id === parentId)
            return parent.length ? parent[0] : null
        }

        const categoriesWithPath = categories.map(category => {
            let path = category.name
            let parent = getParent(categories, category.parentId)

            while(parent) {
                path = `${parent.name} > ${path}`
                parent = getParent(categories, parent.parentId)
            }

            return { ...category, path }
        })

        categoriesWithPath.sort((a, b) => {
            if(a.path < b.path) return -1
            if(a.path > b.path) return 1
            return 0
        })

        return categoriesWithPath
    }

    
    const get = (req, res) => {
        app.db('categories')
            .then(categories => res.json(withPath(categories)))
            .catch(err => res.status(500).send(err))
    }
    const getByID = (req, res) => {
        app.db('categories')
            .where({id: req.params.id})
            .then(category => res.json(category))
            .catch(err => res.status(500).send(err))

    }

    const toTree = ( categories, tree ) => {
        const semId = c => !c.parentId
        if(!tree) tree = categories.filter(semId)

        
        const transformarArray = parentNode => {
            const isChild = node => node.parentId == parentNode.id
            
            parentNode.childre = toTree(categories, categories.filter(isChild))
            return parentNode
        }
        tree = tree.map(transformarArray)

        return tree
    }

    const getTree = (req, res) => {
        app.db('categories')
            .then( categories => res.json(toTree(withPath(categories))))
            .catch(err => res.status(500).send(err))
    }
    const countCategory = (req, res) => {
        app.db('categories')
            .count('id')
            .then(categories => res.json(categories))
            .catch(err => res.status(500).send('DB error' + err))
    }
    

    return {save, remove, get, getByID, getTree, countCategory}
}