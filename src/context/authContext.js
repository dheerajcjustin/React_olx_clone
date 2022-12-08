import { createContext, useState } from "react";

export const FirebaseContext = createContext(null);

export const AuthContext = createContext(null);

export const Context = ({ children }) => {
  const [loginStuatus, setloginStuatus] = useState(null);
  return (
    <AuthContext.Provider value={{ loginStuatus, setloginStuatus }}>
      {children}
    </AuthContext.Provider>
  );
};
