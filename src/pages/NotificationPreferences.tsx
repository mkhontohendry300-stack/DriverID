import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Bell, Mail, MessageSquare, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";

const NotificationPreferences = () => {
  const navigate = useNavigate();
  const [prefs, setPrefs] = useState({
    push: true,
    email: true,
    sms: false,
    expiryReminders: true,
    verificationUpdates: true,
  });

  const toggle = (key: keyof typeof prefs) => setPrefs(p => ({ ...p, [key]: !p[key] }));

  const items = [
    { key: "push" as const, icon: Smartphone, label: "Push Notifications", desc: "Receive alerts on your device" },
    { key: "email" as const, icon: Mail, label: "Email Notifications", desc: "Get updates via email" },
    { key: "sms" as const, icon: MessageSquare, label: "SMS Notifications", desc: "Receive text message alerts" },
    { key: "expiryReminders" as const, icon: Bell, label: "Expiry Reminders", desc: "Alert when documents expire soon" },
    { key: "verificationUpdates" as const, icon: Bell, label: "Verification Updates", desc: "Status changes on your documents" },
  ];

  return (
    <AppLayout>
      <div className="px-5 pt-14 pb-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate("/settings")} className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Notification Preferences</h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
          {items.map(({ key, icon: Icon, label, desc }) => (
            <div key={key} className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <button
                onClick={() => toggle(key)}
                className={`w-12 h-7 rounded-full relative transition-colors ${prefs[key] ? "bg-accent" : "bg-muted"}`}
              >
                <motion.div
                  animate={{ x: prefs[key] ? 22 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-5 h-5 rounded-full bg-card shadow-sm absolute top-1"
                />
              </button>
            </div>
          ))}
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default NotificationPreferences;
