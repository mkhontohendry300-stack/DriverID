import { motion } from "framer-motion";
import { ArrowLeft, RotateCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DigitalCard from "@/components/DigitalCard";
import AppLayout from "@/components/AppLayout";

const LicenceCard = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="px-5 pt-12 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center"
          >
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Digital Cards</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <p className="text-xs text-muted-foreground font-medium mb-2 uppercase tracking-wider">
            Driver's Licence
          </p>
          <DigitalCard
            type="licence"
            name="THABO MOKOENA"
            number="MK 9204 1156 08 3"
            category="B, EB"
            issueDate="15/03/2022"
            expiryDate="15/03/2027"
            status="valid"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <p className="text-xs text-muted-foreground font-medium mb-2 uppercase tracking-wider">
            Identity Document
          </p>
          <DigitalCard
            type="id"
            name="THABO MOKOENA"
            number="9204115608083"
            issueDate="20/06/2020"
            expiryDate="20/06/2030"
            status="valid"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 justify-center text-xs text-muted-foreground"
        >
          <RotateCw size={12} />
          <span>Last synced: Just now</span>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default LicenceCard;
