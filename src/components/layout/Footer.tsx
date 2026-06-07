import Link from"next/link";
import { Container } from"@/components/ui/Container";
import { Calculator, Mail } from"lucide-react";
import { categories } from"@/data/categories";

const footerLinks = {
 calculators: [
 { href:"/calculators", label:"Alle calculators" },
 ...categories.map((cat) => ({
 href: `/${cat.slug}`,
 label: cat.title,
 })),
 ],
 legal: [
 { href:"/privacy", label:"Privacybeleid" },
 { href:"/cookies", label:"Cookieverklaring" },
 { href:"/disclaimer", label:"Disclaimer" },
 ],
 general: [
 { href:"/contact", label:"Contact & Vragen" },
 ],
};

export function Footer() {
 const currentYear = new Date().getFullYear();

 return (
 <footer className="border-t border-gray-200 bg-gray-50 mt-16">
 <Container>
 <div className="py-12">
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
 {/* Column 1: Brand & About */}
 <div className="sm:col-span-2 md:col-span-1">
 <Link
 href="/"
 className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-3"
 >
 <Calculator className="h-5 w-5 text-blue-600" />
 <span>
 Reken<span className="text-blue-600">het</span>
 <span className="text-gray-400 font-normal">.nl</span>
 </span>
 </Link>
 <p className="text-sm text-slate-500 leading-relaxed mb-4">
 Rekenhet.nl is het moderne, onafhankelijke rekenplatform voor
 Nederland. Gratis online calculators voor werk, hypotheek, geld,
 gezondheid, auto, ondernemen en wiskunde — snel, betrouwbaar
 en zonder registratie.
 </p>
 <Link
 href="/contact"
 className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors :text-blue-300"
 >
 <Mail className="h-3.5 w-3.5" />
 Neem contact op
 </Link>
 </div>

 {/* Column 2: Calculator clusters */}
 <div>
 <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
 Calculators
 </h3>
 <nav aria-label="Calculator categorieën">
 <ul className="space-y-2.5">
 {footerLinks.calculators.map((link) => (
 <li key={link.href}>
 <Link
 href={link.href}
 className="text-sm text-slate-500 hover:text-gray-700 transition-colors :text-slate-200"
 >
 {link.label}
 </Link>
 </li>
 ))}
 </ul>
 </nav>
 </div>

 {/* Column 3: Legal compliance (AdSense vital) */}
 <div>
 <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
 Juridisch
 </h3>
 <nav aria-label="Juridische pagina's">
 <ul className="space-y-2.5">
 {footerLinks.legal.map((link) => (
 <li key={link.href}>
 <Link
 href={link.href}
 className="text-sm text-slate-500 hover:text-gray-700 transition-colors :text-slate-200"
 >
 {link.label}
 </Link>
 </li>
 ))}
 </ul>
 </nav>
 </div>

 {/* Column 4: Admin + dynamic year */}
 <div>
 <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
 Over Rekenhet
 </h3>
 <nav aria-label="Informatie">
 <ul className="space-y-2.5">
 {footerLinks.general.map((link) => (
 <li key={link.href}>
 <Link
 href={link.href}
 className="text-sm text-slate-500 hover:text-gray-700 transition-colors :text-slate-200"
 >
 {link.label}
 </Link>
 </li>
 ))}
 <li className="pt-2">
 <p className="text-sm text-slate-400">
 &copy; {currentYear} Rekenhet.nl
 </p>
 </li>
 </ul>
 </nav>
 </div>
 </div>

 {/* Bottom bar */}
 <div className="mt-10 pt-6 border-t border-gray-200 text-center">
 <p className="text-xs text-slate-400 leading-relaxed">
 &copy; {currentYear} Rekenhet.nl &mdash; Gratis online calculators.
 Alle rechten voorbehouden. Er kunnen geen rechten worden ontleend
 aan de uitkomsten van deze calculators.
 </p>
 </div>
 </div>
 </Container>
 </footer>
 );
}
