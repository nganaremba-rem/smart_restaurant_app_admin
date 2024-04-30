import axios from "axios";

export const Axios = axios.create({
	baseURL: "https://smart-restaurant-app-backend.vercel.app/",
});

// const Config = {
// 	API_BASE_URL: "http://localhost:5000/restaurant/api/v1/",
// 	// API_BASE_URL: "http://10.250.1.216:5000/restaurant/api/v1/",
// };
