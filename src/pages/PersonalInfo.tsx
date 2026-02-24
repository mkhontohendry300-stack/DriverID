import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PersonalInfo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", id_number: "" });

  useEffect(() => {
    const fetch = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/auth"); return; }
      const { data } = await supabase.from("profiles").select("*").eq("user_id", user.id).single();
      if (data) setForm({ full_name: data.full_name, email: data.email || "", phone: data.phone || "", id_number: data.id_number || "" });
      setLoading(false);
    };
    fetch();
  }, [navigate]);

  const handleSave = async () => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from("profiles").update({
      full_name: form.full_name,
      email: form.email,
      phone: form.phone,
      id_number: form.id_number,
    }).eq("user_id", user.id);
    setSaving(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile updated successfully" });
    }
  };

  const fields = [
    { key: "full_name", label: "Full Name", placeholder: "Enter your full name" },
    { key: "email", label: "Email Address", placeholder: "Enter your email" },
    { key: "phone", label: "Phone Number", placeholder: "Enter your phone number" },
    { key: "id_number", label: "ID Number", placeholder: "Enter your ID number" },
  ] as const;

  return (
    <AppLayout>
      <div className="px-5 pt-14 pb-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate("/settings")} className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Personal Information</h1>
        </motion.div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-20 bg-card rounded-xl animate-pulse border border-border" />)}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {fields.map(({ key, label, placeholder }) => (
              <div key={key} className="bg-card rounded-xl p-4 border border-border">
                <label className="text-xs text-muted-foreground font-medium mb-1.5 block">{label}</label>
                <input
                  type="text"
                  value={form[key]}
                  onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full bg-secondary rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
            ))}

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSave}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-accent text-accent-foreground font-semibold text-sm"
            >
              <Save size={16} />
              {saving ? "Saving..." : "Save Changes"}
            </motion.button>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
};

export default PersonalInfo;
