import { motion } from "framer-motion";
import { ArrowLeft, Bell, AlertTriangle, ShieldCheck, FileText, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "warning" | "danger" | "info" | "success";
  read: boolean;
}

const notifications: Notification[] = [
  { id: "1", title: "Roadworthy Expired", message: "Your roadworthy certificate expired on 01 Dec 2025. Please renew immediately.", time: "2h ago", type: "danger", read: false },
  { id: "2", title: "Insurance Expiring Soon", message: "Your car insurance expires on 01 Apr 2026. Renew within 37 days.", time: "1d ago", type: "warning", read: false },
  { id: "3", title: "QR Code Refreshed", message: "Your secure QR code has been automatically regenerated.", time: "6h ago", type: "info", read: true },
  { id: "4", title: "Document Verified", message: "Your driver's licence has been successfully verified.", time: "3d ago", type: "success", read: true },
  { id: "5", title: "Licence Renewal Reminder", message: "Your driver's licence expires in 365 days. Plan ahead for renewal.", time: "1w ago", type: "info", read: true },
];

const typeConfig = {
  danger: { icon: AlertTriangle, bg: "bg-destructive/10", color: "text-destructive" },
  warning: { icon: AlertTriangle, bg: "bg-warning/10", color: "text-warning" },
  info: { icon: Bell, bg: "bg-accent/10", color: "text-accent" },
  success: { icon: ShieldCheck, bg: "bg-success/10", color: "text-success" },
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } };

const Notifications = () => {
  const navigate = useNavigate();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AppLayout>
      <div className="px-5 pt-12 pb-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/dashboard")} className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <ArrowLeft size={18} className="text-foreground" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-foreground">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-xs text-muted-foreground">{unreadCount} unread</p>
              )}
            </div>
          </div>
          <button className="flex items-center gap-1 text-xs text-accent font-medium">
            <Check size={14} />
            Mark all read
          </button>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="space-y-2">
          {notifications.map((n) => {
            const config = typeConfig[n.type];
            const Icon = config.icon;
            return (
              <motion.div
                key={n.id}
                variants={item}
                className={`bg-card rounded-xl p-4 border cursor-pointer ${
                  n.read ? "border-border opacity-70" : "border-accent/20 shadow-sm"
                }`}
              >
                <div className="flex gap-3">
                  <div className={`w-9 h-9 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <Icon size={16} className={config.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-foreground">{n.title}</p>
                      {!n.read && <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-1.5" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.message}</p>
                    <p className="text-[10px] text-muted-foreground mt-1.5">{n.time}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Notifications;
