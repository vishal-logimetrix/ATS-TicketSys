export const getCurrentUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user || null;
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
    return null;
  }
};

export const getUserRole = () => {
  return getCurrentUser()?.role || "user";
};
