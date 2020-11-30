import React from 'react';
import { Login } from '..';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Login',
  component: Login,
};

export const Default = () => <Login handleSubmit={action('Login!')} />
