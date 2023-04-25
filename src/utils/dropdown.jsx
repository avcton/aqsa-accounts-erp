import Select from "react-select"

export default function SelectDown({ value, options, setChange, placeholder, isLoading }) {
    return (<Select
        styles={{
            control: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: '#F3F4F6',
                borderRadius: '0.5rem',
                height: '53px',
                borderColor: state.isFocused ? '#6B7280' : '#D1D5DB',
                boxShadow: state.isFocused ? '0 0 0 1px gray-400' : 'none',
                '&:hover': {
                    borderColor: state.isFocused ? '#9CA3AF' : '#D1D5DB'
                }
            }),
            menu: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                marginTop: '0.5rem'
            }),
            option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: state.isSelected ? '#F3F4F6' : 'white',
                color: state.isSelected ? '#111827' : '#374151',
                '&:hover': {
                    backgroundColor: '#F3F4F6',
                    color: 'gray-900'
                }
            }),
            singleValue: (baseStyles) => ({
                ...baseStyles,
                color: 'black'
            }),
            placeholder: (baseStyles) => ({
                ...baseStyles,
                color: '#9CA3AF'
            })
        }}
        options={options}
        value={value}
        isLoading={isLoading}
        onChange={(value) => { setChange(value.value) }}
        placeholder={placeholder}
    />)
}