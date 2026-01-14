import { useState } from "react";
import NavBar from "../components/NavBar";

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
const blockData: Record<string, { firstName: string; lastName: string }> = {
  B1: { firstName: "JAI", lastName: "RATNA" },
  B2: { firstName: "ARJUN", lastName: "SINGH" },
  B3: { firstName: "ROHAN", lastName: "MEHTA" },
  B4: { firstName: "ADITYA", lastName: "VERMA" },
  B5: { firstName: "KARAN", lastName: "SHARMA" },
  B6: { firstName: "MOHIT", lastName: "GUPTA" },
  B7: { firstName: "AMAN", lastName: "JAIN" },
  B8: { firstName: "RAHUL", lastName: "AGRAWAL" },
  B9: { firstName: "NIKHIL", lastName: "KHANNA" },
  B10: { firstName: "SIDDHARTH", lastName: "MALIK" },
  B11: { firstName: "ANMOL", lastName: "BANSAL" },
  B12: { firstName: "DEV", lastName: "PATEL" },
};

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
            mt-2 mb-2 text-xl font-medium tracking-[0.3em] text-center
            bg-gradient-to-r from-[#e6b980] to-[#c78bf4]
            bg-clip-text text-transparent font-heading
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
                className={`rounded-3xl transition-all duration-1000 min-h-[90px] ease-in-out
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
                    className={`font-carnival transition-all duration-500 ease-in
                      ${
                        isOpen
                          ? "text-2xl text-[#3f352a] translate-y-3"
                          : "text-3xl font-medium text-[#7a7267] font-heading"
                      }`}
                  >
                    {block}
                  </span>

                  <span
                    className={`transition-transform duration-1000 text-[#7a7267]
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
                  <p className="font-body text-[18px] leading-tight text-[#d18b47]">
                    {blockData[block].firstName}
                  </p>
                  <p className="font-body text-[18px] leading-tight text-[#d18b47]">
                    {blockData[block].lastName}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <NavBar />
    </div>
  );
}
