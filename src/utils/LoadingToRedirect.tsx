import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LoadingToRedirect = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCount((currCount) => --currCount);
    }, 1000);

    count === 0 && navigate('/login');
    return () => clearTimeout(timeout);
  }, [count, navigate]);

  return (
    <Container>
      <Text>Redirecting you in {count} seconds...</Text>
    </Container>
  );
};

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  text-align: center;
  margin-top: 10rem;
`;

const Text = styled.h5``;

export default LoadingToRedirect;
