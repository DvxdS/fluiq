export const Footer = () => {
  return (
    <footer className="py-8 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <p className="text-sm text-gray-600">
          Made with ❤️ in Abidjan, Cote d'Ivoire
        </p>
        <p className="text-xs text-gray-400 mt-2">
          © {new Date().getFullYear()} Fluiq by NIMBAA
        </p>
      </div>
    </footer>
  );
};
