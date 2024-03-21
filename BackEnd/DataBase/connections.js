exports.openConnection = () => {
  const knex = require("knex")({
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      password: "1234",
      database: "graduation_project_db",
    },
  });

  return knex;
};
