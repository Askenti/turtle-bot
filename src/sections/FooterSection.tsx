export default function FooterSection() {
  return (
    <footer
      id="footer"
      className="relative bg-spectra-cream border-t border-spectra-hairline py-16 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-8 items-end">

          <div className="col-span-12 md:col-span-7">
            <p className="font-editorial italic text-spectra-ink leading-[1.25] tracking-tight"
               style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
              WARDEN — Smart Hotel Ecosystem.
            </p>
            <p className="mt-4 max-w-md text-[14px] leading-[1.65] text-spectra-ink-mute">
              AI-powered autonomous hospitality platform focused on privacy,
              operational intelligence, and trusted guest experiences.
            </p>
          </div>

          <div className="col-span-12 md:col-span-5 flex md:justify-end">
            <div className="font-mono text-[10px] tracking-[0.35em] uppercase text-spectra-ink-faint leading-[2]">
              <p>© 2026 Spectra · Team 1</p>
              <p>
                <a
                  href="https://www.instagram.com/warden_spectra/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WARDEN on Instagram"
                  className="inline-flex items-center gap-2 hover:text-spectra-ink transition-colors duration-300"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                  @warden_spectra
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
