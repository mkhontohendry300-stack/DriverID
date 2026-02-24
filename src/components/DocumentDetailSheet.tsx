import { useState } from "react";
import { motion } from "framer-motion";
import { X, FileText, ShieldCheck, Car, AlertTriangle, Clock, CheckCircle, XCircle, Trash2, Calendar, Upload, Hash, StickyNote } from "lucide-react";
import StatusBadge from "./StatusBadge";
import type { DocumentStatus } from "./StatusBadge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  onDeleted?: () => void;
}

const iconMap: Record<string, typeof FileText> = {
  licence: FileText,
  id_document: FileText,
  insurance: ShieldCheck,
  vehicle_registration: Car,
  roadworthy: AlertTriangle,
};

const typeLabels: Record<string, string> = {
  licence: "Driver's Licence",
  id_document: "Identity Document",
  insurance: "Vehicle Insurance",
  vehicle_registration: "Vehicle Registration",
  roadworthy: "Roadworthy Certificate",
};

const DocumentDetailSheet = ({ document, onClose, onDeleted }: DocumentDetailProps) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  if (!document) return null;

  const Icon = iconMap[document.type] || FileText;
  const isPending = document.status === "pending";

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setDeleting(true);
    try {
      const { error } = await supabase.from("documents").delete().eq("id", document.id);
      if (error) throw error;
      toast({ title: "Document deleted" });
      onDeleted?.();
      onClose();
    } catch (err: any) {
      toast({ title: "Delete failed", description: err.message, variant: "destructive" });
    } finally {
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

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
        className="w-full max-w-lg bg-card rounded-t-3xl p-6 pb-10 shadow-2xl border-t border-border max-h-[85vh] overflow-y-auto"
      >
        {/* Handle */}
        <div className="w-10 h-1 rounded-full bg-muted mx-auto mb-4" />

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-foreground">Document Details</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <X size={16} className="text-foreground" />
          </button>
        </div>

        {/* Document header */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center">
            <Icon size={24} className="text-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-foreground">{document.name}</h3>
            <p className="text-sm text-muted-foreground">{typeLabels[document.type] || document.type.replace(/_/g, " ")}</p>
          </div>
          {isPending ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent/20 text-accent">
              <Clock size={12} /> Pending
            </span>
          ) : (
            <StatusBadge status={document.status as DocumentStatus} />
          )}
        </div>

        {/* Details grid */}
        <div className="bg-secondary/50 rounded-xl p-4 space-y-3.5 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center flex-shrink-0">
              {isPending && <Clock size={14} className="text-accent" />}
              {document.status === "valid" && <CheckCircle size={14} className="text-emerald-500" />}
              {document.status === "expiring" && <AlertTriangle size={14} className="text-yellow-500" />}
              {document.status === "expired" && <XCircle size={14} className="text-destructive" />}
            </div>
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Verification Status</p>
              <p className="text-sm font-semibold text-foreground">
                {isPending && "Awaiting Verification"}
                {document.status === "valid" && "Verified & Valid"}
                {document.status === "expiring" && "Expiring Soon"}
                {document.status === "expired" && "Expired"}
              </p>
            </div>
          </div>

          <div className="h-px bg-border" />

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center flex-shrink-0">
              <Hash size={14} className="text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Document ID</p>
              <p className="text-xs font-mono text-foreground">{document.id.slice(0, 8)}...{document.id.slice(-4)}</p>
            </div>
          </div>

          <div className="h-px bg-border" />

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center flex-shrink-0">
              <Calendar size={14} className="text-muted-foreground" />
            </div>
            <div className="flex-1 flex justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Expiry Date</p>
                <p className="text-sm font-semibold text-foreground">{document.expiry || "N/A"}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Uploaded</p>
                <p className="text-sm font-semibold text-foreground">{document.uploaded}</p>
              </div>
            </div>
          </div>

          <div className="h-px bg-border" />

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center flex-shrink-0">
              <FileText size={14} className="text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Document Type</p>
              <p className="text-sm font-semibold text-foreground">{typeLabels[document.type] || document.type.replace(/_/g, " ")}</p>
            </div>
          </div>
        </div>

        {/* Status messages */}
        {isPending && (
          <div className="bg-accent/10 rounded-xl p-4 border border-accent/20 mb-4">
            <div className="flex items-start gap-3">
              <Clock size={18} className="text-accent mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">Verification In Progress</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your document has been submitted for verification. This typically takes 2–3 business days.
                </p>
              </div>
            </div>
          </div>
        )}

        {document.status === "expired" && (
          <div className="bg-destructive/10 rounded-xl p-4 border border-destructive/20 mb-4">
            <div className="flex items-start gap-3">
              <XCircle size={18} className="text-destructive mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">Document Expired</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Please upload an updated version to keep your profile current.
                </p>
              </div>
            </div>
          </div>
        )}

        {document.status === "expiring" && (
          <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20 mb-4">
            <div className="flex items-start gap-3">
              <AlertTriangle size={18} className="text-yellow-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">Expiring Soon</p>
                <p className="text-xs text-muted-foreground mt-1">
                  This document is due to expire soon. Consider renewing it before the expiry date.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Delete */}
        <button
          onClick={handleDelete}
          disabled={deleting}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-colors ${
            confirmDelete
              ? "bg-destructive text-destructive-foreground"
              : "bg-destructive/10 text-destructive border border-destructive/20"
          }`}
        >
          <Trash2 size={16} />
          {deleting ? "Deleting..." : confirmDelete ? "Tap again to confirm" : "Delete Document"}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default DocumentDetailSheet;
