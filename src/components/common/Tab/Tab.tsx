import React, { useState } from "react";
import "./styles.css";

interface TabProps {
  tabs: {
    label: string;
    content: JSX.Element;
  }[];
  active?: string; // 현재 활성화된 탭 상태
  onTabChange?: () => void;
  width?: string;
  padding?: string;
}

const Tab: React.FC<TabProps> = ({
  tabs,
  width,
  active,
  padding,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState<string>(
    active ? active : tabs[0].label
  );

  const handleClick = (label: string) => {
    setActiveTab(label);
    if (onTabChange) {
      onTabChange();
    }
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
              padding: padding ? padding : undefined,
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
