import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { UserContext } from "./useUser";

type User = {
  employeeId: string;
  name: string;
  email: string;
  role: "admin" | "employee" | "hr";
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.location.pathname !== "/login") {
      api
        .get("/auth/me")
        .then((res) => {
          setUser(res.data.user);
          setLoading(false);
        })
        .catch(() => {
          setUser(null);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
