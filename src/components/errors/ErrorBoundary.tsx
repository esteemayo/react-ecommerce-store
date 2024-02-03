import { Component } from 'react';
import ErrorState from './ErrorState';

interface IProps {
  children: React.ReactNode;
}

interface IState {
  hasError: boolean;
}

class ErrorBoundary extends Component<IProps> {
  state: IState = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: error,
    };
  }

  componentDidCatch(error: Error, info: object) {
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
