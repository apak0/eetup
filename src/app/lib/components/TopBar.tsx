"use client";
import { useRouter } from "next/navigation";
import { logout } from "../services/jwt";

export const TopBar = () => {
  const router = useRouter();
  const handleClick = () => {
    logout().then(() => {
      router.push("/auth/login");
    });
  };
  return (
    <div className="flex items-center justify-between p-4">
      <h1>Game of Techies</h1>
      <button type="submit" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
};
