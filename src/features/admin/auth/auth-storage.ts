export const AuthStorage = {
    setToken: (token: string) => {
        return localStorage.setItem("jwt", token);
    },
    getToken: () => {
        return localStorage.getItem("jwt");
    },
    removeToken: () => {
        return localStorage.removeItem("jwt");
    },
};
