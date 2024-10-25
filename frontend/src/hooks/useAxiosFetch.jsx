import { useEffect } from "react";
import axios from "axios";

const useAxiosFetch = () => {
    const axiosInstance = axios.create({
        baseURL:'http://localhost:5000/',
    });

    //Interceptors
    useEffect(()=>{
        const requestInterceptor = axios.interceptors.request.use((config) => {
            //Do something before request is sent
            return config;
        }, function (error) {
            //D0 something with request error
            return Promise.reject(error);
        });

    //Response Interceptor
        const responseInterceptor = axios.interceptors.response.use((response) => {
            //Any status code that lie within the range of 2xx cause this function to trigger
            //Do something with response data
            return response;
        }, function (error) {
            //Any status codes that fall outside the range of 2xx cause this function to trigger
            //Do something with response error
            return Promise.reject(error);
        });

        return ()=>{
            axiosInstance.interceptors.request.eject(requestInterceptor)
            axiosInstance.interceptors.response.eject(responseInterceptor)

        }
}),[axiosInstance];

 return axiosInstance;
}

export default useAxiosFetch
