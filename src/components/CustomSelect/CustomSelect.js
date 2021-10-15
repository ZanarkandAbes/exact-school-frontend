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
        value={isMulti ? value : defaultValue(options, value)}
        defaultValue={isMulti ? value : defaultValue(options, value)}
        onChange={value => onChange(value)}
        options={options}
        placeholder={placeholder}
        isMulti={isMulti}
        styles={{
          container: (provided) => ({
            ...provided,
            background: '#CAF0F8',
          }),
          valueContainer: (provided) => ({
            ...provided,
            background: 'transparent',
          }),
          input: (provided) => ({ ...provided, color: '#000000' }),
          singleValue: (provided) => ({ ...provided, color: '#000000' }),
          indicatorsContainer: (provided) => ({ ...provided }),
          control: (provided) => ({ ...provided, display: 'flex' }),
          indicatorSeparator: (provided) => ({ ...provided }),
          menu: (provided) => ({
            ...provided,
            background: '#CAF0F8',
          }),
          option: (provided, { isSelected }) => ({
            ...provided,
            background: isSelected ? '#48CAE4' : 'transparent',
            color: '#000000',
            ':active': {
              ...provided[':active'],
              background: '#48CAE4',
            },

          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            color: '#000000',
          }),
        }}
      />
    </div>
  )

}

export default CustomSelect