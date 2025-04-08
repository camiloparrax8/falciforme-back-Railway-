const { where } = require("sequelize");
const { ComplicacionesCronicas,
    ComplicacionesAgudas,
    ExamenesFisico,
    ImagenDiagnostica,
    Laboratorio,
    SoporteTransfusional,
    TransplanteProgenitores,
    Tratamiento,
    VacunaHc,
    HistoriaClinica,
    Paciente } = require("../database/models");
const apiResponse = require("../utils/apiResponse");


const buscarHcOpenById = async (id_paciente) => {
    let historia_abierta = null;
    const res = await HistoriaClinica.findOne({
        where: {
            id_paciente: id_paciente,
            estado: 1
        }
    });
    if (!res) {
        const paciente = await Paciente.findByPk(id_paciente);
        if (paciente) {
            historia_abierta = await HistoriaClinica.create({
                fecha_creacion: new Date(),
                id_paciente: paciente.id,
                id_usuario: 1,
                estado: 1
            });
        } else {
            return new apiResponse('error', 'El paciente no existe', null);
        }
    } else {
        historia_abierta = res;
    }
    return historia_abierta.id
}


const getHcOpenById = async (id_paciente) => {
    const res = await HistoriaClinica.findOne({
        where: {
            id_paciente: id_paciente,
            estado: 1,
        },
    });
    return res
};

const buscarHcByIdPaciente = async (id_paciente) => {
    const res = await HistoriaClinica.findAll({
        where: {
            id_paciente: id_paciente,
        },
        include: [
            {
                model: ExamenesFisico,
                foreignKey: 'id_historia_clinica',
                as: 'examenes_fisicos',
            },
            {
                model: TransplanteProgenitores,
                foreignKey: 'id_historia_clinica',
                as: 'transplante_progenitores',
            },
            {
                model: ComplicacionesCronicas,
                foreignKey: 'id_historia_clinica',
                as: 'complicaciones_cronicas',
            },
            {
                model: Laboratorio,
                foreignKey: 'id_historia_clinica',
                as: 'laboratorio',
            },
            {
                model: ImagenDiagnostica,
                foreignKey: 'id_historia_clinica',
                as: 'imagenes_diagnosticas',
            },
            {
                model: SoporteTransfusional,
                foreignKey: 'id_historia_clinica',
                as: 'soportes_transfusionales',
            },
            {
                model: VacunaHc,
                foreignKey: 'id_historia_clinica',
                as: 'vacuna',
            },
            {
                model: Tratamiento,
                foreignKey: 'id_historia_clinica',
                as: 'tratamiento',
            },
            {
                model: ComplicacionesAgudas,
                foreignKey: 'id_historia_clinica',
                as: 'complicaciones_agudas',
            },
        ]
    });
    return res;

}

const buscarHcById = async (id_hc) => {
    const res = await HistoriaClinica.findByPk(id_hc);
    return res;
}




module.exports = {
    buscarHcOpenById,
    buscarHcByIdPaciente,
    buscarHcById,
    getHcOpenById,
};
