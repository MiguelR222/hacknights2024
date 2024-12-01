import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const companyName = "TodoPrestado."; // Nombre de la empresa
  const navigationLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];
  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Aquí alineamos todo al centro para pantallas pequeñas */}
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full md:w-auto mb-6 md:mb-0 text-center md:text-left flex flex-row items-center">
            <img
              src="/props/logo_negro_h.svg" // Ruta de tu logotipo
              alt="Logo"
              className="w-10 h-10 mr-4" // Tamaño y margen para separar el logo del texto
            />
          </div>
          <nav className="w-full md:w-1/3 mb-6 md:mb-0 text-center md:text-right">
            <ul className="flex flex-wrap justify-center md:justify-end">
              {navigationLinks.map((link) => (
                <li key={link.href} className="mr-6 mb-2">
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="w-full md:w-1/3 flex justify-center md:justify-end">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 mr-4"
                aria-label={link.label}
              >
                <link.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>

        {/* Alineamos el texto del copyright al centro */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600">
            © {currentYear} {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
