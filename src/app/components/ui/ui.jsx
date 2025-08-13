export const H1 = ({title}) => {
    return <h1 className="text-5xl font-bold text-center mt-10" >{title}</h1>
}

export const H2 = ({title}) => {
    return <h1 className="text-3xl font-bold text-center mt-8" >{title}</h1>
}

export const H3 = ({title}) => {
    return <h1 className="text-xl font-bold text-center mt-5" >{title}</h1>
}

export const Button = ({text, onClick, disabled = false}) => {
    return (
        <button
            className="bg-primary text-white w-full transition-all hover:scale-105 hover:cursor-pointer px-4 py-2 rounded-md hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    )
}