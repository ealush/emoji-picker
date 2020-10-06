import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { PROPERTY_DATA_NAME } from '../../lib/constants';
import { actionTypes, PickerContext } from '../../lib/reducer';
import groups from '../../groups.json';
import './style.css';
import { Activities } from './svg/activities.js';
import { AnimalsNature } from './svg/animals_nature.js';
import { Flags } from './svg/flags.js';
import { FoodDrink } from './svg/food_drink.js';
import { Objects } from './svg/objects.js';
import { SmileysPeople } from './svg/smileys_people.js';
import { Symbols } from './svg/symbols.js';
import { TravelPlaces } from './svg/travel_places.js';

const CategoriesNav = ({ emojiListRef }) => {
  const {
    state: { activeCategory, filter },
    dispatch,
  } = useContext(PickerContext);

  let inactive = false;

  if (filter && filter.length) {
    inactive = true;
  }

  const handleClick = ({ target }, group) => {
    if (inactive) {
      return;
    }

    console.log(group);

    if (!emojiListRef || !emojiListRef.current || !group) {
      return;
    }

    dispatch({
      type: actionTypes.ACTIVE_CATEGORY_SET,
      activeCategory: group,
    });
    dispatch({
      type: actionTypes.GROUP_SEEN_SET,
      group: group,
    });

    const { current } = emojiListRef;
    const category = current.querySelector(
      `[${PROPERTY_DATA_NAME}="${group}"]`
    );

    current.scrollTop = category.offsetTop;
  };

  return (
    <nav className={cn('emoji-categories', { inactive })}>
      {groups.map(group => (
        <button
          key={group}
          type="button"
          className={cn(`icn-${group}`, {
            active: activeCategory === group,
          })}
          data-name={group}
          onClick={event => handleClick(event, group)}
        >
          {group === 'animals_nature' ? (
            <AnimalsNature />
          ) : group === 'activities' ? (
            <Activities />
          ) : group === 'flags' ? (
            <Flags />
          ) : group === 'food_drink' ? (
            <FoodDrink />
          ) : group === 'objects' ? (
            <Objects />
          ) : group === 'smileys_people' ? (
            <SmileysPeople />
          ) : group === 'symbols' ? (
            <Symbols />
          ) : group === 'travel_places' ? (
            <TravelPlaces />
          ) : (
            <></>
          )}
        </button>
      ))}
    </nav>
  );
};

export default CategoriesNav;

CategoriesNav.propTypes = {
  emojiListRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};
