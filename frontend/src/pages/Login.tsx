import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.jpg";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const url = `http://localhost:5000${endpoint}`;

      const body = isLogin
        ? { email: formData.email, password: formData.password }
        : {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Success
      localStorage.setItem("token", data.token); // Save token
      toast.success(data.message);

      if (isLogin) {
        navigate("/"); // Redirect to home on login
      } else {
        setIsLogin(true); // Switch to login view after sign up or stay logged in? 
        // Usually auto-login or switch to login. The backend returns a token for register too, so we can auto-login.
        // Let's treat register as auto-login for better UX
        localStorage.setItem("token", data.token);
        navigate("/");
      }

    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-card rounded-3xl p-8 shadow-elevated">
              {/* Logo */}
              <div className="text-center mb-8">
                <img
                  src={logo}
                  alt="GlobalCoco Lanka"
                  className="w-20 h-20 rounded-full mx-auto mb-4 shadow-soft"
                />
                <h1 className="text-2xl font-heading font-bold">
                  {isLogin ? "Welcome Back" : "Create Account"}
                </h1>
                <p className="text-muted-foreground text-sm mt-2">
                  {isLogin
                    ? "Sign in to continue shopping"
                    : "Join our coconut family"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <Input
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="h-12"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="h-12"
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      placeholder="+94 77 123 4567"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="h-12"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                      className="h-12 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Confirm Password
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                      className="h-12"
                    />
                  </div>
                )}

                {isLogin && (
                  <div className="text-right">
                    <Link
                      to="/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                )}

                <Button variant="hero" type="submit" className="w-full">
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground text-sm">
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}{" "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary font-medium hover:underline"
                  >
                    {isLogin ? "Sign up now" : "Sign in"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
