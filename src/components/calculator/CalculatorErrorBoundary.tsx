"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary for calculator components.
 * Prevents the entire page from crashing if a calculator throws.
 * Shows a graceful fallback with a retry button.
 */
export class CalculatorErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[CALCULATOR ERROR]", error, info.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-sm font-medium text-red-700 mb-2">
              Er is een fout opgetreden in de calculator
            </p>
            <p className="text-xs text-red-500 mb-4 font-mono">
              {this.state.error?.message || "Onbekende fout"}
            </p>
            <button
              onClick={this.handleRetry}
              className="rounded-lg bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700 transition-colors"
            >
              Opnieuw proberen
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
