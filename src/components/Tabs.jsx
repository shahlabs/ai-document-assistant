import React from "react";
import classNames from "classnames";

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs">
      <button
        className={classNames("tab", { active: activeTab === "email" })}
        onClick={() => setActiveTab("email")}
      >
        Email Summarizer
      </button>
      <button
        className={classNames("tab", { active: activeTab === "qa" })}
        onClick={() => setActiveTab("qa")}
      >
        Document Q&A
      </button>
    </div>
  );
};

export default Tabs;
