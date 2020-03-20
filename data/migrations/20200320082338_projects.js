
exports.up = function(knex) {
  return knex.schema
  .createTable("projects", t => {
      t.increments();
      t.varchar("project_name").notNullable();
      t.varchar("project_description");
      t.boolean("project_complete").notNullable().defaultTo(false)
  })
  .createTable("resources", t =>{
      t.increments();
      t.varchar("resource_name").notNullable().unique();
      t.varchar("resource_description")
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
      t.varchar("task_description").notNullable();
      t.varchar("notes");
      t.boolean("task_complete").notNullable().defaultTo(false)
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('tasks')
  .dropTableIfExists('project_resources')
  .dropTableIfExists('resources')
  .dropTableIfExists('projects')

};
