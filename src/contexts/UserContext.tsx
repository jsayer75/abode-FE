import  { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { apiService } from "../utils/api";
import { Attendee } from "../components/eventCard/eventCard.interface";



interface UserContextType {
  token: string | null;
  updateToken: (newToken: string | null) => void;
  user: Attendee | null
}

const UserContext = createContext<UserContextType>({
  token: null,
  updateToken: () => {},
  user: null
});

export const UserProvider = ({ children }:{ children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [user, setUser] = useState<Attendee | null>(null)

  useEffect(() => {
    const fetchUserInfo = async () => {
       const fetchedUser =  await apiService.get('me')
       setUser(fetchedUser)
    }

    token && fetchUserInfo()

  },[token])




  const updateToken = (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };

  return (
    <UserContext.Provider value={{ token, updateToken, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => useContext(UserContext);
