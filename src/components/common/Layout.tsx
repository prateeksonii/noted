import { useAtom } from "jotai";
import React, { FC, useEffect } from "react";
import userAtom from "../../atoms/userAtom";
import { trpc } from "../../utils/trpc";

const Layout: FC<{ children: React.ReactElement }> = ({ children }) => {
  const [user, setUser] = useAtom(userAtom);

  const { isLoading, isError, error } = trpc.useQuery(["users.me"], {
    retry: false,
    onError: () => {
      setUser(null);
    },
    onSuccess: (user) => {
      setUser(user);
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default Layout;
