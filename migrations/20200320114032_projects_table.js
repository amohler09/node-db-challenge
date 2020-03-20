exports.up = function(knex) {
  return knex.schema
    .createTable("projects", tbl => {
      tbl.increments();

      tbl
        .string("project_name", 255)
        .notNullable()
        .unique();

      tbl.string("project_description", 500).notNullable();

      tbl
        .boolean("project_completed")
        .notNullable()
        .defaultTo(false);
    })

    .createTable("tasks", tbl => {
      tbl.increments();

      tbl.string("task_description", 500).notNullable();

      tbl.string("task_notes", 255);

      tbl
        .boolean("task_completed")
        .notNullable()
        .defaultTo(false);

      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })

    .createTable("resources", tbl => {
      tbl.increments();

      tbl.string("resource_name", 255).notNullable();

      tbl.string("resource_description", 500);
    })

    .createTable("project_resources", tbl => {
      tbl.increments();

      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

      tbl
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("resources")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("project_resources")
    .dropTableIfExists("resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("projects");
};
