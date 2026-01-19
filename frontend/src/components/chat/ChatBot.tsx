import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, RotateCcw, Send, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "bot" | "user";
  content: string;
  isContact?: boolean;
}

interface QuestionOption {
  id: string;
  label: string;
  answer: string;
}

const predefinedQuestions: QuestionOption[] = [
  {
    id: "price",
    label: "💰 Price of products",
    answer: "Our coconut products range from LKR 500 to LKR 5,000 depending on the product type and quantity. Visit our Shop page to see detailed pricing for each product!"
  },
  {
    id: "delivery",
    label: "🚚 Delivery time",
    answer: "We deliver within 3–5 business days in Sri Lanka. For international orders, delivery may take 7–10 business days. Express shipping options are also available!"
  },
  {
    id: "stock",
    label: "📦 Stock availability",
    answer: "All products shown on our website are in stock and ready to ship. If a product is temporarily unavailable, it will be marked accordingly on the product page."
  },
  {
    id: "packaging",
    label: "🎁 Packaging details",
    answer: "We use eco-friendly, sustainable packaging made from natural materials. All products are carefully packed to ensure freshness and safe delivery. Gift packaging is available upon request!"
  },
  {
    id: "order",
    label: "🛒 How to order",
    answer: "Ordering is easy! Browse our Shop, add products to your cart, proceed to checkout, fill in your details, and complete payment. You'll receive an order confirmation via email."
  },
  {
    id: "return",
    label: "↩️ Return policy",
    answer: "We offer a 7-day return policy for unopened products. If you receive a damaged item, please contact us within 48 hours with photos, and we'll arrange a replacement or refund."
  },
  {
    id: "contact",
    label: "📞 Contact seller",
    answer: "contact"
  }
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showQuestions, setShowQuestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("open-chatbot", handleOpenChat);
    return () => window.removeEventListener("open-chatbot", handleOpenChat);
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage("Hello 👋! Welcome to GlobalCoco Lanka! How can I help you today? Please select your question from below:");
    }
  }, [isOpen, messages.length]);

  const addBotMessage = (content: string, isContact?: boolean) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: "bot",
      content,
      isContact
    }]);
  };

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: "user",
      content
    }]);
  };

  const handleQuestionClick = (question: QuestionOption) => {
    addUserMessage(question.label);
    setShowQuestions(false);

    setTimeout(() => {
      if (question.id === "contact") {
        addBotMessage("I'd be happy to connect you with our team! Here are the ways to reach us:", true);
      } else {
        addBotMessage(question.answer);
        setTimeout(() => {
          addBotMessage("Is there anything else I can help you with?");
          setShowQuestions(true);
        }, 500);
      }
    }, 500);
  };

  const handleRestart = () => {
    setMessages([]);
    setShowQuestions(true);
    setTimeout(() => {
      addBotMessage("Hello 👋! Welcome to GlobalCoco Lanka! How can I help you today? Please select your question from below:");
    }, 300);
  };

  const handleShowQuestions = () => {
    setShowQuestions(true);
    addBotMessage("Here are the questions I can help you with:");
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-elevated flex items-center justify-center transition-all duration-300 hover:scale-110",
          isOpen ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] bg-card border border-border rounded-2xl shadow-elevated overflow-hidden transition-all duration-300",
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <span className="text-xl">🥥</span>
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-semibold">GlobalCoco Assistant</h3>
            <p className="text-xs opacity-80">Online • Ready to help</p>
          </div>
          <button
            onClick={handleRestart}
            className="p-2 hover:bg-primary-foreground/20 rounded-full transition-colors"
            title="Restart chat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-[350px] overflow-y-auto p-4 space-y-4 bg-background">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.type === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2 animate-fade-in",
                  message.type === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-secondary text-secondary-foreground rounded-bl-md"
                )}
              >
                <p className="text-sm">{message.content}</p>

                {/* Contact Options */}
                {message.isContact && (
                  <div className="mt-3 space-y-2">
                    <a
                      href="tel:+94771234567"
                      className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm hover:bg-primary/20 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      +94 77 123 4567
                    </a>
                    <a
                      href="mailto:info@globalcocolanka.com"
                      className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm hover:bg-primary/20 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      info@globalcocolanka.com
                    </a>
                    <a
                      href="https://wa.me/94771234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-palm/10 text-palm px-3 py-2 rounded-lg text-sm hover:bg-palm/20 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      WhatsApp Chat
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Question Buttons */}
        {showQuestions && (
          <div className="p-4 border-t border-border bg-muted/50 max-h-[200px] overflow-y-auto">
            <div className="grid gap-2">
              {predefinedQuestions.map((question) => (
                <button
                  key={question.id}
                  onClick={() => handleQuestionClick(question)}
                  className="w-full text-left px-3 py-2 rounded-lg bg-card hover:bg-primary hover:text-primary-foreground border border-border text-sm transition-all duration-200 hover:shadow-md"
                >
                  {question.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Show Questions Button */}
        {!showQuestions && messages.length > 0 && !messages[messages.length - 1]?.isContact && (
          <div className="p-3 border-t border-border bg-muted/50">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShowQuestions}
              className="w-full"
            >
              Show all questions
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatBot;
