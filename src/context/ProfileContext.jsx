import { createContext } from "react";

export const ProfileContext = createContext();

export default function ProfileProvider({ children }) {

    
  return <ProfileContext.Provider>{{ children }}</ProfileContext.Provider>;
}
