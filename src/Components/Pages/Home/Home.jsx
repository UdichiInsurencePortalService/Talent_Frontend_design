import React, { useState, useEffect, useRef } from "react";
import Acc from '../../../images/client/ACC.png'
import ADSF from '../../../images/client/ADSF.png'
import APSE from '../../../images/client/APSE.png'
import AspireEdtech from '../../../images/client/AspireEdtech.png'
import Ayana from '../../../images/client/Ayana.jpg'
import barclayes from '../../../images/client/barclayes.png'
import Ced from '../../../images/client/Ced.png'
import Coromander from '../../../images/client/Coromander.png'
import HMB from '../../../images/client/HMB.png'
import LBSS from '../../../images/client/LBSS.png'
import Logo from '../../../images/client/Logo.png'
import Logoa from '../../../images/client/Logoa.png'
import Manab from '../../../images/client/Manab.png'
import nrl from '../../../images/client/nrl.png'
import nsdc from '../../../images/client/nsdc.png'
import Om from '../../../images/client/Om.png'
import Red from '../../../images/client/Red.png'
import Roshani from '../../../images/client/Roshani.png'
import SEED from '../../../images/client/SEED.png'
import Ssac from '../../../images/client/Sscac.png'
import udichi from '../../../images/client/udichi.png'

// ─────────────────────────────────────────────
// IMAGE MAP — maps string keys to imported images
// ─────────────────────────────────────────────
const IMAGE_MAP = {
  Acc,
  ADSF,
  APSE,
  AspireEdtech,
  Ayana,
  barclayes,
  Ced,
  Coromander,
  HMB,
  LBSS,
  Logo,
  Logoa,
  Manab,
  nrl,
  nsdc,
  Om,
  Red,
  Roshani,
  SEED,
  Ssac,
  udichi,
};

// ─────────────────────────────────────────────
// 1. INJECT CSS IMMEDIATELY AT MODULE LOAD
// ─────────────────────────────────────────────
const CSS_ID = "ta-global-styles";
if (typeof document !== "undefined" && !document.getElementById(CSS_ID)) {
  const style = document.createElement("style");
  style.id = CSS_ID;
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

    :root {
      --primary: #1a56ff;
      --primary-dark: #0a3dd4;
      --primary-light: #e8eeff;
      --accent: #00d4aa;
      --dark: #0d1117;
      --dark-2: #161b22;
      --text: #1c2340;
      --text-muted: #6b7280;
      --white: #ffffff;
      --light-bg: #f8faff;
      --card-bg: #ffffff;
      --border: rgba(26,86,255,0.12);
      --shadow: 0 4px 24px rgba(26,86,255,0.10);
      --shadow-lg: 0 12px 48px rgba(26,86,255,0.16);
      --radius: 16px;
      --radius-sm: 10px;
      --transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
      --font-heading: 'Sora', sans-serif;
      --font-body: 'DM Sans', sans-serif;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: var(--font-body);
      color: var(--text);
      background: var(--white);
      overflow-x: hidden;
    }

    h1,h2,h3,h4,h5,h6 { color: #000; }

    /* ── TOPBAR ── */
    .ta-topbar {
      background: var(--dark-2);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      padding: 8px 0;
      position: sticky; top: 0; z-index: 1000;
    }
    @media(max-width:767px){ .ta-topbar{ display:none !important; } }
    .ta-topbar-inner {
      display:flex; align-items:center; justify-content:space-between;
      font-size:13px; color:rgba(255,255,255,0.6);
      max-width:1200px; margin:0 auto; padding:0 20px;
    }
    .ta-topbar-left { display:flex; align-items:center; gap:20px; }
    .ta-topbar-right { display:flex; align-items:center; gap:12px; }
    .ta-topbar-right a {
      color:rgba(255,255,255,0.5); text-decoration:none; font-size:14px; transition:color 0.2s;
    }
    .ta-topbar-right a:hover { color:var(--accent); }

    /* ── HERO ── */
    .ta-hero {
      background: linear-gradient(135deg,#0d1117 0%,#0a1628 40%,#091240 100%);
      min-height:100vh; display:flex; align-items:center;
      position:relative; overflow:hidden; padding:100px 0 60px;
    }
    .ta-hero::before {
      content:''; position:absolute; top:-50%; right:-20%;
      width:700px; height:700px;
      background:radial-gradient(circle,rgba(26,86,255,0.18) 0%,transparent 70%);
      pointer-events:none;
    }
    .ta-hero::after {
      content:''; position:absolute; bottom:-30%; left:-10%;
      width:500px; height:500px;
      background:radial-gradient(circle,rgba(0,212,170,0.12) 0%,transparent 70%);
      pointer-events:none;
    }

    .ta-hero-badge {
      display:inline-flex; align-items:center; gap:8px;
      background:rgba(26,86,255,0.15); border:1px solid rgba(26,86,255,0.3);
      border-radius:50px; padding:6px 16px;
      font-size:13px; color:#60a5fa; font-weight:500; margin-bottom:24px;
    }
    .ta-hero-title {
      font-family:var(--font-heading); font-size:clamp(2.2rem,5vw,3.8rem);
      font-weight:800; color:#fff !important; line-height:1.15; margin-bottom:20px;
    }
    .ta-hero-title span { color:var(--accent) !important; }
    .ta-hero-sub {
      font-size:clamp(1rem,2vw,1.15rem); color:rgba(255,255,255,0.65);
      line-height:1.75; margin-bottom:36px; max-width:520px;
    }
    .ta-hero-stats { display:flex; gap:32px; flex-wrap:wrap; margin-top:24px; }
    .ta-hero-stat-val {
      font-family:var(--font-heading); font-size:1.5rem; font-weight:800; color:#fff;
    }
    .ta-hero-stat-lab { font-size:12px; color:rgba(255,255,255,0.5); font-weight:500; }

    /* ── BUTTONS ── */
    .ta-btn-primary {
      background:linear-gradient(135deg,var(--primary),#4f7fff);
      color:#fff; border:none; border-radius:50px;
      padding:14px 32px; font-size:15px; font-weight:600;
      font-family:var(--font-heading); transition:var(--transition);
      box-shadow:0 6px 20px rgba(26,86,255,0.35);
      display:inline-flex; align-items:center; gap:8px; text-decoration:none; cursor:pointer;
    }
    .ta-btn-primary:hover {
      transform:translateY(-3px); box-shadow:0 12px 32px rgba(26,86,255,0.45); color:#fff;
    }
    .ta-btn-outline {
      background:transparent; color:#fff; border:1.5px solid rgba(255,255,255,0.3);
      border-radius:50px; padding:14px 32px; font-size:15px; font-weight:600;
      font-family:var(--font-heading); transition:var(--transition);
      display:inline-flex; align-items:center; gap:8px; text-decoration:none; cursor:pointer;
    }
    .ta-btn-outline:hover {
      background:rgba(255,255,255,0.1); border-color:rgba(255,255,255,0.6);
      transform:translateY(-2px); color:#fff;
    }
    .ta-btn-white {
      background:#fff; color:var(--primary); border:none; border-radius:50px;
      padding:14px 30px; font-size:15px; font-weight:700; font-family:var(--font-heading);
      transition:var(--transition); display:inline-flex; align-items:center; gap:8px;
      text-decoration:none; cursor:pointer;
    }
    .ta-btn-white:hover { transform:translateY(-3px); box-shadow:0 10px 28px rgba(0,0,0,0.2); color:var(--primary); }
    .ta-btn-white-outline {
      background:transparent; color:#fff; border:2px solid rgba(255,255,255,0.4); border-radius:50px;
      padding:14px 30px; font-size:15px; font-weight:700; font-family:var(--font-heading);
      transition:var(--transition); display:inline-flex; align-items:center; gap:8px; cursor:pointer;
    }
    .ta-btn-white-outline:hover { background:rgba(255,255,255,0.15); border-color:#fff; transform:translateY(-3px); }

    /* ── FORM CARD ── */
    .ta-form-card {
      background:rgba(255,255,255,0.05); backdrop-filter:blur(20px);
      border:1px solid rgba(255,255,255,0.1); border-radius:24px; padding:40px 36px;
      position:relative; z-index:2;
    }
    .ta-form-card h3 {
      font-family:var(--font-heading); font-size:1.5rem; font-weight:700;
      color:#fff !important; margin-bottom:6px;
    }
    .ta-form-card > p { color:rgba(255,255,255,0.55); font-size:14px; margin-bottom:24px; }
    .ta-form-group { margin-bottom:16px; }
    .ta-form-group label {
      display:block; font-size:13px; font-weight:500; color:rgba(255,255,255,0.7); margin-bottom:6px;
    }
    .ta-input-wrap { position:relative; }
    .ta-input-icon {
      position:absolute; left:14px; top:50%; transform:translateY(-50%);
      color:rgba(255,255,255,0.4); font-size:14px; z-index:1;
    }
    .ta-input {
      width:100%; padding:12px 14px 12px 40px; border-radius:10px;
      border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.07);
      color:#fff; font-size:14px; font-family:var(--font-body); outline:none; transition:var(--transition);
    }
    .ta-input::placeholder { color:rgba(255,255,255,0.3); }
    .ta-input:focus {
      border-color:var(--primary); background:rgba(26,86,255,0.1);
      box-shadow:0 0 0 3px rgba(26,86,255,0.15);
    }
    .ta-input option { background:#1a1f36; color:#fff; }
    .ta-btn-submit {
      width:100%; background:linear-gradient(135deg,var(--primary),#4f7fff);
      color:#fff; border:none; border-radius:10px; padding:14px;
      font-size:15px; font-weight:600; font-family:var(--font-heading);
      transition:var(--transition); display:flex; align-items:center; justify-content:center; gap:8px;
      box-shadow:0 6px 20px rgba(26,86,255,0.35); margin-top:8px; cursor:pointer;
    }
    .ta-btn-submit:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(26,86,255,0.45); }
    .ta-btn-submit:disabled { opacity:0.7; cursor:not-allowed; }

    /* ── BRANDS MARQUEE ── */
    .ta-brands {
      background:var(--light-bg); padding:48px 0;
      border-top:1px solid var(--border); border-bottom:1px solid var(--border); overflow:hidden;
    }
    .ta-brands h6 {
      font-family:var(--font-heading); font-size:13px; font-weight:700;
      letter-spacing:2px; text-transform:uppercase; color:#000 !important;
      text-align:center; margin-bottom:32px;
    }
    .ta-marquee-outer { overflow:hidden; position:relative; }
    .ta-marquee-outer::before, .ta-marquee-outer::after {
      content:''; position:absolute; top:0; bottom:0; width:80px; z-index:2; pointer-events:none;
    }
    .ta-marquee-outer::before { left:0; background:linear-gradient(to right,var(--light-bg),transparent); }
    .ta-marquee-outer::after  { right:0; background:linear-gradient(to left,var(--light-bg),transparent); }
    .ta-marquee-track {
      display:flex; gap:20px; animation:taMarquee 32s linear infinite; width:max-content; align-items:center;
    }
    .ta-marquee-track:hover { animation-play-state:paused; }

    /* Brand chip with image */
    .ta-brand-chip {
      display:flex; align-items:center; gap:10px; background:#fff;
      border:1px solid var(--border); border-radius:14px; padding:10px 18px;
      font-family:var(--font-heading); font-weight:700; font-size:13px; color:#000 !important;
      white-space:nowrap; transition:var(--transition); box-shadow:0 2px 8px rgba(26,86,255,0.06);
      min-width:140px;
    }
    .ta-brand-chip:hover {
      border-color:var(--primary); background:#eef2ff !important;
      box-shadow:0 6px 20px rgba(26,86,255,0.15); transform:translateY(-3px); color:var(--primary) !important;
    }
    .ta-brand-img-wrap {
      width:36px; height:36px; border-radius:8px; overflow:hidden;
      display:flex; align-items:center; justify-content:center;
      background:var(--light-bg); flex-shrink:0;
    }
    .ta-brand-img-wrap img {
      width:100%; height:100%; object-fit:contain;
    }
    .ta-brand-icon {
      width:36px; height:36px; border-radius:8px;
      display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0;
    }

    /* ── SECTION COMMON ── */
    .ta-eyebrow {
      display:inline-flex; align-items:center; gap:8px; font-size:12px; font-weight:600;
      letter-spacing:2px; text-transform:uppercase; color:var(--primary); margin-bottom:16px;
    }
    .ta-eyebrow::before { content:''; width:24px; height:2px; background:var(--primary); border-radius:2px; }
    .ta-section-title {
      font-family:var(--font-heading) !important; font-size:clamp(1.8rem,4vw,2.8rem) !important;
      font-weight:800 !important; color:#000 !important; line-height:1.2 !important; margin-bottom:16px !important;
    }
    .ta-section-sub { font-size:1.05rem; color:var(--text-muted); line-height:1.7; max-width:600px; }

    /* ── PROBLEM ── */
    .ta-problem { padding:100px 0; background:var(--white); }
    .ta-problem-card {
      background:var(--card-bg); border-radius:var(--radius); border:1px solid var(--border);
      padding:36px; height:100%; transition:var(--transition); position:relative; overflow:hidden;
    }
    .ta-problem-card::before {
      content:''; position:absolute; top:0; left:0; width:4px; height:100%;
      background:linear-gradient(180deg,var(--primary),var(--accent)); border-radius:4px 0 0 4px;
    }
    .ta-problem-card:hover {
      transform:translateY(-6px); box-shadow:var(--shadow-lg); background:#f0f4ff !important; border-color:var(--primary);
    }
    .ta-problem-icon {
      width:56px; height:56px; background:var(--primary-light); border-radius:14px;
      display:flex; align-items:center; justify-content:center; margin-bottom:20px; font-size:22px; color:var(--primary);
    }
    .ta-problem-card h4 {
      font-family:var(--font-heading) !important; font-size:1.15rem !important; font-weight:700 !important;
      color:#000 !important; margin-bottom:10px !important;
    }
    .ta-problem-card p { color:var(--text-muted); line-height:1.7; font-size:0.95rem; }

    /* ── WHY ── */
    .ta-why {
      padding:100px 0; background:linear-gradient(135deg,#0d1117 0%,#0a1628 100%);
      position:relative; overflow:hidden;
    }
    .ta-why::before {
      content:''; position:absolute; top:0; right:0; width:500px; height:500px;
      background:radial-gradient(circle,rgba(0,212,170,0.08) 0%,transparent 70%); pointer-events:none;
    }
    .ta-why .ta-eyebrow { color:var(--accent); }
    .ta-why .ta-eyebrow::before { background:var(--accent); }
    .ta-why .ta-section-title { color:#fff !important; }
    .ta-why-left {
      background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);
      border-radius:var(--radius); padding:36px; height:100%;
    }
    .ta-why-left h4 {
      font-family:var(--font-heading) !important; font-size:1.3rem !important; font-weight:700 !important;
      color:var(--accent) !important; margin-bottom:10px !important;
    }
    .ta-why-left h2 {
      font-family:var(--font-heading) !important; font-size:1.5rem !important; font-weight:700 !important;
      color:#fff !important; line-height:1.35 !important; margin-bottom:16px !important;
    }
    .ta-why-left p { color:rgba(255,255,255,0.6); line-height:1.7; }
    .ta-info-card {
      background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);
      border-radius:var(--radius-sm); padding:20px 24px; margin-bottom:16px;
      transition:var(--transition); display:flex; gap:16px; align-items:flex-start;
    }
    .ta-info-card:hover {
      background:rgba(26,86,255,0.12); border-color:rgba(26,86,255,0.35); transform:translateX(6px);
    }
    .ta-info-icon {
      width:44px; height:44px; border-radius:10px; background:rgba(26,86,255,0.2);
      display:flex; align-items:center; justify-content:center; color:#60a5fa; font-size:16px; flex-shrink:0;
    }
    .ta-info-body h3 {
      font-family:var(--font-heading) !important; font-size:1rem !important; font-weight:700 !important;
      color:#fff !important; margin-bottom:4px !important;
    }
    .ta-info-body p { font-size:0.88rem; color:rgba(255,255,255,0.5); line-height:1.6; margin:0; }
    .ta-info-body a {
      font-size:12px; color:var(--accent); text-decoration:none; font-weight:600;
      display:inline-flex; align-items:center; gap:4px; margin-top:6px; transition:var(--transition);
    }
    .ta-info-body a:hover { gap:8px; }

    /* ── STATS ── */
    .ta-stats { padding:100px 0; background:var(--light-bg); }
    .ta-stat-card {
      background:var(--white); border-radius:var(--radius); padding:40px 32px; text-align:center;
      border:1px solid var(--border); transition:var(--transition); position:relative; overflow:hidden;
    }
    .ta-stat-card::after {
      content:''; position:absolute; bottom:0; left:0; width:100%; height:3px;
      background:linear-gradient(90deg,var(--primary),var(--accent));
      transform:scaleX(0); transition:var(--transition); transform-origin:left;
    }
    .ta-stat-card:hover {
      transform:translateY(-8px); box-shadow:var(--shadow-lg); background:#f0f4ff !important; border-color:var(--primary);
    }
    .ta-stat-card:hover::after { transform:scaleX(1); }
    .ta-stat-icon {
      width:64px; height:64px; border-radius:18px; background:var(--primary-light);
      display:flex; align-items:center; justify-content:center;
      font-size:26px; color:var(--primary); margin:0 auto 20px;
    }
    .ta-stat-val {
      font-family:var(--font-heading) !important; font-size:clamp(2.8rem,5vw,4rem) !important;
      font-weight:800 !important; color:var(--primary) !important; line-height:1 !important; margin-bottom:8px !important;
    }
    .ta-stat-lab { font-size:0.95rem; color:#000 !important; font-weight:600 !important; line-height:1.5; }

    /* ── PLATFORM TABS ── */
    .ta-platform { padding:100px 0; background:var(--white); }
    .ta-tabs-nav {
      display:flex; gap:8px; background:var(--light-bg); border-radius:50px; padding:6px;
      margin:40px 0 0; flex-wrap:wrap; justify-content:center;
    }
    .ta-tab-btn {
      border:none; background:transparent; padding:10px 22px; border-radius:50px;
      font-size:14px; font-weight:600; font-family:var(--font-heading); color:var(--text-muted);
      transition:var(--transition); white-space:nowrap; cursor:pointer;
    }
    .ta-tab-btn.active { background:var(--primary); color:#fff; box-shadow:0 4px 12px rgba(26,86,255,0.3); }
    .ta-tab-btn:hover:not(.active) { color:var(--primary); background:var(--primary-light); }
    .ta-tab-box {
      background:#f4f7ff; border-radius:var(--radius); padding:48px;
      margin-top:32px; border:1px solid var(--border);
    }
    .ta-tab-box h2 {
      font-family:var(--font-heading) !important; font-size:clamp(1.5rem,3vw,2rem) !important;
      font-weight:700 !important; color:#000 !important; margin-bottom:16px !important;
    }
    .ta-tab-img {
      background:linear-gradient(135deg,var(--primary-light),#e0e7ff);
      border-radius:var(--radius-sm); height:260px;
      display:flex; align-items:center; justify-content:center; font-size:48px; color:var(--primary);
    }

    /* ── EXPLORE ── */
    .ta-explore {
      padding:80px 0; background:linear-gradient(135deg,var(--primary) 0%,#0a3dd4 100%);
      position:relative; overflow:hidden;
    }
    .ta-explore::before {
      content:''; position:absolute; top:-50%; right:-10%; width:400px; height:400px;
      background:radial-gradient(circle,rgba(255,255,255,0.08) 0%,transparent 70%); pointer-events:none;
    }
    .ta-explore h2 {
      font-family:var(--font-heading) !important; font-size:clamp(1.8rem,4vw,2.5rem) !important;
      font-weight:700 !important; color:#fff !important; margin-bottom:12px !important;
    }
    .ta-explore p { color:rgba(255,255,255,0.7); font-size:1.05rem; }

    /* ── INDUSTRIES ── */
    .ta-industries { padding:100px 0; background:var(--light-bg); }
    .ta-industries-hdr {
      display:flex; align-items:center; justify-content:space-between;
      margin-bottom:40px; flex-wrap:wrap; gap:16px;
    }
    .ta-industries-grid {
      display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:16px;
    }
    .ta-industry-card {
      background:#fff; border-radius:var(--radius-sm); overflow:hidden;
      border:1px solid var(--border); transition:var(--transition);
    }
    .ta-industry-card:hover {
      transform:translateY(-5px); box-shadow:var(--shadow-lg);
      border-color:var(--primary); background:#eef2ff !important;
    }
    .ta-industry-img {
      height:120px; background:linear-gradient(135deg,#e8eeff,#dbeafe);
      display:flex; align-items:center; justify-content:center; font-size:36px;
    }
    .ta-industry-body { padding:16px; }
    .ta-industry-body h3 {
      font-family:var(--font-heading) !important; font-size:0.9rem !important;
      font-weight:700 !important; color:#000 !important; margin-bottom:8px !important;
    }
    .ta-industry-body button {
      background:none; border:none; color:var(--primary); font-size:12px; font-weight:600;
      padding:0; display:flex; align-items:center; gap:4px; font-family:var(--font-body);
      transition:var(--transition); cursor:pointer;
    }
    .ta-industry-body button:hover { gap:8px; }
    .ta-view-all {
      background:var(--primary-light); color:var(--primary); border:1px solid var(--primary);
      border-radius:50px; padding:10px 24px; font-size:14px; font-weight:700;
      font-family:var(--font-heading); transition:var(--transition); cursor:pointer;
    }
    .ta-view-all:hover { background:var(--primary); color:#fff; }

    /* ── CLIENTS ── */
    .ta-clients { padding:100px 0; background:var(--white); }
    .ta-clients-grid {
      display:grid;
      grid-template-columns:repeat(auto-fill,minmax(160px,1fr));
      gap:24px;
      margin-top:48px;
    }
    .ta-client-card {
      background:#fff; border:1px solid var(--border); border-radius:var(--radius-sm);
      padding:24px 16px;
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      gap:12px; transition:var(--transition);
      box-shadow:0 2px 8px rgba(26,86,255,0.05);
    }
    .ta-client-card:hover {
      transform:translateY(-6px); box-shadow:var(--shadow-lg);
      border-color:var(--primary); background:#f0f4ff !important;
    }
    /* Fixed uniform logo box */
    .ta-client-logo-box {
      width:80px;
      height:80px;
      border-radius:14px;
      overflow:hidden;
      background:var(--light-bg);
      display:flex;
      align-items:center;
      justify-content:center;
      flex-shrink:0;
      border:1px solid var(--border);
    }
    .ta-client-logo-box img {
      width:100%;
      height:100%;
      object-fit:contain;
      padding:6px;
      display:block;
    }
    .ta-client-name {
      font-family:var(--font-heading); font-size:0.82rem; font-weight:700;
      color:#000; text-align:center; line-height:1.3;
    }
    .ta-client-badge {
      font-size:10px; font-weight:600; color:var(--primary); background:var(--primary-light);
      padding:3px 10px; border-radius:50px; letter-spacing:0.5px;
    }

    /* ── TESTIMONIALS ── */
    .ta-testimonials { padding:100px 0; background:var(--light-bg); }
    .ta-testimonial-card {
      background:var(--white); border-radius:var(--radius); padding:36px;
      border:1px solid var(--border); height:100%; transition:var(--transition); position:relative;
    }
    .ta-testimonial-card:hover {
      transform:translateY(-6px); box-shadow:var(--shadow-lg); border-color:var(--primary); background:#eef2ff !important;
    }
    .ta-quote { font-size:40px; color:var(--primary); opacity:0.2; margin-bottom:16px; line-height:1; }
    .ta-testimonial-card p { color:var(--text); line-height:1.75; font-size:0.95rem; margin-bottom:24px; font-style:italic; }
    .ta-author { display:flex; align-items:center; gap:12px; }
    .ta-avatar {
      width:44px; height:44px; border-radius:50%;
      background:linear-gradient(135deg,var(--primary),var(--accent));
      display:flex; align-items:center; justify-content:center;
      color:#fff; font-weight:700; font-size:16px; flex-shrink:0;
    }
    .ta-author-info h5 {
      font-family:var(--font-heading) !important; font-size:0.9rem !important;
      font-weight:700 !important; color:#000 !important; margin:0 !important;
    }
    .ta-author-info span { font-size:0.8rem; color:var(--text-muted); }
    .ta-stars { color:#f59e0b; font-size:13px; margin-bottom:12px; }

    /* ── CTA FOOTER ── */
    .ta-cta { background:var(--dark); padding:80px 0; text-align:center; }
    .ta-cta h2 {
      font-family:var(--font-heading) !important; font-size:clamp(1.8rem,4vw,2.8rem) !important;
      font-weight:800 !important; color:#fff !important; margin-bottom:16px !important;
    }

    /* ── TOAST ── */
    .ta-toast-wrap { position:fixed; top:24px; right:24px; z-index:9999; animation:taSlideIn 0.4s ease; }
    .ta-toast {
      display:flex; align-items:center; gap:12px; padding:16px 20px; border-radius:12px;
      box-shadow:0 10px 40px rgba(0,0,0,0.15); font-size:14px; font-weight:500;
      min-width:280px; max-width:380px;
    }
    .ta-toast-ok  { background:#ecfdf5; border:1px solid #6ee7b7; color:#065f46; }
    .ta-toast-err { background:#fef2f2; border:1px solid #fca5a5; color:#991b1b; }
    .ta-toast-close { margin-left:auto; opacity:0.6; cursor:pointer; border:none; background:none; }
    .ta-toast-close:hover { opacity:1; }

    /* ── SCROLL REVEAL ── */
    .ta-fade {
      opacity:0; transform:translateY(30px);
      transition:opacity 0.6s ease, transform 0.6s ease;
    }
    .ta-fade.visible { opacity:1; transform:translateY(0); }

    /* ── ANIMATIONS ── */
    @keyframes taMarquee   { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
    @keyframes taSlideIn   { from{opacity:0;transform:translateX(50px)} to{opacity:1;transform:translateX(0)} }
    @keyframes taFadeDown  { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
    @keyframes taFadeUp    { from{opacity:0;transform:translateY(30px)}  to{opacity:1;transform:translateY(0)} }
    @keyframes taFadeRight { from{opacity:0;transform:translateX(30px)}  to{opacity:1;transform:translateX(0)} }

    .ta-anim-0 { animation:taFadeDown  0.8s ease both; }
    .ta-anim-1 { animation:taFadeUp   0.9s ease 0.1s both; }
    .ta-anim-2 { animation:taFadeUp   0.9s ease 0.2s both; }
    .ta-anim-3 { animation:taFadeUp   0.9s ease 0.3s both; }
    .ta-anim-4 { animation:taFadeUp   0.9s ease 0.4s both; }
    .ta-anim-r { animation:taFadeRight 0.9s ease 0.2s both; }

    /* ── RESPONSIVE ── */
    @media(max-width:991px){
      .ta-hero { padding:80px 0 50px; }
      .ta-form-card { margin-top:40px; padding:28px 22px; }
      .ta-tab-box { padding:28px 20px; }
      .ta-why-left { margin-bottom:24px; }
    }
    @media(max-width:767px){
      .ta-hero { text-align:center; }
      .ta-hero-sub { margin:0 auto 28px; }
      .ta-hero-stats { justify-content:center; }
      .ta-hero-btns { display:flex; flex-direction:column; gap:12px; align-items:center; }
      .ta-btn-primary, .ta-btn-outline { width:100%; justify-content:center; }
      .ta-industries-hdr { flex-direction:column; align-items:flex-start; }
      .ta-industries-grid { grid-template-columns:repeat(2,1fr); }
      .ta-clients-grid { grid-template-columns:repeat(2,1fr); gap:16px; }
      .ta-explore-btns { flex-direction:column; align-items:stretch; }
      .ta-explore-btns button { width:100%; justify-content:center; }
      .ta-stat-card { padding:28px 20px; }
      .ta-tabs-nav { padding:4px; gap:4px; }
      .ta-tab-btn { padding:8px 14px; font-size:13px; }
      .ta-problem-card { padding:24px 20px; }
      .ta-form-card { padding:24px 16px; }
    }
    @media(max-width:480px){
      .ta-industries-grid { grid-template-columns:repeat(2,1fr); }
      .ta-clients-grid { grid-template-columns:repeat(2,1fr); }
      .ta-tab-box { padding:20px 16px; }
    }

    /* Bootstrap-like helpers */
    .ta-container { width:100%; max-width:1200px; margin:0 auto; padding:0 20px; }
    .ta-row { display:flex; flex-wrap:wrap; margin:0 -12px; }
    .ta-col { padding:0 12px; }
    .ta-col-12 { width:100%; }
    @media(min-width:768px){
      .ta-col-md-4  { width:33.333%; }
      .ta-col-md-5  { width:41.666%; }
      .ta-col-md-6  { width:50%; }
      .ta-col-md-7  { width:58.333%; }
      .ta-col-sm-6  { width:50%; }
    }
    @media(min-width:992px){
      .ta-col-lg-3  { width:25%; }
      .ta-col-lg-5  { width:41.666%; }
      .ta-col-lg-6  { width:50%; }
      .ta-col-lg-7  { width:58.333%; }
    }
    .ta-g4 { gap:24px 0; }
    .ta-g5 { gap:32px 0; }
    .ta-text-center { text-align:center; }
    .ta-mx-auto { margin-left:auto; margin-right:auto; }
    .ta-d-flex { display:flex; }
    .ta-flex-wrap { flex-wrap:wrap; }
    .ta-gap3 { gap:16px; }
    .ta-gap4 { gap:24px; }
    .ta-justify-center { justify-content:center; }
    .ta-justify-end { justify-content:flex-end; }
    .ta-align-center { align-items:center; }
    .ta-mt-2 { margin-top:8px; }
    .ta-mt-3 { margin-top:16px; }
    .ta-mt-4 { margin-top:24px; }
    .ta-mt-5 { margin-top:32px; }
    .ta-mb-4 { margin-bottom:24px; }
    .ta-mb-5 { margin-bottom:32px; }
    .ta-me-3 { margin-right:16px; }
    .ta-me-2 { margin-right:8px; }
    .ta-spinner {
      display:inline-block; width:16px; height:16px; border:2px solid rgba(255,255,255,0.3);
      border-top-color:#fff; border-radius:50%; animation:taSpin 0.6s linear infinite; vertical-align:middle;
    }
    @keyframes taSpin { to{ transform:rotate(360deg); } }
  `;
  document.head.insertBefore(style, document.head.firstChild);

  const fa = document.createElement("link");
  fa.rel  = "stylesheet";
  fa.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
  document.head.appendChild(fa);
}

// ─────────────────────────────────────────────
// 2. DATA
// ─────────────────────────────────────────────

// Brand marquee now uses real client names + matching icons
const brandData = [
  { name:"ACC",           imageKey:"Acc",          icon:"🎓", color:"#e8f4fd" },
  { name:"ADSF",          imageKey:"ADSF",         icon:"📊", color:"#f0fdf4" },
  { name:"APSE",          imageKey:"APSE",         icon:"🏛️", color:"#fdf4ff" },
  { name:"Aspire Edtech", imageKey:"AspireEdtech", icon:"🚀", color:"#fff7ed" },
  { name:"Ayana",         imageKey:"Ayana",        icon:"🌿", color:"#f0f9ff" },
  { name:"Barclayes",     imageKey:"barclayes",    icon:"🏦", color:"#fefce8" },
  { name:"CED",           imageKey:"Ced",          icon:"📚", color:"#fdf2f8" },
  { name:"Coromander",    imageKey:"Coromander",   icon:"⚙️", color:"#f0fdf4" },
  { name:"HMB",           imageKey:"HMB",          icon:"🏢", color:"#eff6ff" },
  { name:"LBSS",          imageKey:"LBSS",         icon:"👥", color:"#faf5ff" },
  { name:"Logo",          imageKey:"Logo",         icon:"🎯", color:"#fff1f2" },
  { name:"Logoa",         imageKey:"Logoa",        icon:"💼", color:"#ecfeff" },
  { name:"Manab",         imageKey:"Manab",        icon:"🌐", color:"#f0fdf4" },
  { name:"NRL",           imageKey:"nrl",          icon:"⚡", color:"#eff6ff" },
  { name:"NSDC",          imageKey:"nsdc",         icon:"🏅", color:"#fefce8" },
  { name:"Om",            imageKey:"Om",           icon:"🔷", color:"#f0f9ff" },
  { name:"Red",           imageKey:"Red",          icon:"🔴", color:"#fff1f2" },
  { name:"Roshani",       imageKey:"Roshani",      icon:"✨", color:"#fdf4ff" },
  { name:"SEED",          imageKey:"SEED",         icon:"🌱", color:"#f0fdf4" },
  { name:"SSAC",          imageKey:"Ssac",         icon:"🛡️", color:"#eff6ff" },
  { name:"Udichi",        imageKey:"udichi",       icon:"🎶", color:"#fdf2f8" },
];

const clientsData = [
  { name:"ACC",           imageKey:"Acc",          sector:"Education",    bg:"#e8f4fd" },
  { name:"ADSF",          imageKey:"ADSF",         sector:"Healthcare",   bg:"#f0fdf4" },
  { name:"APSE",          imageKey:"APSE",         sector:"Academia",     bg:"#fdf4ff" },
  { name:"Aspire Edtech", imageKey:"AspireEdtech", sector:"EdTech",       bg:"#fff7ed" },
  { name:"Ayana",         imageKey:"Ayana",        sector:"Wellness",     bg:"#f0f9ff" },
  { name:"Barclayes",     imageKey:"barclayes",    sector:"Finance",      bg:"#fefce8" },
  { name:"CED",           imageKey:"Ced",          sector:"Education",    bg:"#fdf2f8" },
  { name:"Coromander",    imageKey:"Coromander",   sector:"Technology",   bg:"#f0fdf4" },
  { name:"HMB",           imageKey:"HMB",          sector:"Staffing",     bg:"#eff6ff" },
  { name:"LBSS",          imageKey:"LBSS",         sector:"Recruitment",  bg:"#faf5ff" },
  { name:"Logo",          imageKey:"Logo",         sector:"HR Services",  bg:"#fff1f2" },
  { name:"Logoa",         imageKey:"Logoa",        sector:"Networking",   bg:"#ecfeff" },
  { name:"Manab",         imageKey:"Manab",        sector:"Development",  bg:"#f0fdf4" },
  { name:"NRL",           imageKey:"nrl",          sector:"Energy",       bg:"#eff6ff" },
  { name:"NSDC",          imageKey:"nsdc",         sector:"Skill Dev",    bg:"#fefce8" },
  { name:"Om",            imageKey:"Om",           sector:"Consulting",   bg:"#f0f9ff" },
  { name:"Red",           imageKey:"Red",          sector:"Media",        bg:"#fff1f2" },
  { name:"Roshani",       imageKey:"Roshani",      sector:"NGO",          bg:"#fdf4ff" },
  { name:"SEED",          imageKey:"SEED",         sector:"AgriTech",     bg:"#f0fdf4" },
  { name:"SSAC",          imageKey:"Ssac",         sector:"Govt Body",    bg:"#eff6ff" },
  { name:"Udichi",        imageKey:"udichi",       sector:"Culture",      bg:"#fdf2f8" },
];

const tabs = [
  { id:"library",   label:"Assessment Library", title:"Extensive Test Library",   content:"Use tried-and-true content spanning over 600 subjects and 70,000+ questions covering every skill domain.", button:"Explore Assessment Types", icon:"📚" },
  { id:"custom",    label:"Customizations",      title:"Robust Customization",     content:"Mix-and-match questions or create your own to assemble a test specific to your unique job and company requirements.", button:"Explore Customizations",  icon:"⚙️" },
  { id:"anticheat", label:"Anti-Cheat",           title:"Anti-Cheat Tools",         content:"Authenticate accurate results with Talent Access anti-cheat tools and AI-assisted proctoring solutions.", button:"View Anti-Cheat Features", icon:"🛡️" },
  { id:"experts",   label:"Assessment Experts",  title:"Assessment Experts",       content:"Lean on Talent Access experts who assist with test consultation, analysis, and refinement for your needs.", button:"Meet Our Experts",         icon:"👨‍💼" },
];

const industries = [
  {title:"Manufacturing",icon:"🏭"},{title:"Government",icon:"🏛️"},{title:"Healthcare",icon:"🏥"},
  {title:"Engineering",icon:"⚙️"},{title:"Construction",icon:"🏗️"},{title:"Energy/Utilities",icon:"⚡"},
  {title:"Financial Services",icon:"💰"},{title:"Transportation",icon:"🚚"},
  {title:"Education",icon:"🎓"},{title:"Staffing",icon:"👥"},{title:"Call Center",icon:"📞"},{title:"Hospitality",icon:"🏨"},
];

const testimonials = [
  { text:"Talent Access completely transformed our hiring process. We cut time-to-hire by 60% while dramatically improving candidate quality.", author:"Sarah M.",  role:"HR Director, TechCorp",  stars:5 },
  { text:"The assessment library is incredible. We found exactly what we needed for our specialized engineering roles without any customization.", author:"James R.", role:"Talent Lead, BuildFirm", stars:5 },
  { text:"The anti-cheat features give us full confidence that our scores are genuine. Game-changer for remote hiring.",                        author:"Priya K.",  role:"Recruiter, FinanceHub",  stars:5 },
];

// ─────────────────────────────────────────────
// 3. SCROLL REVEAL HOOK
// ─────────────────────────────────────────────
function useScrollReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll(".ta-fade");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [dep]);
}

// ─────────────────────────────────────────────
// 4. HOME COMPONENT
// ─────────────────────────────────────────────
const Home = () => {
  const [activeTab, setActiveTab]           = useState("library");
  const [toast, setToast]                   = useState(null);
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0]);
  const [statsVisible, setStatsVisible]     = useState(false);
  const [formData, setFormData]             = useState({ firstName:"", lastName:"", email:"", company:"", phone:"", employees:"" });
  const [submitting, setSubmitting]         = useState(false);

  const statsRef = useRef(null);

  const statsData = [
    { value:95, label:"Reduction in Time to Hire",      suffix:"%", icon:"fa-clock"     },
    { value:80, label:"Improvement in Quality of Hire", suffix:"%", icon:"fa-star"      },
    { value:70, label:"Cost Savings per Hire",          suffix:"%", icon:"fa-piggy-bank" },
  ];

  useScrollReveal(activeTab);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold:0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;
    statsData.forEach((s, i) => {
      let current = 0;
      const inc = s.value / 60;
      const t = setInterval(() => {
        current += inc;
        if (current >= s.value) { current = s.value; clearInterval(t); }
        setAnimatedValues(p => { const n=[...p]; n[i]=Math.floor(current); return n; });
      }, 25);
    });
  }, [statsVisible]);

  const handleInput  = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.company) {
      setToast({ message:"Please fill in all required fields.", type:"error" });
      setTimeout(() => setToast(null), 3500);
      return;
    }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setSubmitting(false);
    setToast({ message:"🎉 Demo request sent! We'll contact you shortly.", type:"success" });
    setFormData({ firstName:"", lastName:"", email:"", company:"", phone:"", employees:"" });
    setTimeout(() => setToast(null), 4000);
  };

  const scrollToDemo = () => document.getElementById("ta-demo")?.scrollIntoView({ behavior:"smooth" });
  const active = tabs.find(t => t.id === activeTab);

  return (
    <>
      {/* ── TOAST ── */}
      {toast && (
        <div className="ta-toast-wrap">
          <div className={`ta-toast ${toast.type === "success" ? "ta-toast-ok" : "ta-toast-err"}`}>
            <span>{toast.type === "success" ? "✅" : "❌"}</span>
            <span>{toast.message}</span>
            <button className="ta-toast-close" onClick={() => setToast(null)}>✕</button>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="ta-hero">
        <div className="ta-container" style={{position:"relative",zIndex:2}}>
          <div className="ta-row ta-align-center ta-g5">
            {/* Left */}
            <div className="ta-col ta-col-12 ta-col-lg-6">
              <div className="ta-hero-badge ta-anim-0">
                <i className="fas fa-bolt"></i> AI-Powered Pre-Employment Testing
              </div>
              <h1 className="ta-hero-title ta-anim-1">
                Hire Smarter.<br />Build <span>Stronger</span> Teams.
              </h1>
              <p className="ta-hero-sub ta-anim-2">
                Streamline hiring with 70,000+ validated assessments. Identify top talent faster, reduce bias, and make data-driven decisions that drive results.
              </p>
              <div className="ta-hero-btns ta-anim-3">
                <a className="ta-btn-primary ta-me-3" href="#ta-demo" style={{marginBottom:8}}>
                  <i className="fas fa-calendar-check"></i> Get a Free Demo
                </a>
                <a className="ta-btn-outline" href="#ta-platform" style={{marginBottom:8}}>
                  <i className="fas fa-play-circle"></i> See It in Action
                </a>
              </div>
              <div className="ta-hero-stats ta-anim-4">
                {[["500+","Companies"],["70K+","Questions"],["95%","Satisfaction"]].map(([val,lab]) => (
                  <div key={lab} style={{textAlign:"center"}}>
                    <div className="ta-hero-stat-val">{val}</div>
                    <div className="ta-hero-stat-lab">{lab}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right — Form */}
            <div className="ta-col ta-col-12 ta-col-lg-6" id="ta-demo">
              <div className="ta-form-card ta-anim-r">
                <h3>Request a Demo</h3>
                <p>See how Talent Access transforms your hiring in 30 minutes.</p>
                <form onSubmit={handleSubmit}>
                  <div className="ta-row ta-g4">
                    <div className="ta-col ta-col-12 ta-col-md-6">
                      <div className="ta-form-group">
                        <label>First Name <span style={{color:"#f87171"}}>*</span></label>
                        <div className="ta-input-wrap">
                          <i className="fas fa-user ta-input-icon"></i>
                          <input className="ta-input" type="text" name="firstName" placeholder="John" value={formData.firstName} onChange={handleInput} />
                        </div>
                      </div>
                    </div>
                    <div className="ta-col ta-col-12 ta-col-md-6">
                      <div className="ta-form-group">
                        <label>Last Name</label>
                        <div className="ta-input-wrap">
                          <i className="fas fa-user ta-input-icon"></i>
                          <input className="ta-input" type="text" name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleInput} />
                        </div>
                      </div>
                    </div>
                    <div className="ta-col ta-col-12">
                      <div className="ta-form-group">
                        <label>Work Email <span style={{color:"#f87171"}}>*</span></label>
                        <div className="ta-input-wrap">
                          <i className="fas fa-envelope ta-input-icon"></i>
                          <input className="ta-input" type="email" name="email" placeholder="john@company.com" value={formData.email} onChange={handleInput} />
                        </div>
                      </div>
                    </div>
                    <div className="ta-col ta-col-12">
                      <div className="ta-form-group">
                        <label>Company Name <span style={{color:"#f87171"}}>*</span></label>
                        <div className="ta-input-wrap">
                          <i className="fas fa-building ta-input-icon"></i>
                          <input className="ta-input" type="text" name="company" placeholder="Acme Corp" value={formData.company} onChange={handleInput} />
                        </div>
                      </div>
                    </div>
                    <div className="ta-col ta-col-12">
                      <div className="ta-form-group">
                        <label>Phone Number</label>
                        <div className="ta-input-wrap">
                          <i className="fas fa-phone ta-input-icon"></i>
                          <input className="ta-input" type="tel" name="phone" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleInput} />
                        </div>
                      </div>
                    </div>
                    <div className="ta-col ta-col-12">
                      <div className="ta-form-group">
                        <label>Company Size</label>
                        <div className="ta-input-wrap">
                          <i className="fas fa-users ta-input-icon"></i>
                          <select className="ta-input" name="employees" value={formData.employees} onChange={handleInput}>
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
                    <div className="ta-col ta-col-12">
                      <button type="submit" className="ta-btn-submit" disabled={submitting}>
                        {submitting
                          ? <><span className="ta-spinner ta-me-2"></span>Sending…</>
                          : <><i className="fas fa-paper-plane"></i> Request My Demo</>}
                      </button>
                    </div>
                  </div>
                </form>
                <p style={{textAlign:"center",marginTop:12,fontSize:12,color:"rgba(255,255,255,0.4)"}}>
                  <i className="fas fa-lock ta-me-2"></i>No credit card required. Free 30-min demo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BRANDS MARQUEE — uses real client images ── */}
      <section className="ta-brands">
        <div className="ta-container">
          <h6>✦ Trusted by 1,000s of Organizations Worldwide ✦</h6>
          <div className="ta-marquee-outer">
            <div className="ta-marquee-track">
              {/* Duplicate array so the marquee loops seamlessly */}
              {[...brandData, ...brandData].map((b, i) => (
                <div key={i} className="ta-brand-chip">
                  <div className="ta-brand-img-wrap" style={{background: b.color}}>
                    {IMAGE_MAP[b.imageKey]
                      ? <img src={IMAGE_MAP[b.imageKey]} alt={b.name} />
                      : <span style={{fontSize:18}}>{b.icon}</span>
                    }
                  </div>
                  <span>{b.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="ta-problem">
        <div className="ta-container">
          <div className="ta-text-center ta-mb-5">
            <div className="ta-eyebrow ta-justify-center ta-d-flex">The Challenge</div>
            <h2 className="ta-section-title">Hiring is Getting Harder</h2>
            <p className="ta-section-sub ta-mx-auto">Traditional methods leave hiring managers overwhelmed and unable to identify truly qualified candidates in a sea of applicants.</p>
          </div>
          <div className="ta-row ta-g4">
            {[
              { icon:"fa-users-slash",       title:"Volume Overload",        text:"HR teams are overwhelmed by high volumes of applicants per role. Sorting through hundreds of resumes manually is time-consuming and inefficient." },
              { icon:"fa-file-circle-xmark", title:"Resumes Aren't Enough",  text:"Resumes and cover letters don't predict performance. Hiring managers need objective tools to assess real job fit and future potential." },
              { icon:"fa-chart-line-down",   title:"High Cost of Bad Hires", text:"A single bad hire can cost up to 30% of their annual salary. Objective assessments dramatically reduce this costly risk." },
              { icon:"fa-clock-rotate-left", title:"Lengthy Time-to-Hire",   text:"Slow hiring processes let top candidates accept competing offers. Streamlined assessments cut decision time without sacrificing quality." },
            ].map((item,i) => (
              <div key={i} className="ta-col ta-col-12 ta-col-md-6 ta-col-lg-3">
                <div className="ta-problem-card ta-fade" style={{transitionDelay:`${i*0.1}s`}}>
                  <div className="ta-problem-icon"><i className={`fas ${item.icon}`}></i></div>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ASSESSMENTS ── */}
      <section className="ta-why">
        <div className="ta-container">
          <div className="ta-row ta-g5 ta-align-center">
            <div className="ta-col ta-col-12 ta-col-lg-5">
              <div className="ta-why-left ta-fade">
                <div style={{height:200,background:"linear-gradient(135deg,rgba(26,86,255,0.2),rgba(0,212,170,0.1))",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:80,marginBottom:24}}>🎯</div>
                <h4>Go Beyond the Resume</h4>
                <h2>Assess real skills to find the right candidate for every job.</h2>
                <p>Pre-employment tests identify talented candidates before the interview — saving time, reducing bias, and improving outcomes.</p>
                <button className="ta-btn-primary ta-mt-4" onClick={scrollToDemo}>
                  <i className="fas fa-calendar-check"></i> Get a Demo
                </button>
              </div>
            </div>
            <div className="ta-col ta-col-12 ta-col-lg-7">
              <div className="ta-eyebrow ta-mb-3">Why It Works</div>
              <h2 className="ta-section-title">Why Pre-Employment<br />Assessments Work</h2>
              <div className="ta-mt-4">
                {[
                  { icon:"fa-brain",        title:"Test Hard Skills",          text:"Go beyond the resume. Pull from hundreds of subjects and thousands of questions to assess job-critical skills." },
                  { icon:"fa-filter",       title:"Screen Out Bad Fits",       text:"Leverage objective, data-driven information to quickly filter out mismatched candidates so you focus on quality." },
                  { icon:"fa-puzzle-piece", title:"Customize to Fit Your Job", text:"Create tests aligned with your roles and goals. Mix, match, upload, or build from scratch." },
                  { icon:"fa-chart-bar",    title:"See Impactful Results",     text:"Assess skills to stop wasting time, avoid costly bad hires, and dramatically reduce turnover." },
                ].map((item,i) => (
                  <div key={i} className="ta-info-card ta-fade" style={{transitionDelay:`${i*0.1}s`}}>
                    <div className="ta-info-icon"><i className={`fas ${item.icon}`}></i></div>
                    <div className="ta-info-body">
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

      {/* ── STATS ── */}
      <section className="ta-stats" ref={statsRef}>
        <div className="ta-container">
          <div className="ta-d-flex ta-justify-center ta-mb-4">
            <div className="ta-eyebrow">Proven Results</div>
          </div>
          <h2 className="ta-section-title ta-text-center">
            Talent Access Customers Have Experienced…
          </h2>
          <div className="ta-row ta-g4 ta-mt-2">
            {statsData.map((item,i) => (
              <div key={i} className="ta-col ta-col-12 ta-col-md-4">
                <div className="ta-stat-card ta-fade" style={{transitionDelay:`${i*0.15}s`}}>
                  <div className="ta-stat-icon"><i className={`fas ${item.icon}`}></i></div>
                  <div className="ta-stat-val">{animatedValues[i]}{item.suffix}</div>
                  <p className="ta-stat-lab">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="ta-text-center ta-mt-5">
            <button className="ta-btn-primary" style={{margin:"0 auto"}} onClick={scrollToDemo}>
              <i className="fas fa-rocket"></i> Start Hiring Smarter Today
            </button>
          </div>
        </div>
      </section>

      {/* ── PLATFORM TABS ── */}
      <section className="ta-platform" id="ta-platform">
        <div className="ta-container">
          <div className="ta-text-center">
            <div className="ta-d-flex ta-justify-center ta-mb-4">
              <div className="ta-eyebrow">Our Platform</div>
            </div>
            <h2 className="ta-section-title">Pre-Hire Assessment Platform</h2>
            <p className="ta-section-sub ta-mx-auto">Everything you need to build a world-class hiring process, all in one place.</p>
          </div>
          <div className="ta-tabs-nav">
            {tabs.map(tab => (
              <button key={tab.id} className={`ta-tab-btn ${activeTab===tab.id?"active":""}`} onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="ta-tab-box">
            <div className="ta-row ta-align-center ta-g5">
              <div className="ta-col ta-col-12 ta-col-md-6">
                <div style={{fontSize:48,marginBottom:16}}>{active.icon}</div>
                <h2>{active.title}</h2>
                <p style={{color:"var(--text-muted)",lineHeight:1.75,marginBottom:28}}>{active.content}</p>
                <button className="ta-btn-primary"><i className="fas fa-arrow-right"></i> {active.button}</button>
                <div className="ta-d-flex ta-flex-wrap ta-gap3 ta-mt-4">
                  {["Validated","Scalable","Customizable"].map(tag => (
                    <span key={tag} style={{background:"var(--primary-light)",color:"var(--primary)",padding:"6px 14px",borderRadius:50,fontSize:12,fontWeight:600}}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="ta-col ta-col-12 ta-col-md-6">
                <div className="ta-tab-img">{active.icon}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPLORE ── */}
      <section className="ta-explore">
        <div className="ta-container">
          <div className="ta-row ta-align-center ta-g4">
            <div className="ta-col ta-col-12 ta-col-md-7">
              <h2>Experience Our Platform</h2>
              <p>See exactly how Talent Access can improve your hiring operations — no commitment required.</p>
            </div>
            <div className="ta-col ta-col-12 ta-col-md-5">
              <div className="ta-explore-btns ta-d-flex ta-flex-wrap ta-gap3 ta-justify-end">
                <button className="ta-btn-white"><i className="fas fa-map"></i> Tour Our Platform</button>
                <button className="ta-btn-white-outline"><i className="fas fa-play"></i> Platform Overview</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="ta-industries">
        <div className="ta-container">
          <div className="ta-industries-hdr">
            <div>
              <div className="ta-eyebrow">Industries</div>
              <h2 className="ta-section-title" style={{marginBottom:0}}>Built for Every Industry</h2>
              <p style={{color:"#000",marginTop:8,fontWeight:500}}>Pre-hire assessments tailored for virtually any sector.</p>
            </div>
            <button className="ta-view-all"><i className="fas fa-th" style={{marginRight:8}}></i>View All Industries</button>
          </div>
          <div className="ta-industries-grid">
            {industries.map((item,i) => (
              <div key={i} className="ta-industry-card ta-fade" style={{transitionDelay:`${(i%4)*0.08}s`}}>
                <div className="ta-industry-img">{item.icon}</div>
                <div className="ta-industry-body">
                  <h3>{item.title}</h3>
                  <button>Read More <i className="fas fa-arrow-right"></i></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR CLIENTS — images rendered via IMAGE_MAP ── */}
      <section className="ta-clients">
        <div className="ta-container">
          <div className="ta-text-center">
            <div className="ta-d-flex ta-justify-center ta-mb-4">
              <div className="ta-eyebrow">Our Clients</div>
            </div>
            <h2 className="ta-section-title">Trusted by Leading Organizations</h2>
            <p className="ta-section-sub ta-mx-auto">
              From government bodies to EdTech startups, Talent Access powers smarter hiring across every sector.
            </p>
          </div>
          <div className="ta-clients-grid">
            {clientsData.map((client, i) => (
              <div key={i} className="ta-client-card ta-fade" style={{transitionDelay:`${(i%4)*0.08}s`}}>
                {/* Uniform 80×80 logo box — image fills it via object-fit:contain */}
                <div className="ta-client-logo-box" style={{background: client.bg}}>
                  {IMAGE_MAP[client.imageKey] ? (
                    <img
                      src={IMAGE_MAP[client.imageKey]}
                      alt={client.name}
                    />
                  ) : (
                    <span style={{fontSize:28}}>🏢</span>
                  )}
                </div>
                <div className="ta-client-name">{client.name}</div>
                <div className="ta-client-badge">{client.sector}</div>
              </div>
            ))}
          </div>

          {/* Stats bar */}
          <div
            className="ta-fade"
            style={{
              marginTop:56,
              background:"linear-gradient(135deg,#f0f4ff,#e8f0ff)",
              border:"1px solid var(--border)",
              borderRadius:"var(--radius)",
              padding:"40px 48px",
              display:"flex",
              flexWrap:"wrap",
              gap:32,
              justifyContent:"center",
              alignItems:"center",
            }}
          >
            {[
              ["500+","Organizations Served"],
              ["12+","Industry Sectors"],
              ["30+","States Covered"],
              ["98%","Client Retention"],
            ].map(([val,lab]) => (
              <div key={lab} style={{textAlign:"center",minWidth:120}}>
                <div style={{fontFamily:"var(--font-heading)",fontSize:"2.2rem",fontWeight:800,color:"var(--primary)"}}>{val}</div>
                <div style={{fontSize:"0.9rem",color:"var(--text-muted)",fontWeight:500,marginTop:4}}>{lab}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="ta-testimonials">
        <div className="ta-container">
          <div className="ta-text-center ta-mb-5">
            <div className="ta-d-flex ta-justify-center ta-mb-4">
              <div className="ta-eyebrow">Testimonials</div>
            </div>
            <h2 className="ta-section-title">What Our Customers Say</h2>
          </div>
          <div className="ta-row ta-g4">
            {testimonials.map((t,i) => (
              <div key={i} className="ta-col ta-col-12 ta-col-md-4">
                <div className="ta-testimonial-card ta-fade" style={{transitionDelay:`${i*0.1}s`}}>
                  <div className="ta-stars">{"★".repeat(t.stars)}</div>
                  <div className="ta-quote">"</div>
                  <p>"{t.text}"</p>
                  <div className="ta-author">
                    <div className="ta-avatar">{t.author[0]}</div>
                    <div className="ta-author-info">
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

      {/* ── CTA FOOTER ── */}
      <section className="ta-cta">
        <div className="ta-container">
          <h2>Ready to Transform Your Hiring?</h2>
          <p style={{color:"rgba(255,255,255,0.6)",fontSize:"1.05rem",marginBottom:36}}>
            Join 1,000+ organizations already hiring smarter with Talent Access.
          </p>
          <div className="ta-d-flex ta-gap3 ta-justify-center ta-flex-wrap">
            <button className="ta-btn-primary" onClick={scrollToDemo}>
              <i className="fas fa-calendar-check"></i> Get a Free Demo
            </button>
            <button className="ta-btn-outline"><i className="fas fa-phone"></i> Talk to Sales</button>
          </div>
          <p style={{color:"rgba(255,255,255,0.3)",fontSize:13,marginTop:24}}>
            No credit card required · Setup in minutes · Cancel anytime
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;