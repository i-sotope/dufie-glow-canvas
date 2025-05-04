
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  requireAuth?: boolean;
}

const PageLayout = ({ children, className = "", requireAuth = false }: PageLayoutProps) => {
  const { user, loading } = useAuth();

  // Check if authentication is required but user is not logged in
  if (requireAuth && !loading && !user) {
    toast.error("You need to sign in to access this page.");
    // You could redirect here in a real app
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-grow ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
