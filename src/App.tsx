import React from "react";
import HistoryCircle from "./components/HistoryCircle/HistoryCircle";
import styles from "./App.module.scss";

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <HistoryCircle />
    </div>
  );
};

export default App;
