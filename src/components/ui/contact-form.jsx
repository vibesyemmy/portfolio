import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import emailjs from '@emailjs/browser';
import { IconX } from '@tabler/icons-react';

export const ContactForm = ({ className, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const result = await emailjs.sendForm(
        'service_iovsw1p',
        'template_8ief41d',
        formRef.current,
        'JCxo4QUF38r-E_SQZ'
      );

      console.log('Success:', result.text);
      setStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully.'
      });
      
      // Clear form
      formRef.current.reset();
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
    <div
      className={cn(
        "w-full max-w-2xl relative",
        className
      )}
    >
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
      <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-8 py-12 h-full overflow-hidden rounded-2xl flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-800 transition-colors duration-200 text-gray-400 hover:text-white"
          aria-label="Close dialog"
        >
          <IconX className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-bold text-white mb-8 text-center">Send me a Message</h3>
        
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="user_name" className="text-gray-200 text-sm mb-2 block">
              Full Name
            </label>
            <input
              id="user_name"
              type="text"
              name="user_name"
              required
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-700 bg-gray-800 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="user_email" className="text-gray-200 text-sm mb-2 block">
              Email Address
            </label>
            <input
              id="user_email"
              type="email"
              name="user_email"
              required
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-700 bg-gray-800 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="user_phone" className="text-gray-200 text-sm mb-2 block">
              Phone Number
            </label>
            <input
              id="user_phone"
              type="tel"
              name="user_phone"
              required
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-700 bg-gray-800 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div>
            <label htmlFor="message" className="text-gray-200 text-sm mb-2 block">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-700 bg-gray-800 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Type your message here..."
            />
          </div>

          {status.message && (
            <div className={cn(
              "text-sm px-3 py-2 rounded-lg",
              status.type === 'success' ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
            )}>
              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={cn(
              "bg-gradient-to-br relative group/btn from-blue-500 to-teal-500 block font-medium text-white text-sm rounded-lg px-4 py-3",
              "hover:opacity-90 transition-opacity",
              loading && "opacity-50 cursor-not-allowed"
            )}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg blur opacity-30 group-hover/btn:opacity-100 transition" />
            <span className="relative flex items-center justify-center">
              {loading ? "Sending..." : "Send Message"}
            </span>
          </button>
        </form>

        <div
          className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl"
        />
      </div>
    </div>
  );
};
