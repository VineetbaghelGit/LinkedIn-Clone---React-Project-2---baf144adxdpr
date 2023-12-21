import React, {type ChangeEventHandler, type InputHTMLAttributes} from 'react'
import TextField from '@mui/material/TextField'

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  type: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void
  error: boolean
  helperText: any
}
function InputTextField({
  id,
  label,
  name,
  type,
  value,
  onChange,
  onBlur,
  error,
  helperText,
}: InputFieldProps): React.JSX.Element {
  return (
    <TextField
      id={name}
      name={name}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      sx={{
        lineHeight: '1.33333',
        fontWeight: '400',
        color: 'rgba(0,0,0,0.9)',
        borderRadius: '4px !important',
      }}
    />
  )
}

export default InputTextField
