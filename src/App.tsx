import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import CalculatorList from "./pages/CalculatorList";
import CompoundInterestPage from "./pages/CompoundInterestPage";
import MortgagePage from "./pages/MortgagePage";
import LoanPage from "./pages/LoanPage";
import RetirementPage from "./pages/RetirementPage";
import InvestmentPage from "./pages/InvestmentPage";
import SavingsPage from "./pages/SavingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/calculators" element={<CalculatorList />} />
              <Route path="/calculators/compound-interest" element={<CompoundInterestPage />} />
              <Route path="/calculators/mortgage" element={<MortgagePage />} />
              <Route path="/calculators/loan" element={<LoanPage />} />
              <Route path="/calculators/retirement" element={<RetirementPage />} />
              <Route path="/calculators/investment" element={<InvestmentPage />} />
              <Route path="/calculators/savings" element={<SavingsPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
