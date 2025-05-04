
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Main Pages
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Journal from "./pages/Journal";
import Contact from "./pages/Contact";

// Shop Subpages
import AllProducts from "./pages/shop/AllProducts";
import Bestsellers from "./pages/shop/Bestsellers";
import NewArrivals from "./pages/shop/NewArrivals";
import GiftSets from "./pages/shop/GiftSets";

// Company Subpages
import OurStory from "./pages/company/OurStory";
import Sustainability from "./pages/company/Sustainability";
import Ingredients from "./pages/company/Ingredients";
import Press from "./pages/company/Press";

// Support Subpages
import FAQs from "./pages/support/FAQs";
import ShippingReturns from "./pages/support/ShippingReturns";
import PrivacyPolicy from "./pages/support/PrivacyPolicy";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Main Pages */}
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Shop Subpages */}
            <Route path="/shop/all-products" element={<AllProducts />} />
            <Route path="/shop/bestsellers" element={<Bestsellers />} />
            <Route path="/shop/new-arrivals" element={<NewArrivals />} />
            <Route path="/shop/gift-sets" element={<GiftSets />} />
            
            {/* Company Subpages */}
            <Route path="/company/our-story" element={<OurStory />} />
            <Route path="/company/sustainability" element={<Sustainability />} />
            <Route path="/company/ingredients" element={<Ingredients />} />
            <Route path="/company/press" element={<Press />} />
            
            {/* Support Subpages */}
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/shipping-returns" element={<ShippingReturns />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
