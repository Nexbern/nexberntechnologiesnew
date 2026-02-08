'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'swiper/css';
import 'swiper/css/pagination';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Services() {
    useEffect(() => {
        // Initialize Animations
        let retryCount = 0;
        const maxRetries = 20;

        const initAnimations = () => {
            // Re-register plugin right before use to ensure it's active in this scope
            gsap.registerPlugin(ScrollTrigger);

            // Check if SplitText is available from app.min.js
            if ((window as any).SplitText) {
                const SplitText = (window as any).SplitText;

                // Text Animation Style 2
                document.querySelectorAll(".text-anime-style-2").forEach((n) => {
                    // Check if already initialized to avoid duplication/errors
                    if (n.getAttribute('data-text-anim-init')) return;

                    let o = new SplitText(n, { type: "chars, words" });
                    gsap.from(o.chars, {
                        duration: 2,
                        delay: 0.1,
                        x: 20,
                        autoAlpha: 0,
                        stagger: 0.03,
                        ease: "power2.out",
                        scrollTrigger: { trigger: n, start: "top 85%" }
                    });

                    n.setAttribute('data-text-anim-init', 'true');
                });

                // Text Animation Style 3
                document.querySelectorAll(".text-anime-style-3").forEach((e) => {
                    if (e.getAttribute('data-text-anim-init')) return;

                    let s = new SplitText(e, { type: "lines,words,chars", linesClass: "split-line" });
                    gsap.set(e, { perspective: 400 });
                    gsap.set(s.chars, { opacity: 0, x: "50" });
                    gsap.to(s.chars, {
                        scrollTrigger: { trigger: e, start: "top 90%" },
                        x: "0",
                        y: "0",
                        rotateX: "0",
                        opacity: 1,
                        duration: 1,
                        ease: "back.out",
                        stagger: 0.02
                    });
                    e.setAttribute('data-text-anim-init', 'true');
                });
            } else if (retryCount < maxRetries) {
                // Retry if SplitText not loaded yet from app.min.js
                retryCount++;
                setTimeout(initAnimations, 100);
                return;
            }

            // Init WOW.js
            if ((window as any).WOW) {
                new (window as any).WOW({
                    boxClass: 'wow',
                    animateClass: 'animated',
                    offset: 0,
                    mobile: true,
                    live: true
                }).init();
            }

            // Init Shape Mockup (ported from main.js)
            if ((window as any).jQuery && (window as any).jQuery.fn.shapeMockup) {
                (window as any).jQuery('.shape-mockup').shapeMockup();
            } else if ((window as any).jQuery) {
                // Fallback if plugin not available on jQuery object yet (race condition) or manual impl
                document.querySelectorAll('.shape-mockup').forEach(el => {
                    const $el = (window as any).jQuery(el);
                    const top = $el.data('top');
                    const right = $el.data('right');
                    const bottom = $el.data('bottom');
                    const left = $el.data('left');
                    $el.css({ top, right, bottom, left })
                        .removeAttr('data-top')
                        .removeAttr('data-right')
                        .removeAttr('data-bottom')
                        .removeAttr('data-left')
                        .parent().addClass('shape-mockup-wrap');
                });
            }
        };

        // Slight delay to ensure DOM is ready
        setTimeout(initAnimations, 100);
    }, []);

    const services = [
        { title: 'Mobile App Development', img: 'sv-1.jpg', slug: 'mobile-app-development', description: 'Creating user-centric mobile applications for iOS and Android that drive engagement and business growth.' },
        { title: 'Web Development', img: 'sv-2.jpg', slug: 'web-development', description: 'Creating responsive, user-friendly websites and web applications tailored to your business needs using modern technologies.' },
        { title: 'Cloud Consulting', img: 'sv-3.jpg', slug: 'cloud-consulting', description: 'Helping businesses migrate to cloud platforms, optimize cloud infrastructure, and implement cloud-based solutions.' },
        { title: 'AI & Machine Learning', img: 'sv-4.jpg', slug: 'ai-machine-learning', description: 'Implementing AI and ML solutions to automate processes, gain insights from data, and improve decision-making.' },
        { title: 'SEO & Digital Marketing', img: 'sv-5.jpg', slug: 'seo-digital-marketing', description: 'Enhancing your online visibility and driving organic traffic through strategic SEO and digital marketing campaigns.' },
        // { title: 'Cloud Solutions', img: 'sv-6.jpg', slug: 'cloud-solutions' },
        { title: 'IT Consulting', img: 'sv-7.jpg', slug: 'it-consulting', description: 'Assessing current IT infrastructure and aligning it with business goals. Developing a roadmap for technology adoption.' },
    ];

    return (
        <>
            <Header />

            {/* Breadcrumb Area */}
            <div className="breadcumb-area style2 bg-smoke4">
                <div className="breadcumb-wrapper" data-bg-src="/assets/img/bg/breadcumb-bg.jpg">
                    <div className="container">
                        <div className="breadcumb-content">
                            <h1 className="breadcumb-title">Our Services</h1>
                            <ul className="breadcumb-menu">
                                <li><Link href="/">Home</Link></li>
                                <li>Our Services</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <section className="position-relative bg-top-center overflow-hidden space-top" id="service-sec">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="title-area service-title-box text-center">
                                <span className="sub-title mb-15 text-anime-style-2">What We're Offering</span>
                                <h2 className="sec-title text-anime-style-3">Dealing in all professional IT services</h2>
                                <p className="sec-text mb-50 wow fadeInUp" data-wow-delay=".3s">
                                    IT solutions refer to a broad range of services and technologies designed to address<br />specific business needs, streamline operations, and drive growth.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="service-area">
                        <div className="row gy-30 justify-content-center">
                            {services.map((service, index) => (
                                <div key={index} className="col-xl-4 col-md-6">
                                    <div className="service-box service-style-1">
                                        <div className="service-img">
                                            <Link href={`/service-details/${service.slug}`}>
                                                <img src={`/assets/img/service/${service.img}`} alt={service.title} />
                                            </Link>
                                        </div>
                                        <div className="service-content">
                                            <h3 className="box-title">
                                                <Link href={`/service-details/${service.slug}`}>{service.title}</Link>
                                            </h3>
                                            <p className="service-box_text">
                                                {service.description}
                                            </p>
                                            <Link className="th-btn style4" href={`/service-details/${service.slug}`}>
                                                Read More <i className="fa-light fa-arrow-right-long"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Process Section */}
            <section className="process-area bg-top-center space" style={{ backgroundImage: 'url(/assets/img/bg/process-1-2-bg.jpg)' }}>
                <div className="container">
                    <div className="process-area">
                        <div className="process-content text-center">
                            <div className="title-area mb-55">
                                <span className="sub-title style1 text-anime-style-2">Our Process</span>
                                <h2 className="sec-title text-anime-style-3">How It Work Process!</h2>
                            </div>
                        </div>
                        <div className="slider-area">
                            <Swiper
                                modules={[Autoplay, Pagination]}
                                className="th-slider has-shadow"
                                loop={false}
                                spaceBetween={24}
                                autoplay={{ delay: 3000, disableOnInteraction: false }}
                                breakpoints={{
                                    0: { slidesPerView: 1 },
                                    576: { slidesPerView: 1 },
                                    768: { slidesPerView: 2 },
                                    992: { slidesPerView: 3 },
                                    1200: { slidesPerView: 3 },
                                    1400: { slidesPerView: 4 }
                                }}
                            >
                                <SwiperSlide>
                                    <div className="process-item">
                                        <div className="process-img mb-20">
                                            <a href="#">
                                                <img src="/assets/img/process/process_2_1.jpg" alt="service image" />
                                            </a>
                                        </div>
                                        <div className="process-content text-center">
                                            <h3 className="box-title mb-10">
                                                <a href="#">Requirement Analysis</a>
                                            </h3>
                                            <p className="process-text">
                                                Identify and create relevant features that enhance the model's performance.
                                            </p>
                                            <p className="box-number">STEP -01</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="process-item">
                                        <div className="process-img mb-20">
                                            <a href="#">
                                                <img src="/assets/img/process/process_2_2.jpg" alt="service image" />
                                            </a>
                                        </div>
                                        <div className="process-content text-center">
                                            <h3 className="box-title mb-10">
                                                <a href="#">Planning Integration</a>
                                            </h3>
                                            <p className="process-text">
                                                Retrain the model with new data to maintain relevance and effectiveness.
                                            </p>
                                            <p className="box-number">STEP -02</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="process-item">
                                        <div className="process-img mb-20">
                                            <a href="#">
                                                <img src="/assets/img/process/process_2_3.jpg" alt="service image" />
                                            </a>
                                        </div>
                                        <div className="process-content text-center">
                                            <h3 className="box-title mb-10">
                                                <a href="#">Design & Development</a>
                                            </h3>
                                            <p className="process-text">
                                                Integrate the trained model into the desired platform, application, or system.
                                            </p>
                                            <p className="box-number">STEP -03</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="process-item">
                                        <div className="process-img mb-20">
                                            <a href="#">
                                                <img src="/assets/img/process/process_2_4.jpg" alt="service image" />
                                            </a>
                                        </div>
                                        <div className="process-content text-center">
                                            <h3 className="box-title mb-10">
                                                <a href="#">Maintenance & Update</a>
                                            </h3>
                                            <p className="process-text">
                                                Incorporate user feedback and system outcomes for iterative improvements.
                                            </p>
                                            <p className="box-number">STEP -04</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            {/* <div className="position-relative overflow-hidden space">
                <div className="cta-sec6 theme-bg position-relative overflow-hidden">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-lg-6">
                                <div className="cta-area6 text-center text-md-start space position-relative">
                                    <div className="title-area mb-40">
                                        <h2 className="sec-title text-white pe-xl-5 me-xl-4 mt-n3 text-anime-style-2">
                                            <span className="discount-text">Grab up to 35% off</span>
                                            Have any project to work with us
                                        </h2>
                                        <p className="text-white wow fadeInUp" data-wow-delay=".3s">
                                            Limited time offer, don't miss the opportunity
                                        </p>
                                    </div>
                                    <div className="btn-group wow fadeInUp" data-wow-delay=".4s">
                                        <Link href="/contact" className="th-btn style5 th-radius th-icon">
                                            Contact With Us <i className="fa-light fa-arrow-right-long"></i>
                                        </Link>
                                    </div>
                                    <div className="cta6-shape">
                                        <img src="/assets/img/shape/cta6-shape.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="shape-mockup" data-bottom="0%" data-right="0">
                        <img src="/assets/img/normal/cta-img-6.jpg" alt="" />
                    </div>
                </div>
            </div> */}

            {/* Brand Section */}
            {/* <div className="brand-sec space-bottom">
                <div className="container th-container4">
                    <p className="sec-note text-center mb-60">Trusted by 1600+ of the world's most popular companies</p>
                    <Swiper
                        modules={[Autoplay]}
                        className="th-slider brandSlider1"
                        loop={true}
                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            576: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            992: { slidesPerView: 3 },
                            1300: { slidesPerView: 6 },
                            1400: { slidesPerView: 7 }
                        }}
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 1, 4, 3, 2, 1, 1, 1].map((num, index) => (
                            <SwiperSlide key={index}>
                                <div className="brand-box">
                                    <a href="#">
                                        <img className="original" src={`/assets/img/brand/brand_1_${num}.svg`} alt="Brand Logo" />
                                        <img className="gray" src={`/assets/img/brand/brand_1_${num}.svg`} alt="Brand Logo" />
                                    </a>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div> */}

            <Footer />
        </>
    );
}
