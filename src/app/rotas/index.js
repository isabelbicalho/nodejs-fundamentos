const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = (app) => {
    app.get('/', (req, resp) => {
        html = `
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1> Casa do Código </h1>
                </body>
            </html>`
        resp.end(html);
    });

    app.get('/livros', (req, resp) => {
        const livroDao = new LivroDao(db);
        livroDao.lista().then(livros => {
            resp.marko(require('../views/livros/lista'), { livros: livros })
        }).catch(erro => console.log(erro));
    });

    app.post('/livros', (req, resp) => {
        console.log(req.body);
    });

    app.get('/livros/form', (req, resp) => {
        resp.marko(require('../views/livros/formulario'))
    });
};
