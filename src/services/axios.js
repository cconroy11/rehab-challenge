import axios from "axios";
 
const http = axios.create({
  baseURL: process.env.VUE_APP_API
});

http.interceptors.request.use((config) => {
  var user = JSON.parse(localStorage.getItem('user'));
  if(user){
      config.headers.common = {'x-access-token': `${user.accessToken}`}
  }
  return config
}, (err) => {
  console.log(err)
  return Promise.reject(err)
})

export default http;