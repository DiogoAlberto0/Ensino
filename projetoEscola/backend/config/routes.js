const admin = require('./admin')
module.exports = app => {

//   __________________Login_______________________
    app.post('/singin/:cargo', app.api.auth.singin)



//   __________________Authentication_______________________
    var auth = app.config.passport.authenticate()



//   __________________Diretor_______________________
    app.route('/diretor')
        .all(auth)
        .get(admin(app.api.diretora.get, 1, 2, 3))
        .post(admin(app.api.diretora.save, 1))

    app.route('/diretor/:id')
        .all(auth)
        .put(admin(app.api.diretora.save, 1))



//   __________________Coord._______________________
    app.route('/coordenador')
        .all(auth)
        .get(admin(app.api.coordenador.get, 1, 2, 3))
        .post(admin(app.api.coordenador.save, 1))

    app.route('/coordenador/:id')
        .all(auth)
        .put(admin(app.api.coordenador.save, 1))
 


//   __________________Secret._______________________
    app.route('/secretario')
        .all(auth)
        .post(admin(app.api.secretario.save))
        .get(admin(app.api.secretario.get, 1, 2, 3))

    app.route('/secretario/:id')
        .all(auth)
        .put(admin(app.api.secretario.save, 1))



//   __________________Professor_______________________
    app.route('/professor')
        .all(auth)
        .get(admin(app.api.professor.get, 1, 2, 3))
        .post(admin(app.api.professor.save, 1, 2))
        
    app.route('/professor/ativo')
        .all(auth)
        .get(admin(app.api.professor.getAtivos, 1, 2, 3, 4, 5, 6))
        
    app.route('/professor/:id')
        .all(auth)
        .put(admin(app.api.professor.save, 1, 2))



//   __________________Cargo_______________________
    app.route('/cargo')
        .all(auth)
        .get(admin(app.api.cargo.get, 1, 2, 3))
        .post(admin(app.api.cargo.save, 1))

    app.route('/cargo/:id')
        .all(auth)
        .get(admin(app.api.cargo.save, 1, 2, 3))



//   __________________Login_______________________
    app.route('/turma')
        .all(auth)
        .post(admin(app.api.turmas.save, 1, 3))
        .get(admin(app.api.turmas.get, 1, 2, 3, 4, 5, 6))


        
//   __________________Pai_______________________
    app.route('/pai')
        .all(auth)
        .post(admin(app.api.pai.save, 1, 3))
        .get(admin(app.api.pai.get, 1, 2, 3, 4))

    app.route('/pai/:id')
        .all(auth)
        .post(admin(app.api.pai.save, 1, 3))
    


//   __________________Aula_______________________
    app.route('/aula')
        .all(auth)
        .post(admin(app.api.aulas.save, 1, 4))

    app.route('/aula/:id')
        .all(auth)
        .put(admin(app.api.aulas.save, 1, 4))

    app.route('/aula/turma/:turmaId')
        .all(auth)
        .get(admin(app.api.aulas.getByTurma, 1, 2, 4, 5, 6))



}