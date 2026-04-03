export function Footer() {
  return (
    <footer className="relative border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-display text-2xl tracking-wider text-text-primary">
              TEMPO TRADES
            </span>
            <p className="text-sm text-text-muted mt-1">
              Master ICT. Trade with confidence.
            </p>
          </div>

          <div className="flex items-center gap-8">
            <a
              href="https://whop.com/c/tempotrades/claim"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              Whop
            </a>
            <a
              href="#"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              Discord
            </a>
            <a
              href="#"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              Terms
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Tempo Trades. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
