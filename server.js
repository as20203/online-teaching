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

const sequelize = new Sequelize('teaching', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql'
});

const db = {
  user: sequelize.import("./backend/models/user"),
  teacher: sequelize.import("./backend/models/teacher"),
  student: sequelize.import("./backend/models/student"),
  lesson: sequelize.import("./backend/models/lesson"),
};

//Routes
const authRoutes = require("./backend/routes/auth")(db);
const generalRoutes = require("./backend/routes/general")(db);
const lessonRoutes = require("./backend/routes/lesson")(db);
 
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
});

app.use(authRoutes);
app.use(generalRoutes);
app.use(lessonRoutes);

server.listen(port, () => console.log(`Listening on port ${port}`));