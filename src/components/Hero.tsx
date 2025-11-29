import { Phone, MessageCircle, Smartphone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />
      </div>

      {/* Floating Stars */}
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="absolute text-gold/20 animate-float"
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 20}%`,
            animationDelay: `${i * 0.5}s`,
            width: `${16 + i * 4}px`,
            height: `${16 + i * 4}px`,
          }}
          fill="currentColor"
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[calc(100vh-80px)] py-12">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-2 mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              <span className="text-gold text-sm font-medium">Fast & Reliable Service</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gold leading-tight mb-6 animate-slide-up">
              Your Phone Broken?
              <br />
              <span className="text-gold/80">We Fix It Fast!</span>
            </h1>

            <p className="text-gold/60 text-lg md:text-xl mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Professional mobile repair at your doorstep. Screen repairs, battery replacement, 
              water damage recovery & more. Trusted by 1000+ happy customers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Button variant="hero" size="xl" asChild>
                <a href="tel:+1234567890">
                  <Phone className="w-5 h-5" />
                  Call Technician Now
                </a>
              </Button>
              <Button variant="whatsapp" size="xl" asChild>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </a>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                  ))}
                </div>
                <span className="text-gold/80 text-sm">5.0 Rating</span>
              </div>
              <div className="h-6 w-px bg-gold/30" />
              <div className="text-gold/80 text-sm">
                <span className="text-gold font-bold">1000+</span> Repairs Done
              </div>
              <div className="h-6 w-px bg-gold/30 hidden sm:block" />
              <div className="text-gold/80 text-sm hidden sm:block">
                <span className="text-gold font-bold">24/7</span> Support
              </div>
            </div>
          </div>

          {/* Phone Illustration */}
          <div className="flex-1 flex justify-center lg:justify-end animate-float">
            <div className="relative">
              {/* Main Phone */}
              <div className="relative w-64 h-[500px] bg-gradient-to-b from-navy-light to-navy rounded-[3rem] border-4 border-gold/30 shadow-2xl shadow-gold/20">
                {/* Screen */}
                <div className="absolute inset-4 bg-gradient-to-b from-gold/20 to-gold/5 rounded-[2rem] overflow-hidden">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <Smartphone className="w-16 h-16 text-gold mb-4" />
                    <span className="text-gold font-bold text-xl text-center">B STAR</span>
                    <span className="text-gold/60 text-sm">Mobile Repair</span>
                    <div className="mt-8 w-full space-y-3">
                      <div className="h-3 bg-gold/20 rounded-full w-full" />
                      <div className="h-3 bg-gold/20 rounded-full w-3/4" />
                      <div className="h-3 bg-gold/20 rounded-full w-1/2" />
                    </div>
                  </div>
                </div>
                {/* Notch */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-5 bg-navy rounded-full" />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gold rounded-2xl flex items-center justify-center shadow-lg animate-pulse-slow">
                <span className="text-navy-dark font-bold text-2xl">✓</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-navy-light border-2 border-gold/30 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <span className="text-gold font-bold text-lg block">30</span>
                  <span className="text-gold/60 text-xs">min fix</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(220, 30%, 98%)"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
