import { useAtom } from "jotai";
import React, { FC, useEffect } from "react";
import notesAtom from "../../atoms/notesAtom";
import userAtom from "../../atoms/userAtom";
import { trpc } from "../../utils/trpc";

const Layout: FC<{ children: React.ReactElement }> = ({ children }) => {
  const [user, setUser] = useAtom(userAtom);
  const [, setNotes] = useAtom(notesAtom);

  trpc.useQuery(["notes.all"], {
    enabled: !!user,
    onSuccess: (notes) => {
      setNotes(notes);
    },
  });

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
