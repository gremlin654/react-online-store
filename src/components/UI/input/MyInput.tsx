import React, { ChangeEventHandler } from 'react'
interface IMyInput {
  className: string
  placeholder: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const MyInput: React.FC<IMyInput> = ({ className, placeholder, value, onChange }) => {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={className}
      autoFocus={true}
    />
  )
}
