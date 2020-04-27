import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, object, boolean, text } from '@storybook/addon-knobs';
import Chat from '.';

export default {
  title: 'Chat',
  component: Chat,
  decorators: [
    (storyFn) => (
      <div
        style={{
          display: 'flex',
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
  <Chat
	  offline={boolean('Is Chat Offline', false)}
    messages={object('Messages', [
      {
				id: Math.floor(Math.random() * 1e6),
        time: new Date(),
        from: 'Sasha',
        message: 'Hello, World!',
      },
      {
				id: Math.floor(Math.random() * 1e6),
        time: new Date(),
        from: 'Sasha',
        message: 'Hello, World!',
      },
      {
				id: Math.floor(Math.random() * 1e6),
        time: new Date(),
        from: 'unknown monkey',
        message: 'Hello, World!',
      },
			{
				id: Math.floor(Math.random() * 1e6),
        time: new Date(),
        from: 'Sasha',
        message: 'Hello, World!',
      },
      {
				id: Math.floor(Math.random() * 1e6),
        time: new Date(),
        from: 'Sasha',
        message: 'Hello, World!',
      },
      {
				id: Math.floor(Math.random() * 1e6),
        time: new Date(),
        from: 'unknown monkey',
        message: 'Hello, World!',
      }
    ])}
		handleLoginSubmit={action('Login submitted!')}
		sendMessage={action('Message sent!')}
  />
);
