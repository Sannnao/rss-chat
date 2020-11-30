import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, object, boolean } from '@storybook/addon-knobs';
import { Chat } from '..';

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
				id: 1,
        time: new Date(2020, 3, 27, 18, 0, 0),
        from: 'Sasha',
        message: 'Hello, World!',
      },
      {
				id: 2,
        time: new Date(2020, 3, 27, 18, 0, 0),
        from: 'Sasha',
        message: 'Hello, World!',
      },
      {
				id: 3,
        time: new Date(2020, 3, 27, 18, 0, 0),
        from: 'unknown monkey',
        message: 'Hello, World!',
      },
			{
				id: 4,
        time: new Date(2020, 3, 27, 18, 0, 0),
        from: 'Sasha',
        message: 'Hello, World!',
      },
      {
				id: 5,
        time: new Date(2020, 3, 27, 18, 0, 0),
        from: 'Sasha',
        message: 'Hello, World!',
      },
      {
				id: 6,
        time: new Date(2020, 3, 27, 18, 0, 0),
        from: 'unknown monkey',
        message: 'Hello, World!',
      }
    ])}
		handleLoginSubmit={action('Login submitted!')}
		sendMessage={action('Message sent!')}
  />
);
