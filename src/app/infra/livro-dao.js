class LivroDao {
    constructor(db) {
        this._db = db;
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`INSERT INTO livros (titulo, preco, descricao) values (?,?,?)`,
                    [livro.titulo, livro.preco, livro.descricao], (erro) => {
                    if (erro) {
                        console.log(erro);
                        return reject('Não foi possível adicionar o livro!');
                    }
                    return resolve();
                }
            )
        });
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (erro, resultados) => {
                    if (erro) return reject('Não foi possível listar os livros!');
                    return resolve(resultados);
                }
            )
        });
    }

    buscaPorId(id) {
        return new Promise((resolve, reject) => {
            this._db.get(`SELECT * FROM livros WHERE id = ?`,
                    [id], (erro, livro) => {
                    console.log(livro)
                    if (erro) {
                        console.log(erro, livro);
                        return reject('Não foi possível encontrar o livro!');
                    }
                    return resolve(livro);
                }
            )
        });
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.run(`DELETE FROM livros WHERE id = ?`,
                    [id], (erro) => {
                    if (erro) {
                        console.log(erro);
                        return reject('Não foi possível remover o livro!');
                    }
                    return resolve();
                }
            )
        });
    }

    atualiza(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`UPDATE livros SET titulo = ?, preco = ?, descricao = ? WHERE id = ?`,
                    [livro.titulo, livro.preco, livro.descricao, livro.id], (erro) => {
                    if (erro) {
                        console.log(erro);
                        return reject('Não foi possível atualizar o livro!');
                    }
                    return resolve();
                }
            )
        });
    }
}

module.exports = LivroDao;
