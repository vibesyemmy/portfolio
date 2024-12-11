import React, { useState, useRef, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import emailjs from '@emailjs/browser';
import { IconX } from '@tabler/icons-react';
import { useDebounce } from "../../hooks/useDebounce";

// Memoized input component for better performance
const FormInput = memo(({ label, id, type, name, placeholder, required = true }) => (
  <div className="contain-layout">
    <label htmlFor={id} className="text-gray-200 text-sm mb-2 block">
      {label}
    </label>
    <input
      id={id}
      type={type}
      name={name}
      required={required}
      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-700 bg-gray-800 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-none contain-paint"
      placeholder={placeholder}
    />
  </div>
));

FormInput.displayName = 'FormInput';

export const ContactForm = memo(({ className, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const formRef = useRef();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    message: ''
  });

  // Debounced form update
  const debouncedSetFormData = useDebounce((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, 100);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    debouncedSetFormData(name, value);
  }, [debouncedSetFormData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const result = await emailjs.sendForm(
        'service_iovsw1p',
        'template_8ief41d',
        formRef.current,
        'JCxo4QUF38r-E_SQZ'
      );

      setStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully.'
      });
      
      // Clear form
      formRef.current.reset();
      setFormData({
        user_name: '',
        user_email: '',
        user_phone: '',
        message: ''
      });
    } catch (error) {
      console.error("Error:", error.text);
      setStatus({
        type: 'error',
        message: 'Oops! Something went wrong. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("w-full max-w-2xl relative contain-layout", className)}>
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
      <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-8 py-12 h-full overflow-hidden rounded-2xl flex flex-col">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-800 transition-colors duration-200 text-gray-400 hover:text-white"
          aria-label="Close dialog"
        >
          <IconX className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-bold text-white mb-8 text-center">Send me a Message</h3>
        
        <form 
          ref={formRef} 
          onSubmit={handleSubmit} 
          className="flex flex-col gap-4 contain-layout"
          onChange={handleInputChange}
        >
          <FormInput
            label="Full Name"
            id="user_name"
            type="text"
            name="user_name"
            placeholder="John Doe"
          />

          <FormInput
            label="Email Address"
            id="user_email"
            type="email"
            name="user_email"
            placeholder="john@example.com"
          />

          <FormInput
            label="Phone Number"
            id="user_phone"
            type="tel"
            name="user_phone"
            placeholder="+1 (555) 000-0000"
          />

          <div className="contain-layout">
            <label htmlFor="message" className="text-gray-200 text-sm mb-2 block">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-700 bg-gray-800 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-none contain-paint"
              placeholder="Your message here..."
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className={cn(
              "px-8 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium",
              "hover:opacity-90 transition-opacity",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "contain-paint"
            )}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </motion.button>

          {status.message && (
            <p className={cn(
              "text-sm text-center",
              status.type === 'success' ? 'text-green-400' : 'text-red-400'
            )}>
              {status.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
});

ContactForm.displayName = 'ContactForm';
