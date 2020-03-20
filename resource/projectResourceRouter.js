const router = require("express").Router();
const proj = require("./projectResourcesModel.js");

router.get("/", (req, res) => {
    proj.find()
    .then(pr => {
        res.status(200).json(pr)
    })
    .catch (e => res.status(500).json({message: "Error getting pr"}))
})
router.get("/:id", (req, res) => {
    const {id} = req.params;
    proj.findById(id)
    .then(pr => {
        if(pr){
            res.status(200).json(pr)
        }
        else{res.status(404).json({message: "Cannot find PR"})}
    })
    .catch (e => res.status(500).json({message: "Error getting PR"}))
})
router.post("/", (req, res) => {
    const posting = req.body;
    proj.add(posting)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(e => res.status(500).json({message: "Error adding PR"}))
})

router.put("/:id", (req, res) => {
    const{id} = req.params;
    const changes = req.body;

    proj.findById(id)
    .then(pr => {
        if(pr) {
            pr.update(changes, id)
            .then(updatedPR =>
                res.json(updatedPR))
        } else {res.status(404).json({message: "Could not find PR"})}
    })
    .catch (e => res.status(500).json({message: "Error updating PR"}))
})
router.delete("/:id", (req, res) =>{
    const {id} = req.params;
    proj.remove(id)
    .then(deleted => {
        if(deleted){
            res.status({removed: deleted})
        }
        else{res.status(404).json({message:"Could not find PR"})}
    })
    .catch (e => res.status(500).json({message: "Error deleting PR"}))
})

module.exports = router