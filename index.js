#!/usr/bin/env node
const axios = require("axios");
console.log("Hello, Node.JS!");

const year = 2022;
const CountryCode = "AT";

async function holidate() {
  axios
    .get(`https://date.nager.at/api/v3/PublicHolidays/${year}/${CountryCode}`)
    .then(function (response) {
      //en cas de réussite de la requete --> affiche la réponse
      console.log(response);
    })
    .catch(function (error) {
      //en cas d'erreur affiche "error"
      console.log(error);
    })
    .then(function () {});
}

holidate();
