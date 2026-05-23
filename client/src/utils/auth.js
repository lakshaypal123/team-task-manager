export const getUser = () => {
    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;
};

export const isAdmin = () => {
    const user = getUser();

    return user?.role === "admin";
};

export const isMember = () => {
    const user = getUser();

    return user?.role === "member";
};