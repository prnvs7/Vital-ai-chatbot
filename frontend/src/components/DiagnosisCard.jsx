import React from 'react';
import { AlertCircle, Stethoscope, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const DiagnosisCard = ({ diagnosis }) => {
  if (!diagnosis) return null;

  const { triage_level, possible_causes, home_remedies } = diagnosis;

  let colorScheme = '';
  let Icon = null;
  let bgGradient = '';

  switch (triage_level) {
    case 'Emergency':
      colorScheme = 'text-red-400';
      bgGradient = 'from-red-500/20 to-red-900/40 border-red-500/50';
      Icon = AlertCircle;
      break;
    case 'Consult':
      colorScheme = 'text-blue-400';
      bgGradient = 'from-blue-500/20 to-blue-900/40 border-blue-500/50';
      Icon = Stethoscope;
      break;
    default:
      colorScheme = 'text-green-400';
      bgGradient = 'from-green-500/20 to-green-900/40 border-green-500/50';
      Icon = Home;
      break;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className={`mt-4 p-4 sm:p-5 rounded-2xl border bg-gradient-to-br ${bgGradient} backdrop-blur-md w-full break-words`}
    >
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${colorScheme}`} />
        <h3 className={`text-lg sm:text-xl font-bold ${colorScheme}`}>Diagnosis: {triage_level}</h3>
      </div>
      
      <div className="space-y-4 text-white/90">
        <div>
          <h4 className="font-semibold text-white/70 uppercase tracking-wider text-[11px] mb-2">Possible Causes</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {possible_causes.map((cause, idx) => (
              <li key={idx}>{cause}</li>
            ))}
          </ul>
        </div>
        
        {home_remedies && home_remedies.length > 0 && (
          <div>
            <h4 className="font-semibold text-white/70 uppercase tracking-wider text-[11px] mb-2">Recommended Actions</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {home_remedies.map((remedy, idx) => (
                <li key={idx}>{remedy}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DiagnosisCard;
