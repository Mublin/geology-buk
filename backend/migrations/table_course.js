exports.up = function (knex) {
  return knex.schema.createTable('lecture_note', function (table) {
    table.increments('id').primary();
    table.text('course_name');
    table.smallint('level');
    table.text('course_title');
    table.specificType('lecture_note', 'bytea');
    table.text('file_path');
    table.text('course_code');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('lecture_note');
};
