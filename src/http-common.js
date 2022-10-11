import axios from "axios";

export default axios.create({
  baseURL: "https://api2.binance.com/api/v3/",
  headers: {
    "Content-type": "application/json"
  }
});
