import axios from "axios";
const axiosClient = axios.create({
   baseURL: `${import.meta.env.VITE_GRAPH_API}/${import.meta.env.VITE_PAGE_ID}`,
});

axiosClient.interceptors.request.use((config) => {
   const access_token = {
      access_token: import.meta.env.VITE_PAGE_ACCESS_TOKEN,
   };
   if (config.method == "post" || config.method == "put") {
      config.data = { ...config.data, ...access_token };
   }

   if (config.method == "get") {
      config.params = {
         ...config.params,
         ...access_token,
      };
   }
   return config;
});

export default axiosClient;
