
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("tasks").insert([
    {
      project_id: 1,
      task_description: "Clean your room",
      task_complete: true
    },
    {
      project_id: 2,
      task_description: "Cook some fajitas",
      task_complete: false
    },
    {
      project_id: 3,
      task_description: "Sleep before 10",
      task_complete: false
    },
    {
      project_id: 4,
      task_description: "Finish the test!",
      task_complete: false
    }
  ])
};
