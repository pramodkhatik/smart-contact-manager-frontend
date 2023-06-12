import { myAxios } from "./helper";

export const signUp = (user: { name: string; email: string; password: string; imageUrl: string; enabled: boolean; about: string; }) => {
  return myAxios.post("/auth/register", user).then((response: { data: any; }) => response.data);
};

export const signIn = (loginDetail: { username: string; password: string; }) => {
  return myAxios
    .post("/auth/login", loginDetail)
    .then((response: { data: any; }) => response.data);
};
