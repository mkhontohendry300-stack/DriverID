import { Home, FileText, Car, Bell, User } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const tabs = [
  { to: "/dashboard", icon: Home, label: "Home" },
  { to: "/documents", icon: FileText, label: "Docs" },
  { to: "/vehicles", icon: Car, label: "Vehicles" },
  { to: "/notifications", icon: Bell, label: "Alerts" },
  { to: "/settings", icon: User, label: "Profile" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border safe-bottom">
      <div className="flex items-center justify-around max-w-lg mx-auto h-16 px-2">
        {tabs.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <NavLink
              key={to}
              to={to}
              className="relative flex flex-col items-center justify-center w-16 h-full gap-0.5"
            >
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -top-0.5 w-8 h-0.5 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={20}
                className={isActive ? "text-accent" : "text-muted-foreground"}
              />
              <span
                className={`text-[10px] font-medium ${
                  isActive ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
