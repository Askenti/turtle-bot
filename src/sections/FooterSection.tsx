export default function FooterSection() {
  return (
    <footer className="bg-warden-teal-deep py-12 border-t border-warden-cyan/15 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-px bg-gradient-to-r from-transparent via-warden-cyan to-transparent" />

      <div className="max-w-[1200px] mx-auto px-6 text-center relative z-10">
        <div className="inline-block mb-4">
          <div className="font-serif text-xl text-warden-beige tracking-wider font-bold mb-1">
            WARDEN <span className="text-xs font-mono text-warden-cyan uppercase tracking-normal ml-1">Hotel</span>
          </div>
          <div className="h-px w-full bg-warden-cyan/30" />
        </div>
        <p className="text-warden-beige/60 text-sm mb-2">
          &copy; 2026 WARDEN Autonomous Security. All rights reserved.
        </p>
        <p className="text-xs font-mono text-warden-cyan-soft/50 uppercase tracking-[0.25em]">
          Inha University · IBT / ISE Capstone Design · Team 1 Spectra
        </p>
      </div>
    </footer>
  );
}
