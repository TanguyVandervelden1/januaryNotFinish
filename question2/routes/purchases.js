
const express = require('express');
const path = require('node:path');
const { serialize, parse } = require('../utils/json');

const router = express.Router();

const { users, products } = require('../constants');

const jsonDbPath = path.join(__dirname, '/../data/historique.json');

const PURCH = [
    {
        pseudo: "user45",
        id: 6,
        quantity: 33,
      },
];

router.post('/', (req, res) => {
    const pseudoF = req?.body?.pseudo;
    const idF = req?.body?.id;
    const quantityF = req?.body?.quantity;
    console.log("passage1");
    // console.log(pseudoF);
    console.log(idF);
    console.log(quantityF);
  
    if (!pseudoF || !idF || !quantityF) return res.sendStatus(400); // error code '400 Bad request'
    console.log("passage2");
    const allPurchases = parse(jsonDbPath, PURCH);
    // const lastItemIndex = allPurchases?.length !== 0 ? allPurchases.length - 1 : undefined;
    if(!users.find(item=> item===pseudoF)) return res.sendStatus(400);
    console.log("passage3");
    if(!products.find(item => item.id === idF)) return res.sendStatus(400);
    console.log("passage4");
  
    const newPizza = {
      pseudo: pseudoF,
      id: idF,
      quantity: parseInt(quantityF,10),
    };
    console.log("passage5");
  
    allPurchases.push(newPizza);
  
    serialize(jsonDbPath, allPurchases);
    console.log(newPizza);
    return res.sendStatus(200);
  });

  module.exports = router;