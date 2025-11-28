'use client'

import { useEffect, useState, FormEvent } from 'react'
import Image from 'next/image'

export default function Home() {
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    // Custom cursor
    const cursorDot = document.querySelector('.cursor-dot') as HTMLElement
    const cursorOutline = document.querySelector('.cursor-outline') as HTMLElement

    const handleMouseMove = (e: MouseEvent) => {
      const posX = e.clientX
      const posY = e.clientY

      if (cursorDot) {
        cursorDot.style.left = `${posX}px`
        cursorDot.style.top = `${posY}px`
      }

      if (cursorOutline) {
        cursorOutline.animate({
          left: `${posX}px`,
          top: `${posY}px`
        }, { duration: 500, fill: "forwards" })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Interactive elements hover
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .work-card, .testimonial-card')
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (cursorOutline) {
          cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)'
          cursorOutline.style.backgroundColor = 'rgba(14, 215, 181, 0.1)'
        }
      })

      el.addEventListener('mouseleave', () => {
        if (cursorOutline) {
          cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)'
          cursorOutline.style.backgroundColor = 'transparent'
        }
      })
    })

    // Text reveal animation
    const revealElements = document.querySelectorAll('.reveal-text')
    revealElements.forEach((el, index) => {
      const element = el as HTMLElement
      element.style.opacity = '0'
      element.style.transform = 'translateY(20px)'
      element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)'
      element.style.transitionDelay = `${index * 0.2}s`

      setTimeout(() => {
        element.style.opacity = '1'
        element.style.transform = 'translateY(0)'
      }, 100)
    })

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e: Event) => {
        e.preventDefault()
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href')
        if (href) {
          const target = document.querySelector(href)
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth'
            })
          }
        }
      })
    })

    // Stats animation
    const animateStats = () => {
      if (hasAnimated) return

      const statsSection = document.querySelector('.stats')
      if (!statsSection) return

      const rect = statsSection.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0

      if (isVisible) {
        setHasAnimated(true)
        const statNumbers = document.querySelectorAll('.stat-number')
        
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target') || '0')
          const duration = 2000
          const increment = target / (duration / 16)
          let current = 0

          const updateCounter = () => {
            current += increment
            if (current < target) {
              stat.textContent = Math.floor(current).toString()
              requestAnimationFrame(updateCounter)
            } else {
              stat.textContent = target.toString()
            }
          }
          updateCounter()
        })
      }
    }

    window.addEventListener('scroll', animateStats)
    animateStats()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', animateStats)
    }
  }, [hasAnimated])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('Thank you for your message! We will get back to you soon.')
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <>
      <div className="cursor-dot"></div>
      <div className="cursor-outline"></div>

      <header className="header">
        <div className="container header-container">
          <a href="#" className="logo">
            <Image src="/assets/logo.png" alt="Vanlab Logo" width={120} height={40} style={{ height: 'auto', width: 'auto' }} />
          </a>
          <nav className="nav">
            <ul className="nav-list">
              <li><a href="#services" className="nav-link">Services</a></li>
              <li><a href="#work" className="nav-link">Work</a></li>
              <li><a href="#about" className="nav-link">About</a></li>
              <li><a href="#contact" className="nav-link btn-primary">Let&apos;s Talk</a></li>
            </ul>
          </nav>
          <button className="mobile-menu-btn" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <video className="hero-video" autoPlay muted loop playsInline preload="auto">
            <source src="/assets/vanlab-studio.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
          <div className="vector-bg">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
            <div className="grid-overlay"></div>
          </div>
          <div className="container hero-content">
            <h1 className="hero-title" style={{ fontFamily: 'var(--font-museo)' }}>
              <span className="reveal-text">We are Artisan</span>
              <span className="reveal-text highlight">No Code & Low Code</span>
              <span className="reveal-text">Software Developer</span>
            </h1>
            <p className="hero-subtitle">
              We craft premium digital experiences with speed and precision.
              Merging artistic vision with technical efficiency.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary-glow" style={{ fontFamily: 'var(--font-museo)' }}>Start Your Project</a>
              <a href="#work" className="btn btn-outline">View Our Work</a>
            </div>
          </div>
        </section>

        <section id="services" className="services">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title" style={{ fontFamily: 'var(--font-museo)' }}>Our Expertise</h2>
              <p className="section-subtitle">Modern solutions for modern businesses.</p>
            </div>
            <div className="services-grid">
              <div className="service-card">
                <div className="icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-museo)' }}>No-Code Development</h3>
                <p>Rapidly deploy scalable applications using cutting-edge no-code platforms without compromising on quality.</p>
              </div>
              <div className="service-card">
                <div className="icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-museo)' }}>Low-Code Solutions</h3>
                <p>Custom functionality meets development speed. We bridge the gap between off-the-shelf and bespoke code.</p>
              </div>
              <div className="service-card">
                <div className="icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-museo)' }}>Enterprise Security</h3>
                <p>Built with security first. Your data and your users are protected by industry-standard practices.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="marquee-section">
          <div className="marquee-content" style={{ fontFamily: 'var(--font-museo)' }}>
            <span>Flutterflow</span>
            <span>Directus</span>
            <span>Framer</span>
            <span>Firebase</span>
            <span>Supabase</span>
            <span>Filament</span>
            <span>Weweb</span>
            <span>Claude code</span>
            <span>Frappe</span>
            <span>NextJS</span>
            <span>n8n</span>
            <span>Flutterflow</span>
            <span>Directus</span>
            <span>Framer</span>
            <span>Firebase</span>
            <span>Supabase</span>
            <span>Filament</span>
            <span>Weweb</span>
            <span>Claude code</span>
            <span>Frappe</span>
            <span>NextJS</span>
            <span>n8n</span>
          </div>
        </section>

        <section id="work" className="work">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title" style={{ fontFamily: 'var(--font-museo)' }}>Featured Work</h2>
              <p className="section-subtitle">Crafted with precision, delivered with excellence.</p>
            </div>
            <div className="work-grid">
              <div className="work-card">
                <div className="work-image">
                  <div className="work-placeholder" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}></div>
                </div>
                <div className="work-info">
                  <h3 style={{ fontFamily: 'var(--font-museo)' }}>Filasuite</h3>
                  <p>Built a complete ERP Application Software using Filament Laravel for SMEs Business.</p>
                  <div className="work-tags">
                    <span>Filament</span>
                    <span>Flutterflow</span>
                    <span>n8n</span>
                  </div>
                </div>
              </div>
              <div className="work-card">
                <div className="work-image">
                  <div className="work-placeholder" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}></div>
                </div>
                <div className="work-info">
                  <h3 style={{ fontFamily: 'var(--font-museo)' }}>Kaspoint</h3>
                  <p>Mobile Point of Sale System for SMEs Business using Flutterflow and Firebase. Helped SMEs 100+ Business.</p>
                  <div className="work-tags">
                    <span>Flutterflow</span>
                    <span>Directus</span>
                    <span>Firebase</span>
                  </div>
                </div>
              </div>
              <div className="work-card">
                <div className="work-image">
                  <div className="work-placeholder" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}></div>
                </div>
                <div className="work-info">
                  <h3 style={{ fontFamily: 'var(--font-museo)' }}>Solois</h3>
                  <p>Simple dashboard for Solopreneur and Freelancer to manage invoices, clients and projects.</p>
                  <div className="work-tags">
                    <span>Filament</span>
                    <span>Flutterflow</span>
                    <span>Firebase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="process">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title" style={{ fontFamily: 'var(--font-museo)' }}>Our Process</h2>
              <p className="section-subtitle">From concept to launch, we&apos;ve got you covered.</p>
            </div>
            <div className="process-timeline">
              <div className="process-step">
                <div className="step-number" style={{ fontFamily: 'var(--font-museo)' }}>01</div>
                <div className="step-content">
                  <h3 style={{ fontFamily: 'var(--font-museo)' }}>Discovery</h3>
                  <p>We dive deep into your business goals, target audience, and technical requirements to craft the perfect solution.</p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-number" style={{ fontFamily: 'var(--font-museo)' }}>02</div>
                <div className="step-content">
                  <h3 style={{ fontFamily: 'var(--font-museo)' }}>Design</h3>
                  <p>Our designers create stunning, user-centric interfaces that align with your brand and engage your users.</p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-number" style={{ fontFamily: 'var(--font-museo)' }}>03</div>
                <div className="step-content">
                  <h3 style={{ fontFamily: 'var(--font-museo)' }}>Development</h3>
                  <p>Using the best no-code and low-code tools, we build your application with speed and precision.</p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-number" style={{ fontFamily: 'var(--font-museo)' }}>04</div>
                <div className="step-content">
                  <h3 style={{ fontFamily: 'var(--font-museo)' }}>Launch & Support</h3>
                  <p>We ensure a smooth launch and provide ongoing support to keep your application running flawlessly.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="founder">
          <div className="container">
            <div className="founder-content">
              <div className="founder-image-wrapper">
                <Image src="/assets/novan-profile.png" alt="Novan Bagus - Founder" className="founder-image" width={400} height={400} />
                <div className="founder-badge">
                  <span className="badge-number" data-target="12" style={{ fontFamily: 'var(--font-museo)' }}>12+</span>
                  <p className="badge-label">Years</p>
                </div>
              </div>
              <div className="founder-info">
                <div className="section-label" style={{ fontFamily: 'var(--font-museo)' }}>Tech Artisan</div>
                <h2 style={{ fontFamily: 'var(--font-museo)' }}>Meet the Founder</h2>
                <h3 style={{ fontFamily: 'var(--font-museo)' }}>Novan Bagus</h3>
                <p className="founder-intro">
                  A seasoned technology consultant with over 12 years of experience transforming businesses through strategic technology implementation. As the founder of multiple successful companies and startups, Novan brings a unique dual perspective—combining deep technical expertise with sharp business acumen.
                </p>
                <div className="expertise-grid">
                  <div className="expertise-item">
                    <div className="expertise-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-museo)' }}>Fullstack Engineering</h4>
                      <p>End-to-end development expertise</p>
                    </div>
                  </div>
                  <div className="expertise-item">
                    <div className="expertise-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="9" y1="3" x2="9" y2="21"></line>
                      </svg>
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-museo)' }}>ERP Solutions</h4>
                      <p>ERPNext consulting & optimization</p>
                    </div>
                  </div>
                  <div className="expertise-item">
                    <div className="expertise-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-museo)' }}>Digital Transformation</h4>
                      <p>Strategic technology implementation</p>
                    </div>
                  </div>
                  <div className="expertise-item">
                    <div className="expertise-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-museo)' }}>Technology Strategy</h4>
                      <p>Business-aligned tech roadmaps</p>
                    </div>
                  </div>
                </div>
                <p className="founder-mission">
                  &quot;At Vanlab, we believe technology should empower businesses, not complicate them. Through artisan no-code and low-code solutions, we help organizations achieve their digital transformation goals with speed, precision, and elegance.&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title" style={{ fontFamily: 'var(--font-museo)' }}>Client Stories</h2>
              <p className="section-subtitle">Don&apos;t just take our word for it.</p>
            </div>
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="quote-icon">&quot;</div>
                <p className="testimonial-text">Vanlab transformed our idea into a fully functional platform in just 6 weeks. Their expertise in no-code development is unmatched.</p>
                <div className="testimonial-author">
                  <div className="author-avatar" style={{ fontFamily: 'var(--font-museo)' }}>JD</div>
                  <div className="author-info">
                    <h4 style={{ fontFamily: 'var(--font-museo)' }}>John Davis</h4>
                    <p>CEO, TechStart Inc.</p>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="quote-icon">&quot;</div>
                <p className="testimonial-text">The team&apos;s attention to detail and commitment to quality is exceptional. They delivered beyond our expectations.</p>
                <div className="testimonial-author">
                  <div className="author-avatar" style={{ fontFamily: 'var(--font-museo)' }}>SM</div>
                  <div className="author-info">
                    <h4 style={{ fontFamily: 'var(--font-museo)' }}>Sarah Martinez</h4>
                    <p>Founder, GrowthHub</p>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="quote-icon">&quot;</div>
                <p className="testimonial-text">Working with Vanlab was a game-changer. They understood our vision and brought it to life with incredible speed.</p>
                <div className="testimonial-author">
                  <div className="author-avatar" style={{ fontFamily: 'var(--font-museo)' }}>MK</div>
                  <div className="author-info">
                    <h4 style={{ fontFamily: 'var(--font-museo)' }}>Michael Kim</h4>
                    <p>CTO, DataFlow</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="stats">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number" data-target="50" style={{ fontFamily: 'var(--font-museo)' }}>0</div>
                <div className="stat-label">Projects Delivered</div>
              </div>
              <div className="stat-item">
                <div className="stat-number" data-target="20" style={{ fontFamily: 'var(--font-museo)' }}>0</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
              <div className="stat-item">
                <div className="stat-number" data-target="12" style={{ fontFamily: 'var(--font-museo)' }}>0</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number" data-target="24" style={{ fontFamily: 'var(--font-museo)' }}>0</div>
                <div className="stat-label">Support Hours</div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="container">
            <div className="contact-content">
              <div className="contact-info">
                <h2 style={{ fontFamily: 'var(--font-museo)' }}>Let&apos;s Build Something Amazing</h2>
                <p>Ready to transform your idea into reality? Get in touch with us and let&apos;s discuss how we can help you achieve your goals.</p>
                <div className="contact-details">
                  <div className="contact-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>artisan@vanlab.digital</span>
                  </div>
                  <div className="contact-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>Jakarta, ID</span>
                  </div>
                </div>
              </div>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Project Budget" />
                </div>
                <div className="form-group">
                  <textarea placeholder="Tell us about your project" rows={5} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary-glow" style={{ fontFamily: 'var(--font-museo)' }}>Send Message</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <Image src="/assets/logo.png" alt="Vanlab Logo" className="footer-logo" width={120} height={40} style={{ height: 'auto', width: 'auto' }} />
            <p>Artisan No Code & Low Code<br />Software Developer Agency</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4 style={{ fontFamily: 'var(--font-museo)' }}>Company</h4>
              <a href="#">About</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </div>
            <div className="link-group">
              <h4 style={{ fontFamily: 'var(--font-museo)' }}>Social</h4>
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
              <a href="#">Instagram</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Vanlab. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
