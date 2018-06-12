export default async function authHeader() {
    // return authorization header with jwt token
    let token = await localStorage.getItem('app-token');
    if (token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
}
