import { users, products } from '../constants';

const express = require('express');
const path = require('node:path');
const { serialize, parse } = require('../utils/json');

const router = express.Router();

const jsonDbPath = path.join(__dirname, '/../data/historique.json');

const PURCH = [];

router.post('/', (req, res) => {
    const pseudoF = req?.body?.pseudo;
    const idF = req?.body?.id;
    const quantityF = req?.body?.quantity;
  
    if (!pseudoF || !idF || !quantityF) return res.sendStatus(400); // error code '400 Bad request'
  
    const allPurchases = parse(jsonDbPath, PURCH);
    // const lastItemIndex = allPurchases?.length !== 0 ? allPurchases.length - 1 : undefined;
    if(!users.find(pseudoF)) return res.sendStatus(400);
    if(!products.find(item => item.id === idF)) return res.sendStatus(400);
  
    const newPizza = {
      pseudo: pseudoF,
      id: idF,
      quantity: quantityF,
    };
  
    allPurchases.push(newPizza);
  
    serialize(jsonDbPath, allPurchases);
  
    return res.json(newPizza);
  });