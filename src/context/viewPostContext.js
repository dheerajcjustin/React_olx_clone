import { createContext, useState } from "react";

export const ViewPostContext = createContext(null);

export const Post = ({ children }) => {
  const [postDetails, setPostDetails] = useState(null);
  return (
    <ViewPostContext.Provider value={{ postDetails, setPostDetails }}>
      {children}
    </ViewPostContext.Provider>
  );
};
