const { Rol } = require('../database/models');
const apiResponse = require('../utils/apiResponse');

const getRoles = async () => {
    const roles = await Rol.findAll();
    return new apiResponse('success', 'OK', roles);
}


module.exports = {
    getRoles
}