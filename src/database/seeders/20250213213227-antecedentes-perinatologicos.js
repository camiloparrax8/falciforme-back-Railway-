'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('antecedentes_perinatologicos', [
      {
        peso_al_nacer: '3.2 kg',
        talla_al_nacer: '50 cm',
        nota: 'Parto natural sin complicaciones.',
        condicion_al_nacer: 'Saludable',
        cuidado_neonatal: 'Observación estándar',
        etirico_neonatal: 'No',
        id_paciente: 1, // Reemplazar con un ID real de la tabla 'pacientes'
        id_user_create: 1,
        id_user_update: null,
        id_user_delete: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        is_deleted: false,
      },
      {
        peso_al_nacer: '2.8 kg',
        talla_al_nacer: '48 cm',
        nota: 'Cesárea debido a complicaciones.',
        condicion_al_nacer: 'Prematuro',
        cuidado_neonatal: 'Incubadora por 2 días',
        etirico_neonatal: 'Sí',
        id_paciente: 2, // Reemplazar con un ID real
        id_user_create: 2,
        id_user_update: null,
        id_user_delete: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        is_deleted: false,
      },
      {
        peso_al_nacer: '3.5 kg',
        talla_al_nacer: '52 cm',
        nota: 'Nacimiento sin complicaciones.',
        condicion_al_nacer: 'Saludable',
        cuidado_neonatal: 'Estándar',
        etirico_neonatal: 'No',
        id_paciente: 3,
        id_user_create: 3,
        id_user_update: null,
        id_user_delete: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        is_deleted: false,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('antecedentes_perinatologicos', null, {});
  }
};
