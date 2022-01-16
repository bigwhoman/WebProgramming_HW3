import express from 'express';
import { Sequelize, Model, DataTypes, Op } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const app = express();
const port = 3000;

// ----------------------------------------------------------------
// -------------- MODELS -------------------

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
    autoIncrement: true,
    default: 1
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
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
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


await Note.sync({ alter: true, force: true });
await User.sync({ alter: true, force: true });


/* For Testing Note model in database

  console.log(Note === sequelize.models.Note);
  let note = new Note({id : 1});
  console.log(note.id);
*/

// ----------------------------------------------------------------
// -------------- END OF MODELS -------------------

// ----------------------------------------------------------------
// -------------- ROUTERS -------------------

app.use(express.json());

var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
});

router.post('/new', async function (req, res) {
  if (!req.user){
    res.status(401).json({error: "unAuthorized"});
  };
  
  await Note.sync({alter: true });
  const note = Note.build({ description : req.body.description });
  await note.save();
  // console.log("SAVED SUCCESSFULLY!");
  // console.log(note.id + " " + note.description);
});

router.get('/:noteId(\\d+)', async function (req, res) {
  if (!req.user){
    res.status(401).json({error: "unAuthorized"});
  };

  const noteId = req.params.noteId;

  const note = await Note.findByPk(parseInt(noteId));

  if (note === null) {
    res.status(404).json({error : 'Not found'});
  } else {
    res.status(200).json({id: noteId, description: note.description});
  }
});

router.put('/:noteId(\\d+)', async function (req, res) {

  if (!req.user){
    res.status(401).json({error: "unAuthorized"});
  };

  const note = await Note.findByPk(parseInt(req.params.noteId));

  if (note === null) {
    res.status(404).json({error: 'Not found'});
  }else {
    const new_desc = req.body.description;
    await note.update({description: new_desc});
    await note.save();
    res.status(200).json({id: note.id, description: note.description, status:"updated"});
  }

});

router.delete('/:noteId(\\d+)', async function (req, res) {

  if (!req.user){
    res.status(401).json({error: "unAuthorized"});
  };

  const note = await Note.findByPk(parseInt(req.params.noteId));

  if (note === null) {
    res.status(404).json({error: 'Not found'});
  }else {
    await note.destroy({force: false});
    res.status(200).json({id: note.id , status: "deleted"});
  }

});

app.use('/notes', router);

// ----------------------------------------------------------------
// -------------- END OF ROUTERS -------------------

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
