import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Sarah Mitchell",
    role: "iPhone User",
    rating: 5,
    text: "Broke my iPhone screen on a Saturday and B STAR had it fixed within an hour! The technician came to my house. Absolutely amazing service!",
    avatar: "S",
  },
  {
    name: "Michael Chen",
    role: "Samsung Galaxy Owner",
    rating: 5,
    text: "My phone fell in water and I thought it was dead. B STAR recovered all my data and fixed it completely. Highly recommended!",
    avatar: "M",
  },
  {
    name: "Emma Rodriguez",
    role: "Small Business Owner",
    rating: 5,
    text: "They've fixed multiple devices for my business. Always professional, fast, and the prices are very fair. My go-to repair service!",
    avatar: "E",
  },
  {
    name: "David Thompson",
    role: "College Student",
    rating: 5,
    text: "Affordable and quick! Got my battery replaced in 20 minutes. The warranty they offer gives me peace of mind. Great service!",
    avatar: "D",
  },
];

const Reviews = () => {
  return (
    <section id="reviews" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-3">
            Customer Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by 1000+ Happy Customers
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it. Here's what our customers say about B STAR.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {[
            { value: "1000+", label: "Repairs Done" },
            { value: "5.0", label: "Average Rating" },
            { value: "98%", label: "Satisfaction Rate" },
            { value: "30 min", label: "Avg. Repair Time" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-navy">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 border border-border hover:border-gold/30 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center text-gold font-bold text-lg shrink-0">
                  {review.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-foreground">{review.name}</h4>
                    <Quote className="w-6 h-6 text-gold/30 group-hover:text-gold/50 transition-colors" />
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{review.role}</p>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="text-foreground/80 leading-relaxed">"{review.text}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-card border border-border rounded-full px-6 py-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-gold fill-gold" />
              ))}
            </div>
            <span className="text-foreground font-medium">5.0 on Google Reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
