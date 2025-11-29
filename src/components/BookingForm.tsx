import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const deviceTypes = [
  "iPhone",
  "Samsung Galaxy",
  "Google Pixel",
  "OnePlus",
  "Xiaomi",
  "iPad",
  "Samsung Tablet",
  "Other",
];

const issues = [
  "Cracked Screen",
  "Battery Replacement",
  "Water Damage",
  "Not Charging",
  "Software Issue",
  "Camera Problem",
  "Speaker/Mic Issue",
  "Other",
];

const BookingForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    device: "",
    issue: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Booking Received!",
      description: "We'll contact you within 30 minutes to confirm your appointment.",
    });

    setFormData({ name: "", phone: "", device: "", issue: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="booking" className="py-20 bg-navy relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-3">
              Book Your Repair
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gold mb-6">
              Schedule Your Repair Today
            </h2>
            <p className="text-gold/70 text-lg mb-8">
              Fill out the form and we'll get back to you within 30 minutes. 
              Fast, reliable service at your convenience.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              {[
                "Free diagnosis & quote",
                "Same-day repair available",
                "90-day warranty on all repairs",
                "We come to your location",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-gold" />
                  <span className="text-gold/80">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Working Hours */}
            <div className="mt-10 p-6 bg-navy-light rounded-2xl border border-gold/20">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-gold" />
                <span className="text-gold font-semibold">Working Hours</span>
              </div>
              <div className="space-y-2 text-gold/70 text-sm">
                <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                <p>Saturday: 9:00 AM - 6:00 PM</p>
                <p>Sunday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-card rounded-3xl p-8 shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-navy" />
              <span className="text-foreground font-semibold">Quick Booking Form</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Name *
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number *
                </label>
                <Input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Device Type *
                </label>
                <Select
                  value={formData.device}
                  onValueChange={(value) => setFormData({ ...formData, device: value })}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your device" />
                  </SelectTrigger>
                  <SelectContent>
                    {deviceTypes.map((device) => (
                      <SelectItem key={device} value={device}>
                        {device}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Issue Type *
                </label>
                <Select
                  value={formData.issue}
                  onValueChange={(value) => setFormData({ ...formData, issue: value })}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="What's the problem?" />
                  </SelectTrigger>
                  <SelectContent>
                    {issues.map((issue) => (
                      <SelectItem key={issue} value={issue}>
                        {issue}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Additional Details
                </label>
                <Textarea
                  placeholder="Describe your issue in detail..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                variant="gold"
                size="xl"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Book Repair Now"}
              </Button>

              <p className="text-center text-muted-foreground text-xs">
                By booking, you agree to our terms of service. We'll never spam you.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
