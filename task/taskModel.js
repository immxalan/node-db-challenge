const db = require("../data/dbConfig");

module.exports = {
    add,
    find,
    findById,
    update,
    remove
}
function find(){
    return db("tasks")
    .join("projects", "tasks.project_id", "projects.id")
    .select(
        "tasks.id",
        "tasks.project_id",
        "projects.project_name",
        "tasks.task_description",
        "tasks.notes",
        "tasks.task_complete"
    )
    .orderBy("tasks.id")
}

async function add(task) {
    const [id] = await db("tasks").insert(task);
    return findById(id);
}

function findById(id){
    return db("tasks")
    .where({ id })
    .first();
}
function remove(id){
    return db("tasks")
    .where("id", Number(id))
    .del();
}

function update(changes, id) {
    return db("tasks")
    .where({id})
    .where(changes)
}