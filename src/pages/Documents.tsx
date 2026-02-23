import { motion } from "framer-motion";
import { ArrowLeft, Upload, Eye, FileText, ShieldCheck, Car, AlertTriangle, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import StatusBadge from "@/components/StatusBadge";
import type { DocumentStatus } from "@/components/StatusBadge";

interface Document {
  id: string;
  name: string;
  type: string;
  status: DocumentStatus;
  expiry: string;
  uploaded: string;
  icon: typeof FileText;
}

const documents: Document[] = [
  { id: "1", name: "Driver's Licence", type: "Front & Back", status: "valid", expiry: "2027-03-15", uploaded: "2024-01-10", icon: FileText },
  { id: "2", name: "ID Document", type: "Front & Back", status: "valid", expiry: "2030-06-20", uploaded: "2024-01-10", icon: FileText },
  { id: "3", name: "Car Insurance", type: "Certificate", status: "expiring", expiry: "2026-04-01", uploaded: "2025-04-01", icon: ShieldCheck },
  { id: "4", name: "Vehicle Registration", type: "Document", status: "valid", expiry: "2027-01-10", uploaded: "2024-06-15", icon: Car },
  { id: "5", name: "Roadworthy Certificate", type: "Certificate", status: "expired", expiry: "2025-12-01", uploaded: "2023-12-01", icon: AlertTriangle },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

const Documents = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="px-5 pt-12 pb-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/dashboard")} className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <ArrowLeft size={18} className="text-foreground" />
            </button>
            <h1 className="text-lg font-bold text-foreground">Documents</h1>
          </div>
          <motion.button whileTap={{ scale: 0.9 }} className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <Plus size={18} className="text-accent-foreground" />
          </motion.button>
        </motion.div>

        {/* Upload Prompt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-2xl p-4 mb-6 border border-dashed border-accent/40 flex items-center gap-3 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
            <Upload size={20} className="text-accent" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Upload New Document</p>
            <p className="text-xs text-muted-foreground">Tap to add licence, ID, insurance or more</p>
          </div>
        </motion.div>

        {/* Document List */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
          {documents.map((doc) => (
            <motion.div
              key={doc.id}
              variants={item}
              whileTap={{ scale: 0.98 }}
              className="bg-card rounded-xl p-4 shadow-sm border border-border"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <doc.icon size={18} className="text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-foreground">{doc.name}</p>
                    <StatusBadge status={doc.status} />
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{doc.type}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <div>
                        <p className="text-[10px] text-muted-foreground">Expires</p>
                        <p className="text-xs font-medium text-foreground">{doc.expiry}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground">Uploaded</p>
                        <p className="text-xs font-medium text-foreground">{doc.uploaded}</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-1 text-xs text-accent font-medium">
                      <Eye size={12} />
                      View
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Documents;
