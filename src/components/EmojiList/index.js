import React, { useContext, useMemo } from 'react';
import  { groupedEmojis, groups } from '../../../lib/initEMojis';
import Emoji from '../Emoji';
import { PickerContext, actionTypes } from '../../lib/reducer';
import { ScrollWrapper, Ul } from './styled';

const createEmojiList = ({ name }) => {
    const { state: {activeSkinTone, filterResult }, dispatch } = useContext(PickerContext);

    const openVariationMenu = (emoji) => dispatch({ type: actionTypes.VARIATION_MENU_SET, emoji })

    return useMemo(() => groupedEmojis[name].reduce((accumulator, emoji) => {
        const hidden = filterResult && !filterResult.hasOwnProperty(emoji.unified);

        if (!accumulator.shown && !hidden) {
            accumulator.shown = true;
        }

        accumulator.list.push(
            <Emoji emoji={emoji}
                openVariationMenu={openVariationMenu}
                activeSkinTone={activeSkinTone}
                hidden={hidden}
                key={emoji.unified}/>
        );

        return accumulator;
    }, { list: [], shown: false }), [activeSkinTone, filterResult, name]);
}

const EmojiList = () => (
    <ScrollWrapper>
        {groups.map((name) => {
            const { list, shown } = createEmojiList({
                name
            });

            const style = {
                ...!shown && { display: 'none' }
            };

            return (
                <Ul data-name={name}
                    children={list}
                    key={name}
                    style={style}/>
            );
        })}
    </ScrollWrapper>
)

export default EmojiList;
