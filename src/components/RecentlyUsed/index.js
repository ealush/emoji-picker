import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { EMOJI_PROPERTY_NAME, GROUP_NAME_RECENTLY_USED, EMOJI_PROPERTY_UNIFIED, EMOJI_PROPERTY_SKIN_VARIATIONS } from '../../../lib/constants';
import emojiStorage from '../../../lib/emojiStorage';
import { PickerContext, actionTypes } from '../../lib/reducer';
import Emoji from '../Emoji';

const RecentlyUsed = ({ unsetEmojiName }) => {
    const { state: { recentlyUsed, emojiUrl, onEmojiClick, filterResult, failedToLoad = {} }, dispatch } = useContext(PickerContext);

    if (!recentlyUsed.length || filterResult) {
        return null;
    }

    return (
        <ul className="emoji-group" data-name={GROUP_NAME_RECENTLY_USED}>
            { recentlyUsed.map((item, index) => {

                const unified = item[EMOJI_PROPERTY_UNIFIED];

                const emoji = emojiStorage.emojis[unified];

                if (failedToLoad[unified] || !emoji) {
                    return null;
                }

                return (
                    <Emoji key={index}
                        emoji={emoji}
                        { ...item[EMOJI_PROPERTY_SKIN_VARIATIONS] && { activeSkinTone: item[EMOJI_PROPERTY_SKIN_VARIATIONS] } }
                        index={index}
                        handleMouseLeave={unsetEmojiName}
                        onEmojiClick={onEmojiClick}
                        handleMouseEnter={() => dispatch({type: actionTypes.EMOJI_NAME_SET, name: emoji[EMOJI_PROPERTY_NAME][0]})}
                        emojiUrl={emojiUrl}
                        dispatch={dispatch}
                        shouldLoad/>
                );
            })}
        </ul>
    );
};

export default RecentlyUsed;

RecentlyUsed.propTypes = {
    unsetEmojiName: PropTypes.func
};
