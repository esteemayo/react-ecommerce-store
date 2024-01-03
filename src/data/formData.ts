import { PasswordInput, RegisterInput, SelectInput, UserDataInput } from '@/types';

export const registerInputs: RegisterInput = [
  {
    id: 'name',
    name: 'name',
    type: 'text',
    label: 'Name',
    placeholder: 'Enter your name',
  },
  {
    id: 'email',
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter email address',
  },
  {
    id: 'username',
    name: 'username',
    type: 'text',
    label: 'Username',
    placeholder: 'Enter username',
  },
  {
    id: 'password',
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
  },
  {
    id: 'confirmPassword',
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirm Password',
    placeholder: 'Confirm your password',
  },
];

export const passwordInputs: PasswordInput = [
  {
    id: 'password1',
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Type in your new password',
  },
  {
    id: 'confirm-password',
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirm Password',
    placeholder: 'Confirm your password',
  },
  {
    id: 'current-password',
    name: 'currentPassword',
    type: 'password',
    label: 'Current Password',
    placeholder: 'Type in your current password',
  },
];

export const userDataInputs: UserDataInput = [
  {
    id: 'newEmail',
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Type in your new email address',
  },
  {
    id: 'passwordCurrent',
    name: 'password',
    type: 'password',
    label: 'Current Password',
    placeholder: 'Type in your current password',
  },
];

export const selectInputs: SelectInput = [
  {
    id: 'jeans',
    name: 'jeans',
    label: 'Jeans',
  },
  {
    id: 'electronics',
    name: 'electronics',
    label: 'Electronics',
  },
  {
    id: 'gadgets',
    name: 'gadgets',
    label: 'Gadgets',
  },
  {
    id: 'shirts',
    name: 'shirts',
    label: 'Shirts',
  },
  {
    id: 'snickers',
    name: 'snickers',
    label: 'Snickers',
  },
];
