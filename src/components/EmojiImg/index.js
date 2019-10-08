import React from 'react';
import PropTypes from 'prop-types';
import emojiSrc from '../../lib/emojiSrc';
import { actionTypes } from '../../lib/reducer';
import './style.css';

const handleError = (unified, dispatch = Function.prototype) => {
    dispatch({
        type: actionTypes.EMOJI_NOT_LOADED_SET,
        unified
    });
};

const EmojiImg = ({ unified, emojiUrl, dispatch, shouldLoad = true }) => {

    return (
        <img className="emoji-img"
            onError={() => handleError(unified, dispatch)}
            {...shouldLoad && emojiSrc(unified, emojiUrl)}/>
    );
};

export default EmojiImg;

EmojiImg.propTypes = {
    unified: PropTypes.string,
    shouldLoad: PropTypes.bool,
    emojiUrl: PropTypes.string,
    dispatch: PropTypes.func
};
