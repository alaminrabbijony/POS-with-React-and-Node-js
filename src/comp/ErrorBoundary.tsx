import type { ReactNode, ErrorInfo } from "react";
import React from "react";

type ErrorBoundaryProps = {
  children: ReactNode,
};

type ErrorBoundaryState = {
  hasError: boolean,
  error: Error | null,
  info: ErrorInfo | null,
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      info: null,
    };
  }

  // Called when an error is thrown in a child component
  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  // Captures the error and stack trace
  componentDidCatch(error: Error, info: ErrorInfo) {
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
          <h2 style={{ fontSize: 24, fontWeight: "bold" }}>
            💥 Something went wrong.
          </h2>

          <p style={{ fontSize: 18, fontWeight: "bold" }}>
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
