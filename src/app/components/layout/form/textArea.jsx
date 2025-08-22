const TextAreaInput = ({ placeholder, value, onChange, disabled, label, name, required = true }) => {
    return (
        <div className="flex flex-col h-max w-full items-start justify-start relative gap-2">
            {label && (
                <label className="min-w-fit self-start text-sm font-medium text-primary" htmlFor={name}>
                    {label}{required && " *"}
                </label>
            )}
            <textarea
                className="border-none rounded-sm p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-secondary/30 resize-none"
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
                rows={5}
            />
        </div>
    )
}

export default TextAreaInput;