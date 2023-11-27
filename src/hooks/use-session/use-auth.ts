import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../infra/firebase";

export const useAuth = () => {
  const [state, setState] = useState(() => {
    const user = auth.currentUser;
    return {
      initializing: !user,
      user,
    }
  })

  function onChange(user: User | null) {
    console.log('User from provider', {user})
    setState({ initializing: false, user })
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onChange)

    return () => unsubscribe()
  }, [])

  return state
}