const router = require("express").Router();
const tasks = require("./taskModel.js");

router.get("/", (req, res) => {
    tasks.find()
    .then(task => {
        res.status(200).json(task)
    })
    .catch (e => res.status(500).json({message: "Error getting task"}))
})
router.get("/:id", (req, res) => {
    const {id} = req.params;
    tasks.findById(id)
    .then(task => {
        if(task){
            res.status(200).json(task)
        }
        else{res.status(404).json({message: "Cannot find tasks"})}
    })
    .catch (e => res.status(500).json({message: "Error getting tasks"}))
})
router.post("/", (req, res) => {
    const posting = req.body;
    tasks.add(posting)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(e => res.status(500).json({message: "Error adding tasks"}))
})

router.put("/:id", (req, res) => {
    const{id} = req.params;
    const changes = req.body;

    tasks.findById(id)
    .then(task => {
        if(task) {
            task.update(changes, id)
            .then(updatedtasks =>
                res.json(updatedtasks))
        } else {res.status(404).json({message: "Could not find tasks"})}
    })
    .catch (e => res.status(500).json({message: "Error updating tasks"}))
})
router.delete("/:id", (req, res) =>{
    const {id} = req.params;
    tasks.remove(id)
    .then(deleted => {
        if(deleted){
            res.status({removed: deleted})
        }
        else{res.status(404).json({message:"Could not find tasks"})}
    })
    .catch (e => res.status(500).json({message: "Error deleting tasks"}))
})

module.exports = router