import { motion } from "framer-motion";
import { X, FileText, ShieldCheck, Car, AlertTriangle, Clock, CheckCircle, XCircle } from "lucide-react";
import StatusBadge from "./StatusBadge";
import type { DocumentStatus } from "./StatusBadge";

interface DocumentDetailProps {
  document: {
    id: string;
    name: string;
    type: string;
    status: DocumentStatus | "pending";
    expiry: string;
    uploaded: string;
  } | null;
  onClose: () => void;
}

const iconMap: Record<string, typeof FileText> = {
  licence: FileText,
  id_document: FileText,
  insurance: ShieldCheck,
  vehicle_registration: Car,
  roadworthy: AlertTriangle,
};

const DocumentDetailSheet = ({ document, onClose }: DocumentDetailProps) => {
  if (!document) return null;

  const Icon = iconMap[document.type] || FileText;
  const isPending = document.status === "pending";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-card rounded-t-3xl p-6 pb-10 shadow-2xl border-t border-border"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground">Document Details</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <X size={16} className="text-foreground" />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center">
            <Icon size={24} className="text-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-foreground">{document.name}</h3>
            <p className="text-sm text-muted-foreground capitalize">{document.type.replace(/_/g, " ")}</p>
          </div>
          {isPending ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent/20 text-accent">
              <Clock size={12} /> Pending
            </span>
          ) : (
            <StatusBadge status={document.status as DocumentStatus} />
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-secondary/50 rounded-xl p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Status</span>
              <span className="text-sm font-medium text-foreground capitalize flex items-center gap-1">
                {isPending && <><Clock size={14} className="text-accent" /> Awaiting Verification</>}
                {document.status === "valid" && <><CheckCircle size={14} className="text-success" /> Verified & Valid</>}
                {document.status === "expiring" && <><AlertTriangle size={14} className="text-warning" /> Expiring Soon</>}
                {document.status === "expired" && <><XCircle size={14} className="text-destructive" /> Expired</>}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Expiry Date</span>
              <span className="text-sm font-medium text-foreground">{document.expiry || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Uploaded</span>
              <span className="text-sm font-medium text-foreground">{document.uploaded}</span>
            </div>
          </div>

          {isPending && (
            <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Verification In Progress</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your document has been submitted to the relevant department for verification. 
                    This process typically takes 2–3 business days. You will be notified once verified.
                  </p>
                </div>
              </div>
            </div>
          )}

          {document.status === "expired" && (
            <div className="bg-destructive/10 rounded-xl p-4 border border-destructive/20">
              <div className="flex items-start gap-3">
                <XCircle size={18} className="text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Document Expired</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    This document has expired. Please upload an updated version to keep your profile current.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DocumentDetailSheet;
