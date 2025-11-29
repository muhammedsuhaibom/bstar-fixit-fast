import { Phone, MessageCircle, MapPin, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-3">
            Contact Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-muted-foreground text-lg">
            Have questions? Need a quick fix? Reach out to us anytime!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Cards */}
          <a
            href="tel:+1234567890"
            className="group bg-card rounded-2xl p-8 border border-border hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center"
          >
            <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gold transition-colors">
              <Phone className="w-8 h-8 text-gold group-hover:text-navy-dark transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Call Us</h3>
            <p className="text-gold font-semibold text-xl mb-2">+1 (234) 567-890</p>
            <p className="text-muted-foreground text-sm">Available 24/7 for emergencies</p>
          </a>

          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-card rounded-2xl p-8 border border-border hover:border-[#25D366]/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center"
          >
            <div className="w-16 h-16 bg-[#25D366]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#25D366] transition-colors">
              <MessageCircle className="w-8 h-8 text-[#25D366] group-hover:text-[#ffffff] transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">WhatsApp</h3>
            <p className="text-[#25D366] font-semibold text-xl mb-2">Message Us</p>
            <p className="text-muted-foreground text-sm">Quick responses guaranteed</p>
          </a>

          <a
            href="mailto:contact@bstar.com"
            className="group bg-card rounded-2xl p-8 border border-border hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center"
          >
            <div className="w-16 h-16 bg-navy/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-navy transition-colors">
              <Mail className="w-8 h-8 text-navy group-hover:text-gold transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Email</h3>
            <p className="text-navy font-semibold text-xl mb-2">contact@bstar.com</p>
            <p className="text-muted-foreground text-sm">We reply within 2 hours</p>
          </a>
        </div>

        {/* Location & Hours */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-navy rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-gold" />
              <h3 className="text-gold font-bold text-lg">Our Location</h3>
            </div>
            <p className="text-gold/80 mb-4">
              123 Tech Street, Downtown<br />
              City, State 12345
            </p>
            <p className="text-gold/60 text-sm">
              * We also offer on-site repairs at your location!
            </p>
          </div>

          <div className="bg-navy rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-gold" />
              <h3 className="text-gold font-bold text-lg">Working Hours</h3>
            </div>
            <div className="space-y-2 text-gold/80">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="text-gold">8:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="text-gold">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="text-gold">10:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 rounded-2xl p-8 border border-gold/20">
          <h3 className="text-2xl font-bold text-foreground mb-2">Need Emergency Repair?</h3>
          <p className="text-muted-foreground mb-6">
            Phone emergency? Call us now for immediate assistance!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <a href="tel:+1234567890">
                <Phone className="w-5 h-5" />
                Call Now: +1 (234) 567-890
              </a>
            </Button>
            <Button variant="whatsapp" size="xl" asChild>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
