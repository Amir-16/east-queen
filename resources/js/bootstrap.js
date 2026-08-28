import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// Use XSRF-TOKEN cookie for CSRF — Laravel refreshes it on every response,
// so it stays fresh even after session rotation or server restarts.
window.axios.defaults.xsrfCookieName  = 'XSRF-TOKEN';
window.axios.defaults.xsrfHeaderName  = 'X-XSRF-TOKEN';
window.axios.defaults.withCredentials = true;
