const express = require("express")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const app = express()
const port = 3000

// Connection to Mongo DB
mongoose.connect("mongodb://localhost/tvshows", (err, res) => {
  if(err) throw err;
  console.log('Connected to DB')
});

// Midlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import controllers and models
const models = require("./models/tvshow")(app, mongoose);
const TVShowCtrl = require("./controllers/tvshows");

// Routes
const router = express.Router();
app.use(router);

const tvshows = express.Router();

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
app.listen(port, () => {
  console.log(`Node server running on http://localhost:${port}`);
});
