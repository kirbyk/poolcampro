const MongoClient = require('mongodb').MongoClient;

const uri = process.env.POOLCAM_ATLAS_URI

var state = {
  db: null,
}

exports.connect = function() {
  if (state.db) return;

  MongoClient.connect(uri, function(err, db) {
    if (err) return;
    state.db = db
  })
}

exports.get = function() {
  return state.db
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}