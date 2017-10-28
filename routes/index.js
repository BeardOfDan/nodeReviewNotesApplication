var express = require('express');
var router = express.Router();
const notes = require('../models/notes-memory');

/* GET home page. */
router.get('/', function (req, res, next) {
  notes.keylist()
    .then((keylist) => {
      var keyPromises = [];
      for (var key of keylist) {
        // push the result of the .then of notes.read
        keyPromises.push(
          notes.read(key)
            .then(note => {
              return { key: note.key, title: note.title };
            })
        );
      }
      return Promise.all(keyPromises);
    })
    .then((notelist) => {
      res.render('index', {
        title: 'Notes',
        'notelist': notelist,
        breadcrumbs: [
          {
            href: '/',
            text: 'Home'
          }
        ]
      });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
