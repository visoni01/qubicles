import React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const defaultColor = '#ffffff'

const ActivityDetail = ({ title, data }) => (
  <div className={'feed-channels'}>
    <div className={'activity-root'}>
      <div className={'custom-header'}>
        {title} 
      </div>
      <div>
        <FormControl>
          <InputLabel id='filter'>Filter</InputLabel>
          <Select 
            labelId='filter' 
            displayEmpty 
            inputProps={{ 'aria-label': 'Without label' }}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>  
    </div>  
    {
      data.map(({ color, text }, index) => {
        return (
          <div 
            key={`${index}${title}`} 
            className={'activity-circle'} 
            style={{ background: color || defaultColor }}>
            <div>text</div>
          </div>
        )
      })
    }
  </div>
)

export default ActivityDetail