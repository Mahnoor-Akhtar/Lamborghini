import { useEffect, useRef, useState } from "react";

interface ScrollVideoProps {
  src: string;
  pixelsPerSecond?: number;
}

const DEFAULT_PIXELS_PER_SECOND = 400;

interface TextOverlay {
  time: number;
  duration: number;
  text: string;
  position: "center" | "left" | "right" | "center-lower";
  animationType: "zoom-fade" | "slide-left" | "slide-right" | "slide-up";
}

const TEXT_OVERLAYS: TextOverlay[] = [
  { time: 0, duration: 2, text: "Power. Luxury. Legacy.", position: "center", animationType: "zoom-fade" },
  { time: 2, duration: 2, text: "Experience the Thrill of a True Supercar", position: "left", animationType: "slide-left" },
  { time: 4, duration: 2, text: "Engineered for Speed. Designed to Impress.", position: "right", animationType: "slide-right" },
  { time: 6, duration: 2, text: "Own the Road. Own the Moment.", position: "center-lower", animationType: "slide-up" },
];

export function ScrollVideo({ src, pixelsPerSecond = DEFAULT_PIXELS_PER_SECOND }: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const targetTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visibleText, setVisibleText] = useState<TextOverlay | null>(null);

  const pxPerSecondRef = useRef(pixelsPerSecond);
  useEffect(() => {
    pxPerSecondRef.current = pixelsPerSecond;
  }, [pixelsPerSecond]);

  useEffect(() => {
    if (!spacerRef.current || !duration) return;
    spacerRef.current.style.height = `${duration * pxPerSecondRef.current}px`;
  }, [duration]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const markReady = () => {
      if (v.duration && Number.isFinite(v.duration)) {
        setDuration(v.duration);
        setReady(true);
      }
    };
    v.addEventListener("loadedmetadata", markReady);
    v.addEventListener("durationchange", markReady);
    v.addEventListener("canplay", markReady);
    if (v.readyState >= 1) markReady();
    return () => {
      v.removeEventListener("loadedmetadata", markReady);
      v.removeEventListener("durationchange", markReady);
      v.removeEventListener("canplay", markReady);
    };
  }, [src]);

  useEffect(() => {
    if (!ready || !duration) return;
    const v = videoRef.current!;
    v.pause();

    let seeking = false;
    const onSeeking = () => {
      seeking = true;
    };
    const onSeeked = () => {
      seeking = false;
    };
    v.addEventListener("seeking", onSeeking);
    v.addEventListener("seeked", onSeeked);

    const onScroll = () => {
      const y = window.scrollY;
      const pxPerSec = pxPerSecondRef.current;
      const videoTime = Math.min(duration, Math.max(0, y / pxPerSec));
      targetTimeRef.current = videoTime;
      setProgress(Math.min(1, videoTime / duration));
      const visible = TEXT_OVERLAYS.find((overlay) => videoTime >= overlay.time && videoTime < overlay.time + overlay.duration);
      setVisibleText(visible || null);
    };

    let lastTick = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - lastTick) / 1000);
      lastTick = now;
      if (!seeking) {
        const current = v.currentTime;
        const target = targetTimeRef.current;
        const diff = target - current;
        const next = current + diff * Math.min(1, dt * 8);
        const clamped = Math.min(duration, Math.max(0, next));
        if (Math.abs(clamped - current) > 0.01) {
          try {
            v.currentTime = clamped;
          } catch {
            // ignore
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    try {
      v.currentTime = 0;
    } catch {
      // ignore
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      v.removeEventListener("seeking", onSeeking);
      v.removeEventListener("seeked", onSeeked);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ready, duration]);

  const getPositionStyles = (position: TextOverlay["position"]): React.CSSProperties => {
    const baseStyle = {
      position: "fixed" as const,
      zIndex: 20,
      pointerEvents: "none" as const,
      boxSizing: "border-box" as const,
      padding: "0 4vw",
      maxHeight: "22vh",
      overflow: "hidden" as const,
    };

    switch (position) {
      case "center":
        return { ...baseStyle, top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "min(92vw, 56rem)", textAlign: "center" };
      case "left":
        return { ...baseStyle, top: "55%", left: "4vw", width: "min(88vw, 38rem)", textAlign: "left" };
      case "right":
        return { ...baseStyle, top: "55%", right: "4vw", width: "min(88vw, 38rem)", textAlign: "right" };
      case "center-lower":
        return { ...baseStyle, top: "65%", left: "50%", transform: "translateX(-50%)", width: "min(92vw, 56rem)", textAlign: "center" };
      default:
        return baseStyle;
    }
  };

  const overlayClass = (animationType: TextOverlay["animationType"]) => {
    switch (animationType) {
      case "zoom-fade":
        return "text-zoom-fade";
      case "slide-left":
        return "text-slide-left";
      case "slide-right":
        return "text-slide-right";
      case "slide-up":
        return "text-slide-up";
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        @keyframes zoomFadeIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }

        @keyframes slideLeftIn {
          from { opacity: 0; transform: translateX(-80px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideRightIn {
          from { opacity: 0; transform: translateX(80px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideUpIn {
          from { opacity: 0; transform: translateX(-50%) translateY(40px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .text-zoom-fade { animation: zoomFadeIn 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .text-slide-left { animation: slideLeftIn 1.2s ease-out forwards; }
        .text-slide-right { animation: slideRightIn 1.2s ease-out forwards; }
        .text-slide-up { animation: slideUpIn 1.2s ease-out forwards; }

        .luxury-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(22px, 4.8vw, 84px);
          font-weight: 800;
          letter-spacing: 2px;
          line-height: 1.08;
          text-transform: uppercase;
          color: #ffffff;
          text-shadow: 0 5px 25px rgba(0, 0, 0, 0.7);
          margin: 0;
          padding: 0;
          white-space: normal;
          overflow-wrap: anywhere;
          word-break: normal;
          text-wrap: balance;
        }

        @media (max-width: 640px) {
          .luxury-text {
            font-size: clamp(20px, 7vw, 34px);
            letter-spacing: 1px;
          }
        }
      `}</style>

      <div ref={spacerRef} aria-hidden="true" />
      <div className="fixed inset-0 z-0 bg-background">
        <video ref={videoRef} src={src} muted playsInline preload="auto" className="h-full w-full object-cover" />

        <div className="fixed inset-0 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7))" }} />

        {visibleText && (
          <h2
            className={`luxury-text ${overlayClass(visibleText.animationType)}`}
            style={getPositionStyles(visibleText.position)}
          >
            {visibleText.text}
          </h2>
        )}
      </div>
    </>
  );
}
