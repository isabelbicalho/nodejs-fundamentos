const { validationResult } = require('express-validator/check');
const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');


class LivroControlador {

    static rotas() {
        return {
            lista: '/livros',
            cadastro: '/livros/form',
            edicao: '/livros/form/:id',
            delecao: '/livros/:id'
        };
    }

    lista() {
        return  (req, resp) => {
            const livroDao = new LivroDao(db);
            livroDao.lista().then(livros => {
                resp.marko(require('../views/livros/lista'), { livros })
            }).catch(erro => console.log(erro));
        };
    }

    formularioCadastro() {
        return (req, resp) => {
            resp.marko(require('../views/livros/form'), { livro: {} })
        };
    }

    formularioEdicao() {
        return (req, resp) => {
            const id = req.params.id;
            const livroDao = new LivroDao(db);
            livroDao.buscaPorId(id).then(livro => {
                resp.marko(require('../views/livros/form'), { livro: livro })
            }).catch(erro => console.log(erro));
        };
    }

    cadastra() {
        return (req, resp) => {
            console.log(req.body);
            const livroDao = new LivroDao(db);

            const erros = validationResult(req);
            if (!erros.isEmpty()) {
                return resp.marko(require('../views/livros/form'), { livro: {}, errosValidacao: erros.array() })
            }

            livroDao.adiciona(req.body).then(resp.redirect(LivroControlador.rotas().lista)).catch(erro => console.log(erro));
        };
    }

    edita() {
        return (req, resp) => {
            console.log(req.body);
            const livroDao = new LivroDao(db);
            livroDao.atualiza(req.body).then(resp.redirect(LivroControlador.rotas().lista)).catch(erro => console.log(erro));
        };
    }

    remove() {
        return (req, resp) => {
            const id = req.params.id;
            const livroDao = new LivroDao(db);
            livroDao.remove(id).then(() => resp.status(200).end()).catch(erro => console.log(erro));
        };
    }
}

module.exports = LivroControlador;
