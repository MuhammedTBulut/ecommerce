import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "News", href: "/news" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "Returns", href: "/returns" },
      { name: "Shipping Info", href: "/shipping" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Refund Policy", href: "/refunds" },
    ],
    categories: [
      { name: "Electronics", href: "/categories/electronics" },
      { name: "Fashion", href: "/categories/fashion" },
      { name: "Home & Garden", href: "/categories/home-garden" },
      { name: "Sports", href: "/categories/sports" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com" },
  ];

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-primary" />
              <span className="font-bold text-lg">E-Commerce</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              Your trusted partner for premium quality products. We offer fast shipping, 
              excellent customer service, and a wide range of products to meet all your needs.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Subscribe to our newsletter</h4>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Subscribe</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Get the latest updates on new products and exclusive offers.
              </p>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
            © 2024 E-Commerce Store. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Legal Links */}
          <div className="flex space-x-4 text-sm">
            {footerLinks.legal.map((link, index) => (
              <span key={link.name}>
                <Link 
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
                {index < footerLinks.legal.length - 1 && (
                  <span className="ml-4 text-muted-foreground">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}