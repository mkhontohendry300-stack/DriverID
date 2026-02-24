import { motion } from "framer-motion";
import { Shield, ChevronRight, User, UserCog, TrafficCone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 max-w-lg mx-auto">
      {/* Logo & Branding */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mb-10 text-center"
      >
        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl card-gradient flex items-center justify-center shadow-2xl animate-pulse-glow">
          <Shield size={40} className="text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
          Drive<span className="text-accent">ID</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-[260px] mx-auto leading-relaxed">
          Your digital document wallet. Secure, verified, always with you.
        </p>
      </motion.div>

      {/* Role Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full space-y-4"
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/auth?role=driver")}
          className="w-full py-4 rounded-2xl bg-card border border-border text-foreground font-semibold text-base flex items-center justify-center gap-3 shadow-sm"
        >
          <User size={20} />
          Driver Portal
          <ChevronRight size={18} className="ml-auto" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/auth?role=officer")}
          className="w-full py-4 rounded-2xl bg-card border border-border text-foreground font-semibold text-base flex items-center justify-center gap-3 shadow-sm"
        >
          <TrafficCone size={20} />
          Traffic Officer Portal
          <ChevronRight size={18} className="ml-auto" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/auth?role=admin")}
          className="w-full py-4 rounded-2xl bg-card border border-border text-foreground font-semibold text-base flex items-center justify-center gap-3 shadow-sm"
        >
          <UserCog size={20} />
          Admin Portal
          <ChevronRight size={18} className="ml-auto" />
        </motion.button>
      </motion.div>

      <p className="text-center text-[10px] text-muted-foreground mt-8">
        By continuing, you agree to our Privacy Policy & Terms of Service
      </p>
    </div>
  );
};

export default Index;
