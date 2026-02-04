'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Service data with detailed information
const serviceData: Record<string, any> = {
    'mobile-app-development': {
        title: 'Mobile App Development',
        image: 'sv-details.jpg',
        description: 'Mobile app development focuses on creating innovative, user-friendly applications for iOS and Android platforms. Our expert team delivers high-performance mobile solutions that engage users and drive business growth.',
        fullDescription: 'In today\'s mobile-first world, businesses need robust and scalable mobile applications to reach their customers effectively. Our mobile app development services encompass native app development, cross-platform solutions, and progressive web apps. We leverage the latest technologies and frameworks to create apps that deliver exceptional user experiences while maintaining optimal performance and security.',
        features: [
            'Native iOS and Android app development',
            'Cross-platform development with React Native & Flutter',
            'Progressive Web Apps (PWA)',
            'App UI/UX design and prototyping',
            'App testing and quality assurance',
            'App store optimization and deployment',
            'Ongoing maintenance and support'
        ],
        images: ['sv-sm-1.jpg', 'sv-sm-2.jpg']
    },
    'web-development': {
        title: 'Web Development',
        image: 'sv-details.jpg',
        description: 'Professional web development services that create responsive, scalable, and secure websites tailored to your business needs. We build modern web applications using cutting-edge technologies.',
        fullDescription: 'Our web development services cover everything from simple landing pages to complex enterprise web applications. We use modern frameworks and best practices to ensure your website is fast, secure, and scalable. Our team specializes in responsive design, ensuring your website looks great on all devices.',
        features: [
            'Custom website development',
            'Responsive and mobile-first design',
            'E-commerce solutions',
            'Content Management Systems (CMS)',
            'Web application development',
            'API development and integration',
            'Performance optimization and SEO'
        ],
        images: ['sv-sm-1.jpg', 'sv-sm-2.jpg']
    },
    'cloud-consulting': {
        title: 'Cloud Consulting',
        image: 'sv-details.jpg',
        description: 'Expert cloud consulting services to help businesses migrate, optimize, and manage their cloud infrastructure. We provide strategic guidance for AWS, Azure, and Google Cloud platforms.',
        fullDescription: 'Cloud computing has revolutionized how businesses operate, offering scalability, flexibility, and cost-efficiency. Our cloud consulting services help organizations leverage cloud technologies to transform their operations. We provide end-to-end cloud solutions, from strategy and migration to optimization and management.',
        features: [
            'Cloud strategy and roadmap development',
            'Cloud migration and deployment',
            'Multi-cloud and hybrid cloud solutions',
            'Cloud security and compliance',
            'Cost optimization and monitoring',
            'DevOps and automation',
            '24/7 cloud infrastructure support'
        ],
        images: ['sv-sm-1.jpg', 'sv-sm-2.jpg']
    },
    'ai-machine-learning': {
        title: 'AI & Machine Learning',
        image: 'sv-details.jpg',
        description: 'Harness the power of artificial intelligence and machine learning to automate processes, gain insights, and drive innovation. We develop custom AI solutions tailored to your business challenges.',
        fullDescription: 'Artificial Intelligence and Machine Learning are transforming industries by enabling intelligent automation, predictive analytics, and data-driven decision-making. Our AI/ML services help businesses unlock the potential of their data through custom models, natural language processing, computer vision, and more.',
        features: [
            'Custom AI model development',
            'Machine learning algorithm implementation',
            'Natural Language Processing (NLP)',
            'Computer vision and image recognition',
            'Predictive analytics and forecasting',
            'AI-powered chatbots and virtual assistants',
            'Model training and optimization'
        ],
        images: ['sv-sm-1.jpg', 'sv-sm-2.jpg']
    },
    'seo-digital-marketing': {
        title: 'SEO & Digital Marketing',
        image: 'sv-details.jpg',
        description: 'Comprehensive SEO and digital marketing services to increase your online visibility, drive traffic, and boost conversions. We create data-driven strategies that deliver measurable results.',
        fullDescription: 'In the digital age, having a strong online presence is crucial for business success. Our SEO and digital marketing services help you reach your target audience, improve search rankings, and maximize ROI. We combine technical SEO, content marketing, social media, and paid advertising to create holistic marketing strategies.',
        features: [
            'Search Engine Optimization (SEO)',
            'Pay-Per-Click (PPC) advertising',
            'Social media marketing',
            'Content marketing and strategy',
            'Email marketing campaigns',
            'Analytics and performance tracking',
            'Conversion rate optimization'
        ],
        images: ['sv-sm-1.jpg', 'sv-sm-2.jpg']
    },
    'it-consulting': {
        title: 'IT Consulting',
        image: 'sv-details.jpg',
        description: 'Strategic IT consulting services to help businesses align technology with their goals. We provide expert guidance on IT strategy, digital transformation, and technology implementation.',
        fullDescription: 'Our IT consulting services help organizations navigate the complex technology landscape and make informed decisions about their IT investments. We work closely with stakeholders to understand business objectives and develop comprehensive IT strategies that drive growth, improve efficiency, and reduce costs.',
        features: [
            'IT strategy and planning',
            'Digital transformation consulting',
            'Technology assessment and audits',
            'IT infrastructure optimization',
            'Cybersecurity consulting',
            'Vendor selection and management',
            'Change management and training'
        ],
        images: ['sv-sm-1.jpg', 'sv-sm-2.jpg']
    }
};

export default function ServiceDetails() {
    const params = useParams();
    const slug = params.slug as string;
    const service = serviceData[slug];

    useEffect(() => {
        // Initialize Animations
        let retryCount = 0;
        const maxRetries = 20;

        const initAnimations = () => {
            gsap.registerPlugin(ScrollTrigger);

            if ((window as any).SplitText) {
                const SplitText = (window as any).SplitText;

                document.querySelectorAll(".text-anime-style-2").forEach((n) => {
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
                retryCount++;
                setTimeout(initAnimations, 100);
                return;
            }

            if ((window as any).WOW) {
                new (window as any).WOW({
                    boxClass: 'wow',
                    animateClass: 'animated',
                    offset: 0,
                    mobile: true,
                    live: true
                }).init();
            }
        };

        setTimeout(initAnimations, 100);
    }, []);

    // If service not found, show 404-like message
    if (!service) {
        return (
            <>
                <Header />
                <div className="breadcumb-area style2 bg-smoke4">
                    <div className="breadcumb-wrapper" style={{ backgroundImage: 'url(/assets/img/bg/breadcumb-bg.jpg)' }}>
                        <div className="container">
                            <div className="breadcumb-content">
                                <h1 className="breadcumb-title">Service Not Found</h1>
                                <ul className="breadcumb-menu">
                                    <li><Link href="/">Home</Link></li>
                                    <li><Link href="/services">Services</Link></li>
                                    <li>Not Found</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="space">
                    <div className="container">
                        <div className="text-center">
                            <h2>Service Not Found</h2>
                            <p>The service you're looking for doesn't exist.</p>
                            <Link href="/services" className="th-btn th-icon">
                                Back to Services <i className="fa-light fa-arrow-right-long"></i>
                            </Link>
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />

            {/* Breadcrumb Area */}
            <div className="breadcumb-area style2 bg-smoke4">
                <div className="breadcumb-wrapper" style={{ backgroundImage: 'url(/assets/img/bg/breadcumb-bg.jpg)' }}>
                    <div className="container">
                        <div className="breadcumb-content">
                            <h1 className="breadcumb-title">Service Details</h1>
                            <ul className="breadcumb-menu">
                                <li><Link href="/">Home</Link></li>
                                <li><Link href="/services">Services</Link></li>
                                <li>{service.title}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Service Details Section */}
            <section className="space">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-8 col-lg-7">
                            <div className="page-single">
                                <div className="service-img sv-details-img">
                                    <img className="w-100" src={`/assets/img/service/${service.image}`} alt={service.title} />
                                </div>
                                <div className="page-content sv-content d-block">
                                    <h2 className="box-title">{service.title}</h2>
                                    <p className="box-text mb-30">{service.description}</p>
                                    <p className="box-text mb-50">{service.fullDescription}</p>

                                    <h2 className="box-title">Why Choose This Service</h2>
                                    <div className="checklist sv-details-list mb-40">
                                        <ul>
                                            {service.features.map((feature: string, index: number) => (
                                                <li key={index}>
                                                    <img className="icon" src="/assets/img/icon/price-check.svg" alt="" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="sv-gallery-wrapper">
                                        <div className="row gy-4">
                                            {service.images.map((img: string, index: number) => (
                                                <div key={index} className="col-6">
                                                    <div className="sv-sm-img">
                                                        <img className="w-100" src={`/assets/img/service/${img}`} alt="Service Image" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-4 col-lg-5">
                            <aside className="sidebar-area">
                                <div className="widget widget_categories">
                                    <h3 className="widget_title">All Services</h3>
                                    <ul>
                                        {Object.entries(serviceData).map(([key, data]) => (
                                            <li key={key} className={slug === key ? 'active' : ''}>
                                                <Link href={`/service-details/${key}`}>{data.title}</Link>
                                                <span><i className="fa-regular fa-arrow-up-right"></i></span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="widget widget_download">
                                    <h4 className="widget_title">Download Brochure</h4>
                                    <div className="donwload-media-wrap">
                                        <div className="download-media">
                                            <div className="download-media_icon"><i className="fa-light fa-file-pdf"></i></div>
                                            <div className="download-media_info">
                                                <h5 className="download-media_title"><a href="#">Download PDF</a></h5>
                                            </div>
                                        </div>
                                        <div className="download-media">
                                            <div className="download-media_icon"><i className="fal fa-file-lines"></i></div>
                                            <div className="download-media_info">
                                                <h5 className="download-media_title"><a href="#">Download DOC</a></h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="widget widget_banner" style={{ backgroundImage: 'url(/assets/img/bg/widget_banner.jpg)' }}>
                                    <div className="widget-banner position-relative text-center">
                                        <span className="icon"><i className="fa-solid fa-phone"></i></span>
                                        <span className="text">Need Help? Call Here</span>
                                        <a className="phone" href="tel:+25669872564">+256 6987 2564</a>
                                        <Link href="/contact" className="th-btn style6">
                                            Get A Quote <i className="fa-light fa-arrow-right-long"></i>
                                        </Link>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
