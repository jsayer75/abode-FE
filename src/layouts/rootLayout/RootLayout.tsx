import { Outlet } from "react-router-dom";
import MenuAppBar from "../../components/menuAppBar/MenuAppBar";

const RootLayout = () => {
  return (
    <>
      <MenuAppBar />
      <Outlet />
    </>
  );
};

export default RootLayout;
