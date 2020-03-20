
exports.up = function(knex) {
  return knex.schema
  .createTable("projects", t => {
      t.increments();
      t.varchar("name").notNullable();
      t.varchar("description");
      t.boolean("complete").notNullable().defaultTo(false)
  })
  .createTable("resources", t =>{
      t.increments();
      t.varchar("name").notNullable().unique();
      t.varchar("description")
  })
  .createTable("project_resources", t =>{
      t.increments();
      t.integer("project_id").unsigned().notNullable().references("id").inTable("projects").onUpdate("CASCADE").onDelete("RESTRICT");
      t.integer("resource_id").unsigned().notNullable().references("id").inTable("resources").onUpdate("CASCADE").onDelete("RESTRICT");
    //   t.varchar("name").notNullable().references("name").inTable("resources").onUpdate("CASCADE").onDelete("RESTRICT");
  })
  .createTable("tasks", t =>{
      t.increments();
      t.integer("project_id").unsigned().notNullable().references("id").inTable("projects").onUpdate("CASCADE").onDelete("RESTRICT");
      t.varchar("description").notNullable();
      t.varchar("notes");
      t.boolean("complete").notNullable().defaultTo(false)
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('tasks')
  .dropTableIfExists('project_resources')
  .dropTableIfExists('resources')
  .dropTableIfExists('projects')

};
