import React, { useState } from 'react';
import { Search, Sparkles, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

interface AIResponse {
    found: boolean;
    query: string;
    proTip?: string;
    bestMatch?: {
        id: string;
        whyItIsPerfect: string;
        keyBenefits: string[];
    };
    alternatives?: {
        id: string;
        reason: string;
    }[];
    message?: string;
}

export const SmartSearch = () => {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<AIResponse | null>(null);
    const { addToCart } = useCart();
    const { toast } = useToast();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setResult(null);

        try {
            const response = await fetch('http://localhost:5000/api/search/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to connect to AI server. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const bestProduct = result?.bestMatch ? products.find(p => p.id === result.bestMatch?.id) : null;

    return (
        <div className="w-full max-w-4xl mx-auto mb-12">
            <div className="bg-white/50 backdrop-blur-sm border border-emerald-100 rounded-2xl md:rounded-3xl shadow-lg p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                        <Sparkles className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">AI Product Expert</h2>
                        <p className="text-sm text-gray-500">Ask me anything! e.g., "Best oil for dry hair"</p>
                    </div>
                </div>

                <form onSubmit={handleSearch} className="relative mb-8">
                    <Input
                        type="text"
                        placeholder="Describe what you need..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full pl-5 pr-14 py-6 text-lg rounded-xl border-emerald-200 focus:ring-2 focus:ring-emerald-500 shadow-sm"
                    />
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="absolute right-2 top-2 h-10 w-10 p-0 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition"
                    >
                        {isLoading ? <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" /> : <Search className="w-5 h-5 text-white" />}
                    </Button>
                </form>

                {/* Suggestions */}
                {!result && (
                    <div className="flex flex-wrap gap-2 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
                        {["Best oil for deep frying", "Something for dry skin", "Gift for health conscious", "Cheap coconut oil"].map((suggestion) => (
                            <button
                                key={suggestion}
                                onClick={() => {
                                    setQuery(suggestion);
                                }}
                                className="text-xs md:text-sm px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full hover:bg-emerald-100 border border-emerald-100 transition"
                            >
                                "{suggestion}"
                            </button>
                        ))}
                    </div>
                )}

                {result && result.found && bestProduct && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                        {/* Header */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <Search className="w-4 h-4" />
                            <span>For your search: <strong>"{result.query}"</strong></span>
                        </div>

                        {/* Best Match Card */}
                        <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-xl p-6 shadow-sm overflow-hidden relative">
                            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                                BEST MATCH
                            </div>

                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="w-full md:w-1/3">
                                    <div className="aspect-square rounded-xl overflow-hidden bg-white border border-gray-100 mb-4">
                                        <img src={bestProduct.image} alt={bestProduct.name} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1">{bestProduct.name}</h3>
                                    <p className="text-emerald-600 font-bold text-xl mb-3">${bestProduct.price.toFixed(2)}</p>
                                    <Button onClick={() => addToCart(bestProduct)} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                                        <ShoppingCart className="w-4 h-4" /> Add to Cart
                                    </Button>
                                </div>

                                <div className="w-full md:w-2/3 space-y-4">
                                    <div>
                                        <h4 className="text-sm font-bold text-emerald-800 uppercase tracking-wide mb-2">Why It's Perfect</h4>
                                        <p className="text-gray-700 leading-relaxed">{result.bestMatch?.whyItIsPerfect}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-bold text-emerald-800 uppercase tracking-wide mb-2">Key Benefits</h4>
                                        <ul className="space-y-2">
                                            {result.bestMatch?.keyBenefits.map((benefit, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                                                    <span className="text-emerald-500 mt-0.5">✓</span> {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {result.proTip && (
                                        <div className="flex gap-3 bg-amber-50 border border-amber-100 p-3 rounded-lg text-sm text-amber-800">
                                            <div className="shrink-0 mt-0.5">💡</div>
                                            <p><span className="font-bold">Pro Tip:</span> {result.proTip}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Alternatives */}
                        {result.alternatives && result.alternatives.length > 0 && (
                            <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                                <div className="col-span-full">
                                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wide flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4" /> Alternatives
                                    </h4>
                                </div>
                                {result.alternatives.map((alt) => {
                                    const altProduct = products.find(p => p.id === alt.id);
                                    if (!altProduct) return null;
                                    return (
                                        <div key={alt.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition group cursor-pointer" onClick={() => addToCart(altProduct)}>
                                            <img src={altProduct.image} alt={altProduct.name} className="w-12 h-12 rounded-md object-cover" />
                                            <div>
                                                <h5 className="font-medium text-gray-800 text-sm group-hover:text-emerald-700 transition">{altProduct.name}</h5>
                                                <p className="text-xs text-gray-500">{alt.reason}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {result && !result.found && (
                    <div className="text-center py-8 text-gray-500">
                        <p>{result.message}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
