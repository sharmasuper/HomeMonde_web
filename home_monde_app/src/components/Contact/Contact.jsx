import React from "react";

const Contact = () => {
  return (
    <div style={styles.page}>
      {/* Hero */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Turning Data into Reliable Business Insights
        </h1>
        <p style={styles.heroSubtitle}>
          Delivering accurate insights, scalable analytics, and reliable data
          solutions.
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
            pushgautam2002@gmail.com
            <br />
            WhatsApp:+91 7062809588
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
          With strong expertise in data analysis, visualization, and reporting,
          we help organizations transform raw data into accurate, compliant, and
          scalable insights.
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
    backgroundColor: "#050503", // fallback color
    // backgroundImage: "url('/Images/19187756.jpg')", // your background image
    backgroundSize: "cover", // makes the image cover the whole container
    backgroundPosition: "center", // centers the image
    backgroundRepeat: "no-repeat", // prevents tiling
    color: "#f0f4f7",
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
    color: "#f1f3f6",
    maxWidth: "700px",
  },

  divider: {
    width: "120px",
    height: "2px",
    backgroundColor: "#f0f2f7",
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
    color: "#f3f5f7",
  },

  text: {
    fontSize: "17px",
    lineHeight: "1.7",
    color: "#f5f8fb",
  },

  statement: {
    maxWidth: "900px",
    borderTop: "1px solid #d1d5db",
    paddingTop: "40px",
  },

  statementText: {
    fontSize: "22px",
    lineHeight: "1.7",
    color: "#f7f9fd",
  },
};
