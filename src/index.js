const http = require('http');
const getUsers = require('./modules/file-reader.js')
const compiler = require('./modules/compiler-answer.js')
const config = require('./consig.js');
const getConsoleTime = require('./modules/console-time.js');

const server = http.createServer((request, response) => {
    console.info('Новый запрос', getConsoleTime())

    const url = new URL(request.url, `http://${config.hostname}`);
    const name = url.searchParams.get("hello");

    switch (request.url) {
        case "/users":
            compiler(response, 200, 'application/json', getUsers())
            break;
        case "/?hello":
            compiler(response, 400, 'text/plain', `Enter a name`)
            break;
        case `/?hello=${name}`:
            compiler(response, 200, 'text/plain', `Hello ${name}`)
            break
        case "/":
            compiler(response, 200, 'text/plain', `Hello world`)
            break;
        default:
            compiler(response, 500, 'text/plain', `Server error - 500`)
            break;
    }
});

server.listen(config.port, config.hostname, () => {
    console.info(`Сервер запущен по адресу: ( http://${config.hostname}:${config.port}/ )`);
  });