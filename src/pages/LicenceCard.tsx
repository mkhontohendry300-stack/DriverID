import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RotateCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SADriverLicence from "@/components/SADriverLicence";
import DigitalCard from "@/components/DigitalCard";
import AppLayout from "@/components/AppLayout";
import { supabase } from "@/integrations/supabase/client";
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
      <div className="px-5 pt-14 pb-28">
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

        {/* SA Driver's Licence */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <p className="text-xs text-muted-foreground font-medium mb-2 uppercase tracking-wider">
            Driver's Licence Card
          </p>
          <SADriverLicence
            name={profileName}
            idNumber="9204115608083"
            licenceNumber="MK920411"
            category="B, EB"
            issueDate="15/03/2022"
            expiryDate="15/03/2027"
            dateOfBirth="11/04/1992"
            gender="M"
            restrictions="None"
            photo={mockPersonPhoto}
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
