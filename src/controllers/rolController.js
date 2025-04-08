const rolService = require('../services/rolService');

const getRoles = async (request, response, next) => {
    try {
        const roles = await rolService.getRoles();
        response.status(200).json(roles);
    } catch (error) {
        response.status(500).json('ha ocurrido un error: ' + error);
    }
}

module.exports = {
    getRoles
}

