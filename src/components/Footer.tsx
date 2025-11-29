import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img src={logo} alt="B STAR Technology Logo" className="h-16 w-auto rounded-full" />
            </div>
            <p className="text-gold/60 text-sm mb-4">
              Your trusted mobile repair partner. Fast, reliable, and professional service at your doorstep.
            </p>
            <p className="text-gold/40 text-xs italic">
              "We Bring Your Phone Back to Life"
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "#" },
                { label: "Services", href: "#services" },
                { label: "Book Now", href: "#booking" },
                { label: "Reviews", href: "#reviews" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gold/60 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gold font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                "Screen Repair",
                "Battery Replacement",
                "Water Damage",
                "Software Issues",
                "Charging Port",
                "On-Site Repair",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-gold/60 hover:text-gold transition-colors text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+919995069984"
                  className="flex items-center gap-2 text-gold/60 hover:text-gold transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  +91 99950 69984
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919995069984"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gold/60 hover:text-gold transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:msuhaibom@gmail.com"
                  className="flex items-center gap-2 text-gold/60 hover:text-gold transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  msuhaibom@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-gold/60 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Kondotty, Malappuram<br />Kerala, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gold/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gold/40 text-sm">
              © {currentYear} B STAR Mobile Technician. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gold/40 hover:text-gold text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gold/40 hover:text-gold text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
