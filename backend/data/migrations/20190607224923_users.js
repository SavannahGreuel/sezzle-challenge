
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(tbl) {
        
        tbl.increments(); 
    
        tbl
        .string('name', 255)
        .notNullable();
        
        tbl
        .integer('calculation')
        .notNullable();
        
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');

};
