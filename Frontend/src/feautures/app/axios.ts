import axios from "axios";
import { useAuthStore } from "../auth/auth.store";
import { refresh } from "../auth/auth.api";

const api = axios.create({
    baseURL:"https://dummyjson.com",
    headers:{
        'Content-Type':"application/json"
    },
    // withCredentials: true
});

//attach token to all request
api.interceptors.request.use((config)=>{
  const token = useAuthStore.getState().accessToken;

  if(token){
   config.headers = config.headers || {};
   config.headers.Authorization = `Bearer ${token}`
  }
  return config
},
(error)=> {
  return Promise.reject(error)
}
)

//
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If unauthorized and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        if(!refreshToken) throw Error("No refresh token")

        const data = await refresh(refreshToken)

        // Save new token
        useAuthStore.getState().setTokens(
          data.accessToken,
          data.refreshToken
        );

        // Attach new token to original request
        originalRequest.headers.Authorization =
          `Bearer ${data.accessToken}`;

        return api(originalRequest);
      } catch (err) {
        useAuthStore.getState().logout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);


export default api