import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo3 from "../../../../src/images/LOGO3.png";
import ulogo from "../../../../src/images/U-logos.png";

// ─── Icon Components ────────────────────────────────────────────────────────
const Icon = ({ children }) => <span style={{ marginRight: 8, fontSize: 15 }}>{children}</span>;
const PhoneIcon = () => <span>📞</span>;
const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 4, transition: "transform 0.3s ease" }}>
    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Topbar ──────────────────────────────────────────────────────────────────
const Topbar = () => (
  <div style={styles.topbar}>
    <div style={styles.topbarInner}>
      <div style={styles.topLeft}>
        <PhoneIcon />
        <a href="/contact" style={styles.topLink}>08069640455</a>
      </div>
      <div style={styles.topRight}>
        <a href="#" style={styles.topLink}>Assessment Taker Resources</a>
        <a href="/attendence" style={styles.topLink}>Attendance Login</a>
      </div>
    </div>
  </div>
);

// ─── Dropdown Hook ────────────────────────────────────────────────────────────
function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => { clearTimeout(timeoutRef.current); setOpen(true); };
  const handleMouseLeave = () => { timeoutRef.current = setTimeout(() => setOpen(false), 150); };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);
  return { open, setOpen, ref, handleMouseEnter, handleMouseLeave };
}

// ─── Desktop MegaDropdown ─────────────────────────────────────────────────────
const MegaDropdown = ({ label, children }) => {
  const { open, handleMouseEnter, handleMouseLeave } = useDropdown();
  return (
    <div style={styles.dropdownWrapper} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button style={{ ...styles.navLink, ...(open ? styles.navLinkActive : {}) }}>
        {label}
        <span style={{ display: "inline-block", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease", marginLeft: 4 }}>
          <ChevronDown />
        </span>
      </button>
      <div style={{
        ...styles.megaMenu,
        opacity: open ? 1 : 0,
        visibility: open ? "visible" : "hidden",
        transform: open ? "translateY(0) scale(1)" : "translateY(-12px) scale(0.98)",
        pointerEvents: open ? "all" : "none",
      }}>
        {children}
      </div>
    </div>
  );
};

// ─── Desktop SimpleDropdown ───────────────────────────────────────────────────
const SimpleDropdown = ({ label, items }) => {
  const { open, handleMouseEnter, handleMouseLeave } = useDropdown();
  return (
    <div style={styles.dropdownWrapper} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button style={{ ...styles.navLink, ...(open ? styles.navLinkActive : {}) }}>
        {label}
        <span style={{ display: "inline-block", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease", marginLeft: 4 }}>
          <ChevronDown />
        </span>
      </button>
      <div style={{
        ...styles.simpleMenu,
        opacity: open ? 1 : 0,
        visibility: open ? "visible" : "hidden",
        transform: open ? "translateY(0)" : "translateY(-8px)",
        pointerEvents: open ? "all" : "none",
      }}>
        {items.map((item, i) => (
          <a key={i} href={item.href || "#"} style={styles.simpleItem}
            onMouseEnter={e => e.currentTarget.style.cssText = simpleItemHoverCSS}
            onMouseLeave={e => e.currentTarget.style.cssText = simpleItemCSS}
          >{item.label}</a>
        ))}
      </div>
    </div>
  );
};

const simpleItemCSS = "display:block;padding:10px 20px;color:#374151;text-decoration:none;font-size:14px;font-family:'Poppins',sans-serif;font-weight:500;transition:all 0.2s ease;border-left:3px solid transparent;";
const simpleItemHoverCSS = "display:block;padding:10px 20px 10px 23px;color:#2563eb;text-decoration:none;font-size:14px;font-family:'Poppins',sans-serif;font-weight:600;transition:all 0.2s ease;border-left:3px solid #2563eb;background:#eff6ff;";

// ─── Mobile Accordion ────────────────────────────────────────────────────────
const MobileAccordion = ({ label, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={styles.mobileAccordion}>
      <button
        style={{ ...styles.mobileNavLink, ...(open ? { color: "#2563eb", background: "#eff6ff" } : {}) }}
        onClick={() => setOpen(o => !o)}
      >
        {label}
        <span style={{ marginLeft: "auto", transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}>▾</span>
      </button>
      <div style={{
        overflow: "hidden",
        maxHeight: open ? "800px" : "0",
        transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div style={{ padding: "8px 0 8px 16px" }}>{children}</div>
      </div>
    </div>
  );
};

// ─── Main Navbar ──────────────────────────────────────────────────────────────
const Navbare = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    const onResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  const close = () => setMenuOpen(false);

  const industriesItems = [
    { label: "Manufacturing", href: "/munufacturing" },
    { label: "Healthcare", href: "/healthcare" },
    { label: "Construction", href: "/contruction" },
    { label: "Financial Services", href: "/financial" },
    { label: "Education", href: "/education" },
    { label: "Call Centers", href: "/callcenter" },
    { label: "Retail", href: "/retail" },
    { label: "Federal, State & Local Government", href: "/fedral" },
    { label: "Engineering", href: "/engineer" },
    { label: "Utilities/Energy", href: "/utility" },
    { label: "Transportation and Logistics", href: "/transport" },
    { label: "Staffing", href: "/staffing" },
    { label: "Hospitality", href: "/hospital" },
    { label: "Legal Services", href: "/legal" },
  ];

  const resourcesItems = [
    { label: "Blog", href: "#" },
    { label: "Case Studies", href: "#" },
    { label: "Webinars", href: "#" },
    { label: "ROI Calculator", href: "#" },
    { label: "Hiring Glossary", href: "#" },
    { label: "Assessment Taker Resources", href: "#" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }

        .nav-link-hover:hover { color: #2563eb !important; background: #eff6ff !important; }

        .mega-col-link {
          display: block; padding: 6px 10px; border-radius: 6px;
          color: #374151; text-decoration: none !important;
          font-size: 13.5px; font-family: 'Poppins', sans-serif;
          font-weight: 500; transition: all 0.22s ease;
          border-left: 2px solid transparent;
        }
        .mega-col-link:hover {
          background: #eff6ff; color: #2563eb;
          border-left: 2px solid #2563eb; padding-left: 16px;
        }

        .mobile-sub-link {
          display: block; padding: 8px 12px; color: #4b5563;
          text-decoration: none; font-size: 13.5px;
          font-family: 'Poppins', sans-serif; border-radius: 6px;
          transition: all 0.2s; margin-bottom: 2px;
        }
        .mobile-sub-link:hover { background: #eff6ff; color: #2563eb; }

        .take-test-btn {
          display: inline-flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #1d4ed8, #2563eb);
          color: #ffffff !important; padding: 9px 20px; border-radius: 8px;
          font-weight: 600; font-size: 14px; font-family: 'Poppins', sans-serif;
          text-decoration: none !important; border: none; cursor: pointer;
          transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(37,99,235,0.35);
          white-space: nowrap; line-height: 1.4;
        }
        .take-test-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37,99,235,0.5);
          background: linear-gradient(135deg, #1e40af, #1d4ed8);
          color: #ffffff !important; text-decoration: none !important;
        }

        .demo-btn {
          display: inline-flex; align-items: center; justify-content: center;
          background: #ffffff; color: #2563eb !important;
          padding: 8px 20px; border-radius: 8px; font-weight: 600;
          font-size: 14px; font-family: 'Poppins', sans-serif;
          border: 2px solid #2563eb; cursor: pointer;
          transition: all 0.3s ease; white-space: nowrap;
          line-height: 1.4; text-decoration: none !important;
        }
        .demo-btn:hover {
          background: #2563eb; color: #ffffff !important;
          transform: translateY(-2px); box-shadow: 0 4px 15px rgba(37,99,235,0.3);
        }

        /* Udichi logo hover lift effect */
        .udichi-logo-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease, filter 0.25s ease;
          cursor: default;
        }
        .udichi-logo-wrap:hover {
          transform: translateY(-1px);
          filter: drop-shadow(0 4px 10px rgba(37,99,235,0.18));
        }

        .ham-line {
          display: block; width: 24px; height: 2.5px;
          background: #1e293b; border-radius: 4px;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
        }
        .ham-open .ham-line:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        .ham-open .ham-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .ham-open .ham-line:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

        .mobile-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.45);
          z-index: 998; backdrop-filter: blur(2px); animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }

        .mobile-drawer {
          position: fixed; top: 0; right: 0; height: 100vh;
          width: min(340px, 88vw); background: white; z-index: 999;
          box-shadow: -8px 0 40px rgba(0,0,0,0.18); overflow-y: auto;
          padding: 0 0 32px;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mobile-drawer::-webkit-scrollbar { width: 4px; }
        .mobile-drawer::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
      `}</style>

      <Topbar />

      <nav style={{ ...styles.navbar, ...(scrolled ? styles.navbarScrolled : {}) }}>
        <div style={styles.navContainer}>

          {/* ── Left: Main Brand Logo ── */}
          <Link to="/" style={styles.brand} onClick={close}>
            <img
              src={logo3}
              alt="Talent Assessor"
              style={{ height: 60, width: "auto", objectFit: "contain", display: "block" }}
            />
          </Link>

          {/* ── Desktop Nav ── */}
          {!isMobile && (
            <div style={styles.desktopNav}>

              {/* Nav items (center) */}
              <div style={styles.navItems}>
                {/* Platform */}
                <MegaDropdown label={<><Icon>🧊</Icon>Platform</>}>
                  <div style={styles.megaInner}>
                    <div style={styles.megaGrid}>
                      <div style={styles.megaCol}>
                        <Link to="/AssessmentTypes" style={styles.megaColTitle}>Assessment Types</Link>
                        <div style={styles.megaDivider} />
                        {[["Skills", "/Skills"], ["Cognitive", "/Cognitive"], ["Behavioral", "/Behavioral"], ["Popular Assessments", "/PopularAssessments"]].map(([l, h]) => (
                          <a key={l} href={h} className="mega-col-link">{l}</a>
                        ))}
                      </div>
                      <div style={styles.megaCol}>
                        <span style={styles.megaColTitle}>Other Features</span>
                        <div style={styles.megaDivider} />
                        {[["Customization", "/Customization"], ["Dedicated Assessment Experts", "/Dedicatedassessment"], ["Reporting", "/Reporting"], ["Proctoring", "/Proctoring"], ["Test Digitization", "/TestDigitization"], ["Security & Compliance", "/Security"]].map(([l, h]) => (
                          <a key={l} href={h} className="mega-col-link">{l}</a>
                        ))}
                      </div>
                      <div style={styles.megaCol}>
                        <Link to="/QuestionStyles" style={styles.megaColTitle}>Question Styles</Link>
                        <div style={styles.megaDivider} />
                        {[["Simulation", "/Simulation"], ["Multiple Choice", "/QuestionStyles#multiple-choice"], ["Free Response", "/QuestionStyles#Free-Response"], ["Video", "/Video"]].map(([l, h]) => (
                          <a key={l} href={h} className="mega-col-link">{l}</a>
                        ))}
                      </div>
                      <div style={styles.megaCol}>
                        <span style={styles.megaColTitle}>Platform Overview</span>
                        <div style={styles.megaDivider} />
                        <p style={{ fontSize: 13, color: "#6b7280", fontFamily: "'Poppins',sans-serif", lineHeight: 1.6, marginBottom: 16 }}>
                          Explore our full suite of assessment tools designed to streamline hiring decisions.
                        </p>
                        <Link to="/LearnMore" style={{
                          display: "inline-flex", alignItems: "center", gap: 6,
                          background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
                          color: "white", padding: "10px 20px", borderRadius: 8,
                          textDecoration: "none", fontWeight: 600, fontSize: 14,
                          fontFamily: "'Poppins',sans-serif",
                          boxShadow: "0 4px 15px rgba(37,99,235,0.3)",
                        }}>Learn More →</Link>
                      </div>
                    </div>
                  </div>
                </MegaDropdown>

                {/* Industries */}
                <MegaDropdown label={<><Icon>🏭</Icon>Industries</>}>
                  <div style={{ ...styles.megaInner, padding: "24px 28px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 24px" }}>
                      {industriesItems.map(item => (
                        <a key={item.href} href={item.href} className="mega-col-link">{item.label}</a>
                      ))}
                    </div>
                  </div>
                </MegaDropdown>

                {/* Resources */}
                <SimpleDropdown label={<><Icon>📚</Icon>Resources</>} items={resourcesItems} />

                {/* Direct links */}
                <a href="/AssessmentLibrary" className="nav-link-hover" style={styles.navLink}><Icon>📁</Icon>Assessment Library</a>
                <a href="/integration" className="nav-link-hover" style={styles.navLink}><Icon>🔌</Icon>Integrations</a>
                <a href="/subscribe" className="nav-link-hover" style={styles.navLink}><Icon>💳</Icon>Subscription</a>

                {/* CTA Buttons */}
                <div style={styles.ctaGroup}>
                  <Link to="/examcode" className="take-test-btn">Take Your Test</Link>
                  <button className="demo-btn">Get a Demo</button>
                </div>
              </div>

              {/* ── Right: Udichi Logo with proper divider & alignment ── */}
              <div style={styles.rightLogoSection}>
                {/* Vertical Divider */}
                <div style={styles.verticalDivider} />

                {/* Udichi Logo Block */}
                <div style={styles.udichiBlock} className="udichi-logo-wrap">
                  <img
                    src={ulogo}
                    alt="Udichi Logo"
                    style={styles.udichiImg}
                  />
                </div>
              </div>

            </div>
          )}

          {/* ── Mobile: Udichi logo + hamburger ── */}
          {isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Compact Udichi logo on mobile */}
              <div style={styles.udichiMobileWrap}>
                <img
                  src={ulogo}
                  alt="Udichi Logo"
                  style={{ height: 32, width: "auto", objectFit: "contain", display: "block" }}
                />
              </div>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(o => !o)}
                style={styles.hamburger}
                className={menuOpen ? "ham-open" : ""}
                aria-label="Toggle menu"
              >
                <span className="ham-line" />
                <span className="ham-line" />
                <span className="ham-line" />
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      {isMobile && menuOpen && (
        <>
          <div className="mobile-overlay" onClick={close} />
          <div className="mobile-drawer">
            {/* Drawer Header — shows both logos */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "16px 20px", borderBottom: "1px solid #f1f5f9",
              position: "sticky", top: 0, background: "white", zIndex: 1,
            }}>
              {/* Main logo */}
              <img src={logo3} alt="Talent Assessor" style={{ height: 42, width: "auto", objectFit: "contain" }} />

              {/* Udichi logo in drawer */}
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "6px 10px", borderRadius: 8,
                background: "#f8fafc", border: "1px solid #e2e8f0",
              }}>
                <img
                  src={ulogo}
                  alt="Udichi Logo"
                  style={{ height: 30, width: "auto", objectFit: "contain", display: "block" }}
                />
                <span style={{
                  fontSize: 10, fontFamily: "'Poppins',sans-serif",
                  color: "#64748b", fontWeight: 600, letterSpacing: 0.4,
                  textTransform: "uppercase", lineHeight: 1.2, whiteSpace: "nowrap",
                }}>Powered by<br />Udichi</span>
              </div>

              {/* Close button */}
              <button onClick={close} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 22, color: "#6b7280", lineHeight: 1, padding: "4px" }}>✕</button>
            </div>

            <div style={{ padding: "12px 16px 0" }}>
              <MobileAccordion label="🧊 Platform">
                <p style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1, fontFamily: "'Poppins',sans-serif", marginBottom: 6, marginLeft: 12 }}>Assessment Types</p>
                {[["Skills", "/Skills"], ["Cognitive", "/Cognitive"], ["Behavioral", "/Behavioral"], ["Popular Assessments", "/PopularAssessments"]].map(([l, h]) => (
                  <a key={l} href={h} className="mobile-sub-link" onClick={close}>{l}</a>
                ))}
                <p style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1, fontFamily: "'Poppins',sans-serif", marginBottom: 6, marginLeft: 12, marginTop: 12 }}>Other Features</p>
                {[["Customization", "/Customization"], ["Dedicated Assessment Experts", "/Dedicatedassessment"], ["Reporting", "/Reporting"], ["Proctoring", "/Proctoring"], ["Test Digitization", "/TestDigitization"], ["Security & Compliance", "/Security"]].map(([l, h]) => (
                  <a key={l} href={h} className="mobile-sub-link" onClick={close}>{l}</a>
                ))}
                <p style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1, fontFamily: "'Poppins',sans-serif", marginBottom: 6, marginLeft: 12, marginTop: 12 }}>Question Styles</p>
                {[["Simulation", "/Simulation"], ["Multiple Choice", "/QuestionStyles#multiple-choice"], ["Free Response", "/QuestionStyles#Free-Response"], ["Video", "/Video"]].map(([l, h]) => (
                  <a key={l} href={h} className="mobile-sub-link" onClick={close}>{l}</a>
                ))}
                <div style={{ marginTop: 12, paddingLeft: 12 }}>
                  <Link to="/LearnMore" onClick={close} style={{ background: "#2563eb", color: "white", padding: "8px 16px", borderRadius: 6, textDecoration: "none", fontSize: 13, fontWeight: 600, fontFamily: "'Poppins',sans-serif", display: "inline-block" }}>Learn More →</Link>
                </div>
              </MobileAccordion>

              <MobileAccordion label="🏭 Industries">
                {industriesItems.map(item => (
                  <a key={item.href} href={item.href} className="mobile-sub-link" onClick={close}>{item.label}</a>
                ))}
              </MobileAccordion>

              <MobileAccordion label="📚 Resources">
                {resourcesItems.map(item => (
                  <a key={item.label} href={item.href} className="mobile-sub-link" onClick={close}>{item.label}</a>
                ))}
              </MobileAccordion>

              {[["📁 Assessment Library", "/AssessmentLibrary"], ["🔌 Integrations", "/integration"], ["💳 Subscription Options", "/subscribe"]].map(([l, h]) => (
                <a key={h} href={h} className="mobile-sub-link" onClick={close} style={{ fontSize: 15, padding: "12px 12px", fontWeight: 600, color: "#374151" }}>{l}</a>
              ))}

              <div style={{ padding: "20px 12px 8px", display: "flex", flexDirection: "column", gap: 10 }}>
                <Link to="/examcode" onClick={close} className="take-test-btn" style={{ textAlign: "center", padding: "12px" }}>Take Your Test</Link>
                <button className="demo-btn" style={{ width: "100%", padding: "12px" }}>Get a Demo</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  topbar: {
    background: "#0f172a", color: "#94a3b8",
    fontSize: 13, fontFamily: "'Poppins', sans-serif", padding: "7px 0",
  },
  topbarInner: {
    maxWidth: 1280, margin: "0 auto", padding: "0 24px",
    display: "flex", justifyContent: "space-between",
    alignItems: "center", flexWrap: "wrap", gap: 8,
  },
  topLeft: { display: "flex", alignItems: "center", gap: 8 },
  topRight: { display: "flex", alignItems: "center", gap: 20 },
  topLink: {
    color: "#94a3b8", textDecoration: "none",
    fontSize: 12.5, fontFamily: "'Poppins',sans-serif", transition: "color 0.2s",
  },
  navbar: {
    background: "rgba(255,255,255,0.97)",
    backdropFilter: "blur(12px)",
    position: "sticky", top: 0, zIndex: 500,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    transition: "box-shadow 0.3s ease",
    borderBottom: "1px solid #f1f5f9",
  },
  navbarScrolled: { boxShadow: "0 4px 24px rgba(0,0,0,0.1)" },
  navContainer: {
    maxWidth: 1280, margin: "0 auto", padding: "0 24px",
    display: "flex", alignItems: "center",
    justifyContent: "space-between", height: 72,
  },
  brand: { textDecoration: "none", flexShrink: 0 },

  // Desktop nav: full row
  desktopNav: {
    display: "flex", alignItems: "center",
    flex: 1, justifyContent: "space-between",
    marginLeft: 16, overflow: "visible",
    gap: 0,
  },
  navItems: {
    display: "flex", alignItems: "center",
    gap: 2, flexWrap: "nowrap", overflow: "visible",
  },

  // ── Right Udichi logo section (desktop) ──
  rightLogoSection: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    marginLeft: 8,
  },

  // Vertical divider between CTAs and Udichi logo
  verticalDivider: {
    width: 1,
    height: 40,
    background: "linear-gradient(to bottom, transparent, #cbd5e1, transparent)",
    marginRight: 20,
    marginLeft: 8,
    flexShrink: 0,
  },

  // Udichi logo block (desktop)
  udichiBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  // Udichi image (desktop)
  udichiImg: {
    height: 38,
    width: "auto",
    objectFit: "contain",
    display: "block",
    maxWidth: 80,
  },

  // "Powered by Udichi" label below logo (desktop)
  udichiLabel: {
    fontSize: 9,
    fontFamily: "'Poppins', sans-serif",
    color: "#94a3b8",
    fontWeight: 600,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    lineHeight: 1.2,
  },

  // Mobile Udichi logo wrap
  udichiMobileWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px 8px",
    borderRadius: 8,
    background: "#f8fafc",
    border: "1px solid #e8edf2",
  },

  navLink: {
    display: "inline-flex", alignItems: "center",
    padding: "8px 12px", color: "#374151",
    textDecoration: "none", fontFamily: "'Poppins', sans-serif",
    fontWeight: 500, fontSize: 14, borderRadius: 8,
    border: "none", background: "transparent",
    cursor: "pointer", transition: "all 0.2s ease", whiteSpace: "nowrap",
  },
  navLinkActive: { color: "#2563eb", background: "#eff6ff" },
  dropdownWrapper: { position: "relative", display: "inline-block" },
  megaMenu: {
    position: "absolute", top: "calc(100% + 12px)", left: "50%",
    transform: "translateX(-50%)",
    background: "white", borderRadius: 16,
    boxShadow: "0 20px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.06)",
    border: "1px solid #f1f5f9",
    transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
    minWidth: 880, zIndex: 600, overflow: "hidden",
  },
  megaInner: { padding: "28px" },
  megaGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0 32px" },
  megaCol: { display: "flex", flexDirection: "column" },
  megaColTitle: {
    fontWeight: 700, fontSize: 13, color: "#111827",
    textTransform: "uppercase", letterSpacing: 0.8,
    fontFamily: "'Poppins',sans-serif", marginBottom: 8, textDecoration: "none",
  },
  megaDivider: {
    height: 2,
    background: "linear-gradient(90deg, #2563eb, transparent)",
    borderRadius: 2, marginBottom: 12,
  },
  simpleMenu: {
    position: "absolute", top: "calc(100% + 12px)", left: 0,
    background: "white", borderRadius: 12,
    boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
    border: "1px solid #f1f5f9", minWidth: 220, padding: "8px 0",
    transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)", zIndex: 600, overflow: "hidden",
  },
  simpleItem: {
    display: "block", padding: "10px 20px", color: "#374151",
    textDecoration: "none", fontSize: 14, fontFamily: "'Poppins',sans-serif",
    fontWeight: 500, transition: "all 0.2s ease", borderLeft: "3px solid transparent",
  },
  ctaGroup: { display: "flex", alignItems: "center", gap: 10, marginLeft: 12, flexShrink: 0 },
  hamburger: {
    display: "flex", flexDirection: "column", gap: 6,
    background: "none", border: "none", cursor: "pointer",
    padding: "8px", borderRadius: 8, transition: "background 0.2s",
  },
  mobileAccordion: { borderBottom: "1px solid #f1f5f9", marginBottom: 2 },
  mobileNavLink: {
    display: "flex", alignItems: "center", width: "100%",
    padding: "14px 12px", background: "none", border: "none",
    color: "#1e293b", fontFamily: "'Poppins',sans-serif",
    fontWeight: 600, fontSize: 15, cursor: "pointer",
    borderRadius: 8, transition: "all 0.2s", textAlign: "left", gap: 8,
  },
};

export default Navbare;