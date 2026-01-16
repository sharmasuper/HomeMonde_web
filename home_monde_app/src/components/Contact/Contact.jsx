import React from "react";

const Contact = () => {
  return (
    <div style={styles.page}>
      {/* Hero */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Trusted Textile Manufacturing & Innovation Partner
        </h1>
        <p style={styles.heroSubtitle}>
          Delivering quality, scale, and reliability across global textile
          markets.
        </p>
      </section>

      {/* Divider */}
      <div style={styles.divider} />

      {/* Content */}
      <section style={styles.content}>
        <div style={styles.column}>
          <h2 style={styles.heading}>Corporate Office</h2>
          <p style={styles.text}>
            Homemonde Lifestyle Private Limited G-88, near UCO Bank, Sitapura
            Industrial Area, Sitapura,
            <br />
            Jaipur, Rajasthan 302022, India
          </p>
        </div>

        <div style={styles.column}>
          <h2 style={styles.heading}>Business Enquiries</h2>
          <p style={styles.text}>
            care@homemonde.com
            <br />
            WhatsApp:+91 8233008561
          </p>
        </div>

        <div style={styles.column}>
          <h2 style={styles.heading}>Global Reach</h2>
          <p style={styles.text}>India • Europe • Middle East • Asia-Pacific</p>
        </div>
      </section>

      {/* Statement */}
      <section style={styles.statement}>
        <p style={styles.statementText}>
          With decades of expertise in textile manufacturing, processing, and
          exports, we partner with global brands to deliver consistency,
          compliance, and innovation at scale.
        </p>
      </section>
    </div>
  );
};

export default Contact;

/* ===================== STYLES ===================== */

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f7f6f2",
    color: "#1f2933",
    fontFamily: "'Playfair Display', 'Inter', serif",
    padding: "80px 10%",
  },

  hero: {
    maxWidth: "900px",
  },

  heroTitle: {
    fontSize: "52px",
    fontWeight: "600",
    lineHeight: "1.2",
    marginBottom: "20px",
  },

  heroSubtitle: {
    fontSize: "20px",
    lineHeight: "1.6",
    color: "#4b5563",
    maxWidth: "700px",
  },

  divider: {
    width: "120px",
    height: "2px",
    backgroundColor: "#9ca3af",
    margin: "60px 0",
  },

  content: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "60px",
    marginBottom: "80px",
  },

  column: {
    maxWidth: "300px",
  },

  heading: {
    fontSize: "16px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "14px",
    color: "#6b7280",
  },

  text: {
    fontSize: "17px",
    lineHeight: "1.7",
    color: "#1f2933",
  },

  statement: {
    maxWidth: "900px",
    borderTop: "1px solid #d1d5db",
    paddingTop: "40px",
  },

  statementText: {
    fontSize: "22px",
    lineHeight: "1.7",
    color: "#374151",
  },
};
