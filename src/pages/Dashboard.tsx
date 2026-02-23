import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  QrCode,
  FileText,
  Car,
  Bell,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import DigitalCard from "@/components/DigitalCard";
import StatusBadge from "@/components/StatusBadge";
import type { DocumentStatus } from "@/components/StatusBadge";

const mockDocuments: {
  name: string;
  status: DocumentStatus;
  expiry: string;
  icon: typeof FileText;
}[] = [
  { name: "Driver's Licence", status: "valid", expiry: "2027-03-15", icon: FileText },
  { name: "ID Document", status: "valid", expiry: "2030-06-20", icon: FileText },
  { name: "Car Insurance", status: "expiring", expiry: "2026-04-01", icon: ShieldCheck },
  { name: "Vehicle Registration", status: "valid", expiry: "2027-01-10", icon: Car },
  { name: "Roadworthy Certificate", status: "expired", expiry: "2025-12-01", icon: AlertTriangle },
];

const statusSummary = {
  valid: mockDocuments.filter((d) => d.status === "valid").length,
  expiring: mockDocuments.filter((d) => d.status === "expiring").length,
  expired: mockDocuments.filter((d) => d.status === "expired").length,
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="px-5 pt-12 pb-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <p className="text-sm text-muted-foreground">Welcome back,</p>
            <h1 className="text-2xl font-bold text-foreground">Thabo Mokoena</h1>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/qr-code")}
            className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center shadow-lg animate-pulse-glow"
          >
            <QrCode size={22} className="text-accent-foreground" />
          </motion.button>
        </motion.div>

        {/* Digital Licence Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <DigitalCard
            type="licence"
            name="THABO MOKOENA"
            number="MK 9204 1156 08 3"
            category="B, EB"
            issueDate="15/03/2022"
            expiryDate="15/03/2027"
            status="valid"
            onClick={() => navigate("/licence-card")}
          />
        </motion.div>

        {/* Status Summary */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-3 gap-3 mb-6"
        >
          <motion.div variants={item} className="bg-card rounded-xl p-3 text-center shadow-sm border border-border">
            <div className="w-8 h-8 mx-auto mb-1.5 rounded-full bg-success/10 flex items-center justify-center">
              <ShieldCheck size={16} className="text-success" />
            </div>
            <p className="text-2xl font-bold text-foreground">{statusSummary.valid}</p>
            <p className="text-[10px] text-muted-foreground font-medium">Valid</p>
          </motion.div>
          <motion.div variants={item} className="bg-card rounded-xl p-3 text-center shadow-sm border border-border">
            <div className="w-8 h-8 mx-auto mb-1.5 rounded-full bg-warning/10 flex items-center justify-center">
              <AlertTriangle size={16} className="text-warning" />
            </div>
            <p className="text-2xl font-bold text-foreground">{statusSummary.expiring}</p>
            <p className="text-[10px] text-muted-foreground font-medium">Expiring</p>
          </motion.div>
          <motion.div variants={item} className="bg-card rounded-xl p-3 text-center shadow-sm border border-border">
            <div className="w-8 h-8 mx-auto mb-1.5 rounded-full bg-destructive/10 flex items-center justify-center">
              <XCircle size={16} className="text-destructive" />
            </div>
            <p className="text-2xl font-bold text-foreground">{statusSummary.expired}</p>
            <p className="text-[10px] text-muted-foreground font-medium">Expired</p>
          </motion.div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-3 mb-6 overflow-x-auto"
        >
          {[
            { icon: QrCode, label: "My QR", to: "/qr-code" },
            { icon: FileText, label: "Documents", to: "/documents" },
            { icon: Car, label: "Vehicles", to: "/vehicles" },
            { icon: Bell, label: "Alerts", to: "/notifications" },
          ].map(({ icon: Icon, label, to }) => (
            <motion.button
              key={to}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(to)}
              className="flex-shrink-0 flex flex-col items-center gap-1.5 w-16"
            >
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center">
                <Icon size={20} className="text-foreground" />
              </div>
              <span className="text-[10px] font-medium text-muted-foreground">{label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Document List */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground">All Documents</h2>
            <button
              onClick={() => navigate("/documents")}
              className="text-xs text-accent font-medium"
            >
              See all
            </button>
          </div>
          <div className="space-y-2">
            {mockDocuments.map((doc) => (
              <motion.div
                key={doc.name}
                variants={item}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/documents")}
                className="flex items-center gap-3 bg-card rounded-xl p-3.5 shadow-sm border border-border cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                  <doc.icon size={18} className="text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">Expires: {doc.expiry}</p>
                </div>
                <StatusBadge status={doc.status} />
                <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
