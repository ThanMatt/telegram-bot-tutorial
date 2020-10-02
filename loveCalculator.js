const axios = require("axios");

const BASE_URL = "https://love-calculator.p.rapidapi.com/getPercentage";
const API_KEY = "";

module.exports = {
  getPercentage: (firstName, partnerName) => {
    return axios({
      method: "GET",
      url: BASE_URL,
      headers: {
        "x-rapidapi-host": "love-calculator.p.rapidapi.com",
        "x-rapidapi-key": API_KEY,
        "content-type": "application/octet-stream",
      },
      params: {
        fname: firstName,
        sname: partnerName,
      },
    });
  },
};
