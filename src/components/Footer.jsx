const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 pb-6 md:pb-10">
        <div className="h-[2px] bg-gray-900 mb-6"></div>

        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="flex flex-col items-center gap-4 text-center">
            <img src="/thaalam.png" alt="logo" className="w-20 h-auto" />

            <div className="flex  gap-6 justify-center">
              <a
                href="https://thaalam.ch/privacy-policy"
                className="text-xs uppercase tracking-[0.05em] text-gray-700 hover:text-red-600 transition-colors"
              >
                Privacy
              </a>
              <a
                href="https://thaalam.ch/terms-conditions"
                className="text-xs uppercase tracking-[0.05em] text-gray-700 hover:text-red-600 transition-colors"
              >
                Terms
              </a>
              <a
                href="https://thaalam.ch/contact-us"
                className="text-xs uppercase tracking-[0.05em] text-gray-700 hover:text-red-600 transition-colors"
              >
                Contact
              </a>
            </div>

            <span className="text-xs text-gray-700">
              © {year} Thaalam Radio Station. All rights reserved.
            </span>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-3">
            <img src="/thaalam.png" alt="logo" className="w-20 h-auto" />
          </div>

          <span className="text-sm text-gray-700 flex-1">
            © {year} Thaalam Radio Station. All rights reserved.
          </span>

          <div className="flex gap-5">
            <a
              href="https://thaalam.ch/privacy-policy"
              className="text-sm uppercase tracking-[0.05em] text-gray-700 hover:text-red-600 transition-colors"
            >
              Privacy
            </a>
            <a
              href="https://thaalam.ch/terms-conditions"
              className="text-sm uppercase tracking-[0.05em] text-gray-700 hover:text-red-600 transition-colors"
            >
              Terms
            </a>
            <a
              href="https://thaalam.ch/contact-us"
              className="text-sm uppercase tracking-[0.05em] text-gray-700 hover:text-red-600 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
