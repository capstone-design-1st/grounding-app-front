import React, { useState } from "react";
import "./styles.css";

interface TabProps {
  tabs: {
    label: string;
    content: JSX.Element;
  }[];
  width?: string;
}

const Tab: React.FC<TabProps> = ({ tabs, width }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].label);

  const handleClick = (label: string) => {
    setActiveTab(label);
  };

  return (
    <div>
      <div className="tabList" style={width ? { width: width } : {}}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tabItem ${tab.label === activeTab ? "active" : ""}`}
            onClick={() => handleClick(tab.label)}
            style={{
              width: `${100 / tabs.length}%`,
              borderBottomColor:
                tab.label === "매수" && tab.label === activeTab
                  ? "var(--red)"
                  : tab.label === "매도" && tab.label === activeTab
                  ? "var(--blue)"
                  : undefined,

              color:
                tab.label === "매수" && tab.label === activeTab
                  ? "var(--red)"
                  : tab.label === "매도" && tab.label === activeTab
                  ? "var(--blue)"
                  : undefined,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => {
        if (tab.label === activeTab) {
          return (
            <div key={index} className="tabPanel active">
              {tab.content}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Tab;
