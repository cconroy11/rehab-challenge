export default function authHeader() {
    var user = JSON.parse(localStorage.getItem('user'));
  
    if (user) {
      return { 'Content-type': 'application/json', 'x-access-token': user.accessToken };
    } else {
      return { 'Content-type': 'application/json' };
    }
}