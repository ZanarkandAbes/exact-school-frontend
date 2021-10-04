import './CustomSelect.css'
import React from 'react'
import Select from 'react-select'

const CustomSelect = ({ onChange, options, value, className, placeholder, isMulti }) => {

  const defaultValue = (options, value) => {
    return options ? options.find(option => option.value === value) : ''
  }

  return (
    <div className={className}>
      <Select
        value={defaultValue(options, value)}
        onChange={value => onChange(value)}
        options={options}
        placeholder={placeholder}
        isMulti={isMulti}
      />
    </div>
  )

}

export default CustomSelect