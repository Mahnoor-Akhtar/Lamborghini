import React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  images?: string[];
};

const defaultImages = [
  "/images/lamborghini - Search Images_files/2024-lamborghini-revuelto-front-three-quarters-102-6421b7db0d727.jpg",
  "/images/lamborghini - Search Images_files/lamborghini-revuelto-at-auto-shanghai-2023.jpg",
  "/images/lamborghini - Search Images_files/b0FwJOyobV6NnXq4XV6y--Iohrc.png",
  "/images/lamborghini - Search Images_files/Flag_Feedback.png",
];

export default function CarGallery({ open, onClose, images }: Props) {
  if (!open) return null;

  const list = images && images.length ? images : defaultImages;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative z-10 max-h-[85vh] w-[92vw] max-w-4xl overflow-auto rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Choose a car</h3>
          <button
            onClick={onClose}
            className="ml-4 rounded bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
            aria-label="Close gallery"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((src, idx) => (
            <div key={idx} className="overflow-hidden rounded-lg bg-gray-50">
              <img
                src={encodeURI(src)}
                alt={`car-${idx}`}
                className="h-44 w-full object-cover transition-transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
