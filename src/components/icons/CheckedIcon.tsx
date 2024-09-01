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
  display: inline-block;
  object-fit: cover;

  @media only screen and (min-width: 112.5em) {
    width: 3rem;
    height: 3rem;
  }
`;

export default CheckedIcon;
