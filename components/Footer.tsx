import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const companyName = "TodoPrestado."; // Nombre de la empresa
  const navigationLinks = [
    { label: "Inicio", href: "/" },
    { label: "Sobre nosotros", href: "/" },
    { label: "Contactanos", href: "/" },
  ];
  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 py-3 z-10">
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center space-y-4">
        <nav>
          <ul className="flex flex-wrap justify-center space-x-6">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex space-x-4">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label={link.label}
            >
              <link.icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-200 mt-3 pt-3 text-center">
        <p className="text-gray-600">
          © {currentYear} {companyName} All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);
}