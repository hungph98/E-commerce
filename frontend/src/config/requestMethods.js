import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

// const user = JSON.parse(localStorage.getItem("persist:root")).user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser.accessToken;
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTdmZmFjOWQ3YmM0NTliZGI2NmU4ZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MTA5NTQ2NywiZXhwIjoxNjcxMzU0NjY3fQ.ZrxpwO3lGFMPvHLrcj6WWwMJ6cz7FDEjRB_5KLe4lNU"

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});
//
export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` },
});