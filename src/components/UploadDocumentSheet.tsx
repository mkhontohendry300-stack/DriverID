import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, FileText, ShieldCheck, Car, AlertTriangle, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UploadDocumentSheetProps {
  open: boolean;
  onClose: () => void;
  onUploaded: () => void;
}

const documentTypes = [
  { value: "licence", label: "Driver's Licence", icon: FileText },
  { value: "id_document", label: "ID Document", icon: FileText },
  { value: "insurance", label: "Car Insurance", icon: ShieldCheck },
  { value: "vehicle_registration", label: "Vehicle Registration", icon: Car },
  { value: "roadworthy", label: "Roadworthy Certificate", icon: AlertTriangle },
];

const UploadDocumentSheet = ({ open, onClose, onUploaded }: UploadDocumentSheetProps) => {
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleUpload = async () => {
    if (!selectedType) {
      toast({ title: "Please select a document type", variant: "destructive" });
      return;
    }
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const docType = documentTypes.find(d => d.value === selectedType);

      const { error } = await supabase.from("documents").insert({
        user_id: user.id,
        name: docType?.label || selectedType,
        type: selectedType,
        status: "pending",
        expiry_date: null,
        notes: "Submitted for verification",
      });

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSelectedType("");
        onUploaded();
        onClose();
      }, 3000);
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

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
          <h2 className="text-lg font-bold text-foreground">Upload Document</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <X size={16} className="text-foreground" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle2 size={32} className="text-success" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Document Uploaded Successfully!</h3>
              <p className="text-sm text-muted-foreground max-w-[280px] mx-auto">
                Your document has been submitted to the relevant department for verification. 
                This typically takes <strong>2–3 business days</strong>. You'll be notified once verified.
              </p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <p className="text-sm text-muted-foreground">Select the type of document you want to upload:</p>
              
              <div className="space-y-2">
                {documentTypes.map((docType) => {
                  const Icon = docType.icon;
                  const isSelected = selectedType === docType.value;
                  return (
                    <button
                      key={docType.value}
                      onClick={() => setSelectedType(docType.value)}
                      className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all ${
                        isSelected
                          ? "border-accent bg-accent/10"
                          : "border-border bg-secondary/30"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isSelected ? "bg-accent/20" : "bg-secondary"
                      }`}>
                        <Icon size={18} className={isSelected ? "text-accent" : "text-foreground"} />
                      </div>
                      <span className={`text-sm font-medium ${isSelected ? "text-accent" : "text-foreground"}`}>
                        {docType.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleUpload}
                disabled={loading || !selectedType}
                className="w-full py-3.5 rounded-xl card-gradient text-primary-foreground font-semibold text-sm shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Upload size={16} />
                {loading ? "Submitting..." : "Submit Document"}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default UploadDocumentSheet;
