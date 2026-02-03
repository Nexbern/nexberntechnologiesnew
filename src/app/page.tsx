'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectCoverflow, EffectFade } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-fade';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [activeTab, setActiveTab] = useState('step1');

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
      <section className="">
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
      </section>
      <section className="category-area bg-top-center space overflow-hidden" style={{ backgroundImage: 'url(/assets/img/bg/category_bg_1.png)' }}>
        <div className="container th-container">
          <div className="title-area mb-60 text-center"><span className="sub-title text-anime-style-2">Our Features</span>
            <h2 className="sec-title text-anime-style-3">Reliable IT for Unstoppable Growth</h2>
          </div>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            className="categorySlider"
            id="categorySlider1"
            slidesPerView={1}
            spaceBetween={24}
            loop={true}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
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
                <div className="box-img global-img"><img src="/assets/img/category/category_1_1.jpg" alt="Image" />
                </div>
                <h3 className="box-title"><Link href="/service-details">Enhanced Cybersecurity</Link></h3>
                <p className="sec-text">Advanced security measures like firewalls, encryption,</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img"><img src="/assets/img/category/category_1_2.jpg" alt="Image" />
                </div>
                <h3 className="box-title"><Link href="/service-details">Cloud Integration</Link></h3>
                <p className="sec-text">Access to scalable cloud-based services for storage</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img"><img src="/assets/img/category/category_1_3.jpg" alt="Image" />
                </div>
                <h3 className="box-title"><Link href="/service-details">Customized Services</Link></h3>
                <p className="sec-text">Tailored IT solutions designed to meet specific business needs.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img"><img src="/assets/img/category/category_1_4.jpg" alt="Image" />
                </div>
                <h3 className="box-title"><Link href="/service-details">24/7 IT Support</Link></h3>
                <p className="sec-text">Around-the-clock monitoring and troubleshooting.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img"><img src="/assets/img/category/category_1_5.jpg" alt="Image" />
                </div>
                <h3 className="box-title"><Link href="/service-details">End-to-End Solution</Link></h3>
                <p className="sec-text">Covers all aspects of IT, from consu-lting and planning</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img"><img src="/assets/img/category/category_1_1.jpg" alt="Image" />
                </div>
                <h3 className="box-title"><Link href="/service-details">Airbirds</Link></h3>
                <p className="sec-text">Advanced security measures like firewalls, encryption,</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img"><img src="/assets/img/category/category_1_2.jpg" alt="Image" />
                </div>
                <h3 className="box-title"><Link href="/service-details">Enhanced Cybersecurity</Link></h3>
                <p className="sec-text">Access to scalable cloud-based services for storage</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img"><img src="/assets/img/category/category_1_3.jpg" alt="Image" />
                </div>
                <h3 className="box-title"><Link href="/service-details">Hiking</Link></h3>
                <p className="sec-text">Tailored IT solutions designed to meet specific business needs.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img"><img src="/assets/img/category/category_1_4.jpg" alt="Image" />
                </div>
                <h3 className="box-title"><Link href="/service-details">Cloud Integration</Link></h3>
                <p className="sec-text">Around-the-clock monitoring and troubleshooting.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img"><img src="/assets/img/category/category_1_5.jpg" alt="Image" />
                </div>
                <h3 className="box-title"><Link href="/service-details">Cruises</Link></h3>
                <p className="sec-text">Covers all aspects of IT, from consu-lting and planning</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img"><img src="/assets/img/category/category_1_1.jpg" alt="Image" />
                </div>
                <h3 className="box-title"><Link href="/service-details">Customized Services</Link></h3>
                <p className="sec-text">Advanced security measures like firewalls, encryption,</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img"><img src="/assets/img/category/category_1_2.jpg" alt="Image" />
                </div>
                <h3 className="box-title"><Link href="/service-details">Walking</Link></h3>
                <p className="sec-text">Access to scalable cloud-based services for storage</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img"><img src="/assets/img/category/category_1_3.jpg" alt="Image" />
                </div>
                <h3 className="box-title"><Link href="/service-details">24/7 IT Support</Link></h3>
                <p className="sec-text">Tailored IT solutions designed to meet specific business needs.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img"><img src="/assets/img/category/category_1_4.jpg" alt="Image" />
                </div>
                <h3 className="box-title"><Link href="/service-details">Walking</Link></h3>
                <p className="sec-text">Around-the-clock monitoring and troubleshooting.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="category-card single">
                <div className="box-img global-img"><img src="/assets/img/category/category_1_5.jpg" alt="Image" />
                </div>
                <h3 className="box-title"><Link href="/service-details">Customized Services</Link></h3>
                <p className="sec-text">Covers all aspects of IT, from consu-lting and planning</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      {/* About Section */}
      <div className="about-area position-relative overflow-hidden" id="about-sec">
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
                  <p className="sec-text mb-30 wow fadeInUp" data-wow-delay=".1s">IT solutions refer to a broad
                    range of services and technologies designed to address specific business needs,
                    streamline operations, and drive growth. These solutions encompass hardware.</p>
                </div>
                <div className="about-item-wrap">
                  <div className="about-item wow fadeInUp" data-wow-delay=".3s">
                    <div className="about-item_img"><img src="/assets/img/icon/map3.svg" alt="" /></div>
                    <div className="about-item_centent">
                      <h5 className="box-title">Manage Tech Services</h5>
                      <p className="about-item_text">There are many variations of passages of available but
                        the majority.</p>
                    </div>
                  </div>
                  <div className="about-item wow fadeInUp" data-wow-delay=".5s">
                    <div className="about-item_img"><img src="/assets/img/icon/guide.svg" alt="" /></div>
                    <div className="about-item_centent">
                      <h5 className="box-title">Internal Networking</h5>
                      <p className="about-item_text">There are many variations of passages of available but
                        the majority.</p>
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

      <div className="case-area position-relative overflow-hidden space">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5">
              <div className="title-area case-title-box text-center text-xl-start">
                <span className="sub-title mb-15 text-anime-style-2">Case Studies</span>
                <h2 className="sec-title text-anime-style-3">Transforming Ideas into Innovations</h2>
              </div>
            </div>
            <div className="col-xl-7">
              <div className="nav nav-tabs case-tabs" role="tablist">
                {caseStudyTabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`nav-link th-btn ${activeTab === tab.id ? 'active' : ''}`}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="tab-content">
            <div className="tab-pane fade show active" role="tabpanel">
              <div className="slider-area case-slider slider-drag-wrap">
                <Swiper
                  key={activeTab}
                  modules={[EffectCoverflow, Pagination, Autoplay]}
                  effect="coverflow"
                  coverflowEffect={{ rotate: 0, stretch: 95, depth: 212, modifier: 1 }}
                  centeredSlides={true}
                  loop={true}
                  className="caseSlider"
                  breakpoints={{
                    0: { slidesPerView: 1 },
                    576: { slidesPerView: 2 },
                    992: { slidesPerView: 3 },
                    1200: { slidesPerView: 3 }
                  }}
                >
                  {caseStudySlides.map((slide, index) => (
                    <SwiperSlide key={index}>
                      <div className="case-box">
                        <div className="case-img">
                          <img src={`/assets/img/case/${slide.img}`} alt="case image" />
                          <div className="case-content">
                            <div className="media-left">
                              <h4 className="box-title"><Link href="/case-study-details">{slide.title}</Link></h4>
                              <span className="case-subtitle">{slide.subtitle}</span>
                            </div>
                          </div>
                          <div className="case-action">
                            <Link href="/case-study-details" className="case-btn">
                              <i className="fa-light fa-arrow-right-long"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
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
                <p className="sec-text mb-50">
                  IT solutions refer to a broad range of services and technologies designed to address<br />specific business needs, streamline operations, and drive growth.
                </p>
              </div>
            </div>
          </div>
          <div className="slider-area slider-drag-wrap">
            <Swiper
              modules={[Pagination, Autoplay, Navigation]}
              loop={true}
              spaceBetween={30}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                0: { slidesPerView: 1 },
                576: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                992: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
                1300: { slidesPerView: 4 }
              }}
              className="th-slider has-shadow"
            >
              {[
                { title: 'IT Strategy & Planning', img: 'service_img_1.jpg' },
                { title: 'Web Development', img: 'service_img_2.jpg' },
                { title: 'Cloud Consulting', img: 'service_img_3.jpg' },
                { title: 'Machine Learning', img: 'service_img_4.jpg' },
                { title: 'House Renovation', img: 'service_img_2.jpg' },
                { title: 'Material Supply', img: 'service_img_1.jpg' }
              ].map((service, index) => (
                <SwiperSlide key={index}>
                  <div className="service-box service-style-1 gsap-cursor">
                    <div className="service-img">
                      <Link href="/service-details">
                        <img src={`/assets/img/service/${service.img}`} alt="" />
                      </Link>
                    </div>
                    <div className="service-content">
                      <h3 className="box-title">
                        <Link href="/service-details">{service.title}</Link>
                      </h3>
                      <p className="service-box_text">
                        Assessing current IT infrastructure and aligning it with business goals. Developing a roadmap.
                      </p>
                      <Link className="th-btn style4" href="/service-details">
                        Read More <i className="fa-light fa-arrow-right-long"></i>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
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
          <div className="row gy-10 gx-10 justify-content-center align-items-center">
            <div className="col-md-6 col-lg-2">
              <div className="gallery-card">
                <div className="box-img global-img">
                  <a href="/assets/img/gallery/gallery_1_1.jpg" className="popup-image">
                    <div className="icon-btn"><i className="fal fa-magnifying-glass-plus"></i></div>
                    <img src="/assets/img/gallery/gallery_1_1.jpg" alt="gallery image" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-2">
              <div className="gallery-card">
                <div className="box-img global-img">
                  <a href="/assets/img/gallery/gallery_1_2.jpg" className="popup-image">
                    <div className="icon-btn"><i className="fal fa-magnifying-glass-plus"></i></div>
                    <img src="/assets/img/gallery/gallery_1_2.jpg" alt="gallery image" />
                  </a>
                </div>
              </div>
              <div className="gallery-card">
                <div className="box-img global-img">
                  <a href="/assets/img/gallery/gallery_1_3.jpg" className="popup-image">
                    <div className="icon-btn"><i className="fal fa-magnifying-glass-plus"></i></div>
                    <img src="/assets/img/gallery/gallery_1_3.jpg" alt="gallery image" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-2">
              <div className="gallery-card">
                <div className="box-img global-img">
                  <a href="/assets/img/gallery/gallery_1_4.jpg" className="popup-image">
                    <div className="icon-btn"><i className="fal fa-magnifying-glass-plus"></i></div>
                    <img src="/assets/img/gallery/gallery_1_4.jpg" alt="gallery image" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-2">
              <div className="gallery-card">
                <div className="box-img global-img">
                  <a href="/assets/img/gallery/gallery_1_5.jpg" className="popup-image">
                    <div className="icon-btn"><i className="fal fa-magnifying-glass-plus"></i></div>
                    <img src="/assets/img/gallery/gallery_1_5.jpg" alt="gallery image" />
                  </a>
                </div>
              </div>
              <div className="gallery-card">
                <div className="box-img global-img">
                  <a href="/assets/img/gallery/gallery_1_6.jpg" className="popup-image">
                    <div className="icon-btn"><i className="fal fa-magnifying-glass-plus"></i></div>
                    <img src="/assets/img/gallery/gallery_1_6.jpg" alt="gallery image" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-2">
              <div className="gallery-card">
                <div className="box-img global-img">
                  <a href="/assets/img/gallery/gallery_1_7.jpg" className="popup-image">
                    <div className="icon-btn"><i className="fal fa-magnifying-glass-plus"></i></div>
                    <img src="/assets/img/gallery/gallery_1_7.jpg" alt="gallery image" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="shape-mockup th-line-shape d-none d-xl-block" data-top="-18%" data-left="0">
            <span>
              <svg width="3200" height="860" viewBox="0 0 3200 860" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className="line-1"
                  d="M2138 14.0506C2095.27 -17.4415 2002.06 10.9842 1886.26 120.726C1741.5 257.904 1351.09 392.927 1300.98 262.785C1236.52 95.3792 1538.14 78.636 1447.87 346.052C1357.6 613.468 810.026 408.273 376.356 511.519C46.7827 589.983 -27.4648 825.017 -14.6451 859"
                  stroke="currentColor" strokeWidth="4" />
              </svg>
            </span>
          </div>
          <div className="shape-mockup movingX d-none d-xl-block" data-top="11%" data-left="-3%">
            <img className="gmovingX" src="/assets/img/shape/g-shape-1.png" alt="shape" />
          </div>
          <div className="shape-mockup jump d-none d-xl-block" data-bottom="0" data-right="-3%">
            <img className="gmovingX" src="/assets/img/shape/ab-1-shape-2.png" alt="shape" />
          </div>
        </div>
      </div>

      {/* Counter Section */}
      {/* <div className="counter-area space space-extra3-bottom overflow-hidden">
                <div className="container">
                    <div className="counter-wrap1">
                        <div className="row">
                            <div className="col-md-6 col-xl-3 counter-card-wrap">
                                <div className="counter-card">
                                    <div className="counter-shape"><span></span></div>
                                    <div className="media-body">
                                        <h3 className="box-number"><span className="counter-number">12</span></h3>
                                        <h6 className="counter-title">Years Experience</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-3 counter-card-wrap">
                                <div className="counter-card">
                                    <div className="counter-shape"><span></span></div>
                                    <div className="media-body">
                                        <h3 className="box-number"><span className="counter-number">97</span>%</h3>
                                        <h6 className="counter-title">Retention Rate</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-3 counter-card-wrap">
                                <div className="counter-card">
                                    <div className="counter-shape"><span></span></div>
                                    <div className="media-body">
                                        <h3 className="box-number"><span className="counter-number">8</span>k</h3>
                                        <h6 className="counter-title">Project Completed</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-3 counter-card-wrap">
                                <div className="counter-card">
                                    <div className="counter-shape"><span></span></div>
                                    <div className="media-body">
                                        <h3 className="box-number"><span className="counter-number">19</span>k</h3>
                                        <h6 className="counter-title">Happy Clients</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

      {/* Blog Section */}
      {/* <section className="overflow-hidden space bg-smoke overflow-hidden" id="blog-sec">
                    <div className="container">
                        <div className="mb-30 text-center text-md-start">
                            <div className="row align-items-center justify-content-between">
                                <div className="col-md-7">
                                    <div className="title-area mb-md-0">
                                        <span className="sub-title">Blog and Article</span>
                                        <h2 className="sec-title">News & Articles From Nexbern</h2>
                                    </div>
                                </div>
                                <div className="col-md-auto">
                                    <Link href="/blog" className="th-btn style4 th-icon">
                                        See More Articles <i className="fa-light fa-arrow-right-long"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="row gy-4">
                            {[
                                { title: 'Top 10 IT Solutions Every Business Needs in 2025', date: 'July 05, 2025', img: 'blog_1_1.jpg' },
                                { title: 'Exploring the Benefits of End-to-End IT Solution Services', date: 'August 15, 2025', img: 'blog_1_2.jpg' },
                                { title: 'The Impact of AI and Machine Learning on IT Solutions', date: 'Sep 15, 2025', img: 'blog_1_3.jpg' }
                            ].map((blog, index) => (
                                <div className="col-md-6 col-lg-4" key={index}>
                                    <div className="blog-box th-ani">
                                        <div className="blog-img global-img">
                                            <img src={`/assets/img/blog/${blog.img}`} alt="blog image" />
                                        </div>
                                        <div className="blog-box_content">
                                            <div className="blog-meta">
                                                <Link className="author" href="/blog">{blog.date}</Link>
                                                <Link href="/blog">6 min read</Link>
                                            </div>
                                            <h3 className="box-title">
                                                <Link href="/blog-details">{blog.title}</Link>
                                            </h3>
                                            <Link href="/blog-details" className="th-btn style4 th-icon">
                                                Read More <i className="fa-light fa-arrow-right-long"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section> */}

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