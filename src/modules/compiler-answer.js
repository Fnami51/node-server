const getConsoleTime = require('./console-time.js')

function getContentType (type) {
    return `Content-Type: ${type}` 
}

function getStatusMessage(statusCode) {
    switch (statusCode) {
        case 200: 
            console.info('Запрос успешно обработан -', getConsoleTime(), ' => ', `Status code ${statusCode}`)
            return "OK";
        case 400: 
            console.error('Error ', getConsoleTime(), ' - ', `Status code ${statusCode}: Не передано имя в ссылке запороса`)
            return "Bad Request";
        case 500: 
            console.error('Error ', getConsoleTime(), ' - ', `Status code ${statusCode}: Неверное обращение к серверу или сервер не работает`)
            return "Internal Server Error";
        default: 
            return `Your request status code: ${statusCode}`;
    }
}

function compiler (response, statusCode, contenType, answer) {
    if (!response) {
        console.error('Error ', getConsoleTime(), ' - ', 'Объект response не определен.')
        return
    }
    response.status = statusCode
    response.statusMessage = getStatusMessage(statusCode)
    response.header = getContentType(contenType)
    response.write(answer)
    response.end()
}

module.exports = compiler;