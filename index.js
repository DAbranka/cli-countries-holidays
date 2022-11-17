#!/usr/bin/env node

// EXO
    // RECUPERER les congés des pays demander

// Pseudo Code
    // REQUEST = récuperer les données depuis les données de l'api date.nager.at
    // Verifier le contenu de la réponse avec console.log(reponse)
    // 


const axios = require("axios");


let country = process.argv[2].toLowerCase();
let code;

async function countries() {
  return await axios
    .get("https://date.nager.at/api/v3/AvailableCountries")
    .then((response) => {
      const data = response.data;
      return data;
    });
}

async function CountryCode() {
  const countryData = await countries();
  for (let i = 0; countryData.length; i++) {
    if (countryData[i]?.name?.toLowerCase() === country) {
      code = countryData[i].countryCode;
      return code;
    }
  }
}

async function holidays() {
  let countryCode = await CountryCode();
  let currentYear = new Date().getFullYear();
  let holidaysList = await axios.get(
    "https://date.nager.at/api/v3/PublicHolidays/" +
      currentYear +
      "/" +
      countryCode
  );
  let allholidays = holidaysList["data"];
  allholidays.forEach((element) => {
    console.log(
      element["date"] + " " + element["localName"] + " " + element["name"]
    );
  });
}

// APPEL des fonctions
countries();
CountryCode();
holidays();
