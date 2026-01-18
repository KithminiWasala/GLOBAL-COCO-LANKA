import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Calendar, User, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: "1",
    title: "Top 5 Benefits of Virgin Coconut Oil",
    excerpt:
      "Discover the amazing health benefits of virgin coconut oil, from boosting metabolism to improving skin health.",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600",
    author: "Dr. Amara Silva",
    date: "Nov 28, 2024",
    category: "Health",
  },
  {
    id: "2",
    title: "Healthy Sri Lankan Recipes with Coconut Milk",
    excerpt:
      "Explore traditional and modern recipes featuring our premium coconut milk powder.",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600",
    author: "Chef Rajitha",
    date: "Nov 20, 2024",
    category: "Recipes",
    externalUrl: "https://medium.com/@upendrakithmini2/healthy-sri-lankan-recipes-with-coconut-milk-8e4e174d4c3b",
  },
  {
    id: "3",
    title: "Why Coconut Flour is Great for Weight Loss",
    excerpt:
      "Learn how coconut flour can support your weight loss journey with its high fiber content.",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600",
    author: "Nutritionist Maya",
    date: "Nov 15, 2024",
    category: "Nutrition",
  },
  {
    id: "4",
    title: "Organic vs Non-Organic Coconut Oil: What's the Difference?",
    excerpt:
      "Understanding the key differences between organic and conventional coconut oil production.",
    image: "https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?w=600",
    author: "Dr. Amara Silva",
    date: "Nov 10, 2024",
    category: "Education",
  },
  {
    id: "5",
    title: "DIY Coconut Oil Hair Masks for Silky Hair",
    excerpt:
      "Transform your hair with these easy-to-make coconut oil hair masks that nourish and repair.",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600",
    author: "Beauty Expert Nisha",
    date: "Nov 5, 2024",
    category: "Beauty",
  },
  {
    id: "6",
    title: "Sustainable Coconut Farming in Sri Lanka",
    excerpt:
      "How we work with local farmers to ensure sustainable and ethical coconut production.",
    image: "https://images.unsplash.com/photo-1505935428862-770b6f24f629?w=600",
    author: "Farm Director Saman",
    date: "Oct 28, 2024",
    category: "Sustainability",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="py-16 tropical-gradient">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Coconut Wisdom
              </h1>
              <p className="text-xl text-muted-foreground">
                Tips, recipes, and insights about the wonderful world of coconuts
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Link to={`/blog/${blogPosts[0].id}`} className="block group">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300">
                <div className="aspect-video lg:aspect-auto overflow-hidden">
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium w-fit mb-4">
                    {blogPosts[0].category}
                  </span>
                  <h2 className="text-3xl font-heading font-bold mb-4 group-hover:text-primary transition-colors">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-6">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {blogPosts[0].author}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {blogPosts[0].date}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-heading font-bold mb-8">
              Latest Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post) => (
                post.externalUrl ? (
                  <a
                    key={post.id}
                    href={post.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-3">
                        {post.category}
                      </span>
                      <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1 text-primary font-medium">
                          Read more
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </a>
                ) : (
                  <Link
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-3">
                        {post.category}
                      </span>
                      <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1 text-primary font-medium">
                          Read more
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
