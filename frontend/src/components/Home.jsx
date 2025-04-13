import React, { useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Features from './Features';
import Testimonials from './Testimonials';
import CallToAction from './CallToAction';
import Footer from './Footer';
import './Home.css';

function Home() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      if (sectionsRef.current) {
        sectionsRef.current.forEach((section) => {
          if (section) {
            observer.unobserve(section);
          }
        });
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div ref={(el) => (sectionsRef.current[0] = el)}>
        <Hero />
      </div>
      <div ref={(el) => (sectionsRef.current[1] = el)}>
        <About />
      </div>
      <div ref={(el) => (sectionsRef.current[2] = el)}>
        <Features />
      </div>
      <div ref={(el) => (sectionsRef.current[3] = el)}>
        <Testimonials />
      </div>
      <div ref={(el) => (sectionsRef.current[4] = el)}>
        <CallToAction />
      </div>
      <div ref={(el) => (sectionsRef.current[5] = el)}>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
