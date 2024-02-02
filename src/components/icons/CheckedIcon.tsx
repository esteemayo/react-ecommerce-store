import styled from 'styled-components';

const CheckedIcon = () => {
  return (
    <Image
      src='/img/checked.png'
      width={20}
      height={20}
      alt='check icon'
      className='checkedIcon'
    />
  );
};

const Image = styled.img`
  width: 2rem;
  height: 2rem;
  object-fit: cover;
`;

export default CheckedIcon;
