import { useState } from "react";
import Header from "@/components/layout/Header";
import LoginForm from "@/components/login/LoginForm";
import Dashboard from "@/components/dashboard/Dashboard";

const Index = () => {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  const handleLogin = (userData: { name: string; role: string }) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      <Dashboard user={user} />
    </div>
  );
};

export default Index;
