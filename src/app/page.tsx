'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectCoverflow, EffectFade, FreeMode } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-fade';
import 'swiper/css/free-mode';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('step1');
  const [activeView, setActiveView] = useState('desktop');

  const caseStudyTabs = [
    { id: 'step1', label: 'Development' },
    { id: 'step2', label: 'Woo Commerce' },
    { id: 'step3', label: 'CRM Solutions' },
    { id: 'step4', label: 'Web Design' },
    { id: 'step5', label: 'IT Support' }
  ];

  const caseStudySlides = [
    { img: 'case_1_1.jpg', title: 'Web and Mobile Development', subtitle: 'Development' },
    { img: 'case_1_2.jpg', title: 'Ui/Ux Design', subtitle: 'Ui/Ux Design' },
    { img: 'case_1_3.jpg', title: 'Backend Development', subtitle: 'Python' },
    { img: 'case_1_4.jpg', title: 'Python Development', subtitle: 'JavaScript' },
    { img: 'case_1_5.jpg', title: 'Apps Development', subtitle: 'Java' },
    { img: 'case_1_1.jpg', title: 'Ui/Ux Design', subtitle: 'Php' },
    { img: 'case_1_2.jpg', title: 'JavaScript', subtitle: 'Html' },
    { img: 'case_1_3.jpg', title: 'Php Development', subtitle: 'Androied' },
    { img: 'case_1_4.jpg', title: 'Java Development', subtitle: 'IOS' },
    { img: 'case_1_5.jpg', title: 'Software Development', subtitle: 'Software Development' }
  ];

  useEffect(() => {
    // Custom animation for category cards (replaced from main.js)
    // This handles the "floating" and rotation effect on cards
    let animationFrameId: number;

    const animateCards = () => {
      const h = { translate: 0.1, rotate: 0.008 };
      const singleElements = document.querySelectorAll('.single');

      if (singleElements.length > 0) {
        singleElements.forEach((e) => {
          const element = e as HTMLElement;
          const t = element.getBoundingClientRect();
          const a = 0.5 * window.innerWidth - (t.x + 0.5 * t.width);
          let i = Math.abs(a) * h.translate - t.width * h.translate;
          if (i < 0) i = 0;
          const n = a < 0 ? "left top" : "right top";
          element.style.transform = `translate(0, ${i}px) rotate(${-a * h.rotate}deg)`;
          element.style.transformOrigin = n;
        });
      }

      animationFrameId = requestAnimationFrame(animateCards);
    };

    animateCards();

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

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className="th-hero-wrapper hero-1" id="hero">
        <Swiper
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          className="th-slider hero-slider-1"
          id="heroSlide1"
          effect="fade"
          loop={true}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          navigation={{
            nextEl: '.slider-next',
            prevEl: '.slider-prev'
          }}
          pagination={{
            el: '.slider-pagination',
            clickable: true
          }}
        >
          <SwiperSlide>
            <div className="hero-inner">
              <div className="th-hero-bg" style={{ backgroundImage: 'url(/assets/img/hero/hero_bg_1_1.jpg)' }}></div>
              <div className="container">
                <div className="row">
                  <div className="col-xl-9 col-lg-8">
                    <div className="hero-style1">
                      <span className="sub-title style1">Dynamic IT, Dynamic Results.</span>
                      <h1 className="hero-title">Precision IT Solutions, Tailored for You</h1>
                      <p className="hero-text text-white">
                        Welcome to Nexbern where we specialize in delivering tailored technology and IT solutions.
                      </p>
                      <div className="btn-group">
                        <Link href="/contact" className="th-btn style7 th-icon">
                          Discover More <i className="fa-light fa-arrow-right-long"></i>
                        </Link>
                        <Link href="/services" className="th-btn style2 th-icon">
                          Our Services <i className="fa-light fa-arrow-right-long"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero-inner">
              <div className="th-hero-bg" style={{ backgroundImage: 'url(/assets/img/hero/hero_bg_1_2.jpg)' }}></div>
              <div className="container">
                <div className="row">
                  <div className="col-xl-9 col-lg-8">
                    <div className="hero-style1">
                      <span className="sub-title style1">Dynamic IT, Dynamic Results.</span>
                      <h1 className="hero-title">Smart IT Consulting for Modern Businesses</h1>
                      <p className="hero-text text-white">
                        Welcome to Nexbern where we specialize in delivering tailored technology and IT solutions.
                      </p>
                      <div className="btn-group">
                        <Link href="/contact" className="th-btn style7 th-icon">
                          Discover More <i className="fa-light fa-arrow-right-long"></i>
                        </Link>
                        <Link href="/services" className="th-btn style2 th-icon">
                          Our Services <i className="fa-light fa-arrow-right-long"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero-inner">
              <div className="th-hero-bg" style={{ backgroundImage: 'url(/assets/img/hero/hero_bg_1_3.jpg)' }}></div>
              <div className="container">
                <div className="row">
                  <div className="col-xl-9 col-lg-8">
                    <div className="hero-style1">
                      <span className="sub-title style1">Dynamic IT, Dynamic Results.</span>
                      <h1 className="hero-title">Your Trusted Partner in Tech and Strategy</h1>
                      <p className="hero-text text-white">
                        Welcome to Nexbern where we specialize in delivering tailored technology and IT solutions.
                      </p>
                      <div className="btn-group">
                        <Link href="/contact" className="th-btn style7 th-icon">
                          Discover More <i className="fa-light fa-arrow-right-long"></i>
                        </Link>
                        <Link href="/services" className="th-btn style2 th-icon">
                          Our Services <i className="fa-light fa-arrow-right-long"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <div className="th-swiper-custom">
            <button data-slider-prev="#heroSlide1" className="slider-arrow slider-prev">
              <img src="/assets/img/icon/right-arrow.svg" alt="" />
            </button>
            <div className="slider-pagination"></div>
            <button data-slider-next="#heroSlide1" className="slider-arrow slider-next">
              <img src="/assets/img/icon/left-arrow.svg" alt="" />
            </button>
          </div>
        </Swiper>
      </div>


      {/* Feature Section */}
      <div className="feature-list-wrap">
        <div className="feature-area overflow-hidden" id="feature-area">
          <div className="row gx-0 justify-content-center">
            <div className="col-xl-4 col-lg-6">
              <div className="feature-item d-flex align-items-start">
                <div className="feature-item_icon">
                  <img src="/assets/img/icon/feature_1_1.svg" alt="icon" />
                </div>
                <div className="media-body">
                  <h3 className="box-title">Highly Expert Team</h3>
                  <p className="feature-item_text">We provide the most responsive and functional IT design</p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6">
              <div className="feature-item d-flex align-items-start">
                <div className="feature-item_icon">
                  <img src="/assets/img/icon/feature_1_2.svg" alt="icon" />
                </div>
                <div className="media-body">
                  <h3 className="box-title">24/7 Customer Service</h3>
                  <p className="feature-item_text">We provide the most responsive and functional IT design</p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6">
              <div className="feature-item d-flex align-items-start">
                <div className="feature-item_icon">
                  <img src="/assets/img/icon/feature_1_3.svg" alt="icon" />
                </div>
                <div className="media-body">
                  <h3 className="box-title">Competitive Pricing</h3>
                  <p className="feature-item_text">We provide the most responsive and functional IT design</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Section with Continuous Smooth Sliding */}
      <section className="category-area bg-top-center space overflow-hidden" style={{ backgroundImage: 'url(/assets/img/bg/category_bg_1.png)' }}>
        <div className="container th-container">
          <div className="title-area mb-60 text-center">
            <span className="sub-title text-anime-style-2">Our Features</span>
            <h2 className="sec-title text-anime-style-3">Reliable IT for Unstoppable Growth</h2>
          </div>
          <Swiper
            modules={[Autoplay, Navigation, Pagination, FreeMode]}
            className="categorySlider"
            id="categorySlider1"
            slidesPerView={1}
            spaceBetween={24}
            loop={true}
            speed={3000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            freeMode={{
              enabled: true,
              momentum: false,
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              576: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 3 },
              1400: { spaceBetween: 45, slidesPerView: 5 }
            }}
          >
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img">
                  <img src="/assets/img/category/category_1_1.jpg" alt="Image" />
                </div>
                <h3 className="box-title">
                  <Link href="/service-details">Enhanced Cybersecurity</Link>
                </h3>
                <p className="sec-text">Advanced security measures like firewalls, encryption,</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img">
                  <img src="/assets/img/category/category_1_2.jpg" alt="Image" />
                </div>
                <h3 className="box-title">
                  <Link href="/service-details">Cloud Integration</Link>
                </h3>
                <p className="sec-text">Access to scalable cloud-based services for storage</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img">
                  <img src="/assets/img/category/category_1_3.jpg" alt="Image" />
                </div>
                <h3 className="box-title">
                  <Link href="/service-details">Customized Services</Link>
                </h3>
                <p className="sec-text">Tailored IT solutions designed to meet specific business needs.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img">
                  <img src="/assets/img/category/category_1_4.jpg" alt="Image" />
                </div>
                <h3 className="box-title">
                  <Link href="/service-details">24/7 IT Support</Link>
                </h3>
                <p className="sec-text">Around-the-clock monitoring and troubleshooting.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img">
                  <img src="/assets/img/category/category_1_5.jpg" alt="Image" />
                </div>
                <h3 className="box-title">
                  <Link href="/service-details">End-to-End Solution</Link>
                </h3>
                <p className="sec-text">Covers all aspects of IT, from consu-lting and planning</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img">
                  <img src="/assets/img/category/category_1_1.jpg" alt="Image" />
                </div>
                <h3 className="box-title">
                  <Link href="/service-details">Airbirds</Link>
                </h3>
                <p className="sec-text">Advanced security measures like firewalls, encryption,</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img">
                  <img src="/assets/img/category/category_1_2.jpg" alt="Image" />
                </div>
                <h3 className="box-title">
                  <Link href="/service-details">Enhanced Cybersecurity</Link>
                </h3>
                <p className="sec-text">Access to scalable cloud-based services for storage</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img">
                  <img src="/assets/img/category/category_1_3.jpg" alt="Image" />
                </div>
                <h3 className="box-title">
                  <Link href="/service-details">Hiking</Link>
                </h3>
                <p className="sec-text">Tailored IT solutions designed to meet specific business needs.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img">
                  <img src="/assets/img/category/category_1_4.jpg" alt="Image" />
                </div>
                <h3 className="box-title">
                  <Link href="/service-details">Cloud Integration</Link>
                </h3>
                <p className="sec-text">Around-the-clock monitoring and troubleshooting.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img">
                  <img src="/assets/img/category/category_1_5.jpg" alt="Image" />
                </div>
                <h3 className="box-title">
                  <Link href="/service-details">Cruises</Link>
                </h3>
                <p className="sec-text">Covers all aspects of IT, from consu-lting and planning</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img">
                  <img src="/assets/img/category/category_1_1.jpg" alt="Image" />
                </div>
                <h3 className="box-title">
                  <Link href="/service-details">Customized Services</Link>
                </h3>
                <p className="sec-text">Advanced security measures like firewalls, encryption,</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img">
                  <img src="/assets/img/category/category_1_2.jpg" alt="Image" />
                </div>
                <h3 className="box-title">
                  <Link href="/service-details">Walking</Link>
                </h3>
                <p className="sec-text">Access to scalable cloud-based services for storage</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img">
                  <img src="/assets/img/category/category_1_3.jpg" alt="Image" />
                </div>
                <h3 className="box-title">
                  <Link href="/service-details">24/7 IT Support</Link>
                </h3>
                <p className="sec-text">Tailored IT solutions designed to meet specific business needs.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img">
                  <img src="/assets/img/category/category_1_4.jpg" alt="Image" />
                </div>
                <h3 className="box-title">
                  <Link href="/service-details">Walking</Link>
                </h3>
                <p className="sec-text">Around-the-clock monitoring and troubleshooting.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img">
                  <img src="/assets/img/category/category_1_5.jpg" alt="Image" />
                </div>
                <h3 className="box-title">
                  <Link href="/service-details">Customized Services</Link>
                </h3>
                <p className="sec-text">Covers all aspects of IT, from consu-lting and planning</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      {/* About Section */}
      <div className="about-area position-relative overflow-hidden space" id="about-sec">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="img-box1">
                <div className="img1"><img src="/assets/img/normal/about_1_1.jpg" alt="About" /></div>
                <div className="img2"><img src="/assets/img/normal/about_1_2.jpg" alt="About" /></div>
                <div className="img3"><img src="/assets/img/normal/about_1_3.jpg" alt="About" /></div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="ps-xl-4 ms-xxl-4">
                <div className="title-area about1-title-box mb-20 pe-xxl-5 me-xxl-5"><span
                  className="sub-title style1 text-anime-style-2">About Us Our Company</span>
                  <h2 className="sec-title mb-20 heading text-anime-style-3">Solutions That Evolve with Your
                    Business</h2>
                  <p className="sec-text mb-30 wow fadeInUp" data-wow-delay=".1s">At Nexbern Technologies, we deliver flexible and scalable IT solutions designed to grow alongside your business. Our services combine technology, strategy, and innovation to address unique business challenges, streamline operations, and drive sustainable growth across industries.</p>
                </div>
                <div className="about-item-wrap">
                  <div className="about-item wow fadeInUp" data-wow-delay=".3s">
                    <div className="about-item_img"><img src="/assets/img/icon/map3.svg" alt="" /></div>
                    <div className="about-item_centent">
                      <h5 className="box-title">Manage Tech Services</h5>
                      <p className="about-item_text">We provide proactive and reliable managed technology services that ensure your systems remain secure.</p>
                    </div>
                  </div>
                  <div className="about-item wow fadeInUp" data-wow-delay=".5s">
                    <div className="about-item_img"><img src="/assets/img/icon/guide.svg" alt="" /></div>
                    <div className="about-item_centent">
                      <h5 className="box-title">Internal Networking</h5>
                      <p className="about-item_text">Our internal networking solutions enhance connectivity, security, and collaboration within your organization.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-35 wow fadeInUp">
                  <Link href="/about" className="th-btn th-icon">
                    Learn More <i className="fa-light fa-arrow-right-long"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="shape-mockup shape1 d-none d-xl-block" data-top="12%" data-right="-16%"><img
            src="/assets/img/shape/ab-1-shape-1.png" alt="shape" /></div>
          <div className="shape-mockup shape3 d-none d-xl-block" data-bottom="2%" data-left="-20%"><img
            src="/assets/img/shape/ab-1-shape-2.png" alt="shape" /></div>
          <div className="shape-mockup about-shape movingX d-none d-xxl-block" data-bottom="20%" data-right="-11%"><img
            src="/assets/img/normal/about-right-img.jpg" alt="shape" /></div>
        </div>
      </div>

      {/* Services Section */}
      <section className="position-relative bg-top-center overflow-hidden space" id="service-sec" style={{ backgroundImage: 'url(/assets/img/bg/service_bg_1.jpg)' }}>
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
            <div className="slider-area text-center">
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={30}
                slidesPerView={3}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1200: { slidesPerView: 3 },
                }}
                className="serviceSlider"
              >
                {[
                  { title: 'Mobile App Development', img: 'sv-1.jpg', slug: 'mobile-app-development', description: 'Creating user-centric mobile applications for iOS and Android that drive engagement and business growth.' },
                  { title: 'Web Development', img: 'sv-2.jpg', slug: 'web-development', description: 'Creating responsive, user-friendly websites and web applications tailored to your business needs using modern technologies.' },
                  { title: 'Cloud Consulting', img: 'sv-3.jpg', slug: 'cloud-consulting', description: 'Helping businesses migrate to cloud platforms, optimize cloud infrastructure, and implement cloud-based solutions.' },
                  { title: 'AI & Machine Learning', img: 'sv-4.jpg', slug: 'ai-machine-learning', description: 'Implementing AI and ML solutions to automate processes, gain insights from data, and improve decision-making.' },
                  { title: 'SEO & Digital Marketing', img: 'sv-5.jpg', slug: 'seo-digital-marketing', description: 'Enhancing your online visibility and driving organic traffic through strategic SEO and digital marketing campaigns.' },
                  { title: 'IT Consulting', img: 'sv-7.jpg', slug: 'it-consulting', description: 'Assessing current IT infrastructure and aligning it with business goals. Developing a roadmap for technology adoption.' },
                ].map((service, index) => (
                  <SwiperSlide key={index}>
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
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <div className="gallery-area overflow-hidden space">
        <div className="container th-container">
          <div className="title-area text-center">
            <span className="sub-title mb-15 text-anime-style-2">Our Gallery</span>
            <h2 className="sec-title text-anime-style-3">Our Recent Project Gallery</h2>
          </div>
          {/* Toggle Controls */}
          <div className="row justify-content-center mb-50">
            <div className="col-auto">
              <div className="nav nav-tabs case-tabs" role="tablist" style={{ border: 'none', gap: '15px' }}>
                <button
                  onClick={() => setActiveView('desktop')}
                  className={`nav-link th-btn ${activeView === 'desktop' ? 'active' : ''}`}
                  style={{ minWidth: '160px', borderRadius: '50px', cursor: 'pointer' }}
                >
                  <i className="fa-light fa-desktop me-2"></i> Desktop View
                </button>
                <button
                  onClick={() => setActiveView('mobile')}
                  className={`nav-link th-btn ${activeView === 'mobile' ? 'active' : ''}`}
                  style={{ minWidth: '160px', borderRadius: '50px', cursor: 'pointer' }}
                >
                  <i className="fa-light fa-mobile me-2"></i> Mobile View
                </button>
              </div>
            </div>
          </div>

          {/* Device Mockup Display */}
          <div className="device-mockup-Container" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '600px',
            position: 'relative',
            perspective: '1000px',
            paddingBottom: '50px'
          }}>
            {activeView === 'desktop' ? (
              <div className="laptop-frame wow fadeInUp" style={{
                width: '100%',
                maxWidth: '900px',
                background: 'linear-gradient(to bottom, #2a2a2a, #1a1a1a)',
                borderRadius: '20px',
                padding: '15px 15px 0 15px',
                boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
                position: 'relative',
                transition: 'all 0.5s ease'
              }}>
                {/* Screen */}
                <div style={{
                  background: '#000',
                  borderRadius: '10px 10px 0 0',
                  overflow: 'hidden',
                  aspectRatio: '16/9',
                  position: 'relative',
                  border: '1px solid #333'
                }}>
                  <img src="/assets/img/desktop-preview.png" alt="Desktop Project Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                {/* Base */}
                <div style={{
                  height: '25px',
                  background: 'linear-gradient(to bottom, #333, #222)',
                  borderRadius: '0 0 20px 20px',
                  marginTop: '-1px',
                  position: 'relative',
                  boxShadow: 'inset 0 2px 5px rgba(255,255,255,0.05)'
                }}>
                  <div style={{
                    width: '120px',
                    height: '10px',
                    background: '#151515',
                    borderRadius: '0 0 12px 12px',
                    position: 'absolute',
                    top: '0',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    boxShadow: 'inset 0 2px 2px rgba(0,0,0,0.5)'
                  }}></div>
                </div>
              </div>
            ) : (
              <div className="phone-frame wow fadeInUp" style={{
                width: '320px',
                height: '650px',
                background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
                borderRadius: '45px',
                padding: '15px',
                boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
                position: 'relative',
                border: '6px solid #333',
                transition: 'all 0.5s ease'
              }}>
                {/* Notch */}
                <div style={{
                  width: '120px',
                  height: '28px',
                  background: '#1a1a1a',
                  position: 'absolute',
                  top: '15px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  borderRadius: '0 0 18px 18px',
                  zIndex: 10,
                  boxShadow: '0 2px 5px rgba(0,0,0,0.5)'
                }}></div>

                {/* Screen */}
                <div style={{
                  background: '#000',
                  borderRadius: '32px',
                  overflow: 'hidden',
                  width: '100%',
                  height: '100%',
                  position: 'relative'
                }}>
                  <img src="/assets/img/mobile-preview.png" alt="Mobile Project Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
              </div>
            )}

            {/* Decoration Shapes */}
            <div className="shape-mockup jump d-none d-xl-block" data-top="10%" data-right="-5%">
              <img src="/assets/img/shape/ab-1-shape-1.png" alt="shape" style={{ opacity: 0.6 }} />
            </div>
            <div className="shape-mockup movingX d-none d-xl-block" data-bottom="10%" data-left="-5%">
              <img src="/assets/img/shape/ab-1-shape-2.png" alt="shape" style={{ opacity: 0.6 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="space bg-smoke" id="why-choose-sec">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="title-area text-center">
                <span className="sub-title mb-15 text-anime-style-2">Why Choose Nexbern?</span>
                <h2 className="sec-title text-anime-style-3">Quality, affordability, and innovation combined</h2>
              </div>
            </div>
          </div>
          <div className="row gy-4">
            {[
              {
                title: 'Affordable Pricing',
                text: 'Quality IT services at competitive rates that fit your budget',
                icon: 'feature_1_2.svg'
              },
              {
                title: 'Expert Team',
                text: 'Experienced professionals combined with talented young developers',
                icon: 'feature_1_1.svg'
              },
              {
                title: 'On-Time Delivery',
                text: 'We respect deadlines and deliver projects on schedule',
                icon: 'feature_1_3.svg'
              },
              {
                title: 'Modern Tech Stack',
                text: 'Latest technologies and best practices for cutting-edge solutions',
                icon: 'sv-icon_10_1.svg'
              },
              {
                title: 'Ongoing Support',
                text: 'Continuous maintenance and support after project completion',
                icon: 'sv-icon_10_4.svg'
              },
              {
                title: 'Custom Solutions',
                text: 'Tailored to your specific business needs and goals',
                icon: 'service_4_1.svg'
              }
            ].map((item, index) => (
              <div className="col-xl-4 col-md-6 wow fadeInUp" data-wow-delay={`${0.1 * (index + 1)}s`} key={index}>
                <div className="feature-card" style={{
                  background: '#fff',
                  padding: '40px',
                  borderRadius: '20px',
                  height: '100%',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(0,0,0,0.03)'
                }}>
                  <div className="feature-card_icon mb-25" style={{
                    width: '60px',
                    height: '60px',
                    background: 'rgba(11, 89, 219, 0.1)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img src={`/assets/img/icon/${item.icon}`} alt="icon" style={{ width: '35px' }} />
                  </div>
                  <div className="feature-card_content">
                    <h3 className="box-title" style={{ fontSize: '22px', marginBottom: '15px' }}>{item.title}</h3>
                    <p className="feature-card_text" style={{ marginBottom: '0', color: '#666' }}>{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Counter Section */}

      {/* Blog Section */}

      <Footer />

      {/* Scroll to Top */}
      <div className="scroll-top">
        <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"></path>
        </svg>
      </div>
    </>
  );
}