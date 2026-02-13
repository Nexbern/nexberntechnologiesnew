'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
    const [activeAccordion, setActiveAccordion] = useState('collapse-1');

    useEffect(() => {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

        // Initialize animations
        const initAnimations = () => {
            gsap.registerPlugin(ScrollTrigger);
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
            answer: 'Yes, Nexbern Technologies can help migrate your data to the cloud by offering a structured, secure, and business-focused migration process. Nexbern Technologies begins by analyzing your existing infrastructure, applications, and data to understand performance, security, and scalability requirements. Based on this assessment, the team designs a customized cloud migration strategy using reliable platforms such as AWS, Microsoft Azure, or Google Cloud.'
        },
        {
            id: 'collapse-2',
            question: 'How Do You Ensure Our Data And Systems Are Secure?',
            answer: 'At Nexbern Technologies, we ensure the security of your data and systems by following a multi-layered security approach that covers people, processes, and technology. We implement strong access controls, role-based permissions, and multi-factor authentication to prevent unauthorized access. All data is protected using industry-standard encryption both in transit and at rest, along with secure network configurations such as firewalls and intrusion detection systems. Regular security audits, vulnerability assessments, and continuous monitoring are performed to identify and mitigate risks proactively. In addition, we follow best practices and compliance standards to ensure data integrity, confidentiality, and availability, providing our clients with a secure and reliable digital environment.'
        },
        {
            id: 'collapse-3',
            question: 'What If We Already Have An In-House IT Team?',
            answer: 'Even if you already have an in-house IT team, Nexbern Technologies works as a strategic partner rather than a replacement. We collaborate closely with your internal team to complement their skills, provide specialized expertise, and handle complex or time-critical tasks such as cloud migration, security hardening, system optimization, or scalability planning. Your IT team continues to manage day-to-day operations while Nexbern Technologies supports them with advanced tools, best practices, and guidance, ensuring faster implementation, reduced risk, and improved overall system performance without disrupting your existing workflows.'
        },
        {
            id: 'collapse-4',
            question: 'How Do I Know Which IT Services My Business Needs?',
            answer: 'At Nexbern Technologies, we help you identify the right IT services for your business by first understanding your goals, current challenges, and existing technology setup. Our team conducts a detailed assessment of your infrastructure, applications, security posture, and scalability requirements to pinpoint gaps and opportunities for improvement. Based on this analysis, we recommend only the services that align with your business objectives—whether it’s cloud solutions, cybersecurity, software development, or ongoing IT support—ensuring cost efficiency, improved performance, and long-term growth without unnecessary complexity.'
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
                                        IT solutions cover a wide range of services and technologies that address specific business needs, streamline workflows, and support long-term growth. From infrastructure and networking to software and cloud solutions, we provide end-to-end technology support.
                                    </p>
                                    <div className="about-item-wrap">
                                        <div className="about-item style2">
                                            <div className="about-item_img">
                                                <img src="/assets/img/icon/about_13_1.svg" alt="" />
                                            </div>
                                            <div className="about-item_centent">
                                                <h5 className="box-title">Innovation at our core</h5>
                                                <p className="about-item_text">We continuously innovate by adopting the latest technologies and best practices, ensuring our clients stay competitive in a fast-changing digital landscape.</p>
                                            </div>
                                        </div>
                                        <div className="about-item style2">
                                            <div className="about-item_img">
                                                <img src="/assets/img/icon/about_13_2.svg" alt="" />
                                            </div>
                                            <div className="about-item_centent">
                                                <h5 className="box-title">Internal Networking</h5>
                                                <p className="about-item_text">Our internal networking solutions are designed to improve connectivity, security, and performance, enabling seamless communication and collaboration across your organization.</p>
                                            </div>
                                        </div>
                                        <div className="about-item style2">
                                            <div className="about-item_img">
                                                <img src="/assets/img/icon/about_13_3.svg" alt="" />
                                            </div>
                                            <div className="about-item_centent">
                                                <h5 className="box-title">Simplifying complexity</h5>
                                                <p className="about-item_text">We break down complex IT systems into simple, manageable, and efficient solutions, allowing businesses to focus on what matters most—growth and success.</p>
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
                                            {/* <img src="" alt="img" /> */}
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

            {/* Why Choose Us Section */}
            <div className="bg-smoke overflow-hidden space">
                <div className="container">
                    <div className="row gy-4 align-items-center">
                        <div className="col-lg-6 order-1 order-lg-0">
                            <div className="title-area">
                                <span className="sub-title style1">
                                    <span className="squre-shape left me-3"></span>
                                    Why Choose Us
                                </span>
                                <h2 className="sec-title">
                                    <span className="scroll-text-ani">Building the Future of Technology Today</span>
                                </h2>
                                <p className="sec-text me-xl-5 wow fadeInUp" data-wow-delay=".3s">
                                    Nexbern Technologies is a software development company that specializes in designing, developing, and deploying customized software solutions tailored to meet specific business needs. We combine strong technical expertise with innovative strategies to deliver scalable, reliable, and cutting-edge solutions for clients across diverse industries.
                                </p>
                            </div>
                            <div className="choose-about wow fadeInUp">
                                <div className="choose-about_icon">
                                    <img src="/assets/img/icon/choose_1_1.svg" alt="image" />
                                </div>
                                <div className="media-body">
                                    <h3 className="box-title">Evolving Technologies</h3>
                                    <p className="choose-about_text pe-xl-5 me-xl-5">
                                        We stay ahead of the technology curve by continuously learning, adapting, and implementing the latest tools, frameworks, and industry trends to deliver future-ready solutions.
                                    </p>
                                </div>
                            </div>
                            <div className="choose-about wow fadeInUp">
                                <div className="choose-about_icon">
                                    <img src="/assets/img/icon/choose_1_2.svg" alt="image" />
                                </div>
                                <div className="media-body">
                                    <h3 className="box-title">Data Security</h3>
                                    <p className="choose-about_text pe-xl-5 me-xl-5">
                                        We prioritize data protection by strictly adhering to industry standards and compliance requirements such as GDPR, HIPAA, and ISO, ensuring confidentiality, integrity, and trust.
                                    </p>
                                </div>
                            </div>
                            <div className="choose-about wow fadeInUp">
                                <div className="choose-about_icon">
                                    <img src="/assets/img/icon/choose_1_3.svg" alt="image" />
                                </div>
                                <div className="media-body">
                                    <h3 className="box-title">Quality Assurance</h3>
                                    <p className="choose-about_text pe-xl-5 me-xl-5">
                                        Our rigorous testing and quality assurance processes ensure every product is thoroughly tested, bug-free, high-performing, and ready for real-world use.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 order-0 order-lg-1">
                            <div className="choose-wrapp">
                                <div className="img1 global-img">
                                    <img src="/assets/img/choose/choose_3_1.jpg" alt="Choose" />
                                </div>
                                <div className="img1 global-img">
                                    <img src="/assets/img/choose/choose_3_2.jpg" alt="Choose" />
                                </div>
                                <div className="img1 global-img">
                                    <img src="/assets/img/choose/choose_3_3.jpg" alt="Choose" />
                                </div>
                                <div className="img1 global-img">
                                    <img src="/assets/img/choose/choose_3_4.jpg" alt="Choose" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* FAQ and Brand Section */}
            <div className="faq-area4 position-relative z-index-common space-top overflow-hidden" id="faq-sec">
                <div className="faq-area4-bg-gradient"></div>
                <div className="shape-mockup faq-bg-shape4-1 d-md-block d-none" data-top="-14%" data-right="2%">
                    <img src="/assets/img/shape/faq-bg-shape4-1.png" alt="img" />
                </div>

                {/* Brand/Partners Section */}

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
