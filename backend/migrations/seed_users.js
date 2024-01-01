exports.up = function (knex) {
    return knex.seed.run();
};

exports.down = function (knex) {
    // This is optional and depends on your requirements.
    // You might want to rollback the data insertion in case of a rollback.
};