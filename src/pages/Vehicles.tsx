import { motion } from "framer-motion";
import { ArrowLeft, Plus, Car, Fuel, Calendar, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";

const vehicles = [
  {
    id: "1",
    make: "Toyota",
    model: "Hilux",
    year: "2021",
    color: "White",
    plate: "GP 123 ABC",
    insurance: "OUTsurance",
    policyNo: "POL-2025-4421",
  },
];

const Vehicles = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="px-5 pt-12 pb-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/dashboard")} className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <ArrowLeft size={18} className="text-foreground" />
            </button>
            <h1 className="text-lg font-bold text-foreground">My Vehicles</h1>
          </div>
          <motion.button whileTap={{ scale: 0.9 }} className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <Plus size={18} className="text-accent-foreground" />
          </motion.button>
        </motion.div>

        {vehicles.map((v) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl p-5 shadow-sm border border-border mb-4"
          >
            {/* Vehicle Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl card-gradient flex items-center justify-center">
                <Car size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-base font-bold text-foreground">
                  {v.make} {v.model}
                </h2>
                <p className="text-sm text-muted-foreground font-mono">{v.plate}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-secondary rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Calendar size={12} className="text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">Year</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{v.year}</p>
              </div>
              <div className="bg-secondary rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Palette size={12} className="text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">Colour</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{v.color}</p>
              </div>
              <div className="bg-secondary rounded-xl p-3 col-span-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <Fuel size={12} className="text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">Insurance</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{v.insurance}</p>
                <p className="text-xs text-muted-foreground font-mono">{v.policyNo}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Add Vehicle Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-6 border border-dashed border-accent/40 flex flex-col items-center justify-center cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-2">
            <Plus size={20} className="text-accent" />
          </div>
          <p className="text-sm font-medium text-foreground">Add Another Vehicle</p>
          <p className="text-xs text-muted-foreground">Register a new vehicle to your profile</p>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Vehicles;
