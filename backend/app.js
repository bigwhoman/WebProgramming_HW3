import express from 'express';
import routers from './routers.js';
import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

const app = express();
const port = 3000;

/* for testing connection to database

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

*/

const Note = sequelize.define('Note', {

  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }

}, {
  freezeTableName: true,
  timestamps: true
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey:true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username:{
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: true
});

await Note.sync({ alter: true });
await User.sync({ alter: true });

/* For Testing Note model in database

  console.log(Note === sequelize.models.Note);
  let note = new Note({id : 1});
  console.log(note.id);
*/


app.use('/notes', routers);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
