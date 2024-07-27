// pages/pricing.js
import Head from "next/head";
import React from 'react';
import Pricing from '../components/ui/Pricing';

const PricingPage = () => {
  return (
    <>
      <Head>
        <title>pricing - smart8ball</title>
      </Head>
      <div>
        <h1>Pricing Page</h1>
        <Pricing />
      </div>
    </>
  );
};

export default PricingPage;
