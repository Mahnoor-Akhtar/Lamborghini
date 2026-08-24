import { useEffect, useRef, useState } from "react";

interface CarModel {
  id: string;
  badge: string;
  name: string;
  tagline: string;
  image: string;
  exploreUrl: string;
  configureUrl: string;
  specs: { label: string; value: string }[];
  description: string;
}

const MODELS: CarModel[] = [
  {
    id: "revuelto-sv",
    badge: "Revuelto SV",
    name: "Revuelto",
    tagline: "The pinnacle of Lamborghini engineering",
    image: "/images/revuelto.jpg",
    exploreUrl: "https://www.lamborghini.com/en-en/models/revuelto-models/revuelto-sv",
    configureUrl: "https://configurator.lamborghini.com/configurator/model/32006-20111/MBV-21717-2027",
    description:
      "The Revuelto is the first Lamborghini V12 hybrid super sports car — a masterpiece of performance and innovation. Its naturally-aspirated 6.5L V12 paired with three electric motors delivers an unprecedented driving experience, blending raw power with cutting-edge hybrid technology.",
    specs: [
      { label: "Engine", value: "6.5L V12 + 3 Electric Motors" },
      { label: "Total Power", value: "1,001 HP" },
      { label: "0–100 km/h", value: "2.5 sec" },
      { label: "Top Speed", value: "350+ km/h" },
      { label: "Transmission", value: "8-speed DCT" },
      { label: "Drive", value: "AWD (Hybrid)" },
      { label: "CO₂ (Hybrid)", value: "350 g/km" },
      { label: "Fuel Consumption", value: "15 l/100km" },
    ],
  },
  {
    id: "urus-se",
    badge: "Urus at its peak",
    name: "Urus SE Performante",
    tagline: "Urus SE",
    image: "/images/urus.jpg",
    exploreUrl: "https://www.lamborghini.com/en-en/models/urus/urus-se-performante",
    configureUrl: "https://configurator.lamborghini.com/configurator/model/32005-20111/MBV-24727-2027",
    description:
      "The Urus SE Performante is the ultimate expression of the Super SUV. Combining a twin-turbocharged V8 with a plug-in hybrid system, it pushes the boundaries of what an SUV can be — delivering supercar performance with everyday usability.",
    specs: [
      { label: "Engine", value: "4.0L Twin-Turbo V8 PHEV" },
      { label: "Total Power", value: "800 HP" },
      { label: "0–100 km/h", value: "3.4 sec" },
      { label: "Top Speed", value: "312 km/h" },
      { label: "Transmission", value: "8-speed Automatic" },
      { label: "Drive", value: "AWD" },
      { label: "Electric Range", value: "~60 km" },
      { label: "Torque", value: "950 Nm" },
    ],
  },
  {
    id: "temerario",
    badge: "You can't hide who you are",
    name: "Temerario",
    tagline: "The future of Lamborghini",
    image: "/images/temerario.jpg",
    exploreUrl: "https://www.lamborghini.com/en-en/models/temerario",
    configureUrl: "https://configurator.lamborghini.com/configurator/model/32007-20111/MBV-20007-2027",
    description:
      "The Temerario is Lamborghini's next-generation mid-engine super sports car — the successor to the iconic Huracán. Powered by a high-revving twin-turbo V8 hybrid, it represents a bold new era of Italian performance and design.",
    specs: [
      { label: "Engine", value: "4.0L Twin-Turbo V8 + 3 EM" },
      { label: "Total Power", value: "920 HP" },
      { label: "0–100 km/h", value: "2.7 sec" },
      { label: "Top Speed", value: "340+ km/h" },
      { label: "Transmission", value: "8-speed DCT" },
      { label: "Drive", value: "AWD (Hybrid)" },
      { label: "Rev Limit", value: "10,000 RPM" },
      { label: "Weight", value: "1,690 kg" },
    ],
  },
];

const DISCLAIMER =
  "Revuelto: Combined energy consumption: 4,7 kWh/100 Km plus 15 l/100km; Combined CO2 emissions: 350 g/km; Combined CO2 efficiency class: G; Combined fuel consumption with discharged battery: 17,9 l/100km; CO2 class with discharged battery: G; Revuelto SV: Under approval, not available for sale";

/* ─── Car Detail Modal ─────────────────────────────────────── */
function CarModal({ model, onClose }: { model: CarModel; onClose: () => void }) {
  /* Close on Escape */
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
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${model.name} details`}
    >
      <div
        className="modal-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Hero image */}
        <div className="modal-image-wrap">
          <img src={model.image} alt={model.name} className="modal-image" />
          <div className="modal-image-overlay" />
          <span className="modal-badge">{model.badge}</span>
        </div>

        {/* Details pane */}
        <div className="modal-details">
          <h2 className="modal-name">{model.name}</h2>
          <p className="modal-description">{model.description}</p>

          {/* Spec grid */}
          <div className="modal-specs">
            {model.specs.map((s) => (
              <div key={s.label} className="modal-spec-item">
                <span className="modal-spec-label">{s.label}</span>
                <span className="modal-spec-value">{s.value}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="modal-actions">
            <a href={model.exploreUrl} target="_blank" rel="noopener noreferrer" className="car-btn car-btn-primary">
              Explore the model
            </a>
            <a href={model.configureUrl} target="_blank" rel="noopener noreferrer" className="car-btn car-btn-secondary">
              Start configuration
            </a>
            <button className="car-btn car-btn-ghost">Enquire</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Car Card ─────────────────────────────────────────────── */
function CarCard({ model, index, onOpen }: { model: CarModel; index: number; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="car-card"
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpen(); }}
      aria-label={`View ${model.name} details`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(60px)",
        transition: `opacity 0.8s ease ${index * 0.18}s, transform 0.8s ease ${index * 0.18}s`,
        cursor: "pointer",
      }}
    >
      <div className="car-card-image-wrap">
        <img src={model.image} alt={model.name} className="car-card-image" loading="lazy" />
        <div className="car-card-overlay" />
        <span className="car-card-badge">{model.badge}</span>
        {/* "View Details" hint on hover */}
        <div className="car-card-hint">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          View Details
        </div>
      </div>
      <div className="car-card-content">
        <h2 className="car-card-name">{model.name}</h2>
        <p className="car-card-tagline">{model.tagline}</p>
        <div className="car-card-actions" onClick={(e) => e.stopPropagation()}>
          <a href={model.exploreUrl} target="_blank" rel="noopener noreferrer" className="car-btn car-btn-primary">
            Explore the model
          </a>
          <a href={model.configureUrl} target="_blank" rel="noopener noreferrer" className="car-btn car-btn-secondary">
            Start configuration
          </a>
          <button className="car-btn car-btn-ghost">Enquire</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Models Section ───────────────────────────────────────── */
export function ModelsSection() {
  const [activeModel, setActiveModel] = useState<CarModel | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap');

        /* ── Section ── */
        .models-section {
          position: relative;
          background: #000;
          min-height: 100vh;
          padding: 7rem 2rem 4rem;
          overflow: hidden;
        }
        .models-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(180,130,0,0.13) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── Header ── */
        .models-header { text-align: center; margin-bottom: 5rem; }
        .models-header-eyebrow {
          display: inline-block;
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: #c9a227; margin-bottom: 1.1rem;
        }
        .models-header-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.8rem, 7vw, 6rem); font-weight: 400;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: #fff; margin: 0; line-height: 1;
        }
        .models-header-line {
          width: 60px; height: 2px;
          background: linear-gradient(90deg, transparent, #c9a227, transparent);
          margin: 1.6rem auto 0;
        }

        /* ── Grid ── */
        .models-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(340px, 100%), 1fr));
          gap: 2rem; max-width: 1320px; margin: 0 auto;
        }

        /* ── Card ── */
        .car-card {
          position: relative; background: #0d0d0d;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 4px; overflow: hidden;
          display: flex; flex-direction: column;
          will-change: opacity, transform;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .car-card:hover {
          border-color: rgba(201,162,39,0.5);
          box-shadow: 0 0 40px rgba(201,162,39,0.1), 0 20px 60px rgba(0,0,0,0.6);
        }
        .car-card-image-wrap { position: relative; aspect-ratio: 16/9; overflow: hidden; }
        .car-card-image {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .car-card:hover .car-card-image { transform: scale(1.06); }
        .car-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85) 100%);
        }
        .car-card-badge {
          position: absolute; top: 1.1rem; left: 1.2rem;
          font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #c9a227; background: rgba(0,0,0,0.55);
          backdrop-filter: blur(8px); border: 1px solid rgba(201,162,39,0.35);
          padding: 0.28rem 0.75rem; border-radius: 2px;
        }
        /* hover hint */
        .car-card-hint {
          position: absolute; bottom: 1rem; right: 1.2rem;
          display: flex; align-items: center; gap: 0.4rem;
          font-family: 'Inter', sans-serif; font-size: 0.68rem;
          font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.85);
          background: rgba(0,0,0,0.5); backdrop-filter: blur(10px);
          border: 1px solid rgba(201,162,39,0.3);
          padding: 0.35rem 0.8rem; border-radius: 2px;
          opacity: 0; transform: translateY(6px);
          transition: opacity 0.25s ease, transform 0.25s ease;
          pointer-events: none;
        }
        .car-card:hover .car-card-hint { opacity: 1; transform: translateY(0); }

        .car-card-content {
          padding: 1.8rem 1.8rem 2rem;
          display: flex; flex-direction: column; gap: 0.6rem; flex: 1;
        }
        .car-card-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 400;
          letter-spacing: 0.05em; text-transform: uppercase;
          color: #fff; margin: 0; line-height: 1;
        }
        .car-card-tagline {
          font-family: 'Inter', sans-serif; font-size: 0.82rem;
          color: rgba(255,255,255,0.45); margin: 0 0 0.6rem; letter-spacing: 0.02em;
        }
        .car-card-actions { display: flex; flex-wrap: wrap; gap: 0.7rem; margin-top: auto; padding-top: 0.6rem; }

        /* ── Buttons ── */
        .car-btn {
          font-family: 'Inter', sans-serif; font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0.62rem 1.3rem; border-radius: 2px; cursor: pointer;
          text-decoration: none; display: inline-block;
          transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          border: 1px solid transparent; line-height: 1; white-space: nowrap;
        }
        .car-btn-primary { background: #c9a227; color: #000; border-color: #c9a227; }
        .car-btn-primary:hover { background: #e2b82a; box-shadow: 0 0 20px rgba(201,162,39,0.4); }
        .car-btn-secondary { background: transparent; color: #fff; border-color: rgba(255,255,255,0.35); }
        .car-btn-secondary:hover { border-color: #c9a227; color: #c9a227; }
        .car-btn-ghost { background: transparent; color: rgba(255,255,255,0.55); padding-left: 0; padding-right: 0; }
        .car-btn-ghost:hover { color: #fff; }

        /* ── Disclaimer ── */
        .models-disclaimer {
          max-width: 1320px; margin: 4rem auto 0; padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.08);
          font-family: 'Inter', sans-serif; font-size: 0.65rem;
          color: rgba(255,255,255,0.3); line-height: 1.7; letter-spacing: 0.01em;
        }

        /* ── Modal Backdrop ── */
        .modal-backdrop {
          position: fixed; inset: 0; z-index: 9000;
          background: rgba(0,0,0,0.82);
          backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center;
          padding: 1.5rem;
          animation: modalFadeIn 0.3s ease forwards;
        }
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* ── Modal Panel ── */
        .modal-panel {
          position: relative;
          background: #0a0a0a;
          border: 1px solid rgba(201,162,39,0.25);
          border-radius: 6px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1100px;
          width: 100%;
          max-height: 90vh;
          overflow: hidden;
          animation: modalSlideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          box-shadow: 0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,162,39,0.12);
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: scale(0.94) translateY(30px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* ── Modal Close ── */
        .modal-close {
          position: absolute; top: 1.1rem; right: 1.1rem; z-index: 10;
          width: 2.4rem; height: 2.4rem;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.15); border-radius: 50%;
          color: #fff; cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
        }
        .modal-close:hover { background: rgba(201,162,39,0.2); border-color: #c9a227; transform: scale(1.1); }
        .modal-close svg { width: 1rem; height: 1rem; }

        /* ── Modal Image ── */
        .modal-image-wrap { position: relative; overflow: hidden; min-height: 320px; }
        .modal-image { width: 100%; height: 100%; object-fit: cover; display: block; }
        .modal-image-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to right, transparent 60%, rgba(0,0,0,0.6) 100%),
                      linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5) 100%);
        }
        .modal-badge {
          position: absolute; top: 1.2rem; left: 1.4rem;
          font-family: 'Inter', sans-serif; font-size: 0.62rem; font-weight: 600;
          letter-spacing: 0.25em; text-transform: uppercase; color: #c9a227;
          background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
          border: 1px solid rgba(201,162,39,0.4); padding: 0.3rem 0.85rem; border-radius: 2px;
        }

        /* ── Modal Details ── */
        .modal-details {
          padding: 2.5rem 2.2rem 2rem;
          overflow-y: auto;
          display: flex; flex-direction: column; gap: 1.2rem;
          scrollbar-width: thin; scrollbar-color: rgba(201,162,39,0.3) transparent;
        }
        .modal-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.4rem, 5vw, 3.6rem); font-weight: 400;
          letter-spacing: 0.05em; text-transform: uppercase;
          color: #fff; margin: 0; line-height: 1;
        }
        .modal-description {
          font-family: 'Inter', sans-serif; font-size: 0.88rem; font-weight: 400;
          color: rgba(255,255,255,0.6); line-height: 1.7; margin: 0;
        }

        /* ── Specs grid ── */
        .modal-specs {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0;
          border: 1px solid rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden;
        }
        .modal-spec-item {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex; flex-direction: column; gap: 0.2rem;
        }
        .modal-spec-item:nth-child(even) { border-right: none; }
        .modal-spec-item:nth-last-child(-n+2) { border-bottom: none; }
        .modal-spec-label {
          font-family: 'Inter', sans-serif; font-size: 0.6rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase; color: #c9a227;
        }
        .modal-spec-value {
          font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 500;
          color: #fff; letter-spacing: 0.02em;
        }

        /* ── Modal Actions ── */
        .modal-actions { display: flex; flex-wrap: wrap; gap: 0.7rem; margin-top: auto; padding-top: 0.4rem; }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .modal-panel { grid-template-columns: 1fr; max-height: 92vh; }
          .modal-image-wrap { min-height: 220px; max-height: 40vh; }
          .modal-details { padding: 1.6rem 1.4rem 1.6rem; }
          .modal-specs { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .models-section { padding: 5rem 1rem 3rem; }
          .models-grid { gap: 1.5rem; }
          .car-card-content { padding: 1.4rem 1.4rem 1.6rem; }
          .modal-backdrop { padding: 0.5rem; }
          .modal-panel { border-radius: 4px; }
          .modal-specs { grid-template-columns: 1fr; }
          .modal-spec-item { border-right: none !important; }
          .modal-spec-item:nth-last-child(-n+2) { border-bottom: 1px solid rgba(255,255,255,0.06); }
          .modal-spec-item:last-child { border-bottom: none; }
        }
      `}</style>

      {/* Modal */}
      {activeModel && (
        <CarModal model={activeModel} onClose={() => setActiveModel(null)} />
      )}

      <section id="models" className="models-section">
        <div className="models-header">
          <span className="models-header-eyebrow">Our Lineup</span>
          <h1 className="models-header-title">Choose Your Legend</h1>
          <div className="models-header-line" />
        </div>

        <div className="models-grid">
          {MODELS.map((model, i) => (
            <CarCard
              key={model.id}
              model={model}
              index={i}
              onOpen={() => setActiveModel(model)}
            />
          ))}
        </div>

        <p className="models-disclaimer">{DISCLAIMER}</p>
      </section>
    </>
  );
}

