import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

export default function Private(): ReactElement | null {
  const {token} = useUser()

  if (!token) {
    return <Navigate to={"/sign-in"} />;
  }

  return <Outlet />;
}
