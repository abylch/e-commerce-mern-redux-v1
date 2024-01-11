// WhatsAppIcon.js
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppIcon = () => {
  return (
    <a
      href="https://api.whatsapp.com/send/?phone=%2B972542385604&text=hello+avi%2C+about+the+e-commerce+site%2C+get+back+to+me+thanx&type=phone_number&app_absent=0"
      className="whatsapp_float"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaWhatsapp/>
    </a>
  );
};

export default WhatsAppIcon;