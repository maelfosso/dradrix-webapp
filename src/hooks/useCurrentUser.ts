import { UserType } from "models/auth";
import { useEffect, useMemo, useState } from "react";
import { getCurrentUserQuery } from "api/auth";
import { useQuery } from "@tanstack/react-query";

export default function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<UserType|null>(null);

  const {isPending: isPendingCurrentUser, isError, data, error } =
    useQuery(getCurrentUserQuery());

  useEffect(() => {
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
