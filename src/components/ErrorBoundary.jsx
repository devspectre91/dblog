import { Link } from "react-router-dom";
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log("Error found");
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1 className="has-text-centered mt-6 has-text-danger">
            Something went wrong :(
          </h1>
          <div className="level">
            <div className="level-item">
              {" "}
              <Link to="/" className="button is-success">
                Back to Home Page
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
