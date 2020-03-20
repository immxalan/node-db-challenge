
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("projects").insert([
    {
      name: "Cleaning",
      description: "Clean your room",
      complete: true
    },
    {
      name: "Making Dinner",
      description: "Cook some fajitas",
      complete: false
    },
    {
      name: "Sleeping",
      description: "Sleep before 10",
      complete: false
    },
    {
      name: "Finish Sprint",
      description: "Finish the test!",
      complete: false
    }
  ])
};
