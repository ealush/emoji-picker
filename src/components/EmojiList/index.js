import React, { useContext, useMemo, useRef, useEffect } from 'react';
import groups from '../../groups.json';
import groupedEmojis from '../../emojis.json';
import { EMOJI_PROPERTY_UNIFIED, EMOJI_PROPERTY_NAME } from '../../lib/constants';
import { PickerContext, actionTypes } from '../../lib/reducer';
import Emoji from '../Emoji';
import { ScrollWrapper, Ul } from './styled';

const  useScrollUpOnFilterChange = (value, emojiListRef) => {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();

    // Store current value in ref
    useEffect(() => {

        if (emojiListRef && emojiListRef.current) {
            emojiListRef.current.scrollTop = 0;
        }

        ref.current = value;
    }, [value]); // Only re-run if value changes

    // Return previous value (happens before update in useEffect above)
    return ref.current;
}

const createEmojiList = ({ name, activeSkinTone, filterResult, dispatch }) => {

    const openVariationMenu = (emoji) => dispatch({ type: actionTypes.VARIATION_MENU_SET, emoji });

    const unsetEmojiName = () => dispatch({ type: actionTypes.EMOJI_NAME_SET });

    return useMemo(() => groupedEmojis[name].reduce((accumulator, emoji) => {
        const hidden = filterResult && !filterResult.hasOwnProperty(emoji[EMOJI_PROPERTY_UNIFIED]);

        if (!accumulator.shown && !hidden) {
            accumulator.shown = true;
        }

        accumulator.list.push(
            <Emoji emoji={emoji}
                openVariationMenu={openVariationMenu}
                activeSkinTone={activeSkinTone}
                handleMouseLeave={unsetEmojiName}
                handleMouseEnter={() => dispatch({type: actionTypes.EMOJI_NAME_SET, name: emoji[EMOJI_PROPERTY_NAME][0]})}
                hidden={hidden}
                key={emoji[EMOJI_PROPERTY_UNIFIED]}/>
        );

        return accumulator;
    }, { list: [], shown: false }), [activeSkinTone, filterResult, name]);
}

const EmojiList = ({ emojiListRef }) => {
    const { state: {activeSkinTone, filterResult }, dispatch } = useContext(PickerContext);
    useScrollUpOnFilterChange(filterResult, emojiListRef);

    return (
        <ScrollWrapper ref={emojiListRef}>
            {groups.map((name) => {
                const { list, shown } = createEmojiList({
                    name,
                    activeSkinTone,
                    filterResult,
                    dispatch
                });

                const style = {
                    ...!shown && { display: 'none' }
                };

                return (
                    <Ul data-id={name}
                        className="emoji-group"
                        data-name={name}
                        children={list}
                        key={name}
                        style={style}/>
                );
            })}
        </ScrollWrapper>
    );
}

export default EmojiList;
