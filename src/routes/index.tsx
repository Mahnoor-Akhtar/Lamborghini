import { createFileRoute } from "@tanstack/react-router";
import { ScrollVideo } from "@/components/ScrollVideo";
import { LuxuryNavbar } from "@/components/LuxuryNavbar";
import { ModelsSection } from "@/components/ModelsSection";
import { FullscreenVideo } from "@/components/FullscreenVideo";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Lamborghini – Power. Luxury. Legacy." },
      {
        name: "description",
        content: "Explore the Lamborghini lineup: Revuelto SV, Urus SE Performante, and Temerario.",
      },
    ],
  }),
});

function Index() {
  return (
    <>
      <div id="home">
        <LuxuryNavbar />
        <ScrollVideo src="/video.mp4" pixelsPerSecond={400} />
      </div>
      <ModelsSection />
      <FullscreenVideo src="/car.mp4" />
    </>
  );
}
