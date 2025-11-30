import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Smartphone, Wrench, Battery, Shield, Wifi, Star } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Intro animation
    setTimeout(() => setPageLoaded(true), 100);

    // Check if user is already logged in
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        navigate("/");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast({ title: "Welcome back!", description: "Successfully logged in." });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
          },
        });
        if (error) throw error;
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const floatingIcons = [
    { Icon: Smartphone, delay: "0s", position: "top-[15%] left-[10%]" },
    { Icon: Wrench, delay: "0.5s", position: "top-[25%] right-[15%]" },
    { Icon: Battery, delay: "1s", position: "bottom-[30%] left-[8%]" },
    { Icon: Shield, delay: "1.5s", position: "bottom-[20%] right-[10%]" },
    { Icon: Wifi, delay: "2s", position: "top-[60%] left-[15%]" },
    { Icon: Star, delay: "2.5s", position: "top-[45%] right-[8%]" },
  ];

  return (
    <div
      className={`min-h-screen bg-navy relative overflow-hidden flex items-center justify-center transition-all duration-1000 ${
        pageLoaded ? "opacity-100" : "opacity-0 blur-md"
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-navy-light/30 rounded-full blur-3xl" />
      </div>

      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, delay, position }, index) => (
        <div
          key={index}
          className={`absolute ${position} animate-float opacity-20`}
          style={{ animationDelay: delay }}
        >
          <Icon className="w-8 h-8 md:w-12 md:h-12 text-gold" />
        </div>
      ))}

      {/* Login Card */}
      <div
        className={`relative z-10 w-full max-w-md mx-4 transition-all duration-700 ${
          pageLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
        style={{ transitionDelay: "0.3s" }}
      >
        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-navy-light/40 border border-gold/20 rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl animate-pulse-slow" />
              <img
                src={logo}
                alt="B STAR Mobile Repair"
                className="relative w-20 h-20 rounded-full object-cover border-2 border-gold shadow-lg"
              />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gold mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-gold/60 text-sm">
              {isLogin
                ? "Sign in to manage your repairs"
                : "Join B STAR for fast mobile repairs"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-gold/80 text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-navy/50 border-gold/20 text-gold placeholder:text-gold/40 focus:border-gold focus:ring-gold/30"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gold/80 text-sm font-medium">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="h-12 bg-navy/50 border-gold/20 text-gold placeholder:text-gold/40 focus:border-gold focus:ring-gold/30"
              />
            </div>

            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-gold/60 text-sm hover:text-gold transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button with Glow */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-gold via-gold-light to-gold rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity animate-pulse-slow" />
              <Button
                type="submit"
                disabled={isLoading}
                className="relative w-full h-12 bg-gradient-to-r from-gold to-gold-dark text-navy font-semibold rounded-xl hover:from-gold-light hover:to-gold transition-all duration-300 shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                    <span>Please wait...</span>
                  </div>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </form>

          {/* Toggle Login/Signup */}
          <div className="mt-8 text-center">
            <p className="text-gold/60 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-gold font-semibold hover:text-gold-light transition-colors"
              >
                {isLogin ? "Create Account" : "Sign In"}
              </button>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-gold/40 text-sm hover:text-gold/60 transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
