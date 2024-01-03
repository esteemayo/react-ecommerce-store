'use client';

import styled from 'styled-components';

import Form from '../form/Form';
import FormButton from '../form/FormButton';

import Input from '../carts/Input';
import TextArea from '../carts/TextArea';

import { OrderDetailsProps } from '@/types';
import { formatCurrency } from '@/utils/formatCurrency';

const OrderDetails = ({
  name,
  address,
  total,
  errors,
  onChange,
  onSubmit,
}: OrderDetailsProps) => {
  return (
    <Form onSubmit={onSubmit}>
      <Heading>You will pay {formatCurrency(total)} after delivery</Heading>
      <Input
        name='name'
        label='Name'
        value={name}
        placeholder='Enter your name'
        onChange={onChange}
        error={errors.name}
        autoFocus
      />
      <TextArea
        name='address'
        label='Address'
        value={address}
        placeholder='Enter your address'
        onChange={onChange}
        error={errors.address}
      />
      <FormButton label='Order' />
    </Form>
  );
};

const Heading = styled.h1`
  display: inline-block;
  font-weight: 500;
  font-size: 2rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;

  @media only screen and (max-width: 25em) {
    font-size: 1.87rem;
  }
`;

export default OrderDetails;
