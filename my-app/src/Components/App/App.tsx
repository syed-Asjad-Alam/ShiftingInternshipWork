import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer'
import Body from '../Body/Body';
import { Link } from 'react-router-dom';
import './App.css'





function App() {

  const [check,setcheck] = useState(false)
  
  return (
    <div style={{backgroundColor:'#f3f3f3'}}>
      {/* <Sidebar setcheck={setcheck} />
      <Header check={check}/>
      <Body check={check} />
      <Footer check={check} /> */}
      <div className={check?'sidebar':'collapsed'}><Sidebar setcheck={setcheck} /></div>
      <div className={check?'topbar1':'topbar'}><Header /></div>
      <div className={check?'mycss1':'mycss'}><Body /></div>
      <div className={check?'footer1':'footer'}><Footer /></div>
      
    </div>
  );

  
}

export default App;
