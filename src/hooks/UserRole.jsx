import useAuthContext from "../context/AuthContext";

export const UserRole = () => {
  const { user } = useAuthContext();
  return user?.data?.role;
};
