// src/components/ContactForm.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const WA_NUMBER = '628812902112'; // WhatsApp PT Mitra Bumi Rejeki

const initialForm = {
  name:     '',
  waNumber: '',
  message:  '',
};

function validate(form, t) {
  const errors = {};
  if (!form.name.trim())
    errors.name = t('contact.form.required');

  if (!form.waNumber.trim())
    errors.waNumber = t('contact.form.required');
  else if (!/^[0-9+\-\s()]{7,20}$/.test(form.waNumber.trim()))
    errors.waNumber = t('contact.form.invalidPhone');

  if (!form.message.trim())
    errors.message = t('contact.form.required');

  return errors;
}

export default function ContactForm() {
  const { t } = useLanguage();
  const [form, setForm]       = useState(initialForm);
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const newErrors = validate({ ...form, [name]: value }, t);
      setErrors(prev => ({ ...prev, [name]: newErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const newErrors = validate(form, t);
    setErrors(prev => ({ ...prev, [name]: newErrors[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, waNumber: true, message: true });
    const newErrors = validate(form, t);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Build pre-filled WhatsApp message
    const text =
      `${t('contact.form.waGreeting')}\n\n` +
      `${t('contact.form.waIntro')} *${form.name.trim()}*.\n` +
      `${t('contact.form.waMyNumber')} ${form.waNumber.trim()}\n\n` +
      `${form.message.trim()}`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${WA_NUMBER}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const inputClass = (field) =>
    `form-input ${errors[field] ? 'form-input-error' : ''}`;

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5"
      aria-label="Contact form via WhatsApp"
    >
      {/* WhatsApp badge */}
      <div className="flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 rounded px-3 py-2">
        <svg viewBox="0 0 24 24" fill="#25D366" className="w-4 h-4 shrink-0">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="text-[#25D366] text-xs font-medium tracking-wide">
          {t('contact.form.waBadge')}
        </span>
      </div>

      {/* Nama */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className="text-white/60 text-xs tracking-wider uppercase">
          {t('contact.form.name')} *
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={t('contact.form.name')}
          className={inputClass('name')}
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        <AnimatePresence>
          {errors.name && (
            <motion.p id="name-error" role="alert"
              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-red-400 text-xs"
            >
              {errors.name}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Nomor WhatsApp */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-wa" className="text-white/60 text-xs tracking-wider uppercase">
          {t('contact.form.waLabel')} *
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm select-none">+62</span>
          <input
            id="contact-wa"
            name="waNumber"
            type="tel"
            value={form.waNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="081xxxxxxxxx"
            className={`${inputClass('waNumber')} pl-10`}
            autoComplete="tel"
            aria-invalid={!!errors.waNumber}
            aria-describedby={errors.waNumber ? 'wa-error' : undefined}
          />
        </div>
        <AnimatePresence>
          {errors.waNumber && (
            <motion.p id="wa-error" role="alert"
              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-red-400 text-xs"
            >
              {errors.waNumber}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Pesan */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="text-white/60 text-xs tracking-wider uppercase">
          {t('contact.form.message')} *
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={t('contact.form.waPlaceholder')}
          className={`${inputClass('message')} resize-none`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        <div className="flex justify-between items-center">
          <AnimatePresence>
            {errors.message && (
              <motion.p id="message-error" role="alert"
                initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="text-red-400 text-xs"
              >
                {errors.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Submit → WhatsApp */}
      <motion.button
        id="contact-submit"
        type="submit"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="btn-gold mt-2 w-full sm:w-auto justify-center flex items-center gap-2"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        {t('contact.form.waButton')}
      </motion.button>
    </form>
  );
}
