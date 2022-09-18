var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  mongoose = require("mongoose");

// Connection to Mongo DB
mongoose.connect("mongodb://localhost/tvshows", function(err, res){
  if(err) throw err;
  console.log('Connected to DB')
});

// Midlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import controllers and models
var models = require("./models/tvshow")(app, mongoose);
var TVShowCtrl = require("./controllers/tvshows");

// Routes
var router = express.Router();
app.use(router);

var tvshows = express.Router();

tvshows
  .route("/tvshows")
  .get(TVShowCtrl.findAllTVShow)
  .post(TVShowCtrl.addTVShow);

tvshows
  .route("/tvshows/:id")
  .get(TVShowCtrl.findById)
  .put(TVShowCtrl.updateTVShow)
  .delete(TVShowCtrl.deleteTVShow);

app.use("/api", tvshows);

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
