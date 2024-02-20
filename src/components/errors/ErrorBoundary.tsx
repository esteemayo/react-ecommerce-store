import { Component } from 'react';

import ErrorState from './ErrorState';
import logger from '../../services/logService';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: error,
    };
  }

  componentDidCatch(error: Error, info: object) {
    logger.log(error);
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorState />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
