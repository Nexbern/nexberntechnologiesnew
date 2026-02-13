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

// Course data
const coursesData = [
    {
        id: 1,
        title: 'Full Stack Web Development',
        category: 'Web',
        description: 'Master both frontend and backend development with React, Node.js, and MongoDB',
        duration: '2 months',
        level: 'Beginner to Intermediate',
        students: '30+',
        price: '₹2199',
        image: 'course_1.jpg',
        skills: ['HTML, CSS, JavaScript', 'React & Redux', 'Node.js & Express', 'MongoDB', 'REST APIs', 'Git & GitHub'],
        icon: 'fa-code'
    },
    {
        id: 2,
        title: 'Mobile App Development',
        category: 'Mobile',
        description: 'Build native and cross-platform mobile apps with React Native and Flutter',
        duration: '2 months',
        level: 'Beginner to Intermediate',
        students: '30+',
        price: '₹2199',
        image: 'course_2.jpg',
        skills: ['React Native Basics', 'Flutter Development', 'Mobile UI/UX', 'API Integration', 'App Deployment'],
        icon: 'fa-mobile'
    },
    {
        id: 3,
        title: 'AI & Machine Learning',
        category: 'AI/ML',
        description: 'Learn AI, ML, deep learning, and neural networks with hands-on projects',
        duration: '2 months',
        level: 'Beginner to Intermediate',
        students: '30+',
        price: '₹2199',
        image: 'course_3.jpg',
        skills: ['Python Programming', 'Machine Learning Algorithms', 'TensorFlow & Keras', 'Deep Learning', 'Neural Networks', 'Computer Vision'],
        icon: 'fa-brain'
    },
    {
        id: 4,
        title: 'Cloud Computing & DevOps',
        category: 'Cloud',
        description: 'Master AWS, Azure, Docker, Kubernetes, and DevOps practices',
        duration: '2 months',
        level: 'Beginner to Intermediate',
        students: '30+',
        price: '₹2199',
        image: 'course_4.jpg',
        skills: ['AWS Services', 'Azure Fundamentals', 'Docker Containers', 'Kubernetes', 'CI/CD Pipelines', 'Infrastructure as Code'],
        icon: 'fa-cloud'
    },
    {
        id: 5,
        title: 'Digital Marketing & SEO',
        category: 'Marketing',
        description: 'Complete digital marketing course covering SEO, social media, and analytics',
        duration: '2 months',
        level: 'Beginner to Intermediate',
        students: '30+',
        price: '₹2199',
        image: 'course_5.jpg',
        skills: ['SEO Fundamentals', 'Google Analytics', 'Social Media Marketing', 'Content Marketing', 'Email Marketing', 'PPC Advertising'],
        icon: 'fa-chart-line'
    },
    {
        id: 6,
        title: 'UI/UX Design',
        category: 'Web',
        description: 'Learn design thinking, wireframing, prototyping with Figma and Adobe XD',
        duration: '2 months',
        level: 'Beginner to Intermediate',
        students: '30+',
        price: '₹2199',
        image: 'course_6.jpg',
        skills: ['Design Principles', 'Figma Mastery', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
        icon: 'fa-palette'
    },
    {
        id: 7,
        title: 'Data Science & Analytics',
        category: 'AI/ML',
        description: 'Data analysis, visualization, and predictive modeling with Python',
        duration: '2 months',
        level: 'Beginner to Intermediate',
        students: '30+',
        price: '₹2199',
        image: 'course_7.jpg',
        skills: ['Python for Data Science', 'Pandas & NumPy', 'Data Visualization', 'Statistical Analysis', 'Machine Learning', 'Big Data'],
        icon: 'fa-chart-pie'
    },
    {
        id: 8,
        title: 'Cybersecurity Fundamentals',
        category: 'Cloud',
        description: 'Learn ethical hacking, network security, and cyber defense strategies',
        duration: '2 months',
        level: 'Beginner to Intermediate',
        students: '30+',
        price: '₹2199',
        image: 'course_8.jpg',
        skills: ['Network Security', 'Ethical Hacking', 'Cryptography', 'Security Tools', 'Penetration Testing', 'Incident Response'],
        icon: 'fa-shield-alt'
    }
];

const features = [
    {
        icon: 'fa-laptop-code',
        title: 'Live Projects',
        description: 'Work on real client projects while learning'
    },
    {
        icon: 'fa-chalkboard-user',
        title: 'Expert Mentors',
        description: 'Learn from industry professionals'
    },
    {
        icon: 'fa-indian-rupee-sign',
        title: 'Earn While Learning',
        description: 'Get paid for project contributions'
    },
    {
        icon: 'fa-briefcase',
        title: 'Job Placement',
        description: '88% placement rate for graduates'
    },
    {
        icon: 'fa-clock',
        title: 'Flexible Learning',
        description: 'Study at your own pace'
    },
    {
        icon: 'fa-certificate',
        title: 'Certificate',
        description: 'Industry-recognized certification'
    }
];

const steps = [
    {
        number: '01',
        title: 'Learn',
        description: 'Join our comprehensive training programs'
    },
    {
        number: '02',
        title: 'Practice',
        description: 'Work on live projects with supervision'
    },
    {
        number: '03',
        title: 'Earn',
        description: 'Get paid for your project contributions'
    },
    {
        number: '04',
        title: 'Succeed',
        description: 'Graduate with experience and job offers'
    }
];

export default function Courses() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [filteredCourses, setFilteredCourses] = useState(coursesData);
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<string>('');
    const [formData, setFormData] = useState({
        course: '',
        fullName: '',
        email: '',
        phone: '',
        education: '',
        experience: '',
        reason: ''
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

    // Set course name when modal opens
    useEffect(() => {
        if (showModal && selectedCourse) {
            setFormData(prev => ({ ...prev, course: selectedCourse }));
        }
    }, [showModal, selectedCourse]);

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage({ type: '', text: '' });

        try {
            const response = await fetch('/api/enroll-course', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitMessage({ type: 'success', text: 'Enrollment submitted successfully! We\'ll contact you soon.' });
                // Reset form
                setFormData({
                    course: selectedCourse,
                    fullName: '',
                    email: '',
                    phone: '',
                    education: '',
                    experience: '',
                    reason: ''
                });
                // Close modal after 3 seconds
                setTimeout(() => {
                    setShowModal(false);
                    setSubmitMessage({ type: '', text: '' });
                }, 3000);
            } else {
                setSubmitMessage({ type: 'error', text: data.error || 'Failed to submit enrollment. Please try again.' });
            }
        } catch (error) {
            setSubmitMessage({ type: 'error', text: 'An error occurred. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Open enrollment modal
    const handleEnrollClick = (courseTitle: string) => {
        setSelectedCourse(courseTitle);
        setShowModal(true);
    };

    // Filter courses
    useEffect(() => {
        if (activeFilter === 'All') {
            setFilteredCourses(coursesData);
        } else {
            setFilteredCourses(coursesData.filter(course => course.category === activeFilter));
        }
    }, [activeFilter]);

    const categories = ['All', 'Web', 'Mobile', 'AI/ML', 'Cloud', 'Marketing'];

    return (
        <>
            <Header />

            {/* Breadcrumb */}
            <div className="breadcumb-area style2 bg-smoke4">
                <div className="breadcumb-wrapper" style={{ backgroundImage: 'url(/assets/img/bg/breadcumb-bg.jpg)' }}>
                    <div className="container">
                        <div className="breadcumb-content">
                            <h1 className="breadcumb-title">Our Courses</h1>
                            <ul className="breadcumb-menu">
                                <li><Link href="/">Home</Link></li>
                                <li>Courses</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <section className="space overflow-hidden">
                <div className="shape-mockup jump d-none d-xl-block" data-top="15%" data-right="3%">
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
                                    Learn. Build. Earn.
                                    <span className="squre-shape right ms-3"></span>
                                </span>
                                <h2 className="sec-title mb-20">
                                    <span className="scroll-text-ani">Transform your future with comprehensive training programs</span>
                                </h2>
                                <p className="sec-text">
                                    Combine learning with real-world project experience and start earning while you learn
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <div className="container mb-50">
                <div className="filter-menu-active text-center">
                    <div className="course-filter-buttons">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                                onClick={() => setActiveFilter(category)}
                                style={{
                                    padding: '12px 30px',
                                    margin: '5px',
                                    border: activeFilter === category ? '2px solid #0B59DB' : '2px solid #e0e0e0',
                                    background: activeFilter === category ? '#0B59DB' : '#fff',
                                    color: activeFilter === category ? '#fff' : '#333',
                                    borderRadius: '50px',
                                    cursor: 'pointer',
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    transition: 'all 0.3s ease',
                                    outline: 'none'
                                }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Courses Grid */}
            <section className="space">
                <div className="container">
                    <div className="row gy-4">
                        {filteredCourses.map((course, index) => (
                            <div key={course.id} className="col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay={`${index * 0.1}s`}>
                                <div className="course-card" style={{
                                    background: '#fff',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                                    transition: 'all 0.3s ease',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <div className="course-img" style={{
                                        position: 'relative',
                                        height: '200px',
                                        background: 'linear-gradient(135deg, #0d6efd 0%, #0d6efd 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <i className={`fa-light ${course.icon}`} style={{
                                            fontSize: '60px',
                                            color: 'rgba(255,255,255,0.9)'
                                        }}></i>
                                        <div style={{
                                            position: 'absolute',
                                            top: '15px',
                                            right: '15px',
                                            background: 'rgba(255,255,255,0.2)',
                                            backdropFilter: 'blur(10px)',
                                            padding: '8px 15px',
                                            borderRadius: '20px',
                                            color: '#fff',
                                            fontSize: '13px',
                                            fontWeight: '600'
                                        }}>
                                            {course.category}
                                        </div>
                                    </div>
                                    <div className="course-content" style={{
                                        padding: '25px',
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <h3 className="course-title" style={{
                                            fontSize: '20px',
                                            fontWeight: '700',
                                            marginBottom: '12px',
                                            color: '#0B1422'
                                        }}>
                                            {course.title}
                                        </h3>
                                        <p style={{
                                            color: '#666',
                                            fontSize: '14px',
                                            lineHeight: '1.6',
                                            marginBottom: '20px'
                                        }}>
                                            {course.description}
                                        </p>

                                        <div style={{ marginBottom: '15px' }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginBottom: '10px',
                                                fontSize: '13px',
                                                color: '#666'
                                            }}>
                                                <span><i className="fa-regular fa-clock" style={{ marginRight: '5px', color: '#0B59DB' }}></i> {course.duration}</span>
                                                <span><i className="fa-regular fa-user" style={{ marginRight: '5px', color: '#0B59DB' }}></i> {course.students}</span>
                                            </div>
                                            <div style={{
                                                fontSize: '13px',
                                                color: '#666',
                                                marginBottom: '10px'
                                            }}>
                                                <i className="fa-regular fa-signal" style={{ marginRight: '5px', color: '#0B59DB' }}></i> {course.level}
                                            </div>
                                        </div>

                                        <div style={{
                                            marginBottom: '20px',
                                            paddingTop: '15px',
                                            borderTop: '1px solid #f0f0f0'
                                        }}>
                                            <p style={{
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                color: '#333',
                                                marginBottom: '10px'
                                            }}>
                                                What you'll learn:
                                            </p>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                                {course.skills.slice(0, 4).map((skill, idx) => (
                                                    <span key={idx} style={{
                                                        fontSize: '11px',
                                                        background: '#f8f9fa',
                                                        padding: '4px 10px',
                                                        borderRadius: '12px',
                                                        color: '#555'
                                                    }}>
                                                        {skill}
                                                    </span>
                                                ))}
                                                {course.skills.length > 4 && (
                                                    <span style={{
                                                        fontSize: '11px',
                                                        background: '#f8f9fa',
                                                        padding: '4px 10px',
                                                        borderRadius: '12px',
                                                        color: '#555'
                                                    }}>
                                                        +{course.skills.length - 4} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div style={{
                                            marginTop: 'auto',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <div>
                                                <span style={{
                                                    fontSize: '12px',
                                                    color: '#999',
                                                    textDecoration: 'line-through',
                                                    display: 'block'
                                                }}>
                                                    Price
                                                </span>
                                                <span style={{
                                                    fontSize: '24px',
                                                    fontWeight: '700',
                                                    color: '#0B59DB'
                                                }}>
                                                    {course.price}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => handleEnrollClick(course.title)}
                                                className="th-btn th-btn-sm th-radius"
                                                style={{
                                                    padding: '10px 20px',
                                                    fontSize: '13px',
                                                    border: 'none',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Enroll Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-smoke overflow-hidden space">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-10">
                            <div className="title-area text-center mb-50">
                                <span className="sub-title">
                                    <span className="squre-shape left me-3"></span>
                                    Why Choose Us
                                    <span className="squre-shape right ms-3"></span>
                                </span>
                                <h2 className="sec-title">
                                    <span className="scroll-text-ani">What Makes Our Courses Different?</span>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="row gy-4">
                        {features.map((feature, index) => (
                            <div key={index} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`${index * 0.1}s`}>
                                <div className="feature-card" style={{
                                    background: '#fff',
                                    padding: '35px 30px',
                                    borderRadius: '15px',
                                    textAlign: 'center',
                                    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
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
                                        <i className={`fa-light ${feature.icon}`} style={{
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
                                        {feature.title}
                                    </h4>
                                    <p style={{
                                        color: '#666',
                                        fontSize: '14px',
                                        lineHeight: '1.6',
                                        marginBottom: 0
                                    }}>
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="space overflow-hidden" style={{ backgroundImage: 'url(/assets/img/bg/process-4-1-bg.png)' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-10">
                            <div className="title-area text-center mb-50">
                                <span className="sub-title">
                                    <span className="squre-shape left me-3"></span>
                                    How It Works
                                    <span className="squre-shape right ms-3"></span>
                                </span>
                                <h2 className="sec-title">
                                    <span className="scroll-text-ani">Your journey from learning to earning</span>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="row gy-4">
                        {steps.map((step, index) => (
                            <div key={index} className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay={`${index * 0.1}s`}>
                                <div className="process-card" style={{
                                    background: '#fff',
                                    padding: '40px 30px',
                                    borderRadius: '15px',
                                    textAlign: 'center',
                                    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                                    position: 'relative',
                                    transition: 'all 0.3s ease',
                                    height: '100%'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: '-20px',
                                        right: '30px',
                                        width: '50px',
                                        height: '50px',
                                        background: 'linear-gradient(135deg, #0d6efd 0%, #764ba2 100%)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '20px',
                                        fontWeight: '700',
                                        color: '#fff',
                                        boxShadow: '0 5px 15px rgba(102, 126, 234, 0.4)'
                                    }}>
                                        {step.number}
                                    </div>
                                    <h4 style={{
                                        fontSize: '24px',
                                        fontWeight: '700',
                                        marginBottom: '15px',
                                        color: '#0B1422',
                                        marginTop: '20px'
                                    }}>
                                        {step.title}
                                    </h4>
                                    <p style={{
                                        color: '#666',
                                        fontSize: '14px',
                                        lineHeight: '1.6',
                                        marginBottom: 0
                                    }}>
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="space" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-10">
                            <div className="text-center">
                                <h2 style={{
                                    color: '#fff',
                                    fontSize: '36px',
                                    fontWeight: '700',
                                    marginBottom: '20px'
                                }}>
                                    Ready to Start Your Learning Journey?
                                </h2>
                                <p style={{
                                    color: 'rgba(255,255,255,0.9)',
                                    fontSize: '18px',
                                    marginBottom: '30px'
                                }}>
                                    Join thousands of students who are already learning and earning with us
                                </p>
                                <Link href="/contact" className="th-btn style6">
                                    Get Started Today <i className="fa-light fa-arrow-right-long"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enrollment Modal */}
            {showModal && (
                <div
                    className="enrollment-modal-overlay"
                    onClick={() => setShowModal(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999,
                        padding: '20px',
                        overflowY: 'auto'
                    }}
                >
                    <div
                        className="enrollment-modal-content"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: '20px',
                            maxWidth: '600px',
                            width: '100%',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            position: 'relative',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                            animation: 'modalSlideIn 0.3s ease-out'
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setShowModal(false)}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: 'none',
                                border: 'none',
                                fontSize: '28px',
                                cursor: 'pointer',
                                color: '#666',
                                zIndex: 1,
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f0f0f0';
                                e.currentTarget.style.color = '#000';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#666';
                            }}
                        >
                            ×
                        </button>

                        {/* Modal Header */}
                        <div style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            padding: '40px 30px',
                            borderRadius: '20px 20px 0 0',
                            color: '#fff'
                        }}>
                            <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '700' }}>Enroll in Course</h2>
                            <p style={{ margin: '10px 0 0', opacity: 0.9, fontSize: '16px' }}>
                                {selectedCourse}
                            </p>
                        </div>

                        {/* Modal Body */}
                        <div style={{ padding: '30px' }}>
                            <form onSubmit={handleSubmit}>
                                {/* Course Selection */}
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        fontWeight: '600',
                                        color: '#333',
                                        fontSize: '14px'
                                    }}>
                                        Select Course <span style={{ color: '#e74c3c' }}>*</span>
                                    </label>
                                    <select
                                        name="course"
                                        value={formData.course}
                                        onChange={handleInputChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 15px',
                                            border: '2px solid #e0e0e0',
                                            borderRadius: '10px',
                                            fontSize: '15px',
                                            transition: 'all 0.3s ease',
                                            outline: 'none'
                                        }}
                                        onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                                        onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                                    >
                                        <option value="">{selectedCourse}</option>
                                        {coursesData.map((course) => (
                                            <option key={course.id} value={course.title}>{course.title}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Full Name */}
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        fontWeight: '600',
                                        color: '#333',
                                        fontSize: '14px'
                                    }}>
                                        Full Name <span style={{ color: '#e74c3c' }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="Enter your full name"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 15px',
                                            border: '2px solid #e0e0e0',
                                            borderRadius: '10px',
                                            fontSize: '15px',
                                            transition: 'all 0.3s ease',
                                            outline: 'none'
                                        }}
                                        onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                                        onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                                    />
                                </div>

                                {/* Email */}
                                <div style={{ marginBottom: '20px' }}>
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
                                        style={{
                                            width: '100%',
                                            padding: '12px 15px',
                                            border: '2px solid #e0e0e0',
                                            borderRadius: '10px',
                                            fontSize: '15px',
                                            transition: 'all 0.3s ease',
                                            outline: 'none'
                                        }}
                                        onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                                        onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                                    />
                                </div>

                                {/* Phone */}
                                <div style={{ marginBottom: '20px' }}>
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
                                        style={{
                                            width: '100%',
                                            padding: '12px 15px',
                                            border: '2px solid #e0e0e0',
                                            borderRadius: '10px',
                                            fontSize: '15px',
                                            transition: 'all 0.3s ease',
                                            outline: 'none'
                                        }}
                                        onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                                        onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                                    />
                                </div>

                                {/* Current Education */}
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        fontWeight: '600',
                                        color: '#333',
                                        fontSize: '14px'
                                    }}>
                                        Current Education <span style={{ color: '#e74c3c' }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="education"
                                        value={formData.education}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 12th Pass, B.Tech 2nd Year"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 15px',
                                            border: '2px solid #e0e0e0',
                                            borderRadius: '10px',
                                            fontSize: '15px',
                                            transition: 'all 0.3s ease',
                                            outline: 'none'
                                        }}
                                        onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                                        onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                                    />
                                </div>

                                {/* Experience Level */}
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        fontWeight: '600',
                                        color: '#333',
                                        fontSize: '14px'
                                    }}>
                                        Experience Level <span style={{ color: '#e74c3c' }}>*</span>
                                    </label>
                                    <select
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 15px',
                                            border: '2px solid #e0e0e0',
                                            borderRadius: '10px',
                                            fontSize: '15px',
                                            transition: 'all 0.3s ease',
                                            outline: 'none'
                                        }}
                                        onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                                        onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                                    >
                                        <option value="">Select experience level</option>
                                        <option value="Beginner (No Experience)">Beginner (No Experience)</option>
                                        <option value="Some Knowledge">Some Knowledge</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>

                                {/* Reason */}
                                <div style={{ marginBottom: '25px' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        fontWeight: '600',
                                        color: '#333',
                                        fontSize: '14px'
                                    }}>
                                        Why do you want to join this course?
                                    </label>
                                    <textarea
                                        name="reason"
                                        value={formData.reason}
                                        onChange={handleInputChange}
                                        placeholder="Tell us about your goals..."
                                        rows={4}
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
                                        onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                                        onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                                    />
                                </div>

                                {/* Submit Message */}
                                {submitMessage.text && (
                                    <div style={{
                                        padding: '15px',
                                        borderRadius: '10px',
                                        marginBottom: '20px',
                                        backgroundColor: submitMessage.type === 'success' ? '#d4edda' : '#f8d7da',
                                        color: submitMessage.type === 'success' ? '#155724' : '#721c24',
                                        border: `1px solid ${submitMessage.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
                                    }}>
                                        {submitMessage.text}
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    style={{
                                        width: '100%',
                                        padding: '15px',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '10px',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.3s ease',
                                        opacity: isSubmitting ? 0.7 : 1
                                    }}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Enrollment'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}
