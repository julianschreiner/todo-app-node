// DB Setup
const mongoose = require('mongoose');

var DATABASE_URL = process.env.DATABASE_URL || 'db-mongo:27017'
var DATABASE_NAME = 'todo-app-node'
console.log(DATABASE_URL)

mongoose.connect(`mongodb://${DATABASE_URL}/${DATABASE_NAME}`, { useNewUrlParser: true });
var db = mongoose.connection;


db.on('error', function (error) {
  console.log(error);
  // If first connect fails because server-database isn't up yet, try again.
  // This is only needed for first connect, not for runtime reconnects.
  // See: https://github.com/Automattic/mongoose/issues/5169
  if (error.message && error.message.match(/failed to connect to server .* on first connect/)) {
    setTimeout(function () {
      mongoose.connect(`mongodb://${DATABASE_URL}/${DATABASE_NAME}`, { useNewUrlParser: true }).catch(() => {
        // empty catch avoids unhandled rejections
      });
    }, 20 * 1000);
  } else {
    // Some other error occurred.  Log it.
    console.error(new Date(), String(error));
  }
});

db.once("open", function(callback){
  console.log("Connection Succeededd");
});


module.exports = {
    db,
    mongoose
}