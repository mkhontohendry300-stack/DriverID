import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Globe,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Bell,
  Lock,
  FileText,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";

const menuSections = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Personal Information", desc: "Name, email, phone" },
      { icon: Lock, label: "Security", desc: "MFA, biometrics, password" },
      { icon: Bell, label: "Notification Preferences", desc: "Push, email, SMS alerts" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: Globe, label: "Language", desc: "English" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help & FAQ", desc: "Common questions answered" },
      { icon: MessageSquare, label: "Report a Problem", desc: "Let us know about an issue" },
      { icon: FileText, label: "Privacy Policy", desc: "POPIA & GDPR compliance" },
      { icon: Shield, label: "Terms of Service", desc: "Usage terms and conditions" },
    ],
  },
];

const Settings = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="px-5 pt-12 pb-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate("/dashboard")} className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Settings</h1>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-2xl p-4 mb-6 shadow-sm border border-border flex items-center gap-4"
        >
          <div className="w-14 h-14 rounded-full card-gradient flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">TM</span>
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-foreground">Thabo Mokoena</h2>
            <p className="text-xs text-muted-foreground">thabo.mokoena@email.com</p>
            <p className="text-xs text-muted-foreground font-mono">ID: 9204115608083</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </motion.div>

        {/* Menu Sections */}
        {menuSections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + si * 0.05 }}
            className="mb-5"
          >
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2 px-1">
              {section.title}
            </p>
            <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
              {section.items.map((menuItem) => (
                <button
                  key={menuItem.label}
                  className="w-full flex items-center gap-3 p-3.5 text-left"
                >
                  <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                    <menuItem.icon size={16} className="text-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{menuItem.label}</p>
                    <p className="text-xs text-muted-foreground">{menuItem.desc}</p>
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground flex-shrink-0" />
                </button>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Logout */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full flex items-center justify-center gap-2 py-3 text-destructive text-sm font-semibold"
        >
          <LogOut size={16} />
          Sign Out
        </motion.button>

        <p className="text-center text-[10px] text-muted-foreground mt-4">DriveID v1.0.0</p>
      </div>
    </AppLayout>
  );
};

export default Settings;
