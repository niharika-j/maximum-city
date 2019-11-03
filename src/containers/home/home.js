import React from 'react';
import './home.css';
import appRoutes from '../../shared/appRoutes.js';
import {Link} from "react-router-dom";

function Home() {
  return (
    <div className="home">
        <div className="bigTitle">Maximum City</div>
        <div className="description">
          Mumbai, erstwhile called Bombay, is the business capital of India. Also known as Mayanagri (city of dreams), Mumbai is home to the largest polyglot population in India. It has a rich and varied culture with something for every soul.
          <br/><br/>
          Come take a look at my favorite spots in Mumbai.
          <Link to={appRoutes.explore}>
            <button className="explore-btn">Explore Now</button>
          </Link>
        </div>
    </div>
  );
}

export default Home;
