import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import { UserProvider } from "./contexts/UserContext";
function App() {
  const router = createBrowserRouter(routes);

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
