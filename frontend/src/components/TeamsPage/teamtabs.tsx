import { useState } from "react";

type TabId = "all" | "core" | "tech" | "events" | "design" | "marketing";

type TeamTabsProps = {
  onTabChange?: (id: TabId) => void;
};

const tabs: { id: TabId; label: string; activeColor: string }[] = [
  { id: "all", label: "All", activeColor:"bg-[#febc88] text-white"},
  { id: "core", label: "Core" , activeColor:"bg-[#e7b39f] text-white"},
  { id: "tech", label: "Tech", activeColor:"bg-[#cfa7b8]   text-white" },
  { id: "events", label: "Events" , activeColor:"bg-[#bc9ecd] text-white"},
  { id: "design", label: "Design" , activeColor:"bg-[#a594e4] text-white"},
  { id: "marketing", label: "Marketing", activeColor:"bg-[#8e89fd] text-white" },
];

export default function TeamTabs({ onTabChange }: TeamTabsProps) {
  const [activeTab, setActiveTab] = useState("all");

  const handleClick = (id: TabId) => {
    setActiveTab(id);
    onTabChange?.(id);
  };

  return (
    <div className="w-full mb-5 ">
      <div className="flex flex-nowrap overflow-x-auto [&::-webkit-scrollbar]:hidden gap-4 md:gap-20 px-0 py-1 mb-10 md:mb-24 md:justify-center
    md:overflow-visible">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleClick(tab.id)}
            className={`
              px-4 py-2 rounded-full whitespace-nowrap transition-colors text-sm md:text-base md:px-5 md:py-2.5 md:text-lg
        ${activeTab===tab.id ? tab.activeColor : "bg-[#C0C0C0] text-gray-800"}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
