import React from 'react';
import { withKnobs, text, boolean, date } from '@storybook/addon-knobs';
import Message from '.';

export default {
  title: 'Message',
  component: Message,
  decorators: [
    (storyFn) => (
      <div
        style={{
          display: 'flex',
					flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          height: '100vh',
        }}
      >
        {storyFn()}
      </div>
    ),
    withKnobs,
  ],
};

export const Default = () => (
  <Message
    time={date('Message time', new Date())}
    name={text('Name', 'Sasha')}
    message={text('Message', 'Hello, World!')}
    isYourMessage={boolean('IsYourMessage?', true)}
  />
);
