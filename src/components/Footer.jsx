'use client';

import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="footer-wrapper footer-layout1 black-bg space-top">
            <div className="widget-area">
                <div className="container">
                    <div className="newsletter-area">
                        <div className="newsletter-top">
                            <div className="row gy-4 align-items-center">
                                <div className="col-lg-5">
                                    <h2 className="newsletter-title text-white text-capitalize mb-0">
                                        get updated the latest newsletter
                                    </h2>
                                </div>
                                <div className="col-lg-7">
                                    <form className="newsletter-form">
                                        <input className="form-control" type="email" placeholder="Enter Email" required />
                                        <button type="submit" className="th-btn style3">
                                            Subscribe Now <img src="/assets/img/icon/plane.svg" alt="" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-md-6 col-xl-3">
                            <div className="widget footer-widget">
                                <div className="th-widget-about">
                                    <div className="about-logo">
                                        <Link href="/">
                                            <img src="/assets/img/logo3.svg" alt="Nexbern" />
                                        </Link>
                                    </div>
                                    <p className="about-text">
                                        Rapidiously myocardinate cross-platform intellectual capital model. Appropriately create interactive infrastructures
                                    </p>
                                    <div className="th-social">
                                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                        <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                        <a href="https://www.whatsapp.com/" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-whatsapp"></i>
                                        </a>
                                        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
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
                                        <li><Link href="/contact">Terms of Service</Link></li>
                                        <li><Link href="/blog">News & Media</Link></li>
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
                                            <p><a href="tel:+01234567890" className="info-box_link">+01 234 567 890</a></p>
                                            <p><a href="tel:+09876543210" className="info-box_link">+09 876 543 210</a></p>
                                        </div>
                                    </div>
                                    <div className="info-box_text">
                                        <div className="icon">
                                            <img src="/assets/img/icon/envelope.svg" alt="img" />
                                        </div>
                                        <div className="details">
                                            <p><a href="mailto:mailinfo00@Nexbern.com" className="info-box_link">mailinfo00@Nexbern.com</a></p>
                                            <p><a href="mailto:support24@Nexbern.com" className="info-box_link">support24@Nexbern.com</a></p>
                                        </div>
                                    </div>
                                    <div className="info-box_text">
                                        <div className="icon">
                                            <img src="/assets/img/icon/location-dot.svg" alt="img" />
                                        </div>
                                        <div className="details">
                                            <p>789 Inner Lane, Holy park, California, USA</p>
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
                    <div className="row justify-content-lg-between align-items-center">
                        <div className="col-lg-6">
                            <p className="copyright-text">
                                Copyright © 2025 <Link href="/">Nexbern</Link>. All Rights Reserved.
                            </p>
                        </div>
                        <div className="col-lg-6 text-center text-lg-end">
                            <div className="footer-links">
                                <ul>
                                    <li><Link href="/about">Terms & Conditions</Link></li>
                                    <li><Link href="/about">Careers</Link></li>
                                    <li><Link href="/about">Privacy Policy</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
