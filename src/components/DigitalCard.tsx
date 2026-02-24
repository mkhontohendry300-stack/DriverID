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

  return;



























































};

export default DigitalCard;