import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import DeliveryInfo from './components/DeliveryInfo';
import PricingPlans from './components/PricingPlans';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <DeliveryInfo />
        <PricingPlans />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default App;