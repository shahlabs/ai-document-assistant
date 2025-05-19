import "./App.css";
import { useState } from "react";
import Tabs from "./components/Tabs";
import DocumentQA from "./components/DocumentQA";
import EmailSummarizer from "./components/EmailSummarizer";

function App() {
  const [activeTab, setActiveTab] = useState("email");

  return (
    <div className="App">
      <header>
        <h1>AI Document Assistant</h1>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </header>

      <main>
        {activeTab === "email" ? <EmailSummarizer /> : <DocumentQA />}
      </main>
    </div>
  );
}

export default App;
