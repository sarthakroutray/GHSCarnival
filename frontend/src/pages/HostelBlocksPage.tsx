import { useState } from "react";

const blocks = [
  "B1",
  "B2",
  "B3",
  "B4",
  "B5",
  "B6",
  "B7",
  "B8",
  "B9",
  "B10",
  "B11",
  "B12",
];

export default function HostelBlocksPage(): JSX.Element {
  const [openBlock, setOpenBlock] = useState<string | null>(null);

  return (
    <div className="relative h-[100dvh] overflow-hidden bg-[#f3efe9]">
      <img
        src="/Background.png"
        alt=""
        aria-hidden
        className="absolute top-0 left-0 w-full h-auto z-0"
      />
      <div className="absolute inset-0 bg-[#f3efe9]/70 z-0" />

      <div className="relative z-10 flex flex-col items-center pt-6 pb-4">
        <img
          src="/ghs_carnival_logo.png"
          alt="GHS Carnival"
          className="h-20 object-contain"
        />

        <p
          className="
            mt-2 mb-2 text-lg font-medium tracking-[0.3em] text-center
            bg-gradient-to-r from-[#e6b980] to-[#c78bf4]
            bg-clip-text text-transparent
          "
        >
          BLOCK CAPTAINS
        </p>
      </div>

      <div
        className="
          relative z-10
          h-[calc(100dvh-176px)]
          overflow-y-auto overscroll-contain
          px-4 pb-24
        "
      >
        <div className="max-w-[390px] mx-auto space-y-4">
          {blocks.map((block) => {
            const isOpen = openBlock === block;

            return (
              <div
                key={block}
                className={`rounded-3xl transition-all duration-500 min-h-[90px] ease-in-out
                  ${
                    isOpen
                      ? "bg-[#fbf8f3] shadow-lg shadow-[#e7d4b1]/40"
                      : "bg-[#e6e4de]"
                  }`}
              >
                <button
                  onClick={() => setOpenBlock(isOpen ? null : block)}
                  className="w-full flex justify-between px-4 py-3 text-left"
                >
                  <span
                    className={`font-carnival transition-all duration-500
                      ${
                        isOpen
                          ? "text-3xl font-semibold text-[#3f352a] translate-y-3"
                          : "text-3xl font-medium text-[#7a7267]"
                      }`}
                  >
                    {block}
                  </span>

                  <span
                    className={`transition-transform duration-500 text-[#7a7267]
                      ${isOpen ? "rotate-180" : ""}`}
                  >
                    ⌄
                  </span>
                </button>

                <div
                  className={`
    px-4 overflow-hidden transition-all duration-500 ease-in-out
    ${isOpen ? "max-h-40 opacity-100 pb-4" : "max-h-0 opacity-0 pb-0"}
  `}
                >
                  <p className="font-carnival text-[22px] leading-tight text-[#d18b47]">
                    NAME
                  </p>
                  <p className="font-carnival text-[22px] leading-tight text-[#d18b47]">
                    SURNAME
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
