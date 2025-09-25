import axios from "axios";

const api = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
});

export default api;

/*
I centralized my Axios configuration in axiosConfig.js. This way, 
I don’t repeat base URLs, headers, or timeouts across the app. I can also plug in interceptors later for logging, 
authentication tokens, or error handling, which scales well for larger projects.
*/