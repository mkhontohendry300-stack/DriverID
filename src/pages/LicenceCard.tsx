import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RotateCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DigitalCard from "@/components/DigitalCard";
import AppLayout from "@/components/AppLayout";
import { supabase } from "@/integrations/supabase/client";
import mockLicenceFront from "@/assets/mock-licence-front.png";
import mockPersonPhoto from "@/assets/mock-person-photo.jpg";

const LicenceCard = () => {
  const navigate = useNavigate();
  const [profileName, setProfileName] = useState("Loading...");

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from("profiles").select("full_name").eq("user_id", user.id).single();
      if (data) setProfileName(data.full_name.toUpperCase());
    };
    fetchProfile();
  }, []);

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

        {/* Mock Licence Front */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <p className="text-xs text-muted-foreground font-medium mb-2 uppercase tracking-wider">
            Driver's Licence (Front)
          </p>
          <div className="rounded-2xl overflow-hidden shadow-xl border border-border">
            <img src={mockLicenceFront} alt="Driver's Licence Front" className="w-full object-cover" />
          </div>
        </motion.div>

        {/* Digital Licence Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <p className="text-xs text-muted-foreground font-medium mb-2 uppercase tracking-wider">
            Digital Driver's Licence
          </p>
          <DigitalCard
            type="licence"
            name={profileName}
            number="MK 9204 1156 08 3"
            category="B, EB"
            issueDate="15/03/2022"
            expiryDate="15/03/2027"
            photo={mockPersonPhoto}
            status="valid"
          />
        </motion.div>

        {/* Digital ID Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <p className="text-xs text-muted-foreground font-medium mb-2 uppercase tracking-wider">
            Digital Identity Document
          </p>
          <DigitalCard
            type="id"
            name={profileName}
            number="9204115608083"
            issueDate="20/06/2020"
            expiryDate="20/06/2030"
            photo={mockPersonPhoto}
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
