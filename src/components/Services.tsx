import { 
  Smartphone, 
  Battery, 
  Droplets, 
  MonitorSmartphone, 
  Cpu, 
  ShieldCheck,
  Wrench,
  Zap
} from "lucide-react";

const services = [
  {
    icon: Smartphone,
    title: "Screen Repair",
    description: "Cracked or broken screen? We replace it with OEM quality parts in 30 minutes.",
    price: "From $49",
    popular: true,
  },
  {
    icon: Battery,
    title: "Battery Replacement",
    description: "Restore your phone's battery life with a brand new, long-lasting battery.",
    price: "From $29",
    popular: false,
  },
  {
    icon: Droplets,
    title: "Water Damage",
    description: "Dropped your phone in water? Our experts can recover it quickly.",
    price: "From $59",
    popular: false,
  },
  {
    icon: MonitorSmartphone,
    title: "Tablet Repair",
    description: "iPad, Samsung tablets & more. All tablet repairs handled professionally.",
    price: "From $69",
    popular: false,
  },
  {
    icon: Cpu,
    title: "Software Issues",
    description: "Frozen screen, boot loops, or virus removal. We fix all software problems.",
    price: "From $25",
    popular: false,
  },
  {
    icon: Zap,
    title: "Charging Port",
    description: "Phone not charging? We repair or replace faulty charging ports.",
    price: "From $35",
    popular: true,
  },
  {
    icon: Wrench,
    title: "On-Site Repair",
    description: "We come to you! Home, office, or anywhere – repairs at your location.",
    price: "Free Visit",
    popular: false,
  },
  {
    icon: ShieldCheck,
    title: "Warranty Service",
    description: "90-day warranty on all repairs. Quality guaranteed or money back.",
    price: "Included",
    popular: false,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-3">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Expert Mobile Repair Services
          </h2>
          <p className="text-muted-foreground text-lg">
            From cracked screens to water damage, we handle all mobile repairs with expertise and care.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-2xl p-6 border border-border hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {service.popular && (
                <span className="absolute -top-3 right-4 bg-gold text-navy-dark text-xs font-bold px-3 py-1 rounded-full">
                  Popular
                </span>
              )}
              
              <div className="w-14 h-14 bg-navy/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                <service.icon className="w-7 h-7 text-navy group-hover:text-gold transition-colors" />
              </div>
              
              <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {service.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-gold font-bold">{service.price}</span>
                <a 
                  href="#booking" 
                  className="text-sm text-navy font-medium hover:text-gold transition-colors"
                >
                  Book Now →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
