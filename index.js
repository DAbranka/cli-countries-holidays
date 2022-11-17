#!/usr/bin/env node

/*----------------------------------------------------------------------------------------*/
// EXO
    // RECUPERER les congés des pays demander

// Pseudo Code
    // REQUEST = récuperer les données depuis les données de l'api date.nager.at
    // Verifier le contenu de la réponse avec console.log(reponse)
    // RECUPERER les elements (countries, country code, holidays) de chaques tableau demander

/*-------------------------------------------------------------------------------------------------------*/

// Nécessaire pour utiliser axios
const axios = require("axios");

// On déclare country qui contient process.arg[] = tableau dans lequel on récupère le 3e element
let country = process.argv[2].toLowerCase(); //.toLowerCase() = mettre les caractères en minuscules

// On crée cette variable pour le déclarer plus tard dans le code
let code;

// ON CREE un fonction dans laquel on fait une requete pour récupérer les données de la réponse.
async function countries() {
  return await axios
    .get("https://date.nager.at/api/v3/AvailableCountries") // requete
    .then((response) => { // pour la réponse on crée un nouv' fonction
      const data = response.data; // On crée une var qui contient les données récuperé de la réponse
      return data; // On retourne  les données
    });
}

//
async function CountryCode() {
  const countryData = await countries(); // Variable qui contient
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
  let holidaysList = await axios.get("https://date.nager.at/api/v3/PublicHolidays/" + currentYear + "/" + countryCode);
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
