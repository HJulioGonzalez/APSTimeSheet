const fsPromises = require("fs").promises;
const path = require("path");
const express = require("express");
const { quotes } = require("./data.js");
const { getRandomQuote } = require("./utils.js");
const { PORT = 3000, BASE_PATH } = process.env;
const app = express();
const newInfo = [];
app.use(express.json());
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
        res.send(user);
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

app.post("/newUser", (req, res)=>{
  const newUser = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email
  };
  console.log(req.body)
  newInfo.push(newUser);
  res.status(201).json(newUser);
})

app.get("/users", (req,res)=>{
  res.json(newInfo)
})
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`El enlace al servidor ${PORT}`);
  // console.log(BASE_PATH);
});
