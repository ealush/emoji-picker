import React from 'react'; // eslint-disable-line no-unused-vars
import { storiesOf, action } from '@storybook/react';
import EmojiPicker from '../src';
import EmojiTextarea from './textarea';

const text = `:face_with_cowboy_hat:Hi! :wave:
:shaved_ice:This is a live demo using the emoji picker.:dark_sunglasses:
Give it a try by clicking the smiley face blow the textarea. :nerd_face:`;

// eslint-disable-next-line no-undef
storiesOf('Standalone picker', module)
    .add('Top Navigation CDN hosted 32px/fastest', () => (
        <EmojiPicker onEmojiClick={action('emoji-click')} width={270} preload emojiSize={20} emojiPadding={5}/>
    ))
    .add('Top Navigation', () => (
        <EmojiPicker onEmojiClick={action('emoji-click')} preload/>
    ))
    .add('Left Navigation CDN hosted 64px/slower', () => (
        <EmojiPicker emojiResolution="64" nav="left" onEmojiClick={action('emoji-click')} preload/>
    ))
    .add('Bottom Navigation CDN hosted 128px/slowest', () => (
        <EmojiPicker emojiResolution="128" nav="bottom" onEmojiClick={action('emoji-click')} preload/>
    ));

// eslint-disable-next-line no-undef
storiesOf('Text area with picker', module)
    .add('Sample textarea with emoji picker', () => (
        <div>
            <EmojiTextarea value={text} preload/>
        </div>
    ))
    .add('Sample textarea with emoji picker - autoclose mode', () => (
        <div style={{maxWidth: '450px'}}>
            <EmojiTextarea autoClose={true} value={text}/>
        </div>
    ));