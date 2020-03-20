
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("resources").insert([
    {
      resource_name: "Sponge"
    },
    {
      resource_name: "Soap"
    },
    {
      resource_name: "Spatula",
  
    },
    {
      resource_name: "Pan"
    },
    {
      resource_name: "Bed",
    },
    {
      resource_name: "Pillow"
    },
    {
      resource_name: "Second monitor"
    },
    {
      resource_name: "Laptop",

    }
  ])
};
