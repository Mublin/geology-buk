exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('reg_number').notNullable();
    table.string('email');
    table.text('name');
    table.boolean('student').defaultTo(true);
    table.boolean('admin').defaultTo(false);
    table.unique('email');
    table.unique('reg_number');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
