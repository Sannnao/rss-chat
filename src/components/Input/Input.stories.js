import React from 'react';
import Input from '.';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Input',
	component: Input,
};

export const Default = () => <Input sendMessage={action('Message sent')} />
