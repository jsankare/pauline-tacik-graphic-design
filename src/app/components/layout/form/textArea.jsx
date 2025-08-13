const TextAreaInput = ({ placeholder, value, onChange, disabled, label, name, required = true }) => {
    return (
        <div className="flex flex-col h-max w-full items-start justify-start relative">
            {label && (
                <label className="min-w-fit self-start" htmlFor={name}>
                    {label}{required && " *"}
                </label>
            )}
            <textarea
                className="border border-gray-300 rounded-md p-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
            />
        </div>
    )
}

export default TextAreaInput;