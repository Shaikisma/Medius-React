"use client";
import React from "react";
import Hero from "./components/hero";
import Testimonials from "./components/testimonials";
import Products from "./components/products";
import Nav from "./components/nav";
import Head from "next/head";

function Homepage() {
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/images/homepage/rate-drop-notify.webp"
          as="image"
          fetchPriority="high"
        />
      </Head>
      <div id="__next">
        <main className="__className_974306">
          <header className="sticky top-0 z-20 transition-all ease-in-out duration-300 bg-accentPrimary">
            <div className="bg-graph4Tertiary">
              <p className="font-normal leading-body m-0 p-0 text-textPrimary text-base text-center"></p>
            </div>
            <Nav transparent={true} />
          </header>
          <div className="bg-accentBorderInverseSecondary full-hero">
            <Hero />
            <Testimonials />
            <Products />
            <hr className="border-t border-strokeDivider my-0 pb-lg" />
          </div>
        </main>
      </div>
    </>
  );
}

export default Homepage;
