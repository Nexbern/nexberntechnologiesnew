'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const Footer = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <footer className="footer-wrapper footer-layout1 black-bg space-top">
                <div className="widget-area">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-md-6 col-xl-3">
                                <div className="widget footer-widget">
                                    <div className="th-widget-about">
                                        <div className="about-logo">
                                            <Link href="/">
                                                <img src="/assets/img/Gemini_Generated_Image_rhokzzrhokzzrhok-removebg-preview.png" alt="Nexbern" style={{ maxHeight: '60px', width: 'auto' }} />
                                            </Link>
                                        </div>
                                        <div className="about-text" style={{ color: '#fff' }}>
                                            <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: '15px' }}>About Nexbern</h3>
                                            <p style={{ color: '#d3d3d3', marginBottom: '15px' }}>
                                                Shaping the future of students by preparing them for the tech industry while providing cutting-edge IT services to clients.
                                            </p>
                                            <p style={{ color: '#fff', fontWeight: 'bold', letterSpacing: '1px' }}>
                                                Learn. Build. Earn.
                                            </p>
                                        </div>
                                        <div className="th-social">
                                            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                                                <i className="fab fa-linkedin-in"></i>
                                            </a>
                                            <a href="https://www.instagram.com/nexberntechnologies?igsh=cnB6NjB4bDIxanVp" target="_blank" rel="noopener noreferrer">
                                                <i className="fab fa-instagram"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-auto">
                                <div className="widget widget_nav_menu footer-widget">
                                    <h3 className="widget_title">Useful Link</h3>
                                    <div className="menu-all-pages-container">
                                        <ul className="menu">
                                            <li><Link href="/">Home</Link></li>
                                            <li><Link href="/about">About us</Link></li>
                                            <li><Link href="/services">Our Service</Link></li>
                                            <li><Link href="/portfolio">Projects</Link></li>
                                            <li><Link href="/contact">Contact</Link></li>
                                            <li><Link href="/careers">Careers</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-auto">
                                <div className="widget footer-widget">
                                    <h3 className="widget_title">Get In Touch</h3>
                                    <div className="th-widget-contact">
                                        <div className="info-box_text">
                                            <div className="icon">
                                                <img src="/assets/img/icon/phone.svg" alt="img" />
                                            </div>
                                            <div className="details">
                                                <p><a href="tel:+917071402831" className="info-box_link">+91 7071402831</a></p>
                                                <p><a href="tel:+917705084226" className="info-box_link">+91 7705084226</a></p>
                                            </div>
                                        </div>
                                        <div className="info-box_text">
                                            <div className="icon">
                                                <img src="/assets/img/icon/envelope.svg" alt="img" />
                                            </div>
                                            <div className="details">
                                                <p><a href="mailto:nexberntechnologies@gmail.com" className="info-box_link">nexberntechnologies@gmail.com</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright-wrap">
                    <div className="container">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-12 text-center">
                                <p className="copyright-text">
                                    Copyright © 2025 <Link href="/">Nexbern Technologies</Link>. All Rights Reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* WhatsApp Chat Button */}
            <a 
                href="https://wa.me/917705084226" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '90px',
                    backgroundColor: '#25D366',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '30px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    zIndex: 1000,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.backgroundColor = '#128C7E';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.backgroundColor = '#25D366';
                }}
            >
                <i className="fab fa-whatsapp"></i>
            </a>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50%',
                        width: '60px',
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        zIndex: 1000,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.backgroundColor = '#0056b3';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.backgroundColor = '#007bff';
                    }}
                >
                    <i className="fas fa-arrow-up"></i>
                </button>
            )}
        </>
    );
};

export default Footer;