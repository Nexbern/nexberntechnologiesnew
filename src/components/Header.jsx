'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add('th-body-visible');
        } else {
            document.body.classList.remove('th-body-visible');
        }
    }, [isMobileMenuOpen]);

    return (
        <>
            <div className={`th-menu-wrapper ${isMobileMenuOpen ? 'th-body-visible' : ''}`}>
                <div className="th-menu-area text-center">
                    <button className="th-menu-toggle" onClick={toggleMobileMenu}><i className="fal fa-times"></i></button>
                    <div className="mobile-logo">
                        <Link href="/"><img src="/assets/img/logo.png" alt="Nexbern" /></Link>
                    </div>
                    <div className="th-mobile-menu">
                        <ul>
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/about">About Us</Link>
                            </li>
                            <li>
                                <Link href="/services">Our Services</Link>
                            </li>
                            <li>
                                <Link href="/courses">Courses</Link>
                            </li>
                            <li>
                                <Link href="/portfolio">Projects</Link>
                            </li>
                            <li>
                                <Link href="/contact">Contact us</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <header className="th-header header-layout1">
                {/* <div className="header-top">
                <div className="container th-container">
                    <div className="row justify-content-center justify-content-xl-between align-items-center">
                        <div className="col-auto d-none d-md-block">
                            <div className="header-links">
                                <ul>
                                    <li className="d-none d-xl-inline-block">
                                        <i className="fa-sharp fa-regular fa-location-dot"></i>
                                        <span>45 New Eskaton Road, Austria</span>
                                    </li>
                                    <li className="d-none d-xl-inline-block">
                                        <i className="fa-regular fa-clock"></i>
                                        <span>Sun to Friday: 8.00 am - 7.00 pm</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="header-right style2">
                                <div className="currency-menu">
                                    <i className="fa-light fa-circle-dollar"></i>
                                    <select className="form-select nice-select">
                                        <option defaultValue="">USD</option>
                                        <option>CNY</option>
                                        <option>EUR</option>
                                        <option>AUD</option>
                                    </select>
                                </div>
                                <div className="header-links">
                                    <ul>
                                        <li className="d-none d-md-inline-block">
                                            <Link href="/faq">FAQ</Link>
                                        </li>
                                        <li className="d-none d-md-inline-block">
                                            <Link href="/contact">Support</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
                <div className="sticky-wrapper">
                    <div className="menu-area">
                        <div className="container th-container">
                            <div className="row align-items-center justify-content-between">
                                <div className="col-auto">
                                    <div className="header-logo">
                                        <Link href="/">
                                            <img src="/assets/img/logo.png" alt="Nexbern" style={{ maxHeight: '40px', width: 'auto' }} />
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-auto me-xxl-auto">
                                    <nav className="main-menu d-none d-xl-inline-block">
                                        <ul>
                                            <li>
                                                <Link href="/" style={{ fontWeight: 'bold' }}>Home</Link>
                                            </li>
                                            <li>
                                                <Link href="/about" style={{ fontWeight: 'bold' }}>About Us</Link>
                                            </li>
                                            <li>
                                                <Link href="/services" style={{ fontWeight: 'bold' }}>Our Services</Link>
                                            </li>
                                            <li>
                                                <Link href="/courses" style={{ fontWeight: 'bold' }}>Courses</Link>
                                            </li>
                                            <li>
                                                <Link href="/portfolio" style={{ fontWeight: 'bold' }}>Projects</Link>
                                            </li>
                                            <li>
                                                <Link href="/contact" style={{ fontWeight: 'bold' }}>Contact us</Link>
                                            </li>
                                        </ul>
                                    </nav>
                                    <button type="button" className="th-menu-toggle d-block d-xl-none" onClick={toggleMobileMenu}>
                                        <i className="far fa-bars"></i>
                                    </button>
                                </div>
                                <div className="col-auto d-none d-xl-block">
                                    <div className="header-button">
                                        {/* <button type="button" className="icon-btn searchBoxToggler">
                                        <img src="/assets/img/icon/search.svg" alt="icon" />
                                    </button> */}
                                        <Link href="/contact" className="th-btn th-icon" style={{ fontWeight: 'bold' }}>
                                            Get In Touch <i className="fa-light fa-arrow-right-long"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="logo-bg bg-mask" style={{ maskImage: 'url(/assets/img/logo_bg_mask.png)', WebkitMaskImage: 'url(/assets/img/logo_bg_mask.png)', transform: 'scaleX(-1)' }}></div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
