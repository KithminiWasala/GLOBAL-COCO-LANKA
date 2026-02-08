import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import LocationMap from "@/components/LocationMap";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["NO:25 Ananda Road", "Puttalam", "Sri Lanka"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+94 77 123 4567", "+94 11 234 5678"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@globalcocolanka.com", "support@globalcocolanka.com"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM"],
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="py-16 tropical-gradient">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-muted-foreground">
                Have questions about our products or need assistance? We'd love
                to hear from you!
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div
                    key={info.title}
                    className="bg-card p-6 rounded-2xl shadow-soft"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold mb-2">
                          {info.title}
                        </h3>
                        {info.details.map((detail, idx) => (
                          <p
                            key={idx}
                            className="text-muted-foreground text-sm"
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-card p-8 rounded-2xl shadow-soft">
                  <h2 className="text-2xl font-heading font-bold mb-6">
                    Send us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Your Name
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
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <Input
                        placeholder="How can we help you?"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        required
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <Textarea
                        placeholder="Tell us more about your inquiry..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                        rows={6}
                      />
                    </div>
                    <Button variant="hero" type="submit">
                      <Send className="w-5 h-5" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map placeholder */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="bg-muted rounded-2xl overflow-hidden shadow-soft">
              <LocationMap
                latitude={8.0214731}
                longitude={79.8350538}
                businessName="GlobalCoco Lanka"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
