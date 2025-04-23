"use client";
import { useState, useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";

export default function InfraBuddy() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={dropdownRef}>
      {/* WhatsApp Icon Button */}
      <button
        onClick={toggleDropdown}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all hover:bg-green-600"
        aria-label="Open InfraBuddy chat"
      >
        {isOpen ? (
          <X size={30} />
        ) : (
          <div className="relative">
            <MessageCircle size={30} />
            <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500"></div>
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 origin-bottom-right transform overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-300">
          {/* Header */}
          <div className="flex items-center bg-green-500 p-4">
            <div className="mr-3 rounded-full bg-white p-2">
              <MessageCircle size={24} color="#22c55e" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">InfraBuddy</h3>
              <p className="text-sm text-green-100">
                Online | Typically replies instantly
              </p>
            </div>
          </div>

          {/* Message Content */}
          <div className="max-h-60 overflow-y-auto bg-gray-50 p-4">
            <div className="mb-3 max-w-xs rounded-lg rounded-tl-none bg-green-100 p-3">
              <p className="text-gray-800">
                {
                  "👋 Hi there! I'm InfraBuddy, your infrastructure solutions assistant."
                }
              </p>
            </div>
            <div className="max-w-xs rounded-lg rounded-tl-none bg-green-100 p-3">
              <p className="text-gray-800">
                How can I help you with your infrastructure needs today?
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="border-t border-gray-200 p-4">
            <a
              href="https://api.whatsapp.com/send/?phone=%2B918130376622&text=Hello+I+Want+To+Know+About+Your+Services&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-lg bg-green-500 px-4 py-3 text-center font-medium text-white transition-colors hover:bg-green-600"
            >
              Chat with Us on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
