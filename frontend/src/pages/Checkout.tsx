import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export default function Checkout() {
    const { cartItems, total, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        phone: "",
    });

    const shipping = total > 5000 ? 0 : 350;
    const grandTotal = total + shipping;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to place an order");
            navigate("/login");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token,
                },
                body: JSON.stringify({
                    items: cartItems.map(item => ({
                        product: item.name,
                        productId: item.id,
                        quantity: item.quantity,
                        price: item.price,
                        image: item.image
                    })),
                    total: grandTotal,
                    shippingDetails: formData,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to place order");
            }

            toast.success("Order placed successfully!");
            clearCart();
            navigate("/"); // Or to an order success page
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        navigate("/cart");
        return null;
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-24 pb-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-heading font-bold mb-8">Checkout</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-semibold mb-6">Shipping Details</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input
                                        id="city"
                                        name="city"
                                        required
                                        value={formData.city}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                <Button type="submit" className="w-full mt-6" disabled={loading}>
                                    {loading ? "Processing..." : `Place Order (LKR ${grandTotal.toLocaleString()})`}
                                </Button>
                            </form>
                        </div>

                        <div className="bg-muted/30 p-6 rounded-xl h-fit">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span>{item.name} x {item.quantity}</span>
                                        <span>LKR {(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                                <div className="border-t pt-4 mt-4 space-y-2">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>LKR {total.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span>LKR {shipping.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                                        <span>Total</span>
                                        <span>LKR {grandTotal.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
