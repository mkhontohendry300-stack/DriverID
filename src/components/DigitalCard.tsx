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
  onClick,
}: DigitalCardProps) => {
  const isLicence = type === "licence";

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl p-5 cursor-pointer shadow-xl ${
        isLicence ? "card-gradient" : "card-gradient-id"
      }`}
      style={{ aspectRatio: "1.586/1" }}
    >
      {/* Holographic shimmer overlay */}
      <div className="absolute inset-0 holographic-shimmer pointer-events-none" />

      {/* Chip icon */}
      <div className="absolute top-5 right-5 w-10 h-7 rounded-md bg-gradient-to-br from-yellow-400/80 to-yellow-600/80 flex items-center justify-center">
        <div className="w-6 h-4 border border-yellow-700/40 rounded-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between text-primary-foreground">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Shield size={14} className="opacity-70" />
            <span className="text-[10px] uppercase tracking-widest opacity-70 font-medium">
              {isLicence ? "Driver's Licence" : "Identity Document"}
            </span>
          </div>
          <StatusBadge status={status} className="mt-1" />
        </div>

        <div className="flex items-end justify-between">
          <div className="flex-1">
            <p className="font-mono text-sm tracking-wider opacity-80 mb-1">{number}</p>
            <p className="text-base font-bold tracking-wide">{name}</p>
            <div className="flex gap-4 mt-1.5">
              <div>
                <p className="text-[9px] uppercase tracking-wider opacity-50">Issued</p>
                <p className="text-xs font-medium opacity-80">{issueDate}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider opacity-50">Expires</p>
                <p className="text-xs font-medium opacity-80">{expiryDate}</p>
              </div>
              {category && (
                <div>
                  <p className="text-[9px] uppercase tracking-wider opacity-50">Category</p>
                  <p className="text-xs font-medium opacity-80">{category}</p>
                </div>
              )}
            </div>
          </div>

          {photo && (
            <div className="w-14 h-14 rounded-lg overflow-hidden border-2 border-white/20 ml-3">
              <img src={photo} alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DigitalCard;
