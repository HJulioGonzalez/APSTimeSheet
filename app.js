const { fsPromises, fsPromises2 } = require("fs").promises;
const path = require("path");
const express = require("express");
const { quotes } = require("./data.js");
const { getRandomQuote } = require("./utils.js");

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();
app.get("/", (req, res) => {
  // res.json({ quote: getRandomQuote() });
  res.send(req.body);
});

app.get("/users/:userId", (req, res) => {
  const { userId } = req.params;

  fsPromises
    .readFile(path.join(__dirname, "users.json"))
    .then((data) => {
      const users = JSON.parse(data);
      const user = users.find((item) => item.userId === userId);
      // si el usuario existe,
      // envía sus tarjetas en la respuesta
      if (user) {
        res.send(users);
        return;
      }

      // si no, envía un mensaje apropiado
      res.status(404).send({ message: "No existe tal usuario" });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .send({ message: "Se ha producido un error en el servidor" });
    });
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log("El enlace al servidor.");
  console.log(BASE_PATH);
});
