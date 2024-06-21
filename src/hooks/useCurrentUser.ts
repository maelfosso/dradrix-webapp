import { UserType } from "models/auth";
import { useEffect, useMemo, useState } from "react";
import { getCurrentUserQuery } from "api/auth";
import { useQuery } from "@tanstack/react-query";

// TODO must be deleted
export default function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<UserType|null>(null);

  const {isPending: isPendingCurrentUser, isError, data, error } =
    useQuery(getCurrentUserQuery());

  useEffect(() => {
    console.log('[useCurrentUser] use-effect', data, isPendingCurrentUser);
    if (data) {
      setCurrentUser(data)
    }
  }, [data])

  return useMemo(() => ({
    currentUser,
    setCurrentUser,
    isPendingCurrentUser,
    isError,
    error
  }), [currentUser, error, isError, isPendingCurrentUser]);
}
