"use client";

import { useAuthContext } from "@/contexts/AuthProvider";

export default function BoardPage() {
  const { clearAuth, setAuth, user } = useAuthContext();

  console.log(user);

  const handleSetUser = () => {
    console.log("triggered");
    setAuth({ email: "email@gmail.com", username: "pencho" });
  };

  const handleClearUser = () => {
    clearAuth();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="container max-w-[1400px] justify-center px-20">
        <p>Board page</p>
        <p>User: {user!.email}</p>
        <button onClick={handleSetUser}>Set user</button>
        <button onClick={handleClearUser}>Clear user</button>
      </div>
    </div>
  );
}
