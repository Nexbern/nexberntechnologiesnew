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

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        // Initialize Animations
        gsap.registerPlugin(ScrollTrigger);

        // Gradient background animation
        document.querySelectorAll('.scroll-text-ani').forEach((element) => {
            if (element.getAttribute('data-text-anim-init')) return;

            gsap.to(element, {
                backgroundImage: 'linear-gradient(to right, #0B1422 100%, #D5D7DA 100%)',
                ease: 'none',
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'top center',
                    scrub: true
                }
            });

            element.setAttribute('data-text-anim-init', 'true');
        });

        // Init WOW.js for fade-in animations
        if ((window as any).WOW) {
            new (window as any).WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 0,
                mobile: true,
                live: true
            }).init();
        }

        // Shape mockup positioning
        if ((window as any).jQuery) {
            setTimeout(() => {
                (window as any).jQuery('.shape-mockup').each(function (this: any) {
                    const $el = (window as any).jQuery(this);
                    const top = $el.data('top');
                    const right = $el.data('right');
                    const bottom = $el.data('bottom');
                    const left = $el.data('left');
                    $el.css({ top, right, bottom, left });
                });
            }, 100);
        }

        // Shape mockup jump animation
        document.querySelectorAll('.shape-mockup.jump').forEach((element) => {
            gsap.to(element, {
                y: -20,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });
        });
    }, []);

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage({ type: '', text: '' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitMessage({ type: 'success', text: 'Message sent successfully! We\'ll get back to you soon.' });
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
            } else {
                setSubmitMessage({ type: 'error', text: data.error || 'Failed to send message. Please try again.' });
            }
        } catch (error) {
            setSubmitMessage({ type: 'error', text: 'An error occurred. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Header />

            {/* Breadcrumb */}
            <div className="breadcumb-area style2 bg-smoke4">
                <div className="breadcumb-wrapper" style={{ backgroundImage: 'url(/assets/img/bg/breadcumb-bg.jpg)' }}>
                    <div className="container">
                        <div className="breadcumb-content">
                            <h1 className="breadcumb-title">Contact Us</h1>
                            <ul className="breadcumb-menu">
                                <li><Link href="/">Home</Link></li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Info Cards */}
            <section className="space">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-10">
                            <div className="title-area text-center mb-50">
                                <span className="sub-title">
                                    <span className="squre-shape left me-3"></span>
                                    Get In Touch
                                    <span className="squre-shape right ms-3"></span>
                                </span>
                                <h2 className="sec-title">
                                    <span className="scroll-text-ani">We'd Love to Hear From You</span>
                                </h2>
                                <p className="sec-text">
                                    Have a question or want to work together? Drop us a message and we'll get back to you as soon as possible.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row gy-4 mb-60">
                        {/* Phone */}
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="contact-info-card" style={{
                                background: '#fff',
                                padding: '40px 30px',
                                borderRadius: '15px',
                                textAlign: 'center',
                                boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                                transition: 'all 0.3s ease',
                                height: '100%'
                            }}>
                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    background: 'linear-gradient(135deg, #0d6efd 0%, #764ba2 100%)',
                                    borderRadius: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 20px'
                                }}>
                                    <i className="fa-light fa-phone" style={{
                                        fontSize: '32px',
                                        color: '#fff'
                                    }}></i>
                                </div>
                                <h4 style={{
                                    fontSize: '20px',
                                    fontWeight: '700',
                                    marginBottom: '12px',
                                    color: '#0B1422'
                                }}>
                                    Phone Number
                                </h4>
                                <p style={{
                                    color: '#666',
                                    fontSize: '14px',
                                    marginBottom: '10px'
                                }}>
                                    Call us anytime
                                </p>
                                <a href="tel:+919876543210" style={{
                                    color: '#0B59DB',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    textDecoration: 'none'
                                }}>
                                    +91 98765 43210
                                </a>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
                            <div className="contact-info-card" style={{
                                background: '#fff',
                                padding: '40px 30px',
                                borderRadius: '15px',
                                textAlign: 'center',
                                boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                                transition: 'all 0.3s ease',
                                height: '100%'
                            }}>
                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    background: 'linear-gradient(135deg, #0d6efd 0%, #764ba2 100%)',
                                    borderRadius: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 20px'
                                }}>
                                    <i className="fa-light fa-envelope" style={{
                                        fontSize: '32px',
                                        color: '#fff'
                                    }}></i>
                                </div>
                                <h4 style={{
                                    fontSize: '20px',
                                    fontWeight: '700',
                                    marginBottom: '12px',
                                    color: '#0B1422'
                                }}>
                                    Email Address
                                </h4>
                                <p style={{
                                    color: '#666',
                                    fontSize: '14px',
                                    marginBottom: '10px'
                                }}>
                                    Send us an email
                                </p>
                                <a href="mailto:nexberntechnologies@gmail.com" style={{
                                    color: '#0B59DB',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    textDecoration: 'none'
                                }}>
                                    nexberntechnologies@gmail.com
                                </a>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="contact-info-card" style={{
                                background: '#fff',
                                padding: '40px 30px',
                                borderRadius: '15px',
                                textAlign: 'center',
                                boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                                transition: 'all 0.3s ease',
                                height: '100%'
                            }}>
                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    background: 'linear-gradient(135deg, #0d6efd 0%, #764ba2 100%)',
                                    borderRadius: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 20px'
                                }}>
                                    <i className="fa-light fa-clock" style={{
                                        fontSize: '32px',
                                        color: '#fff'
                                    }}></i>
                                </div>
                                <h4 style={{
                                    fontSize: '20px',
                                    fontWeight: '700',
                                    marginBottom: '12px',
                                    color: '#0B1422'
                                }}>
                                    Office Hours
                                </h4>
                                <p style={{
                                    color: '#666',
                                    fontSize: '14px',
                                    marginBottom: '8px'
                                }}>
                                    Mon - Fri: 9:00 AM - 6:00 PM
                                </p>
                                <p style={{
                                    color: '#666',
                                    fontSize: '14px',
                                    marginBottom: '8px'
                                }}>
                                    Saturday: 10:00 AM - 4:00 PM
                                </p>
                                <p style={{
                                    color: '#0B59DB',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    marginBottom: 0
                                }}>
                                    Sunday: Closed
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="bg-smoke space">
                <div className="container">
                    <div className="row">
                        {/* Form */}
                        <div className="col-lg-7 wow fadeInLeft">
                            <div className="contact-form-wrapper" style={{
                                background: '#fff',
                                padding: '50px',
                                borderRadius: '20px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
                            }}>
                                <h3 style={{
                                    fontSize: '28px',
                                    fontWeight: '700',
                                    marginBottom: '10px',
                                    color: '#0B1422'
                                }}>
                                    Send Us a Message
                                </h3>
                                <p style={{
                                    color: '#666',
                                    fontSize: '15px',
                                    marginBottom: '30px'
                                }}>
                                    Fill out the form below and we'll get back to you within 24 hours
                                </p>

                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        {/* Name */}
                                        <div className="col-md-6 mb-4">
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '8px',
                                                fontWeight: '600',
                                                color: '#333',
                                                fontSize: '14px'
                                            }}>
                                                Your Name <span style={{ color: '#e74c3c' }}>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Enter your name"
                                                required
                                                className="form-control"
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 15px',
                                                    border: '2px solid #e0e0e0',
                                                    borderRadius: '10px',
                                                    fontSize: '15px',
                                                    transition: 'all 0.3s ease',
                                                    outline: 'none'
                                                }}
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="col-md-6 mb-4">
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '8px',
                                                fontWeight: '600',
                                                color: '#333',
                                                fontSize: '14px'
                                            }}>
                                                Email Address <span style={{ color: '#e74c3c' }}>*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="your@email.com"
                                                required
                                                className="form-control"
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 15px',
                                                    border: '2px solid #e0e0e0',
                                                    borderRadius: '10px',
                                                    fontSize: '15px',
                                                    transition: 'all 0.3s ease',
                                                    outline: 'none'
                                                }}
                                            />
                                        </div>

                                        {/* Phone */}
                                        <div className="col-md-6 mb-4">
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '8px',
                                                fontWeight: '600',
                                                color: '#333',
                                                fontSize: '14px'
                                            }}>
                                                Phone Number <span style={{ color: '#e74c3c' }}>*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="+91 XXXXX XXXXX"
                                                required
                                                className="form-control"
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 15px',
                                                    border: '2px solid #e0e0e0',
                                                    borderRadius: '10px',
                                                    fontSize: '15px',
                                                    transition: 'all 0.3s ease',
                                                    outline: 'none'
                                                }}
                                            />
                                        </div>

                                        {/* Subject */}
                                        <div className="col-md-6 mb-4">
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '8px',
                                                fontWeight: '600',
                                                color: '#333',
                                                fontSize: '14px'
                                            }}>
                                                Subject <span style={{ color: '#e74c3c' }}>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                placeholder="How can we help?"
                                                required
                                                className="form-control"
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 15px',
                                                    border: '2px solid #e0e0e0',
                                                    borderRadius: '10px',
                                                    fontSize: '15px',
                                                    transition: 'all 0.3s ease',
                                                    outline: 'none'
                                                }}
                                            />
                                        </div>

                                        {/* Message */}
                                        <div className="col-12 mb-4">
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '8px',
                                                fontWeight: '600',
                                                color: '#333',
                                                fontSize: '14px'
                                            }}>
                                                Your Message <span style={{ color: '#e74c3c' }}>*</span>
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                placeholder="Tell us more about your project or inquiry..."
                                                required
                                                rows={6}
                                                className="form-control"
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 15px',
                                                    border: '2px solid #e0e0e0',
                                                    borderRadius: '10px',
                                                    fontSize: '15px',
                                                    transition: 'all 0.3s ease',
                                                    outline: 'none',
                                                    resize: 'vertical',
                                                    fontFamily: 'inherit'
                                                }}
                                            />
                                        </div>

                                        {/* Submit Message */}
                                        {submitMessage.text && (
                                            <div className="col-12 mb-4">
                                                <div style={{
                                                    padding: '15px',
                                                    borderRadius: '10px',
                                                    backgroundColor: submitMessage.type === 'success' ? '#d4edda' : '#f8d7da',
                                                    color: submitMessage.type === 'success' ? '#155724' : '#721c24',
                                                    border: `1px solid ${submitMessage.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
                                                }}>
                                                    {submitMessage.text}
                                                </div>
                                            </div>
                                        )}

                                        {/* Submit Button */}
                                        <div className="col-12">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="th-btn"
                                                style={{
                                                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                                    opacity: isSubmitting ? 0.7 : 1
                                                }}
                                            >
                                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                                <i className="fa-light fa-arrow-right-long ms-2"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Info Sidebar */}
                        <div className="col-lg-5 wow fadeInRight">
                            <div style={{ paddingLeft: '30px' }}>
                                <h3 style={{
                                    fontSize: '28px',
                                    fontWeight: '700',
                                    marginBottom: '20px',
                                    color: '#0B1422'
                                }}>
                                    Why Choose Nexbern?
                                </h3>
                                <p style={{
                                    color: '#666',
                                    fontSize: '15px',
                                    lineHeight: '1.8',
                                    marginBottom: '30px'
                                }}>
                                    We're a team of passionate developers, designers, and digital strategists committed to delivering exceptional results.
                                </p>

                                {/* Features List */}
                                <div className="features-list">
                                    {[
                                        { icon: 'fa-clock', title: 'Quick Response', desc: 'We respond to all inquiries within 24 hours' },
                                        { icon: 'fa-users', title: 'Expert Team', desc: 'Work with experienced professionals' },
                                        { icon: 'fa-shield-check', title: 'Quality Assurance', desc: 'We deliver high-quality solutions' },
                                        { icon: 'fa-headset', title: '24/7 Support', desc: 'Round-the-clock customer support' }
                                    ].map((feature, index) => (
                                        <div key={index} style={{
                                            display: 'flex',
                                            alignItems: 'start',
                                            marginBottom: '25px'
                                        }}>
                                            <div style={{
                                                width: '50px',
                                                height: '50px',
                                                background: 'linear-gradient(135deg, #0d6efd 0%, #764ba2 100%)',
                                                borderRadius: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginRight: '15px',
                                                flexShrink: 0
                                            }}>
                                                <i className={`fa-light ${feature.icon}`} style={{
                                                    fontSize: '22px',
                                                    color: '#fff'
                                                }}></i>
                                            </div>
                                            <div>
                                                <h5 style={{
                                                    fontSize: '16px',
                                                    fontWeight: '700',
                                                    marginBottom: '5px',
                                                    color: '#0B1422'
                                                }}>
                                                    {feature.title}
                                                </h5>
                                                <p style={{
                                                    color: '#666',
                                                    fontSize: '14px',
                                                    marginBottom: 0
                                                }}>
                                                    {feature.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Social Links */}
                                <div style={{ marginTop: '40px' }}>
                                    <h5 style={{
                                        fontSize: '18px',
                                        fontWeight: '700',
                                        marginBottom: '15px',
                                        color: '#0B1422'
                                    }}>
                                        Follow Us
                                    </h5>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        {[
                                            { icon: 'linkedin-in', link: 'https://www.linkedin.com/' },
                                            { icon: 'instagram', link: 'https://www.instagram.com/nexberntechnologies?igsh=cnB6NjB4bDIxanVp' }
                                        ].map((social, index) => (
                                            <a
                                                key={index}
                                                href={social.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    width: '45px',
                                                    height: '45px',
                                                    background: '#f8f9fa',
                                                    borderRadius: '10px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: '#666',
                                                    fontSize: '18px',
                                                    transition: 'all 0.3s ease',
                                                    textDecoration: 'none'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                                                    e.currentTarget.style.color = '#fff';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = '#f8f9fa';
                                                    e.currentTarget.style.color = '#666';
                                                }}
                                            >
                                                <i className={`fab fa-${social.icon}`}></i>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            {/* <section className="space-bottom">
                <div className="container">
                    <div className="map-wrapper" style={{
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3160419279!2d78.24323209999999!3d17.412608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1234567890"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </section> */}

            <Footer />
        </>
    );
}
