
const getProtocol = (status, route, operation, data = []) => {
    return JSON.stringify({status, route, operation, data});
}

module.exports = {
    getProtocol: getProtocol
}