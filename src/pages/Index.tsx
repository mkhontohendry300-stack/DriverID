import { motion } from "framer-motion";
import { Shield, ChevronRight } from "lucide-react";
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

      {/* Feature Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full space-y-3 mb-10"
      >
        {[
          { emoji: "🪪", title: "Digital Licence & ID", desc: "Beautiful card-style display" },
          { emoji: "📱", title: "QR Code Verification", desc: "Instant secure verification" },
          { emoji: "🔔", title: "Smart Alerts", desc: "Never miss an expiry date" },
        ].map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="flex items-center gap-4 bg-card rounded-xl p-4 border border-border"
          >
            <span className="text-2xl">{f.emoji}</span>
            <div>
              <p className="text-sm font-semibold text-foreground">{f.title}</p>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="w-full space-y-3"
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/dashboard")}
          className="w-full py-4 rounded-2xl card-gradient text-primary-foreground font-semibold text-base flex items-center justify-center gap-2 shadow-lg"
        >
          Get Started
          <ChevronRight size={18} />
        </motion.button>
        <p className="text-center text-[10px] text-muted-foreground">
          By continuing, you agree to our Privacy Policy & Terms of Service
        </p>
      </motion.div>
    </div>
  );
};

export default Index;
