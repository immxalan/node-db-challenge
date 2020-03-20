
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("projects").insert([
    {
      project_name: "Cleaning",
      project_description: "Clean your room",
      project_complete: true
    },
    {
      project_name: "Making Dinner",
      project_description: "Cook some fajitas",
      project_complete: false
    },
    {
      project_name: "Sleeping",
      project_description: "Sleep before 10",
      project_complete: false
    },
    {
      project_name: "Finish Sprint",
      project_description: "Finish the test!",
      project_complete: false
    }
  ])
};
