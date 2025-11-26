import React from 'react';
import Navbar from './Navbar.js';
import './AboutPage.css';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Mr. Jaleel Ahmed',
      role: 'Founder & Managing Director',
      image: '👨‍💼',
      bio: 'With 35+ years of global trade experience, Mr. Ahmed leads our operations with strategic insight and a commitment to excellence. His expertise in international markets and export regulations ensures every shipment meets the highest standards.'
    },
    {
      name: 'Mohammad Yasir',
      role: 'Head of Export Documentation & Compliance',
      image: '👨‍💼',
      bio: 'Mr. Yasir manages all export documentation with precision, ensuring full compliance with INCOTERMS, customs rules, and buyer requirements. His accuracy keeps our consignments smooth and delay-free.'
    },
    {
      name: 'Mr. Mohammad Faiz',
      role: 'Procurement & Supply Chain Manager',
      image: '👨',
      bio: 'Mr. Faiz oversees sourcing, vendor coordination, and quality control. His strong supplier network and logistical expertise ensure timely, reliable movement of goods from production to port.'
    },
    {
      name: 'Mr. Mohammad Zaid',
      role: 'International Sales & Client Relations Lead',
      image: '👨‍💼',
      bio: 'Mr. Zaid manages global client communications with professionalism and cultural understanding. His focus on trust, responsiveness, and market awareness strengthens long-term international partnerships.'
    },
    {
      name: 'Mr. Mohammad Afridi',
      role: 'Finance & Export Payments Head',
      image: '👨‍🎨',
      bio: 'Mr. Afridi handles international payments, forex, and export incentives. His financial oversight ensures secure transactions, regulatory compliance, and optimized profitability.'
    }
  ];

  return (
    <>
      <Navbar />
    <div className="about-page">
      
      {/* Main Content with Integrated Header */}
      <div className="newspaper-content">
        <div className="container">
          
          {/* Integrated Newspaper Header */}
          <div className="integrated-header">
            <h1 className="newspaper-title">THE JKEXPORTHUB TIMES</h1>
            <p className="newspaper-date">Established 1994 • Serving Global Markets</p>
          </div>

          {/* Main Article */}
          <article className="main-article">
            <h2 className="article-headline">About Us</h2>
            <h3 className="article-subheadline">Welcome to JKExportHub – Your Trusted Global Export Partner from India</h3>
            
            <div className="article-content">
              <p className="lead-paragraph">
                At JKExportHub, we bring together decades of experience, quality craftsmanship, and a passion for excellence to deliver a diverse range of export-ready Indian products to the global market. Headquartered in India, we are a merchant export company dealing in a wide spectrum of sectors — from traditional furniture manufacturing to innovative wellness products.
              </p>

              <h4 className="section-heading">Our Journey</h4>
              <p>
                Our roots go back over 30 years, starting with JK Furniture Works, a registered furniture manufacturing unit based in Bhopal, Madhya Pradesh. Renowned for quality craftsmanship, attention to detail, and custom design capabilities, JK Furniture Works has catered to a wide range of domestic and international clients. Over the decades, our commitment to quality and client satisfaction has helped us build long-term relationships and establish a strong presence in the Indian manufacturing sector.
              </p>
              
              <p>
                Expanding on our legacy of excellence, we ventured into the nutraceutical and wellness industry with the launch of Nutrezza — a brand focused on natural health solutions. One of our flagship products, Vedglow, is a carefully formulated multi-specialty powder designed to support digestion, manage obesity, and promote heart health. Blending traditional Indian ingredients with modern science, Vedglow reflects our belief in wellness that is rooted in nature and backed by quality.
              </p>

              <h4 className="section-heading">What We Do</h4>
              <p>
                As a merchant exporter, JKExportHub functions as a single-window platform for sourcing premium, export-quality Indian products across categories. Whether you're looking for handcrafted furniture, nutraceuticals, or other customized goods from India, we ensure:
              </p>
              
              <ul className="feature-list">
                <li>Product quality</li>
                <li>Compliance with international standards</li>
                <li>Efficient packaging & logistics</li>
                <li>Transparent business practices</li>
              </ul>

              <h4 className="section-heading">Our Divisions:</h4>
              <div className="divisions">
                <div className="division-item">
                  <strong>JK Furniture Works</strong> – Traditional craftsmanship meets modern design in our custom-made furniture solutions from Bhopal.
                </div>
                <div className="division-item">
                  <strong>Nutrezza (Vedglow)</strong> – A wellness brand offering natural health supplements for better living.
                </div>
              </div>

              <h4 className="section-heading">Why Choose JKExportHub?</h4>
              <ul className="feature-list">
                <li>Over 30 years of manufacturing experience</li>
                <li>Export-ready product offerings across sectors</li>
                <li>Commitment to quality, trust, and timely delivery</li>
                <li>Customization and private labeling available</li>
                <li>Strong supply chain and export logistics support</li>
              </ul>

              <p className="conclusion">
                At JKExportHub, we don't just export products — we export trust, quality, and a piece of India's heritage and innovation to the world.
              </p>
              
              <p className="call-to-action">
                <strong>Let's grow together.</strong>
              </p>
            </div>
          </article>

          {/* Team Section */}
          <section className="team-section">
            <h2 className="section-title">Meet Our Leadership Team</h2>
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div key={member.name} className="team-card">
                  <div className="member-image">{member.image}</div>
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-bio">{member.bio}</p>
                </div>
              ))}
            </div>
          </section>
          </div>
        </div>
    </div>
    </>
  );
};

export default AboutPage;
