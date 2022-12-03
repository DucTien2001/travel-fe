import React from 'react';
// import { categoryList, ratingList } from '../../../constants';
// import CheckboxProton from '../../common/CheckboxProton';
// import FilterListToggle from '../../common/FilterListToggle';
// import SliderProton from '../../common/SliderProton';
import classes from './styles.module.scss';
import CheckboxProton from "components/CheckboxProton";
import SliderProton from "components/SliderProton";
import FilterListToggle from "components/FilterListToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { ratingList } from 'configs/constants';
interface Props {
  selectedCategory?: any;
  selectCategory?: any;
  selectedRating?: any;
  selectedPrice?: any;
  selectRating?: any;
  tags?: any;
  changeChecked?: any;
  changePrice?: any;
}
const FilterPanel = ({
  selectedCategory,
  selectCategory,
  selectedRating,
  selectedPrice,
  selectRating,
  tags,
  changeChecked,
  changePrice,
}:Props) => (
  <div>
    <div className={classes.inputGroup}>
      {/* <FilterListToggle
        options={categoryList}
        value={selectedCategory}
        selectToggle={selectCategory}
      /> */}
    </div>
    <div className={classes.inputGroup}>
      {tags?.map((tag) => (
        <CheckboxProton
          key={tag.id}
          tags={tag}
          changeChecked={changeChecked}
        />
      ))}
    </div>
    {changePrice && <div className={classes.inputGroup}>
      <div className={classes.titlePrice}>
      <FontAwesomeIcon icon={faCreditCard} />
      <p className={classes.labelRange}>Price Range</p>
      </div>
      <SliderProton value={selectedPrice} changePrice={changePrice} />
    </div>}
    <div className={classes.inputGroup}>
      <p className={classes.labelRange}>Star Rating</p>
      <FilterListToggle
        options={ratingList}
        value={selectedRating}
        selectToggle={selectRating}
      />
    </div>
  </div>
);

export default FilterPanel;
