"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, CheckCircle } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
    setEmail("");
  };

  return (
    <section className="py-16 lg:py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-0 shadow-xl">
          <CardContent className="p-8 lg:p-12">
            <div className="text-center">
              {!isSubmitted ? (
                <>
                  <div className="mb-6">
                    <div className="h-16 w-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4">
                      <Mail className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                      Stay in the Loop
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                      Subscribe to our newsletter and be the first to know about new products, 
                      exclusive offers, and special promotions. Join our community of satisfied customers!
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="flex gap-2 mb-4">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1"
                      />
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "..." : "Subscribe"}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>

                  {/* Benefits */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                    <div className="text-center">
                      <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 mx-auto flex items-center justify-center mb-2">
                        <span className="text-green-600 dark:text-green-400">🎯</span>
                      </div>
                      <h3 className="font-semibold text-sm mb-1">Exclusive Deals</h3>
                      <p className="text-xs text-muted-foreground">
                        Get access to subscriber-only discounts and early bird offers
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 mx-auto flex items-center justify-center mb-2">
                        <span className="text-blue-600 dark:text-blue-400">🚀</span>
                      </div>
                      <h3 className="font-semibold text-sm mb-1">New Arrivals</h3>
                      <p className="text-xs text-muted-foreground">
                        Be the first to discover our latest products and trends
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/20 mx-auto flex items-center justify-center mb-2">
                        <span className="text-purple-600 dark:text-purple-400">💡</span>
                      </div>
                      <h3 className="font-semibold text-sm mb-1">Expert Tips</h3>
                      <p className="text-xs text-muted-foreground">
                        Receive helpful guides and tips from our experts
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-8">
                  <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 mx-auto flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-green-600 dark:text-green-400">
                    Welcome to Our Community!
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Thank you for subscribing! You&apos;ll receive your first newsletter soon with 
                    exclusive offers and the latest updates.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsSubmitted(false)}
                  >
                    Subscribe Another Email
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}