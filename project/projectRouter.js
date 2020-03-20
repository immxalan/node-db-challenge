const router = require("express").Router();
const project = require("./projectModel.js");

router.get("/", (req, res) => {
    project.find()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch (e => res.status(500).json({message: "Error getting projects"}))
})
router.get("/:id", (req, res) => {
    const {id} = req.params;
    project.findById(id)
    .then(projects => {
        if(projects){
            res.status(200).json(projects)
        }
        else{res.status(404).json({message: "Cannot find project"})}
    })
    .catch (e => res.status(500).json({message: "Error getting project"}))
})

router.get('/:id/tasks', (req, res) => {
    const { id } = req.params;
  
    project.findTasks(id)
    .then(task => {
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: 'Could not find tasks for given project' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get tasks' });
    });
  });
  
router.post("/", (req, res) => {
    const posting = req.body;
    project.add(posting)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(e => res.status(500).json({message: "Error adding project"}))
})

router.post('/:id/tasks', (req, res) => {
    const taskData = req.body;
    const { id } = req.params; 
  
    project.findById(id)
    .then(task => {
      if (task) {
        project.addTask(taskData, id)
        .then(task => {
          res.status(201).json(task);
        })
      } else {
        res.status(404).json({ message: 'Could not find task with given id.' })
      }
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new task' });
    });
  });

router.put("/:id", (req, res) => {
    const{id} = req.params;
    const changes = req.body;

    project.findById(id)
    .then(projects => {
        if(projects) {
            projects.update(changes, id)
            .then(updatedProject =>
                res.json(updatedProject))
        } else {res.status(404).json({message: "Could not find project"})}
    })
    .catch (e => res.status(500).json({message: "Error updating project"}))
})
router.delete("/:id", (req, res) =>{
    const {id} = req.params;
    project.remove(id)
    .then(deleted => {
        if(deleted){
            res.status({removed: deleted})
        }
        else{res.status(404).json({message:"Could not find project"})}
    })
    .catch (e => res.status(500).json({message: "Error deleting project"}))
})

module.exports = router