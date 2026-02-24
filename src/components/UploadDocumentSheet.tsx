import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, FileText, ShieldCheck, Car, AlertTriangle, CheckCircle2, Camera, ImageIcon } from "lucide-react";
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
  const [step, setStep] = useState<"type" | "upload" | "success">("type");
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);
  const frontCameraRef = useRef<HTMLInputElement>(null);
  const backCameraRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const needsFrontBack = selectedType === "licence" || selectedType === "id_document";

  const handleFileSelect = (file: File, side: "front" | "back") => {
    const url = URL.createObjectURL(file);
    if (side === "front") {
      setFrontFile(file);
      setFrontPreview(url);
    } else {
      setBackFile(file);
      setBackPreview(url);
    }
  };

  const handleUpload = async () => {
    if (!frontFile) {
      toast({ title: "Please upload the front of your document", variant: "destructive" });
      return;
    }
    if (needsFrontBack && !backFile) {
      toast({ title: "Please upload the back of your document", variant: "destructive" });
      return;
    }
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const timestamp = Date.now();
      const frontPath = `${user.id}/${selectedType}_front_${timestamp}`;
      const { error: frontErr } = await supabase.storage.from("documents").upload(frontPath, frontFile);
      if (frontErr) throw frontErr;

      let backPath: string | null = null;
      if (needsFrontBack && backFile) {
        backPath = `${user.id}/${selectedType}_back_${timestamp}`;
        const { error: backErr } = await supabase.storage.from("documents").upload(backPath, backFile);
        if (backErr) throw backErr;
      }

      const docType = documentTypes.find(d => d.value === selectedType);
      const { error } = await supabase.from("documents").insert({
        user_id: user.id,
        name: docType?.label || selectedType,
        type: selectedType,
        status: "pending",
        expiry_date: null,
        file_url: frontPath,
        notes: backPath ? `back:${backPath}` : "Submitted for verification",
      });

      if (error) throw error;

      setStep("success");
      setTimeout(() => {
        resetState();
        onUploaded();
        onClose();
      }, 3000);
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setSelectedType("");
    setStep("type");
    setFrontFile(null);
    setBackFile(null);
    setFrontPreview(null);
    setBackPreview(null);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  if (!open) return null;

  const renderUploadBox = (side: "front" | "back", preview: string | null, inputRef: React.RefObject<HTMLInputElement>, cameraRef: React.RefObject<HTMLInputElement>) => (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {side === "front" ? "Front" : "Back"} of Document
      </p>
      {preview ? (
        <div className="relative rounded-xl overflow-hidden border border-border">
          <img src={preview} alt={`${side} preview`} className="w-full h-36 object-cover" />
          <button
            onClick={() => {
              if (side === "front") { setFrontFile(null); setFrontPreview(null); }
              else { setBackFile(null); setBackPreview(null); }
            }}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/80 flex items-center justify-center"
          >
            <X size={14} className="text-foreground" />
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => cameraRef.current?.click()}
            className="flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border border-dashed border-border bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <Camera size={20} className="text-accent" />
            <span className="text-xs text-muted-foreground">Take Photo</span>
          </button>
          <button
            onClick={() => inputRef.current?.click()}
            className="flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border border-dashed border-border bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <ImageIcon size={20} className="text-accent" />
            <span className="text-xs text-muted-foreground">Choose File</span>
          </button>
          <input
            ref={cameraRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0], side)}
          />
          <input
            ref={inputRef}
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0], side)}
          />
        </div>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end justify-center"
      onClick={handleClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-card rounded-t-3xl p-6 pb-10 shadow-2xl border-t border-border max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground">
            {step === "type" ? "Upload Document" : step === "upload" ? "Add Photos" : "Success"}
          </h2>
          <button onClick={handleClose} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <X size={16} className="text-foreground" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {step === "success" ? (
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
          ) : step === "upload" ? (
            <motion.div key="upload" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {needsFrontBack
                  ? "Upload or take a photo of the front and back of your document."
                  : "Upload or take a photo of your document."}
              </p>

              {renderUploadBox("front", frontPreview, frontInputRef, frontCameraRef)}
              {needsFrontBack && renderUploadBox("back", backPreview, backInputRef, backCameraRef)}

              <div className="flex gap-2">
                <button
                  onClick={() => setStep("type")}
                  className="flex-1 py-3 rounded-xl bg-secondary text-foreground font-semibold text-sm"
                >
                  Back
                </button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleUpload}
                  disabled={loading || !frontFile || (needsFrontBack && !backFile)}
                  className="flex-1 py-3 rounded-xl card-gradient text-primary-foreground font-semibold text-sm shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Upload size={16} />
                  {loading ? "Uploading..." : "Submit"}
                </motion.button>
              </div>
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
                      {(docType.value === "licence" || docType.value === "id_document") && (
                        <span className="ml-auto text-[10px] text-muted-foreground">Front & Back</span>
                      )}
                    </button>
                  );
                })}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setStep("upload")}
                disabled={!selectedType}
                className="w-full py-3.5 rounded-xl card-gradient text-primary-foreground font-semibold text-sm shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                Continue
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default UploadDocumentSheet;
