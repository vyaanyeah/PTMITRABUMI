// src/components/ValueChips.jsx
import { Award, Zap, Briefcase, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { company } from '../data/company';

export const valueIconMap = {
  quality: Award,
  efficiency: Zap,
  professional: Briefcase,
  trust: ShieldCheck,
};

export default function ValueChips() {
  const { tObj } = useLanguage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
      {company.values.map((v, idx) => {
        const Icon = valueIconMap[v.id] || Award;
        return (
          <div
            key={v.id}
            data-aos="zoom-in"
            data-aos-delay={idx * 80 + 200}
            className="flex items-center gap-3 bg-white border border-brand-black/5 px-4 py-3 shadow-sm rounded-lg hover:border-brand-gold/40 hover:shadow-md transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-md bg-brand-gold/10 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-brand-gold stroke-[2]" />
            </div>
            <span className="text-brand-black font-semibold text-sm">{tObj(v.label)}</span>
          </div>
        );
      })}
    </div>
  );
}
