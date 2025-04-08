const { check, validationResult } = require("express-validator");
const { ExamenesFisico, Paciente, HistoriaClinica } = require("../../database/models");

const examenFisico = {};

examenFisico.validacionCrearExamenFisicoe = async (request, response, next) => {
  const validaciones = [
    check("id_paciente")
      .optional({ nullable: true })
      .custom(async (value) => {
        if (value) {
          const paciente = await Paciente.findByPk(value);
          if (!paciente) {
            throw new Error("El paciente no existe");
          }
        }
        return true;
      }),

    check("frecuencia_cardiaca")
      .notEmpty()
      .withMessage("La frecuencia cardiaca es requerida")
      .isInt({ min: 0, max: 300 })
      .withMessage("La frecuencia cardiaca debe ser un número entre 0 y 300"),

    check("frecuencia_respiratoria")
      .notEmpty()
      .withMessage("La frecuencia respiratoria es requerida")
      .isInt({ min: 0, max: 300 })
      .withMessage(
        "La frecuencia respiratoria debe ser un número entre 0 y 30"),
    check("saturacion_oxigeno")
      .notEmpty()
      .withMessage("La saturación de oxígeno es requerida")
      .isFloat({ min: 0, max: 100 })
      .withMessage("La saturación de oxígeno debe ser un número entre 0 y 100"),
    check("tension_arterial")
      .notEmpty()
      .withMessage("La tensión arterial es requerida")
      // .isFloat({ min: 0, max: 300 })
      .withMessage("La tensión arterial debe ser un número entre 0 y 300"),
    check("peso")
      .notEmpty()
      .withMessage("El peso es requerido")
      .isFloat({ min: 0, max: 300 })
      .withMessage("El peso debe ser un número entre 0 y 300"),
    check("talla")
      .notEmpty()
      .withMessage("La talla es requerida")
      .isFloat({ min: 0, max: 300 })
      .withMessage("La talla debe ser un número entre 0 y 300"),
    check("percentil")
      .notEmpty()
      .withMessage("El percentil es requerido")
      .isFloat({ min: 0, max: 100 })
      .withMessage("El percentil debe ser un número entre 0 y 100"),
    check("imc")
      .notEmpty()
      .withMessage("El IMC es requerido")
      .isFloat({ min: 0, max: 300 })
      .withMessage("El IMC debe ser un número entre 0 y 300"),
    check("deficit_zinc")
      .notEmpty()
      .withMessage("El déficit de zinc es requerido")
      // .isBoolean()
      .withMessage("El déficit de zinc debe ser un booleano"),
    check("deficit_acido_folico")
      .notEmpty()
      .withMessage("El déficit de ácido fólico es requerido")
      // .isBoolean()
      .withMessage("El déficit de ácido fólico debe ser un booleano"),
    check("deficit_vitamina_d")
      .notEmpty()
      .withMessage("El déficit de vitamina D es requerido")
      // .isBoolean()
      .withMessage("El déficit de vitamina D debe ser un booleano"),
    check("desnutricion")
      .notEmpty()
      .withMessage("La desnutrición es requerida")
      // .isBoolean()
      .withMessage("La desnutrición debe ser un booleano"),
    check("obesidad")
      .notEmpty()
      .withMessage("La obesidad es requerida")
      // .isBoolean()
      .withMessage("La obesidad debe ser un booleano"),
    // check("perimetro_cefalico")
    //   .notEmpty()
    //   .withMessage("El perímetro cefálico es requerido")
    //   .isFloat({ min: 0, max: 100 })
    //   .withMessage("El perímetro cefálico debe ser un número entre 0 y 100"),
    // check("vision")
    //   .notEmpty()
    //   .withMessage("La visión es requerida")
    //   .isString()
    //   .withMessage("La visión debe ser un texto"),
    // check("examen_boca")
    //   .notEmpty()
    //   .withMessage("El examen de boca es requerido")
    //   .isString()
    //   .withMessage("El examen de boca debe ser un texto"),
    // check("examen_nariz")
    //   .notEmpty()
    //   .withMessage("El examen de nariz es requerido")
    //   .isString()
    //   .withMessage("El examen de nariz debe ser un texto"),
    // check("examen_oidos")
    //   .notEmpty()
    //   .withMessage("El examen de oídos es requerido")
    //   .isString()
    //   .withMessage("El examen de oídos debe ser un texto"),
    // check("caries")
    //   .notEmpty()
    //   .withMessage("Las caries son requeridas")
    //   .isBoolean()
    //   .withMessage("Las caries deben ser un booleano"),
    // check("cuello")
    //   .notEmpty()
    //   .withMessage("El cuello es requerido")
    //   .isString()
    //   .withMessage("El cuello debe ser un texto"),
    // check("cardio_pulmonar")
    //   .notEmpty()
    //   .withMessage("El cardio pulmonar es requerido")
    //   .isString()
    //   .withMessage("El cardio pulmonar debe ser un texto"),
    // check("condicion_abdominal")
    //   .notEmpty()
    //   .withMessage("La condición abdominal es requerida")
    //   .custom(async (value) => {
    //     if (value !== "Esplenomegalia" && value !== "Hepatomegalia") {
    //       throw new Error("La condición abdominal debe ser 'Esplenomegalia' o 'Hepatomegalia'");
    //     }
    //   }),
    // check("tanner")
    //   .notEmpty()
    //   .withMessage("El tanner es requerido")
    //   .isString()
    //   .custom(async (value) => {
    //     if (value !== "Estadio 1" && value !== "Estadio 2" && value !== "Estadio 3" && value !== "Estadio 4" && value !== "Estadio 5" ) {
    //       throw new Error("El tanner debe ser 'Estadio 1' o 'Estadio 2' o 'Estadio 3' o 'Estadio 4' o 'Estadio 5'");
    //     }
    //   }),
    // check("extremidades_observacion")
    //   .notEmpty()
    //   .withMessage("La observación de las extremidades es requerida")
    //   .isString()
    //   .withMessage("La observación de las extremidades debe ser un texto"),
    // check("extremidades_estado_piel")
    //   .notEmpty()
    //   .withMessage("El estado de la piel de las extremidades es requerido")
    //   .isString()
    //   .withMessage(
    //     "El estado de la piel de las extremidades debe ser un texto"
    //   ),
    // check("extremidades_condicion")
    //   .notEmpty()
    //   .withMessage("La condición de las extremidades es requerida")
    //   .custom(async (value) => {
    //     if (value !== "Edemas" && value !== "Ulcera") {
    //       throw new Error("La condición de las extremidades debe ser 'Edemas' o 'Ulcera'");
    //     }
    //   }),

  ];
  await Promise.all(validaciones.map((validation) => validation.run(request)));
  const errores = validationResult(request);
  if (!errores.isEmpty()) {
    return response.status(400).json({
      status: "error",
      message: "Errores de validación",
      hasErrors: true,
      errors: errores.array(),
    });
  }
  next();
};

module.exports = examenFisico;
