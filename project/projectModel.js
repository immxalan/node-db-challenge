const db = require("../data/dbConfig");

module.exports = {
    add,
    find,
    // findBy,
    findTasks,
    addTask,
    findById,
    update,
    remove
}
function find(){
    return db("projects")
}

// function findBy(filter){
//     return db("projects").where(filter);
// }

async function add(project) {
    const [id] = await db("projects").insert(project);
    return findById(id);
}

function findById(id){
    return db("projects")
    .where({ id })
    .first();
}
function findTasks (id){
    return db("tasks")
    .join("projects", "tasks.project_id", "projects.id")
    .select(
        "tasks.id",
        "tasks.project_id",
        "projects.name",
        "tasks.task_description",
        "tasks.notes",
        "tasks.task_complete"
    )
    .orderBy("tasks.id")
    .where("projects.id", id)
}
function addTask(task, project_id){
    return db("tasks")
    .insert(task, project_id)
}
function remove(id){
    return db("projects")
    .where("id", Number(id))
    .del();
}

function update(changes, id) {
    return db("projects")
    .where({id})
    .where(changes)
}