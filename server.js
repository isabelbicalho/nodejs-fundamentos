const app = require('./src/config/custom-express');

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

// const http = require('http');
// 
// const servidor = http.createServer((req, resp) => {
//     let html = '';
//     if (req.url == '/') {
//         html = `
//             <html>
//                 <head>
//                     <meta charset="utf-8">
//                 </head>
//                 <body>
//                     <h1> Casa do código </h1>
//                 </body>
//             </html>
//         `
//     } else if (req.url == '/livros') {
//         html = `
//             <html>
//                 <head>
//                     <meta charset="utf-8">
//                 </head>
//                 <body>
//                     <h1> Lista de livros </h1>
//                 </body>
//             </html>
//         `
//     }
//     resp.end(html);
// });
// 
// servidor.listen(3000);


