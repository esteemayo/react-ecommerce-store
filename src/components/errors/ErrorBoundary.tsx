import { Component } from 'react';

interface IProps {
  children: React.ReactNode;
  fallback: React.ReactElement;
}

interface IState {
  hasError: boolean;
}

class ErrorBoundary extends Component<IProps & IState> {
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
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
