import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles({
  root: {
    width: 350,
  },
  input: { 
    width: 42,
    fontSize: 14,
  },
})

function InputSlider(props) {

  const [value, setValue] = useState(props.default)

  const handleSliderChange = (event, newValue) => {
    setValue(newValue)
    props.rangevalue(value)
  }

  const handleInputChange = (e) => {
    setValue(e.target.value === '' ? '' : Number(e.target.value))
    props.rangevalue(value)
  }

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } 
  }
  const marks = [
    { value: 3, label: '0%'}, { value: 50, label: '50%'}, { value: 100, label: '100%'}
  ];

  return (
    <div>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs>
          <Slider
            defaultValue={props.default}
            aria-labelledby="discrete-slider-restrict"
            step={props.steps}
            min={props.min}
            max={props.max}
            valueLabelDisplay="auto"
            marks={props.marks?marks:""}
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
          /> 
        </Grid>
        <Grid item>
          <Input
            value={value} 
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: props.steps,
              min: props.min,
              max: props.max,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default InputSlider