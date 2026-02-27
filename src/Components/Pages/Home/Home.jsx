import React, { useState, useEffect, useRef } from "react";

// ==================== INLINE STYLES & CSS ====================
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');

  :root {
    --primary: #1a56ff;
    --primary-dark: #0a3dd4;
    --primary-light: #e8eeff;
    --accent: #00d4aa;
    --accent-dark: #00a88a;
    --dark: #0d1117;
    --dark-2: #161b22;
    --text: #1c2340;
    --text-muted: #6b7280;
    --white: #ffffff;
    --light-bg: #f8faff;
    --card-bg: #ffffff;
    --border: rgba(26, 86, 255, 0.12);
    --shadow: 0 4px 24px rgba(26, 86, 255, 0.10);
    --shadow-lg: 0 12px 48px rgba(26, 86, 255, 0.16);
    --radius: 16px;
    --radius-sm: 10px;
    --transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    --font-heading: 'Sora', sans-serif;
    --font-body: 'DM Sans', sans-serif;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: var(--font-body);
    color: var(--text);
    background: var(--white);
    overflow-x: hidden;
  }

  /* ===== HERO SECTION ===== */
  .hero-section {
    background: linear-gradient(135deg, #0d1117 0%, #0a1628 40%, #091240 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding: 100px 0 60px;
  }
  .hero-section::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(26,86,255,0.18) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-section::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(0,212,170,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(26,86,255,0.15);
    border: 1px solid rgba(26,86,255,0.3);
    border-radius: 50px;
    padding: 6px 16px;
    font-size: 13px;
    color: #60a5fa;
    font-weight: 500;
    margin-bottom: 24px;
    animation: fadeInDown 0.8s ease both;
  }
  .hero-title {
    font-family: var(--font-heading);
    font-size: clamp(2.2rem, 5vw, 3.8rem);
    font-weight: 800;
    color: white;
    line-height: 1.15;
    margin-bottom: 20px;
    animation: fadeInUp 0.9s ease 0.1s both;
  }
  .hero-title span { color: var(--accent); }
  .hero-subtitle {
    font-size: clamp(1rem, 2vw, 1.15rem);
    color: rgba(255,255,255,0.65);
    line-height: 1.75;
    margin-bottom: 36px;
    max-width: 520px;
    animation: fadeInUp 0.9s ease 0.2s both;
  }
  .hero-buttons { animation: fadeInUp 0.9s ease 0.3s both; }
  .btn-primary-custom {
    background: linear-gradient(135deg, var(--primary), #4f7fff);
    color: white;
    border: none;
    border-radius: 50px;
    padding: 14px 32px;
    font-size: 15px;
    font-weight: 600;
    font-family: var(--font-heading);
    cursor: pointer;
    transition: var(--transition);
    box-shadow: 0 6px 20px rgba(26,86,255,0.35);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
  }
  .btn-primary-custom:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(26,86,255,0.45);
    color: white;
  }
  .btn-outline-custom {
    background: transparent;
    color: white;
    border: 1.5px solid rgba(255,255,255,0.3);
    border-radius: 50px;
    padding: 14px 32px;
    font-size: 15px;
    font-weight: 600;
    font-family: var(--font-heading);
    cursor: pointer;
    transition: var(--transition);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
  }
  .btn-outline-custom:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.6);
    transform: translateY(-2px);
    color: white;
  }
  .hero-form-card {
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 24px;
    padding: 40px 36px;
    animation: fadeInRight 0.9s ease 0.2s both;
  }
  .hero-form-card h3 {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 6px;
  }
  .hero-form-card p {
    color: rgba(255,255,255,0.55);
    font-size: 14px;
    margin-bottom: 24px;
  }
  .form-group-custom { margin-bottom: 16px; position: relative; }
  .form-group-custom label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,0.7);
    margin-bottom: 6px;
  }
  .input-with-icon { position: relative; }
  .input-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255,255,255,0.4);
    font-size: 14px;
    z-index: 1;
  }
  .form-input-custom {
    width: 100%;
    padding: 12px 14px 12px 40px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.07);
    color: white;
    font-size: 14px;
    font-family: var(--font-body);
    outline: none;
    transition: var(--transition);
  }
  .form-input-custom::placeholder { color: rgba(255,255,255,0.3); }
  .form-input-custom:focus {
    border-color: var(--primary);
    background: rgba(26,86,255,0.1);
    box-shadow: 0 0 0 3px rgba(26,86,255,0.15);
  }
  .form-input-custom option { background: #1a1f36; color: white; }
  .btn-submit-form {
    width: 100%;
    background: linear-gradient(135deg, var(--primary), #4f7fff);
    color: white;
    border: none;
    border-radius: 10px;
    padding: 14px;
    font-size: 15px;
    font-weight: 600;
    font-family: var(--font-heading);
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 6px 20px rgba(26,86,255,0.35);
    margin-top: 8px;
  }
  .btn-submit-form:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(26,86,255,0.45);
  }

  /* ===== TRUSTED BRANDS ===== */
  .brands-section {
    background: var(--light-bg);
    padding: 40px 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .brands-section h6 {
    font-family: var(--font-heading);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 2px;
    color: var(--text-muted);
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 24px;
  }
  .marquee-wrapper { overflow: hidden; }
  .marquee-track {
    display: flex;
    gap: 40px;
    animation: marqueeScroll 20s linear infinite;
    width: max-content;
    align-items: center;
  }
  .marquee-track img {
    height: 36px;
    object-fit: contain;
    filter: grayscale(1) opacity(0.5);
    transition: var(--transition);
  }
  .marquee-track img:hover {
    filter: grayscale(0) opacity(1);
    transform: scale(1.05);
  }

  /* ===== PROBLEM SECTION ===== */
  .problem-section {
    padding: 100px 0;
    background: var(--white);
  }
  .section-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--primary);
    margin-bottom: 16px;
  }
  .section-eyebrow::before {
    content: '';
    width: 24px;
    height: 2px;
    background: var(--primary);
    border-radius: 2px;
  }
  .section-title {
    font-family: var(--font-heading);
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 700;
    color: var(--text);
    line-height: 1.2;
    margin-bottom: 16px;
  }
  .section-subtitle {
    font-size: 1.05rem;
    color: var(--text-muted);
    line-height: 1.7;
    max-width: 600px;
  }
  .problem-card {
    background: var(--card-bg);
    border-radius: var(--radius);
    border: 1px solid var(--border);
    padding: 36px;
    height: 100%;
    transition: var(--transition);
    position: relative;
    overflow: hidden;
  }
  .problem-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg, var(--primary), var(--accent));
    border-radius: 4px 0 0 4px;
  }
  .problem-card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
    border-color: transparent;
  }
  .problem-icon {
    width: 56px;
    height: 56px;
    background: var(--primary-light);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    font-size: 22px;
    color: var(--primary);
  }
  .problem-card h4 {
    font-family: var(--font-heading);
    font-size: 1.15rem;
    font-weight: 700;
    margin-bottom: 10px;
    color: var(--text);
  }
  .problem-card p {
    color: var(--text-muted);
    line-height: 1.7;
    font-size: 0.95rem;
  }

  /* ===== WHY SECTION ===== */
  .why-section {
    padding: 100px 0;
    background: linear-gradient(135deg, #0d1117 0%, #0a1628 100%);
    position: relative;
    overflow: hidden;
  }
  .why-section::before {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(0,212,170,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .why-section .section-eyebrow { color: var(--accent); }
  .why-section .section-eyebrow::before { background: var(--accent); }
  .why-section .section-title { color: white; }
  .why-left-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: var(--radius);
    padding: 36px;
    height: 100%;
  }
  .why-left-card img {
    width: 100%;
    border-radius: var(--radius-sm);
    margin-bottom: 24px;
    object-fit: cover;
    height: 200px;
  }
  .why-left-card h4 {
    font-family: var(--font-heading);
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--accent);
    margin-bottom: 10px;
  }
  .why-left-card h2 {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    line-height: 1.35;
    margin-bottom: 16px;
  }
  .why-left-card p { color: rgba(255,255,255,0.6); line-height: 1.7; }
  .info-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: var(--radius-sm);
    padding: 20px 24px;
    margin-bottom: 16px;
    transition: var(--transition);
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }
  .info-card:hover {
    background: rgba(26,86,255,0.1);
    border-color: rgba(26,86,255,0.3);
    transform: translateX(6px);
  }
  .info-icon {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: rgba(26,86,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #60a5fa;
    font-size: 16px;
    flex-shrink: 0;
  }
  .info-card-body h3 {
    font-family: var(--font-heading);
    font-size: 1rem;
    font-weight: 700;
    color: white;
    margin-bottom: 4px;
  }
  .info-card-body p {
    font-size: 0.88rem;
    color: rgba(255,255,255,0.5);
    line-height: 1.6;
    margin: 0;
  }
  .info-card-body a {
    font-size: 12px;
    color: var(--accent);
    text-decoration: none;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-top: 6px;
    transition: var(--transition);
  }
  .info-card-body a:hover { gap: 8px; }

  /* ===== STATS SECTION ===== */
  .stats-section {
    padding: 100px 0;
    background: var(--light-bg);
  }
  .stats-section .section-title { text-align: center; max-width: 600px; margin: 0 auto 56px; }
  .stat-card {
    background: var(--white);
    border-radius: var(--radius);
    padding: 40px 32px;
    text-align: center;
    border: 1px solid var(--border);
    transition: var(--transition);
    position: relative;
    overflow: hidden;
  }
  .stat-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    transform: scaleX(0);
    transition: var(--transition);
    transform-origin: left;
  }
  .stat-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
    border-color: transparent;
  }
  .stat-card:hover::after { transform: scaleX(1); }
  .stat-icon {
    width: 64px;
    height: 64px;
    border-radius: 18px;
    background: var(--primary-light);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    color: var(--primary);
    margin: 0 auto 20px;
  }
  .stat-value {
    font-family: var(--font-heading);
    font-size: clamp(2.8rem, 5vw, 4rem);
    font-weight: 800;
    color: var(--primary);
    line-height: 1;
    margin-bottom: 8px;
  }
  .stat-label {
    font-size: 0.95rem;
    color: var(--text-muted);
    font-weight: 500;
    line-height: 1.5;
  }

  /* ===== PLATFORM TABS ===== */
  .platform-section {
    padding: 100px 0;
    background: var(--white);
  }
  .tabs-nav {
    display: flex;
    gap: 8px;
    background: var(--light-bg);
    border-radius: 50px;
    padding: 6px;
    margin: 40px 0 0;
    flex-wrap: wrap;
    justify-content: center;
  }
  .tab-btn {
    border: none;
    background: transparent;
    padding: 10px 22px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 600;
    font-family: var(--font-heading);
    color: var(--text-muted);
    cursor: pointer;
    transition: var(--transition);
    white-space: nowrap;
  }
  .tab-btn.active {
    background: var(--primary);
    color: white;
    box-shadow: 0 4px 12px rgba(26,86,255,0.3);
  }
  .tab-btn:hover:not(.active) { color: var(--primary); background: var(--primary-light); }
  .tab-content-box {
    background: var(--light-bg);
    border-radius: var(--radius);
    padding: 48px;
    margin-top: 32px;
    border: 1px solid var(--border);
  }
  .tab-content-box h2 {
    font-family: var(--font-heading);
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 700;
    color: var(--text);
    margin-bottom: 16px;
  }
  .tab-content-box p {
    font-size: 1rem;
    color: var(--text-muted);
    line-height: 1.75;
    margin-bottom: 28px;
  }
  .tab-img-placeholder {
    background: linear-gradient(135deg, var(--primary-light), #e0e7ff);
    border-radius: var(--radius-sm);
    height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    color: var(--primary);
  }

  /* ===== EXPLORE SECTION ===== */
  .explore-section {
    padding: 80px 0;
    background: linear-gradient(135deg, var(--primary) 0%, #0a3dd4 100%);
    position: relative;
    overflow: hidden;
  }
  .explore-section::before {
    content: '';
    position: absolute;
    top: -50%; right: -10%;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .explore-section h2 {
    font-family: var(--font-heading);
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    font-weight: 700;
    color: white;
    margin-bottom: 12px;
  }
  .explore-section p { color: rgba(255,255,255,0.7); font-size: 1.05rem; }
  .btn-white {
    background: white;
    color: var(--primary);
    border: none;
    border-radius: 50px;
    padding: 14px 30px;
    font-size: 15px;
    font-weight: 700;
    font-family: var(--font-heading);
    cursor: pointer;
    transition: var(--transition);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
  }
  .btn-white:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 28px rgba(0,0,0,0.2);
    color: var(--primary);
  }
  .btn-white-outline {
    background: transparent;
    color: white;
    border: 2px solid rgba(255,255,255,0.4);
    border-radius: 50px;
    padding: 14px 30px;
    font-size: 15px;
    font-weight: 700;
    font-family: var(--font-heading);
    cursor: pointer;
    transition: var(--transition);
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .btn-white-outline:hover {
    background: rgba(255,255,255,0.15);
    border-color: white;
    transform: translateY(-3px);
  }

  /* ===== INDUSTRIES ===== */
  .industries-section {
    padding: 100px 0;
    background: var(--light-bg);
  }
  .industries-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
    flex-wrap: wrap;
    gap: 16px;
  }
  .industries-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
  .industry-card {
    background: white;
    border-radius: var(--radius-sm);
    overflow: hidden;
    border: 1px solid var(--border);
    transition: var(--transition);
    cursor: pointer;
  }
  .industry-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary);
  }
  .industry-img {
    height: 120px;
    background: linear-gradient(135deg, #e8eeff, #dbeafe);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
  }
  .industry-card-body {
    padding: 16px;
  }
  .industry-card-body h3 {
    font-family: var(--font-heading);
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 8px;
  }
  .industry-card-body button {
    background: none;
    border: none;
    color: var(--primary);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    gap: 4px;
    font-family: var(--font-body);
    transition: var(--transition);
  }
  .industry-card-body button:hover { gap: 8px; }
  .view-all-btn {
    background: var(--primary-light);
    color: var(--primary);
    border: 1px solid var(--primary);
    border-radius: 50px;
    padding: 10px 24px;
    font-size: 14px;
    font-weight: 700;
    font-family: var(--font-heading);
    cursor: pointer;
    transition: var(--transition);
  }
  .view-all-btn:hover { background: var(--primary); color: white; }

  /* ===== TESTIMONIALS ===== */
  .testimonials-section {
    padding: 100px 0;
    background: var(--white);
  }
  .testimonial-card {
    background: var(--light-bg);
    border-radius: var(--radius);
    padding: 36px;
    border: 1px solid var(--border);
    height: 100%;
    transition: var(--transition);
    position: relative;
  }
  .testimonial-card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary);
  }
  .quote-icon {
    font-size: 40px;
    color: var(--primary);
    opacity: 0.2;
    margin-bottom: 16px;
    line-height: 1;
  }
  .testimonial-card p {
    color: var(--text);
    line-height: 1.75;
    font-size: 0.95rem;
    margin-bottom: 24px;
    font-style: italic;
  }
  .testimonial-author {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .author-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 16px;
    flex-shrink: 0;
  }
  .author-info h5 {
    font-family: var(--font-heading);
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--text);
    margin: 0;
  }
  .author-info span {
    font-size: 0.8rem;
    color: var(--text-muted);
  }
  .stars { color: #f59e0b; font-size: 13px; margin-bottom: 12px; }

  /* ===== TOAST ===== */
  .toast-wrapper {
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 9999;
    animation: slideInRight 0.4s ease;
  }
  .toast-box {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.15);
    font-size: 14px;
    font-weight: 500;
    min-width: 280px;
    max-width: 380px;
  }
  .toast-success { background: #ecfdf5; border: 1px solid #6ee7b7; color: #065f46; }
  .toast-error { background: #fef2f2; border: 1px solid #fca5a5; color: #991b1b; }
  .toast-icon { font-size: 18px; }
  .toast-close { margin-left: auto; cursor: pointer; opacity: 0.6; }
  .toast-close:hover { opacity: 1; }

  /* ===== ANIMATIONS ===== */
  @keyframes fadeInDown { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeInUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeInRight { from { opacity:0; transform:translateX(30px); } to { opacity:1; transform:translateX(0); } }
  @keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  @keyframes slideInRight { from { opacity:0; transform:translateX(50px); } to { opacity:1; transform:translateX(0); } }
  @keyframes countUp { from { opacity:0; transform:scale(0.8); } to { opacity:1; transform:scale(1); } }

  .fade-up {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 768px) {
    .hero-section { padding: 80px 0 50px; text-align: center; }
    .hero-subtitle { margin: 0 auto 28px; }
    .hero-form-card { margin-top: 40px; padding: 28px 22px; }
    .tabs-nav { padding: 4px; gap: 4px; }
    .tab-btn { padding: 8px 14px; font-size: 13px; }
    .tab-content-box { padding: 28px 20px; }
    .explore-section .text-md-end { text-align: center !important; margin-top: 24px; }
    .industries-header { flex-direction: column; align-items: flex-start; }
    .industries-grid { grid-template-columns: repeat(2, 1fr); }
    .hero-buttons { display: flex; flex-direction: column; gap: 12px; align-items: center; }
    .btn-primary-custom, .btn-outline-custom { width: 100%; justify-content: center; }
    .explore-buttons { flex-direction: column; align-items: stretch; }
    .explore-buttons button { width: 100%; justify-content: center; }
    .stat-card { padding: 28px 20px; }
    .why-left-card { margin-bottom: 24px; }
  }
  @media (max-width: 480px) {
    .industries-grid { grid-template-columns: repeat(2, 1fr); }
    .hero-form-card { padding: 24px 16px; }
    .tab-content-box { padding: 20px 16px; }
    .problem-card { padding: 24px 20px; }
  }
`;

// ==================== COMPONENT ====================
const Home = () => {
  const [activeTab, setActiveTab] = useState("library");
  const [toast, setToast] = useState(null);
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0]);
  const [statsVisible, setStatsVisible] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", company: "", phone: "", employees: "" });
  const [submitting, setSubmitting] = useState(false);
  const statsRef = useRef(null);

  const statsData = [
    { value: 95, label: "Reduction in Time to Hire", suffix: "%", icon: "fa-clock" },
    { value: 80, label: "Improvement in Quality of Hire", suffix: "%", icon: "fa-star" },
    { value: 70, label: "Cost Savings per Hire", suffix: "%", icon: "fa-piggy-bank" },
  ];

  const tabs = [
    { id: "library", label: "Assessment Library", title: "Extensive Test Library", icon: "fa-book-open",
      content: "Use tried-and-true content spanning over 600 subjects and 70,000+ questions covering every skill domain.", button: "Explore Assessment Types", tabIcon: "📚" },
    { id: "custom", label: "Customizations", title: "Robust Customization", icon: "fa-sliders",
      content: "Mix-and-match questions or create your own to assemble a test specific to your unique job and company requirements.", button: "Explore Customizations", tabIcon: "⚙️" },
    { id: "anticheat", label: "Anti-Cheat", title: "Anti-Cheat Tools", icon: "fa-shield-halved",
      content: "Authenticate accurate results with Talent Access anti-cheat tools and AI-assisted proctoring solutions.", button: "View Anti-Cheat Features", tabIcon: "🛡️" },
    { id: "experts", label: "Assessment Experts", title: "Assessment Experts", icon: "fa-user-tie",
      content: "Lean on Talent Access experts who assist with test consultation, analysis, and refinement for your needs.", button: "Meet Our Experts", tabIcon: "👨‍💼" },
  ];

  const industries = [
    { title: "Manufacturing", icon: "🏭" }, { title: "Government", icon: "🏛️" },
    { title: "Healthcare", icon: "🏥" }, { title: "Engineering", icon: "⚙️" },
    { title: "Construction", icon: "🏗️" }, { title: "Energy/Utilities", icon: "⚡" },
    { title: "Financial Services", icon: "💰" }, { title: "Transportation", icon: "🚚" },
    { title: "Education", icon: "🎓" }, { title: "Staffing", icon: "👥" },
    { title: "Call Center", icon: "📞" }, { title: "Hospitality", icon: "🏨" },
  ];

  const testimonials = [
    { text: "Talent Access completely transformed our hiring process. We cut time-to-hire by 60% while dramatically improving candidate quality.", author: "Sarah M.", role: "HR Director, TechCorp", stars: 5 },
    { text: "The assessment library is incredible. We found exactly what we needed for our specialized engineering roles without any customization.", author: "James R.", role: "Talent Lead, BuildFirm", stars: 5 },
    { text: "The anti-cheat features give us full confidence that our scores are genuine. Game-changer for remote hiring.", author: "Priya K.", role: "Recruiter, FinanceHub", stars: 5 },
  ];

  const brandLogos = ["Udichi", "TeamLease", "Amity", "Pratichi", "ASDP", "Sector Skill", "ST", "Udichi", "TeamLease", "Amity"];

  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.textContent = globalCSS;
    document.head.appendChild(styleEl);
    const faLink = document.createElement("link");
    faLink.rel = "stylesheet";
    faLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
    document.head.appendChild(faLink);
    const gLink = document.createElement("link");
    gLink.rel = "stylesheet";
    gLink.href = "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap";
    document.head.appendChild(gLink);
    return () => { document.head.removeChild(styleEl); };
  }, []);

  // Intersection observer for stats
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStatsVisible(true);
    }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Animate stat numbers
  useEffect(() => {
    if (!statsVisible) return;
    statsData.forEach((stat, index) => {
      let current = 0;
      const increment = stat.value / 60;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) { current = stat.value; clearInterval(timer); }
        setAnimatedValues(prev => { const n = [...prev]; n[index] = Math.floor(current); return n; });
      }, 25);
    });
  }, [statsVisible]);

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [activeTab]);

  const handleInput = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.company) {
      setToast({ message: "Please fill in all required fields.", type: "error" });
      setTimeout(() => setToast(null), 3500);
      return;
    }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setSubmitting(false);
    setToast({ message: "🎉 Demo request sent! We'll contact you shortly.", type: "success" });
    setFormData({ firstName: "", lastName: "", email: "", company: "", phone: "", employees: "" });
    setTimeout(() => setToast(null), 4000);
  };

  const active = tabs.find(t => t.id === activeTab);

  return (
    <>
      {/* TOAST */}
      {toast && (
        <div className="toast-wrapper">
          <div className={`toast-box ${toast.type === "success" ? "toast-success" : "toast-error"}`}>
            <span className="toast-icon">{toast.type === "success" ? "✅" : "❌"}</span>
            <span>{toast.message}</span>
            <span className="toast-close" onClick={() => setToast(null)}>
              <i className="fas fa-times"></i>
            </span>
          </div>
        </div>
      )}

      {/* ===== HERO ===== */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Left */}
            <div className="col-lg-6 col-12">
              <div className="hero-badge">
                <i className="fas fa-bolt"></i>
                AI-Powered Pre-Employment Testing
              </div>
              <h1 className="hero-title">
                Hire Smarter.<br />
                Build <span>Stronger</span> Teams.
              </h1>
              <p className="hero-subtitle">
                Streamline hiring with 70,000+ validated assessments. Identify top talent faster, reduce bias, and make data-driven decisions that drive results.
              </p>
              <div className="hero-buttons">
                <a className="btn-primary-custom me-3 mb-2" href="#demo">
                  <i className="fas fa-calendar-check"></i> Get a Free Demo
                </a>
                <a className="btn-outline-custom mb-2" href="#platform">
                  <i className="fas fa-play-circle"></i> See It in Action
                </a>
              </div>
              <div className="mt-4 d-flex gap-4 flex-wrap" style={{ animation: "fadeInUp 0.9s ease 0.4s both" }}>
                {[["500+", "Companies"], ["70K+", "Questions"], ["95%", "Satisfaction"]].map(([val, lab]) => (
                  <div key={lab} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 800, color: "white" }}>{val}</div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{lab}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Demo Form */}
            <div className="col-lg-6 col-12" id="demo">
              <div className="hero-form-card">
                <h3>Request a Demo</h3>
                <p>See how Talent Access transforms your hiring in 30 minutes.</p>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-6">
                      <div className="form-group-custom">
                        <label>First Name <span style={{ color: "#f87171" }}>*</span></label>
                        <div className="input-with-icon">
                          <i className="fas fa-user input-icon"></i>
                          <input className="form-input-custom" type="text" name="firstName" placeholder="John" value={formData.firstName} onChange={handleInput} />
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group-custom">
                        <label>Last Name</label>
                        <div className="input-with-icon">
                          <i className="fas fa-user input-icon"></i>
                          <input className="form-input-custom" type="text" name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleInput} />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group-custom">
                        <label>Work Email <span style={{ color: "#f87171" }}>*</span></label>
                        <div className="input-with-icon">
                          <i className="fas fa-envelope input-icon"></i>
                          <input className="form-input-custom" type="email" name="email" placeholder="john@company.com" value={formData.email} onChange={handleInput} />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group-custom">
                        <label>Company Name <span style={{ color: "#f87171" }}>*</span></label>
                        <div className="input-with-icon">
                          <i className="fas fa-building input-icon"></i>
                          <input className="form-input-custom" type="text" name="company" placeholder="Acme Corp" value={formData.company} onChange={handleInput} />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group-custom">
                        <label>Phone Number</label>
                        <div className="input-with-icon">
                          <i className="fas fa-phone input-icon"></i>
                          <input className="form-input-custom" type="tel" name="phone" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleInput} />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group-custom">
                        <label>Company Size</label>
                        <div className="input-with-icon">
                          <i className="fas fa-users input-icon"></i>
                          <select className="form-input-custom" name="employees" value={formData.employees} onChange={handleInput}>
                            <option value="">Select company size</option>
                            <option value="1-10">1–10 employees</option>
                            <option value="11-50">11–50 employees</option>
                            <option value="51-200">51–200 employees</option>
                            <option value="201-500">201–500 employees</option>
                            <option value="500+">500+ employees</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn-submit-form" disabled={submitting}>
                        {submitting ? (
                          <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Sending...</>
                        ) : (
                          <><i className="fas fa-paper-plane"></i> Request My Demo</>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
                <p style={{ textAlign: "center", marginTop: "12px", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                  <i className="fas fa-lock me-1"></i> No credit card required. Free 30-min demo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUSTED BRANDS ===== */}
      <section className="brands-section">
        <div className="container">
          <h6>Trusted by 1,000s of organizations worldwide</h6>
          <div className="marquee-wrapper">
            <div className="marquee-track">
              {[...brandLogos, ...brandLogos].map((name, i) => (
                <div key={i} style={{
                  background: "white",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  padding: "10px 24px",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "var(--text-muted)",
                  whiteSpace: "nowrap",
                  transition: "var(--transition)",
                  cursor: "default",
                }}>
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROBLEM SECTION ===== */}
      <section className="problem-section">
        <div className="container">
          <div className="text-center mb-5">
            <div className="section-eyebrow justify-content-center d-inline-flex">The Challenge</div>
            <h2 className="section-title">Hiring is Getting Harder</h2>
            <p className="section-subtitle mx-auto">
              Traditional methods leave hiring managers overwhelmed and unable to identify truly qualified candidates in a sea of applicants.
            </p>
          </div>
          <div className="row g-4">
            {[
              { icon: "fa-users-slash", title: "Volume Overload", text: "HR teams are overwhelmed by high volumes of applicants per role. Sorting through hundreds of resumes manually is time-consuming and inefficient." },
              { icon: "fa-file-circle-xmark", title: "Resumes Aren't Enough", text: "Resumes and cover letters don't predict performance. Hiring managers need objective tools to assess real job fit and future potential." },
              { icon: "fa-chart-line-down", title: "High Cost of Bad Hires", text: "A single bad hire can cost up to 30% of their annual salary. Objective assessments dramatically reduce this costly risk." },
              { icon: "fa-clock-rotate-left", title: "Lengthy Time-to-Hire", text: "Slow hiring processes let top candidates accept competing offers. Streamlined assessments cut decision time without sacrificing quality." },
            ].map((item, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <div className="problem-card fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="problem-icon">
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY ASSESSMENTS ===== */}
      <section className="why-section">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5 col-12">
              <div className="why-left-card fade-up">
                <div style={{
                  height: "200px", background: "linear-gradient(135deg, rgba(26,86,255,0.2), rgba(0,212,170,0.1))",
                  borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "80px", marginBottom: "24px"
                }}>🎯</div>
                <h4>Go Beyond the Resume</h4>
                <h2>Assess real skills to find the right candidate for every job.</h2>
                <p>Pre-employment tests identify talented candidates before the interview — saving time, reducing bias, and improving outcomes.</p>
                <button className="btn-primary-custom mt-4" onClick={() => document.getElementById("demo").scrollIntoView({ behavior: "smooth" })}>
                  <i className="fas fa-calendar-check"></i> Get a Demo
                </button>
              </div>
            </div>
            <div className="col-lg-7 col-12">
              <div className="section-eyebrow mb-3">Why It Works</div>
              <h2 className="section-title" style={{ color: "white" }}>Why Pre-Employment<br />Assessments Work</h2>
              <div className="mt-4">
                {[
                  { icon: "fa-brain", title: "Test Hard Skills", text: "Go beyond the resume. Pull from hundreds of subjects and thousands of questions to assess job-critical skills." },
                  { icon: "fa-filter", title: "Screen Out Bad Fits", text: "Leverage objective, data-driven information to quickly filter out mismatched candidates so you focus on quality." },
                  { icon: "fa-puzzle-piece", title: "Customize to Fit Your Job", text: "Create tests aligned with your roles and goals. Mix, match, upload, or build from scratch." },
                  { icon: "fa-chart-bar", title: "See Impactful Results", text: "Assess skills to stop wasting time, avoid costly bad hires, and dramatically reduce turnover." },
                ].map((item, i) => (
                  <div key={i} className="info-card fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                    <div className="info-icon">
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <div className="info-card-body">
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                      <a href="#">Learn More <i className="fas fa-arrow-right"></i></a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="stats-section" ref={statsRef}>
        <div className="container">
          <div className="section-eyebrow justify-content-center d-inline-flex mx-auto mb-3" style={{ display: "flex" }}>Proven Results</div>
          <h2 className="section-title text-center">Talent Access Customers Have Experienced...</h2>
          <div className="row g-4 mt-2">
            {statsData.map((item, index) => (
              <div key={index} className="col-md-4 col-sm-6 col-12">
                <div className="stat-card fade-up" style={{ transitionDelay: `${index * 0.15}s` }}>
                  <div className="stat-icon">
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div className="stat-value">{animatedValues[index]}{item.suffix}</div>
                  <p className="stat-label">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <button className="btn-primary-custom mx-auto" onClick={() => document.getElementById("demo").scrollIntoView({ behavior: "smooth" })}>
              <i className="fas fa-rocket"></i> Start Hiring Smarter Today
            </button>
          </div>
        </div>
      </section>

      {/* ===== PLATFORM TABS ===== */}
      <section className="platform-section" id="platform">
        <div className="container">
          <div className="text-center">
            <div className="section-eyebrow justify-content-center d-inline-flex">Our Platform</div>
            <h2 className="section-title">Pre-Hire Assessment Platform</h2>
            <p className="section-subtitle mx-auto">Everything you need to build a world-class hiring process, all in one place.</p>
          </div>
          <div className="tabs-nav">
            {tabs.map(tab => (
              <button key={tab.id} className={`tab-btn ${activeTab === tab.id ? "active" : ""}`} onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="tab-content-box">
            <div className="row align-items-center g-5">
              <div className="col-md-6 col-12">
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>{active.tabIcon}</div>
                <h2>{active.title}</h2>
                <p>{active.content}</p>
                <button className="btn-primary-custom" onClick={() => {}}>
                  <i className="fas fa-arrow-right"></i> {active.button}
                </button>
                <div className="mt-4 d-flex flex-wrap gap-2">
                  {["Validated", "Scalable", "Customizable"].map(tag => (
                    <span key={tag} style={{
                      background: "var(--primary-light)", color: "var(--primary)",
                      padding: "6px 14px", borderRadius: "50px", fontSize: "12px", fontWeight: 600
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="tab-img-placeholder">
                  {active.tabIcon}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EXPLORE SECTION ===== */}
      <section className="explore-section">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-md-7 col-12">
              <h2>Experience Our Platform</h2>
              <p>See exactly how Talent Access can improve your hiring operations — no commitment required.</p>
            </div>
            <div className="col-md-5 col-12">
              <div className="explore-buttons d-flex flex-wrap gap-3 justify-content-md-end justify-content-start">
                <button className="btn-white">
                  <i className="fas fa-map"></i> Tour Our Platform
                </button>
                <button className="btn-white-outline">
                  <i className="fas fa-play"></i> Platform Overview
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIES ===== */}
      <section className="industries-section">
        <div className="container">
          <div className="industries-header">
            <div>
              <div className="section-eyebrow">Industries</div>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Built for Every Industry</h2>
              <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>Pre-hire assessments tailored for virtually any sector.</p>
            </div>
            <button className="view-all-btn">
              <i className="fas fa-grid-2 me-2"></i>View All Industries
            </button>
          </div>
          <div className="industries-grid">
            {industries.map((item, i) => (
              <div key={i} className="industry-card fade-up" style={{ transitionDelay: `${(i % 4) * 0.08}s` }}>
                <div className="industry-img">{item.icon}</div>
                <div className="industry-card-body">
                  <h3>{item.title}</h3>
                  <button>Read More <i className="fas fa-arrow-right"></i></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials-section">
        <div className="container">
          <div className="text-center mb-5">
            <div className="section-eyebrow justify-content-center d-inline-flex">Testimonials</div>
            <h2 className="section-title">What Our Customers Say</h2>
          </div>
          <div className="row g-4">
            {testimonials.map((t, i) => (
              <div key={i} className="col-md-4 col-12">
                <div className="testimonial-card fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="stars">{'★'.repeat(t.stars)}</div>
                  <div className="quote-icon">"</div>
                  <p>"{t.text}"</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">{t.author[0]}</div>
                    <div className="author-info">
                      <h5>{t.author}</h5>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FOOTER ===== */}
      <section style={{
        background: "var(--dark)", padding: "80px 0", textAlign: "center"
      }}>
        <div className="container">
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, color: "white", marginBottom: "16px" }}>
            Ready to Transform Your Hiring?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05rem", marginBottom: "36px" }}>
            Join 1,000+ organizations already hiring smarter with Talent Access.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button className="btn-primary-custom" onClick={() => document.getElementById("demo").scrollIntoView({ behavior: "smooth" })}>
              <i className="fas fa-calendar-check"></i> Get a Free Demo
            </button>
            <button className="btn-outline-custom">
              <i className="fas fa-phone"></i> Talk to Sales
            </button>
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", marginTop: "24px" }}>
            No credit card required · Setup in minutes · Cancel anytime
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;