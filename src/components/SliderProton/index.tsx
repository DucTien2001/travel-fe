import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import className from "./styles.module.scss";
import clsx from "clsx";
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  thumb: {
    color: 'var(--violet-color) !important',
  },
  rail: {
    color: `var(--violet-color) !important`,
  },
  track: {
    color: 'var(--violet-color) !important',
  },
});

const SliderProton = ({ value, changePrice }) => {
  const classes = useStyles();

  return (
    <div className={clsx(className.main, classes.root)}>
      <Slider
        value={value}
        onChange={changePrice}
        valueLabelDisplay='on'
        min={10000}
        max={3000000}
        classes={{
          thumb: classes.thumb,
          rail: classes.rail,
          track: classes.track,
        }}
      />
    </div>
  );
};

export default SliderProton;
