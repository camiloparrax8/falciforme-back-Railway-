const { check, validationResult } = require("express-validator");
const { ComplicacionCronica, Paciente } = require("../../database/models");
const complicacionCronicaValidate = {};

complicacionCronicaValidate.validacionCrearComplicacionCronica = async (request, response, next) => {
    const validaciones = [
        check("id_paciente")
            .notEmpty()
            .withMessage("El ID del paciente es requerido")
            .isInt({ min: 1 })
            .withMessage("El ID del paciente debe ser un número entero positivo")
            .custom(async (value) => {
                const paciente = await Paciente.findByPk(value);
                if (!paciente) {
                    throw new Error("El paciente no existe");
                }
            }),
        check("vasculopatia_cerebral")
            .notEmpty()
            .withMessage("La vasculopatia cerebral es requerida")
            .isBoolean()
            .withMessage("La vasculopatia cerebral debe ser un booleano"),
        check("infartos_cerebrales_silentes")
            .notEmpty()
            .withMessage("Los infartos cerebrales silenciosos son requeridos")
            .isBoolean()
            .withMessage("Los infartos cerebrales silenciosos deben ser un booleano"),
        check("epilepsia_convulsiones")
            .notEmpty()
            .withMessage("Las convulsiones son requeridas")
            .isBoolean()
            .withMessage("Las convulsiones deben ser un booleano"),
        check("cefaleas_recurrentes")
            .notEmpty()
            .withMessage("Las cefaleas recurrentes son requeridas")
            .isBoolean()
            .withMessage("Las cefaleas recurrentes deben ser un booleano"),
        check("deficit_cognitivo")
            .notEmpty()
            .withMessage("El déficit cognitivo es requerido")
            .isBoolean()
            .withMessage("El déficit cognitivo debe ser un booleano"),
        check("retinopatia_drepanocitica")
            .notEmpty()
            .withMessage("La retinopatia drepanocítica es requerida")
            .isBoolean()
            .withMessage("La retinopatia drepanocítica debe ser un booleano"),
        check("hemorragias_vitreas")
            .notEmpty()
            .withMessage("Las hemorragias vitreales son requeridas")
            .isBoolean()
            .withMessage("Las hemorragias vitreales deben ser un booleano"),
        check("neovascularizacion_retiniana")
            .notEmpty()
            .withMessage("La neovascularización retiniana es requerida")
            .isBoolean()
            .withMessage("La neovascularización retiniana debe ser un booleano"),
        check("iritis_uveitis")
            .notEmpty()
            .withMessage("La iritis uveítis es requerida")
            .isBoolean()
            .withMessage("La iritis uveítis debe ser un booleano"),
        check("oclusion_vasos_retinianos")
            .notEmpty()
            .withMessage("La oclusión de vasos retinianos es requerida")
            .isBoolean()
            .withMessage("La oclusión de vasos retinianos debe ser un booleano"),
        check("disfuncion_diastolica_vii")
            .notEmpty()
            .withMessage("La disfunción diastólica de la VII es requerida")
            .isBoolean()
            .withMessage("La disfunción diastólica de la VII debe ser un booleano"),
        check("sobrecarga_ferrica")
            .notEmpty()
            .withMessage("La sobrecarga ferrica es requerida")
            .isBoolean()
            .withMessage("La sobrecarga ferrica debe ser un booleano"),
        check("trombosis")
            .notEmpty()
            .withMessage("La trombosis es requerida")
            .isBoolean()
            .withMessage("La trombosis debe ser un booleano"),
        check("hipertension_pulmonar")
            .notEmpty()
            .withMessage("La hipertensión pulmonar es requerida")
            .isBoolean()
            .withMessage("La hipertensión pulmonar debe ser un booleano"),
        check("vrt")
            .notEmpty()
            .withMessage("El VRT es requerido")
            .isString()
            .withMessage("El VRT debe ser un texto"),
        check("numero_crisis")
            .notEmpty()
            .withMessage("El número de crisis es requerido")
            .isInt({ min: 0 })
            .withMessage("El número de crisis debe ser un número entero positivo"),
        check("tratamientos")
            .notEmpty()
            .withMessage("Los tratamientos son requeridos")
            .isString()
            .withMessage("Los tratamientos deben ser un texto"),
        check("hipomexia")
            .notEmpty()
            .withMessage("La hipomexia es requerida")
            .isBoolean()
            .withMessage("La hipomexia debe ser un booleano"),
        check("saos")
            .notEmpty()
            .withMessage("La SAOS es requerida")
            .isBoolean()
            .withMessage("La SAOS debe ser un booleano"),
        check("edpfc_tratamiento")
            .notEmpty()
            .withMessage("El tratamiento de la EDPC es requerido")
            .isString()
            .withMessage("El tratamiento de la EDPC debe ser un texto"),
        check("hepatitis_viral_cronica")
            .notEmpty()
            .withMessage("La hepatitis viral crónica es requerida")
            .isBoolean()
            .withMessage("La hepatitis viral crónica debe ser un booleano"),
        check("esplenomegalia")
            .notEmpty()
            .withMessage("La esplenomegalia es requerida")
            .isBoolean()
            .withMessage("La esplenomegalia debe ser un booleano"),
        check("hiperesplenismo")
            .notEmpty()
            .withMessage("El hiperesplenismo es requerido")
            .isBoolean()
            .withMessage("El hiperesplenismo debe ser un booleano"),
        check("nefropatia")
            .notEmpty()
            .withMessage("La nefropatia es requerida")
            .isBoolean()
            .withMessage("La nefropatia debe ser un booleano"),
        check("acidosis_tubular")
            .notEmpty() 
            .withMessage("La acidosis tubular es requerida")
            .isBoolean()
            .withMessage("La acidosis tubular debe ser un booleano"),
        check("priapismo_recurrente")
            .notEmpty()
            .withMessage("El priapismo recurrente es requerido")
            .isBoolean()
            .withMessage("El priapismo recurrente debe ser un booleano"),
        check("proteinuria")
            .notEmpty()
            .withMessage("La proteinuria es requerida")
            .isBoolean()
            .withMessage("La proteinuria debe ser un booleano"),
        check("hipotensia")
            .notEmpty()
            .withMessage("La hipotensión es requerida")
            .isBoolean()
            .withMessage("La hipotensión debe ser un booleano"),
        check("hematuria_necrosis_papilar")
            .notEmpty()
            .withMessage("La hematuria de necrosis papilar es requerida")
            .isBoolean()
            .withMessage("La hematuria de necrosis papilar debe ser un booleano"),
        check("enfermedad_renal_cronica")
            .notEmpty()
            .withMessage("La enfermedad renal crónica es requerida")
            .isBoolean()
            .withMessage("La enfermedad renal crónica debe ser un booleano"),
        check("huesos_comprometidos")
            .notEmpty()
            .withMessage("Los huesos comprometidos son requeridos")
            .isString()
            .withMessage("Los huesos comprometidos deben ser un texto"),
        check("osteonecrosis")
            .notEmpty()
            .withMessage("La osteonecrosis es requerida")
            .isBoolean()
            .withMessage("La osteonecrosis debe ser un booleano"),
        check("osteopenia")
            .notEmpty()
            .withMessage("La osteopenia es requerida")
            .isBoolean()
            .withMessage("La osteopenia debe ser un booleano"),
        check("grado_discapacidad")
            .notEmpty()
            .withMessage("El grado de discapacidad es requerido")
            .isString()
            .withMessage("El grado de discapacidad debe ser un texto"),
        check("deformidades_osea")
            .notEmpty()
            .withMessage("Las deformidades osea son requeridas")
            .isBoolean()
            .withMessage("Las deformidades osea deben ser un booleano"),
     
            
    ]
    await Promise.all(validaciones.map((validation) => validation.run(request)));
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = complicacionCronicaValidate;
