const { 
    v4: uuidv4,
} = require('uuid');

const authClients = new Map();

const getClient = (id) =>{
    return authClients.get(id);
}

const getClients = () =>{
    return Array.from(map, ([id, value]) => ({ id, value }));
}

const authenticate = (ws) =>{
    const client = {
        id: uuidv4()
    }

    authClients.set(client.id, ws);

    return client;
}

const deauthenticate = (id) => {
    return authClients.delete(id);
}

module.exports = {
    getClient,
    getClients,
    authenticate,
    deauthenticate
}

