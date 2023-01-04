import React from 'react';
import PageTitle from './components/PageTitle';
import Header from './components/Header';
import styles from "./styles/modules/app.module.scss"
import "./styles/GlobalStyles.css"
import Content from './components/Content';
function App() {
  return (
    <div className="container">
      <PageTitle>TODO</PageTitle>
      <div className={styles.app__wrapper}>
        <Header/>
        <Content/>
      </div>
    </div>
  );
}

export default App;
