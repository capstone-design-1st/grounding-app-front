import React, { useState } from "react";
import "./styles.css";

interface TabProps {
  tabs: {
    label: string;
    content: JSX.Element;
  }[];
}

const Tab: React.FC<TabProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].label);

  const handleClick = (label: string) => {
    setActiveTab(label);
  };

  return (
    <div>
      <div className="tabList">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tabItem ${tab.label === activeTab ? "active" : ""}`}
            onClick={() => handleClick(tab.label)}
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
