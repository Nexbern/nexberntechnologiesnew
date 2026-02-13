'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Portfolio websites data
const portfolioSites = [
    {
        id: 1,
        name: 'LohaKart',
        url: 'https://lohakart.com/',
    },
    {
        id: 2,
        name: 'Pacific Hitech',
        url: 'https://phitechgroup.com/',
    },
    {
        id: 3,
        name: 'TCP Limited',
        url: 'https://tcplimited.com/',
    },
    {
        id: 4,
        name: 'Nexbern',
        url: 'https://www.nexbern.com/',
    }
];

export default function Portfolio() {
    const [selectedSite, setSelectedSite] = useState(portfolioSites[0]);
    const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
    const [isEnlarged, setIsEnlarged] = useState(false);

    useEffect(() => {
        // Initialize animations
        if ((window as any).WOW) {
            new (window as any).WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 0,
                mobile: true,
                live: true
            }).init();
        }
    }, []);

    const handleSiteClick = (site: typeof portfolioSites[0]) => {
        setSelectedSite(site);
        setSelectedDevice('desktop');
        setIsEnlarged(false);
    };

    const handleDeviceClick = (device: 'desktop' | 'tablet' | 'mobile') => {
        if (selectedDevice === device && !isEnlarged) {
            setIsEnlarged(true);
        } else {
            setSelectedDevice(device);
            setIsEnlarged(false);
        }
    };

    const getDeviceClass = () => {
        if (isEnlarged) {
            return `device-preview ${selectedDevice} enlarged`;
        }
        return `device-preview ${selectedDevice}`;
    };

    return (
        <>
            <Header />

            {/* Breadcrumb */}
            <div className="breadcumb-area style2 bg-smoke4">
                <div className="breadcumb-wrapper" style={{ backgroundImage: 'url(/assets/img/bg/breadcumb-bg.jpg)' }}>
                    <div className="container">
                        <div className="breadcumb-content">
                            <h1 className="breadcumb-title">Our Projects</h1>
                            <ul className="breadcumb-menu">
                                <li><Link href="/">Home</Link></li>
                                <li>Projects</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Portfolio Section */}
            <section className="portfolio-showcase space">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="title-area text-center mb-50">
                                <span className="sub-title">
                                    <span className="squre-shape left me-3"></span>
                                    Our Work
                                    <span className="squre-shape right ms-3"></span>
                                </span>
                                <h2 className="sec-title">Explore Our Projects</h2>
                                <p className="sec-text">
                                    Discover the websites we've built for our clients. Click on any project to see it in action across different devices.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Website List */}
                    <div className="row mb-60">
                        <div className="col-12">
                            <div className="portfolio-site-list">
                                {portfolioSites.map((site) => (
                                    <div
                                        key={site.id}
                                        className={`portfolio-site-item ${selectedSite.id === site.id ? 'active' : ''}`}
                                        onClick={() => handleSiteClick(site)}
                                    >
                                        <div className="site-info">
                                            <h4 className="site-name">{site.name}</h4>
                                        </div>
                                        <div className="site-arrow">
                                            <i className="fa-light fa-arrow-right"></i>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Device Selector */}
                    <div className="row mb-40">
                        <div className="col-12">
                            <div className="device-selector text-center">
                                <button
                                    className={`device-btn ${selectedDevice === 'desktop' ? 'active' : ''}`}
                                    onClick={() => handleDeviceClick('desktop')}
                                >
                                    <i className="fa-solid fa-desktop"></i>
                                    <span>Desktop</span>
                                </button>
                                <button
                                    className={`device-btn ${selectedDevice === 'tablet' ? 'active' : ''}`}
                                    onClick={() => handleDeviceClick('tablet')}
                                >
                                    <i className="fa-solid fa-tablet-screen-button"></i>
                                    <span>Tablet</span>
                                </button>
                                <button
                                    className={`device-btn ${selectedDevice === 'mobile' ? 'active' : ''}`}
                                    onClick={() => handleDeviceClick('mobile')}
                                >
                                    <i className="fa-solid fa-mobile-screen"></i>
                                    <span>Mobile</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Device Preview */}
                    <div className="row">
                        <div className="col-12">
                            <div className="device-preview-container">
                                <div className={getDeviceClass()}>
                                    {isEnlarged && (
                                        <button
                                            className="close-enlarged"
                                            onClick={() => setIsEnlarged(false)}
                                        >
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    )}
                                    <div className="device-frame">
                                        {selectedDevice === 'desktop' && (
                                            <div className="desktop-frame">
                                                <div className="desktop-screen">
                                                    <iframe
                                                        src={selectedSite.url}
                                                        title={selectedSite.name}
                                                        className="website-iframe"
                                                    />
                                                </div>
                                                <div className="desktop-stand"></div>
                                                <div className="desktop-base"></div>
                                            </div>
                                        )}
                                        {selectedDevice === 'tablet' && (
                                            <div className="tablet-frame">
                                                <div className="tablet-camera"></div>
                                                <div className="tablet-screen">
                                                    <iframe
                                                        src={selectedSite.url}
                                                        title={selectedSite.name}
                                                        className="website-iframe"
                                                    />
                                                </div>
                                                <div className="tablet-button"></div>
                                            </div>
                                        )}
                                        {selectedDevice === 'mobile' && (
                                            <div className="mobile-frame">
                                                <div className="volume-up"></div>
                                                <div className="volume-down"></div>
                                                <div className="mobile-notch"></div>
                                                <div className="mobile-screen">
                                                    <iframe
                                                        src={selectedSite.url}
                                                        title={selectedSite.name}
                                                        className="website-iframe"
                                                    />
                                                </div>
                                                <div className="mobile-button"></div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="device-info">
                                        <h5>{selectedSite.name}</h5>
                                        <p>Click on the device to enlarge</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                .portfolio-site-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 20px;
                    margin-bottom: 40px;
                }

                .portfolio-site-item {
                    background: #fff;
                    border: 2px solid #e5e7eb;
                    border-radius: 12px;
                    padding: 24px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .portfolio-site-item:hover {
                    border-color: var(--theme-color);
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                }

                .portfolio-site-item.active {
                    border-color: var(--theme-color);
                    background: linear-gradient(135deg, #f8f9ff 0%, #fff 100%);
                    box-shadow: 0 5px 20px rgba(107, 77, 244, 0.15);
                }

                .site-info {
                    flex: 1;
                }

                .site-name {
                    font-size: 20px;
                    font-weight: 600;
                    margin-bottom: 8px;
                    color: var(--title-color);
                }

                .site-category {
                    display: inline-block;
                    background: var(--theme-color);
                    color: #fff;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    margin-bottom: 8px;
                }

                .site-description {
                    font-size: 14px;
                    color: #6b7280;
                    margin: 8px 0 0;
                }

                .site-arrow {
                    font-size: 24px;
                    color: var(--theme-color);
                    transition: transform 0.3s ease;
                }

                .portfolio-site-item:hover .site-arrow {
                    transform: translateX(5px);
                }

                .device-selector {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    flex-wrap: wrap;
                }

                .device-btn {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    padding: 20px 40px;
                    background: #fff;
                    border: 2px solid #e5e7eb;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 14px;
                    font-weight: 500;
                    color: var(--title-color);
                }

                .device-btn i {
                    font-size: 32px;
                    color: #6b7280;
                    transition: color 0.3s ease;
                }

                .device-btn:hover {
                    border-color: var(--theme-color);
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                }

                .device-btn:hover i {
                    color: var(--theme-color);
                }

                .device-btn.active {
                    border-color: var(--theme-color);
                    background: var(--theme-color);
                    color: #fff;
                }

                .device-btn.active i {
                    color: #fff;
                }

                .device-preview-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 600px;
                    position: relative;
                }

                .device-preview {
                    position: relative;
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                }

                .device-preview.enlarged {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(0.85);
                    z-index: 9999;
                    cursor: default;
                    max-height: 95vh;
                    max-width: 95vw;
                    overflow: auto;
                }

                .device-preview.enlarged::before {
                    content: '';
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.8);
                    z-index: -1;
                }

                .close-enlarged {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    width: 50px;
                    height: 50px;
                    background: #fff;
                    border: none;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    color: var(--title-color);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                    transition: all 0.3s ease;
                    z-index: 10001;
                }

                .close-enlarged:hover {
                    background: var(--theme-color);
                    color: #fff;
                    transform: rotate(90deg) scale(1.1);
                }

                /* Desktop Frame */
                .desktop-frame {
                    width: 1203px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    filter: drop-shadow(0 40px 80px rgba(0, 0, 0, 0.3));
                }

                .desktop-screen {
                    width: 100%;
                    height: 700px;
                    background: linear-gradient(145deg, #0a0a0a, #1a1a1a);
                    border-radius: 8px;
                    padding: 8px;
                    box-shadow: 
                        0 0 0 1px rgba(255, 255, 255, 0.05),
                        0 20px 60px rgba(0, 0, 0, 0.5),
                        inset 0 0 0 1px rgba(255, 255, 255, 0.03);
                    position: relative;
                    overflow: visible;
                }

                /* Thin bezel effect */
                .desktop-screen::before {
                    content: '';
                    position: absolute;
                    top: 4px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 6px;
                    height: 6px;
                    background: radial-gradient(circle, #1a1a1a 0%, #0a0a0a 100%);
                    border-radius: 50%;
                    box-shadow: 
                        0 0 0 1px rgba(255, 255, 255, 0.1),
                        inset 0 1px 1px rgba(0, 0, 0, 0.8);
                    z-index: 10;
                }

                /* Screen glass reflection */
                .desktop-screen::after {
                    content: '';
                    position: absolute;
                    top: 8px;
                    left: 8px;
                    right: 8px;
                    bottom: 8px;
                    background: linear-gradient(
                        135deg,
                        rgba(255, 255, 255, 0.08) 0%,
                        transparent 30%,
                        transparent 70%,
                        rgba(0, 0, 0, 0.15) 100%
                    );
                    border-radius: 4px;
                    pointer-events: none;
                    z-index: 1;
                }

                /* Monitor chin (bottom bezel) */
                .desktop-screen .monitor-chin {
                    position: absolute;
                    bottom: 8px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 120px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10;
                }

                .desktop-screen .monitor-chin::before {
                    content: '';
                    width: 40px;
                    height: 2px;
                    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent);
                    border-radius: 1px;
                }

                .desktop-stand {
                    width: 180px;
                    height: 120px;
                    background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
                    clip-path: polygon(40% 0%, 60% 0%, 85% 100%, 15% 100%);
                    position: relative;
                    box-shadow: 
                        0 15px 40px rgba(0, 0, 0, 0.4),
                        inset 0 2px 4px rgba(255, 255, 255, 0.05),
                        inset 0 -2px 4px rgba(0, 0, 0, 0.5);
                    margin-top: -2px;
                }

                /* Stand highlight */
                .desktop-stand::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 40%;
                    right: 40%;
                    height: 60%;
                    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.08), transparent);
                    clip-path: polygon(20% 0%, 80% 0%, 60% 100%, 40% 100%);
                }

                /* Stand shadow */
                .desktop-stand::after {
                    content: '';
                    position: absolute;
                    bottom: -10px;
                    left: 10%;
                    right: 10%;
                    height: 10px;
                    background: radial-gradient(ellipse, rgba(0, 0, 0, 0.4), transparent);
                    filter: blur(8px);
                }

                .desktop-base {
                    width: 280px;
                    height: 16px;
                    background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
                    border-radius: 50%;
                    box-shadow: 
                        0 10px 30px rgba(0, 0, 0, 0.5),
                        inset 0 1px 2px rgba(255, 255, 255, 0.08),
                        inset 0 -1px 2px rgba(0, 0, 0, 0.5);
                    position: relative;
                    margin-top: -2px;
                }

                /* Base reflection */
                .desktop-base::before {
                    content: '';
                    position: absolute;
                    top: 2px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 60%;
                    height: 50%;
                    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.06), transparent);
                    border-radius: 50%;
                }

                /* Base shadow underneath */
                .desktop-base::after {
                    content: '';
                    position: absolute;
                    bottom: -15px;
                    left: 10%;
                    right: 10%;
                    height: 15px;
                    background: radial-gradient(ellipse, rgba(0, 0, 0, 0.3), transparent);
                    filter: blur(10px);
                }

                /* Tablet Frame */
                .tablet-frame {
                    width: 600px;
                    height: 800px;
                    background: linear-gradient(145deg, #2d3748, #1a202c);
                    border-radius: 40px;
                    padding: 48px 24px;
                    box-shadow: 
                        0 40px 100px rgba(0, 0, 0, 0.5),
                        inset 0 0 0 1px rgba(255, 255, 255, 0.1),
                        inset 0 2px 4px rgba(255, 255, 255, 0.05);
                    position: relative;
                    border: 4px solid #1a202c;
                }

                .tablet-frame::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    border-radius: 40px;
                    background: linear-gradient(
                        135deg,
                        rgba(255, 255, 255, 0.08) 0%,
                        transparent 40%,
                        rgba(0, 0, 0, 0.2) 100%
                    );
                    pointer-events: none;
                }

                .tablet-camera {
                    position: absolute;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 10px;
                    height: 10px;
                    background: radial-gradient(circle, #1e3a5f 0%, #0f1419 100%);
                    border-radius: 50%;
                    box-shadow: 
                        0 0 0 2px #2d3748,
                        0 0 0 3px #1a202c,
                        inset 0 1px 2px rgba(0, 0, 0, 0.8),
                        0 2px 4px rgba(0, 0, 0, 0.5);
                    z-index: 10;
                }

                .tablet-camera::after {
                    content: '';
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    width: 3px;
                    height: 3px;
                    background: rgba(100, 150, 255, 0.3);
                    border-radius: 50%;
                }

                .tablet-screen {
                    width: 100%;
                    height: 100%;
                    background: #000;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 
                        inset 0 0 0 1px rgba(0, 0, 0, 0.5),
                        0 4px 12px rgba(0, 0, 0, 0.3);
                    position: relative;
                }

                .tablet-screen::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(
                        to bottom,
                        rgba(255, 255, 255, 0.02) 0%,
                        transparent 50%
                    );
                    pointer-events: none;
                    z-index: 1;
                }

                .tablet-button {
                    position: absolute;
                    bottom: 16px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 44px;
                    height: 44px;
                    border: 3px solid #2d3748;
                    border-radius: 50%;
                    background: linear-gradient(145deg, #1a202c, #0f1419);
                    box-shadow: 
                        inset 0 2px 4px rgba(0, 0, 0, 0.5),
                        0 2px 8px rgba(0, 0, 0, 0.3);
                }

                .tablet-button::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 20px;
                    height: 20px;
                    border: 2px solid #4a5568;
                    border-radius: 4px;
                }

                /* Mobile Frame */
                .mobile-frame {
                    width: 395px;
                    height: 750px;
                    background: linear-gradient(145deg, #2d3748, #1a202c);
                    border-radius: 48px;
                    padding: 14px;
                    box-shadow: 
                        0 40px 100px rgba(0, 0, 0, 0.6),
                        inset 0 0 0 1px rgba(255, 255, 255, 0.1),
                        inset 0 2px 4px rgba(255, 255, 255, 0.05);
                    position: relative;
                    // border: 5px solid #000000ff;
                }

                .mobile-frame::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    border-radius: 48px;
                    background: linear-gradient(
                        135deg,
                        rgba(255, 255, 255, 0.1) 0%,
                        transparent 40%,
                        rgba(0, 0, 0, 0.3) 100%
                    );
                    pointer-events: none;
                }

                /* Power button */
                .mobile-frame::after {
                    content: '';
                    position: absolute;
                    top: 120px;
                    right: -5px;
                    width: 4px;
                    height: 60px;
                    background: linear-gradient(to bottom, #4a5568, #2d3748);
                    border-radius: 0 2px 2px 0;
                    box-shadow: inset 1px 0 2px rgba(0, 0, 0, 0.5);
                }

                .mobile-notch {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 170px;
                    height: 32px;
                    background: linear-gradient(to bottom, #1a202c, #0f1419);
                    border-radius: 0 0 24px 24px;
                    z-index: 10;
                    box-shadow: 
                        0 4px 8px rgba(0, 0, 0, 0.3),
                        inset 0 -1px 2px rgba(0, 0, 0, 0.5);
                }

                .mobile-notch::before {
                    content: '';
                    position: absolute;
                    top: 10px;
                    left: 20px;
                    width: 50px;
                    height: 6px;
                    background: linear-gradient(to right, #2d3748, #1a202c);
                    border-radius: 3px;
                    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5);
                }

                .mobile-notch::after {
                    content: '';
                    position: absolute;
                    top: 10px;
                    right: 20px;
                    width: 12px;
                    height: 12px;
                    background: radial-gradient(circle, #1e3a5f 0%, #0f1419 100%);
                    border-radius: 50%;
                    box-shadow: 
                        0 0 0 2px #2d3748,
                        inset 0 1px 2px rgba(0, 0, 0, 0.8),
                        0 0 4px rgba(100, 150, 255, 0.2);
                }

                .mobile-screen {
                    width: 100%;
                    height: 100%;
                    background: #000;
                    border-radius: 38px;
                    overflow: hidden;
                    box-shadow: 
                        inset 0 0 0 1px rgba(0, 0, 0, 0.5),
                        0 4px 12px rgba(0, 0, 0, 0.4);
                    position: relative;
                }

                .mobile-screen::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(
                        to bottom,
                        rgba(255, 255, 255, 0.03) 0%,
                        transparent 50%
                    );
                    pointer-events: none;
                    z-index: 1;
                }

                .mobile-button {
                    position: absolute;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 140px;
                    height: 5px;
                    background: linear-gradient(to right, transparent, #4a5568, transparent);
                    border-radius: 3px;
                    box-shadow: 
                        0 -1px 2px rgba(0, 0, 0, 0.3),
                        inset 0 1px 1px rgba(255, 255, 255, 0.1);
                }

                /* Volume buttons */
                .mobile-frame .volume-up,
                .mobile-frame .volume-down {
                    position: absolute;
                    left: -5px;
                    width: 4px;
                    background: linear-gradient(to bottom, #4a5568, #2d3748);
                    border-radius: 2px 0 0 2px;
                    box-shadow: inset -1px 0 2px rgba(0, 0, 0, 0.5);
                }

                .mobile-frame .volume-up {
                    top: 160px;
                    height: 40px;
                }

                .mobile-frame .volume-down {
                    top: 210px;
                    height: 40px;
                }


                .website-iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                    background: #fff;
                }

                .device-info {
                    text-align: center;
                    margin-top: 20px;
                }

                .device-info h5 {
                    font-size: 20px;
                    font-weight: 600;
                    margin-bottom: 8px;
                    color: var(--title-color);
                }

                .device-info p {
                    font-size: 14px;
                    color: #6b7280;
                }

                @media (max-width: 991px) {
                    .desktop-frame {
                        width: 100%;
                        max-width: 700px;
                    }

                    .desktop-screen {
                        height: 400px;
                    }

                    .tablet-frame {
                        width: 100%;
                        max-width: 500px;
                        height: 650px;
                    }

                    .mobile-frame {
                        width: 100%;
                        max-width: 320px;
                        height: 640px;
                    }
                }
            `}</style>
        </>
    );
}
