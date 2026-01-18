import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Leaf, Award, Users, Globe } from "lucide-react";
import aboutPalm from "@/assets/about-palm-v2.jpg";

const stats = [
  { label: "Years of Excellence", value: "15+" },
  { label: "Happy Customers", value: "50K+" },
  { label: "Products", value: "25+" },
  { label: "Countries Served", value: "30+" },
];

const values = [
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "We work directly with local farmers, ensuring sustainable practices that protect our environment for future generations.",
  },
  {
    icon: Award,
    title: "Quality First",
    description:
      "Every batch of our products undergoes rigorous quality testing to ensure you receive only the finest coconut products.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We support local communities in Sri Lanka, providing fair wages and empowering coconut farming families.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "From Sri Lanka to your doorstep, we deliver pure coconut goodness to customers around the world.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="py-16 tropical-gradient">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Our Story
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                GlobalCoco Lanka was born from a passion for pure, natural coconut
                products and a commitment to sharing Sri Lanka's finest exports
                with the world.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  Our Mission
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  Bringing Ceylon Coconut Excellence to the World
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Sri Lanka, known as the "Pearl of the Indian Ocean," has been
                  cultivating coconuts for centuries. Our mission is to share this
                  rich heritage with the world through premium, sustainably-sourced
                  coconut products.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We work hand-in-hand with local farmers, ensuring every coconut
                  is harvested at peak ripeness and processed using traditional
                  methods combined with modern technology to preserve maximum
                  nutrients and flavor.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-elevated">
                  <img
                    src={aboutPalm}
                    alt="Close up of palm tree with green fruit"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/10 rounded-3xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Our Values
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                At GlobalCoco Lanka, our values guide everything we do, from
                sourcing to delivery.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="bg-card p-8 rounded-2xl shadow-soft text-center hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Our Vision
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
              To become the world's most trusted source for premium coconut
              products, while championing sustainable farming practices and
              empowering Sri Lankan communities. We envision a future where every
              home can enjoy the pure, natural goodness of Ceylon coconuts.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
