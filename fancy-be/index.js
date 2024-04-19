const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

const orders = [
  {
    id: 1,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
    userId: 1,
    live: true,
  },
  {
    id: 2,
    description:
      "Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi.",
    userId: 1,
    live: true,
  },
  {
    id: 3,
    description:
      "Nonummy ipsum non arcu. Vivamus sit amet magna viverra, aliquet libero id, cursus at, condimentum ultrices, nunc. Vestibulum ante ipsum primis in faucibus orci.",
    userId: 2,
    live: true,
  },
  {
    id: 4,
    description:
      "Luctus et ultrices posuere cubilia Curae; Aenean lacinia mauris vel est. Suspendisse eu nisl. Nullam ut libero. Integer dignissim consequat lectus. Class aptent taciti.",
    userId: 2,
    live: true,
  },
];

app.get("/api/orders", (req, res) => {
  new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
    res.json(orders)
  );
});

app.post("/api/orders", (req, res) => {
  const order = { id: Date.now(), resolved: false, ...req.body };
  orders.push(order);

  res.json(order);
});

app.patch("/api/orders/:id", (req, res) => {
  const index = orders.findIndex((order) => order.id == req.params.id);
  const order = orders[index];
  orders[index] = { ...order, live: !order.live };

  res.json(order);
});

app.delete("/api/orders/:id", (req, res) => {
  const index = orders.findIndex(
    (order) => order.id === parseInt(req.params.id)
  );
  orders.splice(index, 1);
  res.json({ id: parseInt(req.params.id) });
});

app.listen(9001, () => {
  console.log("Node server started on port 9001.");
});
