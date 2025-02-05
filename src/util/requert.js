import axios from "axios";

const service=axios.create({
    baseURL:'https://demo.tuoluojiang.com',
    timeout:9000
})

service.interceptors.request.use((config) => {
    const token=localStorage.getItem('token')
    if (token) {
      config.headers["authorization"] = "Bearer " + token;
    }
  
    return config;
  }),
    (error) => {
      return Promise.reject(error);
    },
service.interceptors.response.use((response) => {
      
      return response;
    }),
    (error) => {
     
      return Promise.reject(error);
    };
    export default service