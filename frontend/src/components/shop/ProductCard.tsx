import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
            {product.category}
          </div>
        </div>
      </Link>
      <div className="p-5">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-heading font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-muted-foreground">
            ({product.reviews} reviews)
          </span>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-heading font-bold text-xl text-primary">
            LKR {product.price.toLocaleString()}
          </span>
          <Button
            variant="tropical"
            size="sm"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
