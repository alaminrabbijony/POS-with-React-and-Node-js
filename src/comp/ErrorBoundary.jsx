import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Store the actual error and component stack trace
    this.setState({ error, info });
    console.error("💥 Caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "2rem",
            background: "#1e1e1e",
            color: "#ffdf52ff",
            fontFamily: "monospace",
            borderRadius: "10px",
            margin: "2rem",
          }}
        >
          <h2 style={{fontSize: 24, fontWeight: "bold"}}>💥 Something went wrong.</h2>
          <p style={{fontSize: 18, fontWeight: "bold"}}>
            <strong>Error:</strong> {this.state.error?.toString()}
            </p>
          <pre style={{ whiteSpace: "pre-wrap", marginTop: "1rem" }}>
            {this.state.info?.componentStack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}


export default ErrorBoundary;
