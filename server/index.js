const express = require("express");
const app = express();

// Middleware function for logging route requests
const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next(); // Passes the request to the next middleware/controller
};
// Register the logRoutes middleware globally to log all requests
app.use(logRoutes);

// Other endpoints and controllers

// The path module is useful for constructing relative filepaths
const path = require("path");
// the filepath is to the entire assets folder
const filepath = path.join(__dirname, "../vite-project/dist");
// generate middleware using the filepath
const serveStatic = express.static(filepath);
// Register the serveStatic middleware before the remaining controllers
app.use(serveStatic);

// other controllers

const servePicture = (req, res, next) => {
  const picture = [
    {
      src: "https://media.indiedb.com/images/members/1/361/360683/random_dog.jpg",
    },
  ];
  res.send(picture);
};

const serveJoke = (req, res, next) => {
  const joke = [
    {
      setup: "What's a dog's favorite type of workout?",
      punchline: "Pawlates!",
    },
  ];
  res.send(joke);
};

const serveDie = (req, res, next) => {
  let { quantity } = req.query;

  if (isNaN(quantity) || quantity <= 0) {
    quantity = 1;
  }

  const rolls = [];
  for (let i = 0; i < quantity; i++) {
    rolls.push(Math.floor(Math.random() * 6) + 1);
  }
  res.send({ rolls });
};

app.get("/api/picture", servePicture);
app.get("/api/joke", serveJoke);
app.get("/api/rollDie", serveDie);

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
