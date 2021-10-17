import './CustomCreatableSelect.css'
import React from 'react'
import CreatableSelect from 'react-select/creatable'

const CustomCreatableSelect = ({ onChange, options, value, className, placeholder, isMulti }) => {

  return (
    <div className={className}>
      <CreatableSelect
        options={options}
        value={value}
        onChange={value => onChange(value)}
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

export default CustomCreatableSelect