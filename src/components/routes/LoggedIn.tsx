import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

export default function LoggedIn(): ReactElement | null {
  const {token} = useUser()

  if (token) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
}
