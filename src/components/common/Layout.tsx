import { useSession } from "next-auth/react";
import React, { FC } from "react";

const Layout: FC<{ children: React.ReactElement }> = ({ children }) => {
  const session = useSession();

  if (session.status === "loading") {
    return <div>Checking auth status...</div>;
  }

  return <>{children}</>;
};

export default Layout;
