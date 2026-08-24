import { useEffect, useState } from "react";
import CarGallery from "./CarGallery";

const MENU_ITEMS = [
  { label: "Models",      href: "#models" },
  { label: "Ownership",   href: "#" },
  { label: "Dealerships", href: "#" },
  { label: "Beyond",      href: "#" },
  { label: "Company",     href: "#" },
  { label: "Motorsport",  href: "#" },
  { label: "Museum",      href: "#" },
  { label: "Store",       href: "#" },
  { label: "News",        href: "#" },
];

/* ── Full-screen overlay menu ── */
function FullMenu({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;600;700&display=swap');

        .fm-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          background: #111;
          animation: fmFadeIn 0.25s ease forwards;
        }
        @keyframes fmFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* top bar */
        .fm-topbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 2rem;
          height: 64px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .fm-close-btn {
          display: flex; align-items: center; gap: 0.7rem;
          background: none; border: none; cursor: pointer; color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          padding: 0; transition: color 0.2s ease;
        }
        .fm-close-btn:hover { color: #c9a227; }
        .fm-close-btn svg { width: 1rem; height: 1rem; stroke: currentColor; }

        .fm-logo {
          position: absolute; left: 50%; transform: translateX(-50%);
          display: flex; align-items: center; justify-content: center;
        }
        .fm-logo svg { width: 38px; height: 38px; fill: #fff; }

        .fm-search-btn {
          background: none; border: none; cursor: pointer; color: #fff;
          padding: 0.4rem; transition: color 0.2s ease;
        }
        .fm-search-btn:hover { color: #c9a227; }
        .fm-search-btn svg { width: 1.2rem; height: 1.2rem; }

        /* grid */
        .fm-body {
          padding: 3.5rem 3rem 2.5rem;
          max-width: 1200px; margin: 0 auto;
        }

        .fm-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
        }

        .fm-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.5rem 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          text-decoration: none; color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.85rem, 1.5vw, 1rem);
          font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          transition: color 0.2s ease, background 0.2s ease;
          cursor: pointer;
        }
        .fm-item:hover { color: #c9a227; background: rgba(255,255,255,0.03); }

        .fm-item-arrow {
          flex-shrink: 0; margin-left: 0.5rem;
          display: flex; align-items: center;
        }
        .fm-item-arrow svg {
          width: 0.9rem; height: 0.9rem;
          stroke: currentColor;
          transition: transform 0.2s ease;
        }
        .fm-item:hover .fm-item-arrow svg { transform: translateX(3px); }

        /* column dividers */
        .fm-item:nth-child(3n+1) { padding-left: 0; }
        .fm-item:nth-child(3n)   { padding-right: 0; }
        .fm-col-divider-left  { border-left: 1px solid rgba(255,255,255,0.1); }
        .fm-col-divider-right { border-left: 1px solid rgba(255,255,255,0.1); }

        /* bottom rule */
        .fm-bottom-rule {
          max-width: 1200px; margin: 0 auto;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        /* stagger animation */
        .fm-item { opacity: 0; transform: translateY(12px); animation: fmItemIn 0.35s ease forwards; }
        ${MENU_ITEMS.map((_, i) => `.fm-item:nth-child(${i + 1}) { animation-delay: ${0.04 + i * 0.04}s; }`).join("\n")}
        @keyframes fmItemIn {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .fm-grid { grid-template-columns: repeat(2, 1fr); }
          .fm-col-divider-left, .fm-col-divider-right { border-left: none; }
          .fm-body { padding: 2.5rem 1.5rem; }
        }
        @media (max-width: 480px) {
          .fm-grid { grid-template-columns: 1fr; }
          .fm-topbar { padding: 0 1rem; }
        }
      `}</style>

      <div className="fm-backdrop" role="dialog" aria-modal="true" aria-label="Site navigation">
        {/* Top bar */}
        <div className="fm-topbar">
          <button className="fm-close-btn" onClick={onClose} aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Menu
          </button>

          {/* Lamborghini bull silhouette */}
          <div className="fm-logo" aria-hidden="true">
            <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 5 C35 5 22 14 17 27 C12 40 15 54 24 63 C18 70 14 80 15 91 C16 102 23 110 32 113 L32 105 C26 102 21 96 21 89 C21 79 28 71 36 68 C40 73 45 76 50 76 C55 76 60 73 64 68 C72 71 79 79 79 89 C79 96 74 102 68 105 L68 113 C77 110 84 102 85 91 C86 80 82 70 76 63 C85 54 88 40 83 27 C78 14 65 5 50 5 Z M50 15 C60 15 69 21 73 30 C77 39 74 50 67 56 C63 59 57 61 50 61 C43 61 37 59 33 56 C26 50 23 39 27 30 C31 21 40 15 50 15 Z M42 25 C38 27 36 31 37 35 C38 39 42 42 46 41 C48 41 50 40 50 40 C50 40 52 41 54 41 C58 42 62 39 63 35 C64 31 62 27 58 25 C55 23 51 24 50 26 C49 24 45 23 42 25 Z"/>
            </svg>
          </div>

          <button className="fm-search-btn" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        {/* Menu grid */}
        <div className="fm-body">
          <div className="fm-grid">
            {MENU_ITEMS.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                className={`fm-item ${i % 3 === 1 ? "fm-col-divider-left fm-col-divider-right" : i % 3 === 2 ? "fm-col-divider-left" : ""}`}
                onClick={onClose}
              >
                {item.label}
                <span className="fm-item-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
          <div className="fm-bottom-rule" />
        </div>
      </div>
    </>
  );
}

export function LuxuryNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => { setIsScrolled(window.scrollY > 80); };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@500;600;700&display=swap');

        .luxury-navbar {
          transition: background-color 0.3s ease, backdrop-filter 0.3s ease, padding 0.3s ease, box-shadow 0.3s ease, transform 0.5s ease, opacity 0.5s ease;
        }
        .luxury-navbar-enter { animation: navbarDropIn 0.7s ease-out both; }
        @keyframes navbarDropIn {
          from { opacity: 0; transform: translateY(-14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .nav-link {
          position: relative; color: #ffffff;
          text-transform: uppercase; letter-spacing: 0.14em;
          transition: color 0.3s ease;
        }
        .nav-link::after {
          content: ""; position: absolute; left: 0; bottom: -0.35rem;
          width: 100%; height: 1px; background: #c9a646;
          transform: scaleX(0); transform-origin: left; transition: transform 0.3s ease;
        }
        .nav-link:hover { color: #c9a646; }
        .nav-link:hover::after { transform: scaleX(1); }

        .nav-cta {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .nav-cta:hover {
          background: #ffffff; color: #000000; border-color: #ffffff;
          box-shadow: 0 10px 30px rgba(0,0,0,0.25); transform: translateY(-1px);
        }

        .nav-menu-btn {
          display: flex; align-items: center; gap: 0.5rem;
          background: none; border: none; cursor: pointer; color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          padding: 0.4rem 0.6rem;
          transition: color 0.2s ease;
        }
        .nav-menu-btn:hover { color: #c9a227; }
        .nav-menu-btn svg { width: 1.1rem; height: 1.1rem; }
      `}</style>

      {/* Fullscreen menu overlay */}
      {menuOpen && <FullMenu onClose={() => setMenuOpen(false)} />}

      <header
        className={`luxury-navbar ${isMounted ? "luxury-navbar-enter" : ""} fixed inset-x-0 top-0 z-50 w-full ${
          isScrolled ? "bg-black/60 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.18)]" : "bg-transparent"
        }`}
      >
        <div className={`mx-auto flex w-full max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-[60px] ${isScrolled ? "py-3" : "py-5"}`}>

          {/* MENU trigger */}
          <button
            className="nav-menu-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="3" y1="6"  x2="21" y2="6"  />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            Menu
          </button>

          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 text-white absolute left-1/2 -translate-x-1/2" aria-label="Lamborghini home">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-white/5 backdrop-blur-sm">
              <span className="font-['Bebas_Neue'] text-xl leading-none tracking-[0.16em] text-white">L</span>
            </div>
            <span className="hidden font-['Montserrat'] text-sm font-semibold uppercase tracking-[0.28em] text-white/95 md:block">
              Lamborghini
            </span>
          </a>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setGalleryOpen(true)}
              className="nav-cta inline-flex items-center justify-center rounded-full border border-white/80 bg-transparent px-5 py-2.5 font-['Montserrat'] text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-white"
            >
              Book Now
            </button>
          </div>
        </div>
      </header>

      <CarGallery open={galleryOpen} onClose={() => setGalleryOpen(false)} />
    </>
  );
}