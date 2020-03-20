const db = require("../data/dbConfig");

module.exports = {
    add,
    find,
    findById,
    update,
    remove
}
function find(){
    return db("project_resources")
    .join("projects", "project_resources.project_id", "projects.id")
    .join("resources", "project_resources.resource_id", "resources.id" )
    .select(
        "project_resources.id",
        "project_resources.project_id",
        "projects.project_name",
        "project_resources.resource_id",
        "resources.resource_name"
    )
    .orderBy("project_resources.id")
}

async function add(pr) {
    const [id] = await db("project_resources").insert(pr);
    return findById(id);
}

function findById(id){
    return db("project_resources")
    .where({ id })
    .first();
}
function remove(id){
    return db("project_resources")
    .where("id", Number(id))
    .del();
}

function update(changes, id) {
    return db("project_resources")
    .where({id})
    .where(changes)
}