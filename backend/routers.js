import express from 'express';
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// define the home page route
router.get('/', function (req, res) {
  res.send('Home page')
})

// define the about route
router.post('/new', function (req, res) {
  res.send('create new note');
});

router.get('/:noteId(\\d+)', function (req, res) {

    res.send(req.params);

});

router.put('/:noteId(\\d+)', function (req, res) {

    res.send(req.params);

});

router.delete('/:noteId(\\d+)', function (req, res) {

    res.send(req.params);

});

export default router;