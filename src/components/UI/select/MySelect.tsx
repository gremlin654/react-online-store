import React from 'react'

interface IMySelect {
  className: string
  options: [
    {
      value: string
      name: string
    },
    {
      value: string
      name: string
    },
    {
      value: string
      name: string
    },
    {
      value: string
      name: string
    },
    {
      value: string
      name: string
    },
  ]
  defaultValue: string | number
  value: string
  onChange: (sort: string) => void
}

export const MySelect: React.FC<IMySelect> = ({
  className,
  options,
  defaultValue,
  value,
  onChange,
}) => {
  return (
    <select className={className} value={value} onChange={(event) => onChange(event.target.value)}>
      <option value='model'>{defaultValue}</option>
      {options.map((option) => (
        <option key={option.name} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  )
}
