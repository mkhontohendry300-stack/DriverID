import { motion } from "framer-motion";
import mockPersonPhoto from "@/assets/mock-person-photo.jpg";

interface SADriverLicenceProps {
  name: string;
  idNumber: string;
  licenceNumber: string;
  category: string;
  issueDate: string;
  expiryDate: string;
  dateOfBirth: string;
  gender: string;
  restrictions: string;
  photo?: string;
}

const SADriverLicence = ({
  name,
  idNumber,
  licenceNumber,
  category,
  issueDate,
  expiryDate,
  dateOfBirth,
  gender,
  restrictions,
  photo = mockPersonPhoto,
}: SADriverLicenceProps) => {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="relative overflow-hidden rounded-xl shadow-2xl border border-border"
      style={{ aspectRatio: "1.586/1" }}
    >
      {/* SA Licence background - green gradient like real SA licence */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)`
      }} />

      {/* Content */}
      <div className="relative z-10 h-full p-3.5 flex flex-col text-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {/* SA Coat of Arms placeholder */}
            <div className="w-8 h-8 rounded-full bg-yellow-500/90 flex items-center justify-center">
              <span className="text-emerald-900 font-black text-[10px]">RSA</span>
            </div>
            <div>
              <p className="text-[8px] font-bold uppercase tracking-widest text-yellow-300">Republic of South Africa</p>
              <p className="text-[10px] font-bold uppercase tracking-wider">Driver's Licence Card</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[7px] uppercase tracking-wider text-emerald-200">Licence No.</p>
            <p className="text-[10px] font-mono font-bold">{licenceNumber}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-yellow-400/60 via-yellow-300/40 to-transparent mb-2" />

        {/* Main content */}
        <div className="flex gap-3 flex-1">
          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="w-16 h-20 rounded-md overflow-hidden border-2 border-yellow-400/50 shadow-lg">
              <img src={photo} alt="Licence holder" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Details grid */}
          <div className="flex-1 grid grid-cols-2 gap-x-3 gap-y-1 content-start">
            <div className="col-span-2">
              <p className="text-[7px] uppercase tracking-wider text-emerald-200">Surname & Initials</p>
              <p className="text-[11px] font-bold tracking-wide">{name}</p>
            </div>
            <div>
              <p className="text-[7px] uppercase tracking-wider text-emerald-200">ID Number</p>
              <p className="text-[10px] font-mono font-semibold">{idNumber}</p>
            </div>
            <div>
              <p className="text-[7px] uppercase tracking-wider text-emerald-200">Date of Birth</p>
              <p className="text-[10px] font-semibold">{dateOfBirth}</p>
            </div>
            <div>
              <p className="text-[7px] uppercase tracking-wider text-emerald-200">Gender</p>
              <p className="text-[10px] font-semibold">{gender}</p>
            </div>
            <div>
              <p className="text-[7px] uppercase tracking-wider text-emerald-200">Restrictions</p>
              <p className="text-[10px] font-semibold">{restrictions}</p>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-auto">
          <div className="h-[1px] bg-gradient-to-r from-yellow-400/60 via-yellow-300/40 to-transparent mb-1.5" />
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <div>
                <p className="text-[7px] uppercase tracking-wider text-emerald-200">Code</p>
                <p className="text-sm font-black text-yellow-300">{category}</p>
              </div>
              <div>
                <p className="text-[7px] uppercase tracking-wider text-emerald-200">Valid From</p>
                <p className="text-[10px] font-semibold">{issueDate}</p>
              </div>
              <div>
                <p className="text-[7px] uppercase tracking-wider text-emerald-200">Valid To</p>
                <p className="text-[10px] font-semibold">{expiryDate}</p>
              </div>
            </div>
            {/* Barcode placeholder */}
            <div className="flex gap-[1px]">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white/70"
                  style={{ width: i % 3 === 0 ? 2 : 1, height: 18 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SADriverLicence;
