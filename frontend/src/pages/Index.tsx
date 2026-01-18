import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Award, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/ProductCard";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { products } from "@/data/products";
import heroBgV4 from "@/assets/hero-bg-v4.jpg";

const features = [
  {
    icon: Leaf,
    title: "100% Organic",
    description: "Naturally grown without chemicals or pesticides",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Carefully processed to retain maximum nutrients",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Shipped fresh to your doorstep worldwide",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description: "Every batch tested for purity and quality",
  },
];

const testimonials = [
  {
    name: "Nimali Perera",
    role: "Health Enthusiast",
    content:
      "Best coconut oil I've ever used—fresh smell, premium quality! My skin and hair have never looked better.",
    avatar: "N",
  },
  {
    name: "Rajith Fernando",
    role: "Chef",
    content:
      "The coconut flour is a game changer for my gluten-free recipes. Authentic Sri Lankan quality.",
    avatar: "R",
  },
  {
    name: "Sarah Mitchell",
    role: "Wellness Coach",
    content:
      "I recommend GlobalCoco to all my clients. Pure, natural, and sustainably sourced.",
    avatar: "S",
  },
];

export default function Index() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Background Image with reduced brightness and saturation */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroBgV4})`,
            filter: 'brightness(0.6) saturate(0.7) contrast(0.9)'
          }}
        />
        {/* Sophisticated gradient overlay for cinematic effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6 animate-fade-up">
              🌴 From Tree to Table — Pure Coconut Power
            </span>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 animate-fade-up text-white drop-shadow-lg"
              style={{ animationDelay: "0.1s" }}
            >
              Pure Ceylon
              <span className="text-yellow-300 block">Coconut Goodness</span>
            </h1>
            <p
              className="text-xl text-white/90 mb-10 max-w-2xl mx-auto animate-fade-up drop-shadow-md"
              style={{ animationDelay: "0.2s" }}
            >
              Healthy, natural, and premium coconut products harvested with love
              in Sri Lanka. Experience the authentic taste of tropical wellness.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Link to="/shop">
                <Button variant="hero">
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="heroOutline">Learn Our Story</Button>
              </Link>
            </div>
          </div>
        </div>


      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Why Choose GlobalCoco Lanka?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We bring you the finest coconut products from Sri Lanka, processed
              with care and delivered fresh to your doorstep.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="text-center p-6 rounded-2xl bg-background shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                Featured Products
              </h2>
              <p className="text-muted-foreground">
                Our best-selling coconut products
              </p>
            </div>
            <Link to="/shop">
              <Button variant="ghost" className="hidden sm:flex">
                View All Products
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/shop">
              <Button variant="tropical">
                View All Products
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 tropical-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of happy customers who trust GlobalCoco Lanka for
              their coconut products.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-background p-8 rounded-2xl shadow-soft"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading font-bold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready to Experience Pure Coconut Goodness?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get 10% off your first order, plus
            exclusive updates on new products and special offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full bg-primary-foreground text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground"
            />
            <Button
              variant="secondary"
              size="lg"
              className="rounded-full px-8"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
