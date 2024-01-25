import React, {type ChangeEventHandler, type InputHTMLAttributes} from 'react'
import TextField from '@mui/material/TextField'

export interface InputFieldProps
  extends Readonly<InputHTMLAttributes<HTMLInputElement>> {
  readonly label: string
  readonly type: string
  readonly onChange?: ChangeEventHandler<HTMLInputElement>
  readonly onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  readonly error?: boolean
  readonly helperText?: any
  readonly size?: any
  readonly fullWidth?: any
  readonly multiline?: any
  readonly maxRows?: any
  readonly className?: any
  readonly ref?: any
}
function InputTextField({
  label,
  name,
  type,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  size,
  fullWidth,
  multiline,
  maxRows,
  className,
  ref,
}: InputFieldProps): React.JSX.Element {
  return (
    <TextField
      ref={ref}
      className={className}
      id={name}
      name={name}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      size={size}
      fullWidth={fullWidth}
      multiline={multiline}
      maxRows={maxRows}
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
