import { memo } from 'react';
import classes from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import ErrorMessage from 'components/common/texts/ErrorMessage';

interface InputsProps {
    className?: string;
    label?: string;
    labelIcon?: React.ReactNode;
    max: number,
    min: number,
    value: number,
    onChange: (value: number) => void,
    errorMessage?: string;
}
// eslint-disable-next-line react/display-name
const InputCounter = memo((props: InputsProps) => {

  const {className, label, labelIcon, max, min, value, onChange, errorMessage} = props;

  const add = () => {
    const newValue = value + 1;
    if((max ?? null) !== null && newValue > max) return;
    onChange(newValue);
  }

  const minus = () => {
    const newValue = value - 1;
    if((min ?? null) !== null && newValue < min) return;
    onChange(newValue);
  }

  return (   
    <>
    <label className={classes.label}>{labelIcon} {label}</label>
    <div className={classes.contentNumber}>
      <button className={classes.btnAction} type="button" onClick={minus} disabled={(min ?? null) !== null ? value <= min : false}>
          <FontAwesomeIcon icon={faMinus}/>
      </button>
      <div className={classes.numberValue}>
          <input 
          value={value} 
          readOnly
          />
      </div>                       
      <button className={classes.btnAction} type="button" onClick={add} disabled={(max ?? null) !== null ? value >= max : false}>
        <FontAwesomeIcon icon={faPlus}/>
      </button>
    </div> 
    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </>                                         
  );
});
export default InputCounter;



