'use client'

import { useField } from 'formik'
export type SelectProps = {
  id?: string
  label: string
  name: string
}

const Select: React.FunctionComponent<SelectProps> = ({
  label,
  ...props
}: SelectProps) => {
  const [field, meta] = useField(props)
  return (
    <div className="my-8">
      <label htmlFor={props.id || props.name}>{label}</label>
      <select
        {...field}
        {...props}
        className="my-2 text-gray-500 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
      />
      {meta.touched && meta.error ? (
        <div className="error">
          <p
            id={`error-${props.id || props.name}`}
            className="mt-2 text-red-500 text-xs italic"
          >
            {meta.error}
          </p>
        </div>
      ) : null}
    </div>
  )
}

export default Select
