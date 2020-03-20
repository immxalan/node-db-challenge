const router = require("express").Router();
const resources = require("./resourceModel.js");

router.get("/", (req, res) => {
    resources.find()
    .then(resource => {
        res.status(200).json(resource)
    })
    .catch (e => res.status(500).json({message: "Error getting resource"}))
})
router.get("/:id", (req, res) => {
    const {id} = req.params;
    resources.findById(id)
    .then(resource => {
        if(resource){
            res.status(200).json(resource)
        }
        else{res.status(404).json({message: "Cannot find resources"})}
    })
    .catch (e => res.status(500).json({message: "Error getting resources"}))
})
router.post("/", (req, res) => {
    const posting = req.body;
    resources.add(posting)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(e => res.status(500).json({message: "Error adding resources"}))
})

router.put("/:id", (req, res) => {
    const{id} = req.params;
    const changes = req.body;

    resources.findById(id)
    .then(resource => {
        if(resource) {
            resource.update(changes, id)
            .then(updatedresources =>
                res.json(updatedresources))
        } else {res.status(404).json({message: "Could not find resources"})}
    })
    .catch (e => res.status(500).json({message: "Error updating resources"}))
})
router.delete("/:id", (req, res) =>{
    const {id} = req.params;
    resources.remove(id)
    .then(deleted => {
        if(deleted){
            res.status({removed: deleted})
        }
        else{res.status(404).json({message:"Could not find resources"})}
    })
    .catch (e => res.status(500).json({message: "Error deleting resources"}))
})

module.exports = router