const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const port = 5000;
const server = require("http").Server(app);
const Sequelize = require('sequelize');

//SEED DATA
const SeedUsers = require("./backend/seed/SeedUsers");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const sequelize = new Sequelize('teaching', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

const db = {
  user:   sequelize.import("./backend/models/user"),
  teacher: sequelize.import("./backend/models/teacher"),
  student:sequelize.import("./backend/models/student"),
};

//Routes
const authRoutes = require("./backend/routes/auth")(db);
 
Object.keys(db).forEach((model) => {
  if ('associate' in db[model]) {
      db[model].associate(db)
  }
});

sequelize.sync({
  force:true 
})
.then(()=>{
  SeedUsers(db);
})

app.use(authRoutes);

server.listen(port, () => console.log(`Listening on port ${port}`));