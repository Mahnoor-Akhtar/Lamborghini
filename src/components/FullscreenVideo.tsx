import { useEffect, useRef } from "react";

interface FullscreenVideoProps {
  src: string;
}

export function FullscreenVideo({ src }: FullscreenVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  /* Auto-play when section is >=50% visible, pause when not */
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .fv-section {
          position: relative;
          /* dvh = dynamic viewport height - accounts for mobile browser chrome */
          width: 100%;
          height: 100vh;
          height: 100dvh;
          background: #000;
          overflow: hidden;
          /* prevent any horizontal bleed */
          max-width: 100vw;
          box-sizing: border-box;
        }

        .fv-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        .fv-vignette {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 25%, transparent 70%, rgba(0,0,0,0.55) 100%);
          pointer-events: none;
          z-index: 1;
        }

        /* Portrait phones: shift focus to centre of frame */
        @media (max-width: 480px) and (orientation: portrait) {
          .fv-video {
            object-position: 60% center;
          }
        }

        /* Short landscape viewports (phones on side) */
        @media (max-height: 500px) and (orientation: landscape) {
          .fv-section {
            height: 100svh;
          }
        }
      `}</style>

      <section ref={sectionRef} id="car-video" className="fv-section">
        <video
          ref={videoRef}
          src={src}
          className="fv-video"
          muted
          playsInline
          loop
          preload="metadata"
        />
        <div className="fv-vignette" />
      </section>
    </>
  );
}
