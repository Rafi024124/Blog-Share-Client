import React from "react";

const BlogLoader = () => {
  return (
    <div style={styles.loaderContainer}>
      <div style={styles.loader}>
        <span style={{ ...styles.dot, backgroundColor: "#E6E6FA", animationDelay: "0s" }}></span>      {/* Lavender */}
        <span style={{ ...styles.dot, backgroundColor: "#CBC3E3", animationDelay: "0.2s" }}></span>   {/* Light Purple */}
        <span style={{ ...styles.dot, backgroundColor: "#CF9FFF", animationDelay: "0.4s" }}></span>   {/* Light Violet */}
      </div>
      <p style={styles.text}>Loading articles...</p>
      <style>{`
        @keyframes blink {
          0%, 80%, 100% { opacity: 0; }
          40% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const styles = {
  loaderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "150px",
    color: "#5A2240",  // dark purple text
    fontFamily: "'Georgia', serif",
  },
  loader: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },
  dot: {
    width: "15px",
    height: "15px",
    borderRadius: "50%",
    animationName: "blink",
    animationDuration: "1.4s",
    animationIterationCount: "infinite",
  },
  text: {
    fontSize: "1.1rem",
    fontStyle: "italic",
    letterSpacing: "0.05em",
  },
};

export default BlogLoader;
