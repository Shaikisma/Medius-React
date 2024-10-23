import React from "react";
import Image from "next/image";
import "./start.css";

function Page() {
  return (
    <div className="homepage __myFont_974306 __myFont_Fallback_974306">
      <header className="header">
        <div className="logo">
          <span className="logo-text">Better</span>
          <span className="logo-subtext">Mortgage</span>
        </div>
        <div className="contact">
          <span>Need help? Call (415) 523 8837</span>
        </div>
      </header>
      <div className="content">
        <div className="img-holder">
          <span className="grey-line"></span>
          <Image
            src="/images/start/betty.jpg"
            alt="User Avatar"
            className="avatar"
            width={48}
            height={48}
            style={{zIndex: 10}}
          />
        </div>
        <h1>Hi, I&apos;m Betsy!</h1>
        <p>What can I help you with?</p>
        <div className="buttons">
          <a
            className="option-btn"
            href="https://better.com/preapproval/nxt-purchase?utm_source=better-com"
          >
            <button className="">
              <span className="icon">🏠</span> Buying a home
            </button>
          </a>

          <a className="option-btn" href="https://better.com/preapproval/nxt-refinance">
            <button>
              <span className="icon">💲</span> Refinance my mortgage
            </button>
          </a>

          <a
            className="option-btn"
            href="https://better.com/preapproval/nxt-heloc?utm_source=better-com"
          >
            <button>
              <span className="icon">💵</span> Get cash from my home
            </button>
          </a>
        </div>
      </div>
      <footer className="footer">
        <div className="holder">
          <span className="number">$100B</span>
          <span className="description">home loans funded entirely online</span>
        </div>
        <div className="holder">
          <span className="number">400K</span>
          <span className="description">Customers who chose a Better Mortgage</span>
        </div>
      </footer>
    </div>
  );
}

export default Page;
