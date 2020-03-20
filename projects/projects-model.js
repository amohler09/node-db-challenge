const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  findTasks,
  add
};

function find() {
  return db("projects");
}

function findById(id) {
  return db("projects")
    .where({ id })
    .first();
}

function findTasks(Projectid) {
  return db("projects")
    .join("tasks as t", "t.project_id", "projects.id")
    .select("t.*", "projects.project_name", "projects.project_description")
    .where({ project_id: Projectid });
}

function add(newProject) {
  return db("projects").insert(newProject);
}
