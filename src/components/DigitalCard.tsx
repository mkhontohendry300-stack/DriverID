import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import type { DocumentStatus } from "./StatusBadge";
import StatusBadge from "./StatusBadge";

interface DigitalCardProps {
  type: "licence" | "id";
  name: string;
  number: string;
  category?: string;
  issueDate: string;
  expiryDate: string;
  photo?: string;
  status: DocumentStatus;
  onClick?: () => void;
}

const DigitalCard = ({
  type,
  name,
  number,
  category,
  issueDate,
  expiryDate,
  photo,
  status,
  onClick
}: DigitalCardProps) => {
  const isLicence = type === "licence";

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative bg-card rounded-2xl p-5 shadow-lg border border-border overflow-hidden cursor-pointer"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="flex items-start gap-4">
        {photo && (
          <img
            src={photo}
            alt={name}
            className="w-14 h-14 rounded-xl object-cover border-2 border-accent/20"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              {isLicence ? "Driver's Licence" : "Identity Document"}
            </p>
            <StatusBadge status={status} />
          </div>
          <p className="text-sm font-bold text-foreground truncate">{name}</p>
          <p className="text-xs text-muted-foreground font-mono">{number}</p>
          {category && (
            <p className="text-xs text-muted-foreground mt-1">Category: {category}</p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <div>
          <p className="text-[10px] text-muted-foreground">Issued</p>
          <p className="text-xs font-medium text-foreground">{issueDate}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">Expires</p>
          <p className="text-xs font-medium text-foreground">{expiryDate}</p>
        </div>
        <div className="flex items-center gap-1 text-accent">
          <Shield size={14} />
          <span className="text-[10px] font-medium">Verified</span>
        </div>
      </div>
    </motion.div>
  );
};

export default DigitalCard;