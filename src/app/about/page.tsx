'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function About() {
    const [activeAccordion, setActiveAccordion] = useState('collapse-1');

    useEffect(() => {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

        // Initialize animations
        const initAnimations = () => {
            // GRADIENT BACKGROUND ANIMATION - Same as original template
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

            // GRADIENT BACKGROUND ANIMATION 2 - For white backgrounds
            document.querySelectorAll('.scroll-text-ani2').forEach((element) => {
                if (element.getAttribute('data-text-anim-init')) return;

                gsap.to(element, {
                    backgroundImage: 'linear-gradient(to right, #ffffff 100%, #a8a8a8ff 100%)',
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

            // Initialize circular progress bars
            if ((window as any).jQuery && (window as any).jQuery.fn.circleProgress) {
                setTimeout(() => {
                    (window as any).jQuery('.circle').each(function (this: any) {
                        const $circle = (window as any).jQuery(this);
                        const percent = $circle.data('percent') || 0;
                        const pathColor = $circle.closest('.progressbar').data('path-color') || '#0B59DB';

                        $circle.circleProgress({
                            value: percent / 100,
                            size: 200,
                            thickness: 8,
                            fill: { color: pathColor },
                            emptyFill: 'rgba(0, 0, 0, 0.1)',
                            animation: { duration: 2000, easing: 'circleProgressEasing' },
                            animationStartValue: 0
                        }).on('circle-animation-progress', function (this: any, event: any, progress: number) {
                            const value = Math.round(percent * progress);
                            (window as any).jQuery(this).find('.circle-num').text(value + '%');
                        });
                    });
                }, 500);
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

            // Spin animation for FAQ image
            document.querySelectorAll('.spin').forEach((element) => {
                gsap.to(element, {
                    rotation: 360,
                    duration: 20,
                    repeat: -1,
                    ease: 'none'
                });
            });

            // Discount anime - Lettering.js style circular text
            if ((window as any).jQuery) {
                setTimeout(() => {
                    (window as any).jQuery('.discount-anime').each(function (this: any) {
                        const $el = (window as any).jQuery(this);
                        const text = $el.text();
                        const chars = text.split('');
                        $el.empty();

                        chars.forEach((char: string, i: number) => {
                            const $span = (window as any).jQuery('<span>').text(char).addClass('char' + (i + 1));
                            $el.append($span);
                        });
                    });
                }, 200);
            }

            // Discount wrapper rotation
            document.querySelectorAll('.discount-wrapp').forEach((element) => {
                gsap.to(element, {
                    rotation: 360,
                    duration: 20,
                    repeat: -1,
                    ease: 'none'
                });
            });
        };

        initAnimations();

        // Initialize counter animations
        const counters = document.querySelectorAll('.counter-number');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent || '0');
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target.toString();
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current).toString();
                }
            }, 30);
        });

        // Process card hover effect
        const processCards = document.querySelectorAll('.process-card4');
        const processImages = document.querySelectorAll('.process-box-img');

        processCards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                processCards.forEach(c => c.classList.remove('item-active2'));
                processImages.forEach(img => img.classList.remove('active-img'));
                card.classList.add('item-active2');
                if (processImages[index]) {
                    processImages[index].classList.add('active-img');
                }
            });
        });

    }, []);

    const toggleAccordion = (id: string) => {
        setActiveAccordion(activeAccordion === id ? '' : id);
    };

    const faqData = [
        {
            id: 'collapse-1',
            question: 'Can You Help Migrate Our Data To The Cloud?',
            answer: 'Absolutely. We provide secure and seamless cloud migration services with minimal downtime and full data integrity. We begin with a deep understanding of your business needs, current IT environment, and long-term goals. Our team conducts a thorough assessment to identify gaps, Based on the assessment, we develop a customized IT solution—whether it\'s infrastructure setup, cloud migration, cybersecurity,'
        },
        {
            id: 'collapse-2',
            question: 'How Do You Ensure Our Data And Systems Are Secure?',
            answer: 'Absolutely. We provide secure and seamless cloud migration services with minimal downtime and full data integrity. We begin with a deep understanding of your business needs, current IT environment, and long-term goals. Our team conducts a thorough assessment to identify gaps, Based on the assessment, we develop a customized IT solution—whether it\'s infrastructure setup, cloud migration, cybersecurity,'
        },
        {
            id: 'collapse-3',
            question: 'What If We Already Have An In-House IT Team?',
            answer: 'Absolutely. We provide secure and seamless cloud migration services with minimal downtime and full data integrity. We begin with a deep understanding of your business needs, current IT environment, and long-term goals. Our team conducts a thorough assessment to identify gaps, Based on the assessment, we develop a customized IT solution—whether it\'s infrastructure setup, cloud migration, cybersecurity,'
        },
        {
            id: 'collapse-4',
            question: 'How Do I Know Which IT Services My Business Needs?',
            answer: 'Absolutely. We provide secure and seamless cloud migration services with minimal downtime and full data integrity. We begin with a deep understanding of your business needs, current IT environment, and long-term goals. Our team conducts a thorough assessment to identify gaps, Based on the assessment, we develop a customized IT solution—whether it\'s infrastructure setup, cloud migration, cybersecurity,'
        }
    ];

    const testimonials = [
        {
            name: 'Michel Andric',
            role: 'CEO & Founder, Company ABC',
            image: 'testi_9_1.jpg',
            text: 'With years of experience in the IT industry, our certified professionals bring deep knowledge and proven solutions to every project—whether it\'s cloud computing, cybersecurity, or software development.'
        },
        {
            name: 'Andrew Simon',
            role: 'CEO & Founder, Company ABC',
            image: 'testi_9_2.jpg',
            text: 'IT Solutions encompass a wide range of services, technologies, and strategies designed to address the technological needs of businesses and organizations. These solutions are tailored to improve efficiency.'
        }
    ];

    return (
        <>
            <Header />

            {/* Breadcrumb */}
            <div className="breadcumb-area style2 bg-smoke4">
                <div className="breadcumb-wrapper" style={{ backgroundImage: 'url(/assets/img/bg/breadcumb-bg.jpg)' }}>
                    <div className="container">
                        <div className="breadcumb-content">
                            <h1 className="breadcumb-title">About Us</h1>
                            <ul className="breadcumb-menu">
                                <li><Link href="/">Home</Link></li>
                                <li>About Us</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="about-area space overflow-hidden" id="about-sec">
                <div className="shape-mockup jump d-none d-xl-block" data-top="35%" data-right="3%">
                    <img src="/assets/img/shape/ab-1-shape-1.png" alt="shape" />
                </div>
                <div className="shape-mockup jump d-none d-xl-block" data-bottom="15%" data-left="3%">
                    <img src="/assets/img/shape/ab-1-shape-2.png" alt="shape" />
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-10">
                            <div className="title-area text-center">
                                <span className="sub-title">
                                    <span className="squre-shape left me-3"></span>
                                    About Us Our Company
                                    <span className="squre-shape right ms-3"></span>
                                </span>
                                <h2 className="sec-title mb-20">
                                    <span className="scroll-text-ani">Empowering Businesses Through Smart IT Solutions</span>
                                </h2>
                            </div>
                        </div>
                        <div className="col-xl-12">
                            <div className="about-wrap13">
                                <div className="about-wrap-counter">
                                    <div className="about-circle2">
                                        <div className="progressbar" data-path-color="#0B59DB">
                                            <div className="circle" data-percent="80">
                                                <div className="circle-num"></div>
                                            </div>
                                        </div>
                                        <h3 className="box-title">Empowering Innovation One Solution at a Time</h3>
                                    </div>
                                    <div className="img-box13-2">
                                        <div className="img1">
                                            <img src="/assets/img/normal/about_13_3.png" alt="img" />
                                        </div>
                                    </div>
                                </div>
                                <div className="about-wrapp-content">
                                    <p className="sec-text mb-30">
                                        IT solutions refer to a broad range of services and technologies designed to address specific business needs, streamline operations, and drive growth. These solutions encompass hardware.
                                    </p>
                                    <div className="about-item-wrap">
                                        <div className="about-item style2">
                                            <div className="about-item_img">
                                                <img src="/assets/img/icon/about_13_1.svg" alt="" />
                                            </div>
                                            <div className="about-item_centent">
                                                <h5 className="box-title">Innovation at our core</h5>
                                                <p className="about-item_text">There are many variations of passages of available but the majority.</p>
                                            </div>
                                        </div>
                                        <div className="about-item style2">
                                            <div className="about-item_img">
                                                <img src="/assets/img/icon/about_13_2.svg" alt="" />
                                            </div>
                                            <div className="about-item_centent">
                                                <h5 className="box-title">Internal Networking</h5>
                                                <p className="about-item_text">There are many variations of passages of available but the majority.</p>
                                            </div>
                                        </div>
                                        <div className="about-item style2">
                                            <div className="about-item_img">
                                                <img src="/assets/img/icon/about_13_3.svg" alt="" />
                                            </div>
                                            <div className="about-item_centent">
                                                <h5 className="box-title">Simplifying complexity</h5>
                                                <p className="about-item_text">There are many variations of passages of available but the majority.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="btn-group mt-40">
                                        <Link href="/contact" className="th-btn style8 th-radius th-icon">
                                            Discover More <i className="fa-light fa-arrow-right-long"></i>
                                        </Link>
                                    </div>
                                </div>
                                <div className="img-box13-1">
                                    <div className="img1">
                                        <img src="/assets/img/normal/about_13_2.png" alt="img" />
                                    </div>
                                    <div className="about-wrap-counter style2">
                                        <div className="about-circle2">
                                            <div className="progressbar" data-path-color="#ffffff">
                                                <div className="circle" data-percent="92">
                                                    <div className="circle-num"></div>
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <h3 className="box-title">Reliable IT. Real-Time Results.</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="discount-tag">
                                        <Link href="/" className="icon">
                                            <img src="/assets/img/normal/sign1.png" alt="img" />
                                        </Link>
                                        <div className="discount-wrapp">
                                            <span className="discount-anime">Nexber Technologies EXPERT</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Counter Section */}
            {/* <div className="counter-area overflow-hidden">
                <div className="container">
                    <div className="counter-wrap5">
                        <div className="row gy-40">
                            <div className="col-sm-6 col-lg-3 counter-card-wrap5">
                                <div className="counter-card5">
                                    <div className="media-body">
                                        <h3 className="box-number">
                                            <span className="counter-number">8</span>K
                                        </h3>
                                        <h6 className="counter-title">Project Completed</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3 counter-card-wrap5">
                                <div className="counter-card5">
                                    <div className="media-body">
                                        <h3 className="box-number">
                                            <span className="counter-number">260</span>+
                                        </h3>
                                        <h6 className="counter-title">Skilled Experts</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3 counter-card-wrap5">
                                <div className="counter-card5">
                                    <div className="media-body">
                                        <h3 className="box-number">
                                            <span className="counter-number">60</span>K
                                        </h3>
                                        <h6 className="counter-title">Media Activities</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3 counter-card-wrap5">
                                <div className="counter-card5">
                                    <div className="media-body">
                                        <h3 className="box-number">
                                            <span className="counter-number">19</span>K
                                        </h3>
                                        <h6 className="counter-title">Happy Clients</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Work Process Section */}
            <section className="process-sec4 overflow-hidden space" id="process-sec" style={{ backgroundImage: 'url(/assets/img/bg/process-4-1-bg.png)' }}>
                <div className="shape-mockup process-bg-shape4-1" data-left="4%" data-top="13%">
                    <img src="/assets/img/process/process-thumbbg4-1.png" alt="img" />
                </div>
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-xl-7 col-lg-8">
                            <div className="title-area">
                                <span className="sub-title">
                                    <span className="squre-shape left me-3"></span>
                                    Work Process
                                    <span className="squre-shape right ms-3"></span>
                                </span>
                                <h2 className="sec-title">
                                    <span className="scroll-text-ani">Managed IT Services That Keep You Moving Forward</span>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="row gy-40 gx-100">
                        <div className="col-xl-6">
                            <div className="process-box-img-wrap">
                                <div className="process-box-img active-img">
                                    <img className="box-img" src="/assets/img/process/process_4_1.jpg" alt="img" />
                                </div>
                                <div className="process-box-img">
                                    <img className="box-img" src="/assets/img/process/process_4_2.jpg" alt="img" />
                                </div>
                                <div className="process-box-img">
                                    <img className="box-img" src="/assets/img/process/process_4_3.jpg" alt="img" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="process-card-wrap4">
                                <div className="process-card4 hover-item2 item-active2">
                                    <div className="box-content">
                                        <h4 className="box-title">Consultation and Assessment</h4>
                                        <p className="box-text">We begin with a deep understanding of your business needs, current IT environment,</p>
                                    </div>
                                    <div className="box-number">01</div>
                                </div>
                                <div className="process-card4 hover-item2">
                                    <div className="box-content">
                                        <h4 className="box-title">Implementation and Integration</h4>
                                        <p className="box-text">Our team ensures seamless integration of new solutions into your existing infrastructure,</p>
                                    </div>
                                    <div className="box-number">02</div>
                                </div>
                                <div className="process-card4 hover-item2">
                                    <div className="box-content">
                                        <h4 className="box-title">Ongoing Support and Optimization</h4>
                                        <p className="box-text">We provide continuous support and regularly assess performance to enhance system efficiency.</p>
                                    </div>
                                    <div className="box-number">03</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            {/* <section className="team-area7 position-relative space overflow-hidden">
                <div className="container">
                    <div className="team-title-wrap7">
                        <div className="title-area">
                            <span className="sub-title">
                                <span className="squre-shape left me-3"></span>
                                Our Team
                            </span>
                            <h2 className="sec-title">
                                <span className="scroll-text-ani">Meet Our Experts</span>
                            </h2>
                            <p className="sec-text mb-0">Expert guidance on digital transformation, infrastructure planning, and technology roadmaps aligned.</p>
                        </div>
                        <div className="sec-btn">
                            <Link href="/team" className="th-btn th-btn-sm th-radius style9 th-icon">
                                View All Team <i className="fa-light fa-arrow-right-long"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="team-card-wrap7">
                            {[
                                { name: 'Jane Cooper', role: 'Web Designer', img: 'team_7_1.jpg' },
                                { name: 'Jacob Jones', role: 'Web Designer', img: 'team_7_2.jpg' },
                                { name: 'Janny Willson', role: 'Web Designer', img: 'team_7_3.jpg' },
                                { name: 'Maria Prova', role: 'Web Designer', img: 'team_7_4.jpg' },
                                { name: 'Rebeka Maliha', role: 'Web Designer', img: 'team_7_5.jpg' },
                                { name: 'Michel Smith', role: 'Web Designer', img: 'team_7_6.jpg' }
                            ].map((member, index) => (
                                <div key={index} className="team-card7-wrap">
                                    <div className="th-team team-card7">
                                        <div className="team-img">
                                            <img src={`/assets/img/team/${member.img}`} alt="Team" />
                                        </div>
                                        <div className="team-content">
                                            <div className="media-body">
                                                <h3 className="box-title">
                                                    <Link href="/team-details">{member.name}</Link>
                                                </h3>
                                                <span className="team-desig">{member.role}</span>
                                            </div>
                                            <div className="th-social">
                                                <a target="_blank" href="https://facebook.com/">
                                                    <i className="fab fa-facebook-f"></i>
                                                </a>
                                                <a target="_blank" href="https://twitter.com/">
                                                    <i className="fab fa-twitter"></i>
                                                </a>
                                                <a target="_blank" href="https://instagram.com/">
                                                    <i className="fab fa-instagram"></i>
                                                </a>
                                                <a target="_blank" href="https://linkedin.com/">
                                                    <i className="fab fa-linkedin-in"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section> */}

            {/* FAQ and Brand Section */}
            <div className="faq-area4 position-relative z-index-common space-top overflow-hidden" id="faq-sec">
                <div className="faq-area4-bg-gradient"></div>
                <div className="shape-mockup faq-bg-shape4-1 d-md-block d-none" data-top="-14%" data-right="2%">
                    <img src="/assets/img/shape/faq-bg-shape4-1.png" alt="img" />
                </div>

                {/* Brand/Partners Section */}
                <div className="brand-area space-bottom">
                    <div className="container">
                        <div className="title-area">
                            <span className="sub-title text-white">
                                <span className="squre-shape left me-3"></span>
                                Our Partners
                            </span>
                            <h2 className="sec-title text-white">
                                <span className="scroll-text-ani2">Our Clients and Partners</span>
                            </h2>
                        </div>
                        <Swiper
                            modules={[Autoplay]}
                            loop={true}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            breakpoints={{
                                0: { slidesPerView: 1 },
                                576: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                992: { slidesPerView: 3 },
                                1200: { slidesPerView: 5 },
                                1400: { slidesPerView: 6 }
                            }}
                            className="th-slider brandSlider1"
                        >
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                                <SwiperSlide key={num}>
                                    <div className="brand-box style2">
                                        <div className="brand-box-bg">
                                            <img src="/assets/img/shape/brand_box_bg_2_1.png" alt="img" />
                                        </div>
                                        <a href="#">
                                            <img className="original" src={`/assets/img/brand/brand_3_${num}.svg`} alt="Brand Logo" />
                                            <img className="gray" src={`/assets/img/brand/brand_3_${num}.svg`} alt="Brand Logo" />
                                        </a>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="faq-wrap4 bg-white space">
                    <div className="container">
                        <div className="row gy-50 justify-content-between">
                            <div className="col-xl-4">
                                <div className="title-area mb-30">
                                    <span className="sub-title">
                                        <span className="squre-shape left me-3"></span>
                                        FAQ
                                    </span>
                                    <h2 className="sec-title">
                                        <span className="scroll-text-ani">Frequently Asked Questions</span>
                                    </h2>
                                </div>
                                <p className="mb-0">With years of experience in the IT industry, our certified professionals bring deep knowledge and proven solutions to every project</p>
                                <div className="btn-wrap mt-35">
                                    <Link href="/faq" className="th-btn th-btn-sm th-radius style9 th-icon">
                                        Asked Questions <i className="fa-light fa-arrow-right-long"></i>
                                    </Link>
                                </div>
                                <div className="faq-img4 mt-30">
                                    <img className="spin" src="/assets/img/shape/faq-shape4-1.png" alt="img" />
                                </div>
                            </div>
                            <div className="col-xl-7">
                                <div className="accordion" id="faqAccordion">
                                    {faqData.map((faq, index) => (
                                        <div key={faq.id} className="accordion-card style5">
                                            <div className="accordion-header" id={`collapse-item-${index + 1}`}>
                                                <button
                                                    className={`accordion-button ${activeAccordion === faq.id ? '' : 'collapsed'}`}
                                                    type="button"
                                                    onClick={() => toggleAccordion(faq.id)}
                                                >
                                                    {faq.question}
                                                </button>
                                            </div>
                                            <div
                                                id={faq.id}
                                                className={`accordion-collapse collapse ${activeAccordion === faq.id ? 'show' : ''}`}
                                            >
                                                <div className="accordion-body">
                                                    <div className="faq-img-box4">
                                                        <div className="img1">
                                                            <img src="/assets/img/normal/faq_img4_1.png" alt="img" />
                                                        </div>
                                                        <div className="img2">
                                                            <img src="/assets/img/normal/faq_img4_2.png" alt="img" />
                                                        </div>
                                                    </div>
                                                    <p className="faq-text">{faq.answer}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <section className="testi-area-11 overflow-hidden mb-4" id="testi-sec">
                <div className="testi-wrap11 space overflow-hidden" style={{ backgroundImage: 'url(/assets/img/bg/testi_bg_11.jpg)' }}>
                    <div className="container">
                        <div className="title-area text-center">
                            <span className="sub-title">
                                <span className="squre-shape left me-2"></span>
                                Testimonials
                                <span className="squre-shape right ms-2"></span>
                            </span>
                            <h2 className="sec-title">
                                <span className="scroll-text-ani">Real Feedback from Real Clients</span>
                            </h2>
                        </div>
                        <div className="row gy-40 justify-content-center">
                            <div className="col-xl-4">
                                <div className="testi11-quote-icon-wrap">
                                    <div className="discount-wrapp">
                                        <span className="quote-icon">
                                            <img src="/assets/img/icon/testi-quote6.svg" alt="img" />
                                        </span>
                                        <div className="discount-tag">
                                            <span className="discount-anime">100% TRUSTED OUR CLIENTS * 100% TRUSTED OUR CLIENTS *</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8">
                                <div className="slider-area slider-drag-wrap">
                                    <Swiper
                                        modules={[Autoplay, Pagination]}
                                        slidesPerView={1}
                                        autoHeight={true}
                                        loop={true}
                                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                                        pagination={{ clickable: true, el: '.slider-pagination' }}
                                        className="th-slider testiSlider11-2"
                                    >
                                        {testimonials.map((testi, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="testi-card9">
                                                    <div className="testi-card_review">
                                                        5.0
                                                        <i className="fa-solid fa-star"></i>
                                                        <i className="fa-solid fa-star"></i>
                                                        <i className="fa-solid fa-star"></i>
                                                        <i className="fa-solid fa-star"></i>
                                                        <i className="fa-solid fa-star"></i>
                                                    </div>
                                                    <p className="box-text">{testi.text}</p>
                                                    <div className="box-content">
                                                        <div className="box-img">
                                                            <img src={`/assets/img/testimonial/${testi.image}`} alt="testimonial" />
                                                        </div>
                                                        <div className="media-body">
                                                            <h3 className="box-title">{testi.name}</h3>
                                                            <span className="box-desig">{testi.role}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                        <div className="slider-pagination"></div>
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
