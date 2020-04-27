import React from 'react';
import { addDecorator } from '@storybook/react';
import Background from './Background';
import '../src/index.css';

addDecorator(storyFn => <Background>{ storyFn() }</Background>);
