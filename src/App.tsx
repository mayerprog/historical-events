import React from "react";
import styles from "./App.module.scss";
import HistoryCirclePage from "./pages/HistoryCirclePage/HistoryCirclePage";

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <HistoryCirclePage />
    </div>
  );
};

export default App;
