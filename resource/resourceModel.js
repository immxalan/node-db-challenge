const db = require("../data/dbConfig");

module.exports = {
    add,
    find,
    // findBy,
    findById,
    update,
    remove
}
function find(){
    return db("resources")
    // .join("projects", "resources.project_id", "projects.id")
    // .select(
    //     "tasks.id",
    //     "tasks.project_id",
    //     "projects.name",
    //     "tasks.description",
    //     "tasks.notes",
    //     "tasks.complete"
    // )
    // .orderBy("tasks.id")
}

async function add(resource) {
    const [id] = await db("resources").insert(resource);
    return findById(id);
}

function findById(id){
    return db("resources")
    .where({ id })
    .first();
}
function remove(id){
    return db("resources")
    .where("id", Number(id))
    .del();
}

function update(changes, id) {
    return db("resources")
    .where({id})
    .where(changes)
}