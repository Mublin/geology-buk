exports.up = function (knex) {
  return knex.schema.createTable('hash', function (table) {
    table.string('reg_number').notNullable();
    table.string('sirri').notNullable();
    table.unique('reg_number');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('hash');
};
