
const normalizarTexto = (value, { req }) => {
    if (typeof value === 'string') {
        return value.trim().replace(/\s+/g, ' ');
    }
    return value;
};

const normalizarParabra = (value) => {
    if (typeof value === 'string') {
        return value.trim();
    }
    return value;
};

module.exports = {
    normalizarTexto,
    normalizarParabra
}