export const H1 = ({title}) => {
    return <h1 className="text-5xl font-bold text-center mt-10" >{title}</h1>
}

export const H2 = ({title}) => {
    return <h1 className="text-3xl font-bold text-center mt-8" >{title}</h1>
}

export const H3 = ({title}) => {
    return <h1 className="text-xl font-bold text-center mt-5" >{title}</h1>
}

export const Button = ({ text, onClick, disabled = false, danger = false, admin = false }) => {
    return (
        <button
            className={`w-full min-w-fit transition-all duration-200 hover:scale-105 hover:cursor-pointer px-6 py-3 
            rounded-sm font-medium text-sm disabled:bg-gray-300 disabled:cursor-not-allowed disabled:scale-100
                ${danger ? "bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl" : admin ? "bg-transparent" +
                " border border-secondary text-secondary" : 
                "bg-secondary hover:bg-secondary/90 text-white shadow-lg hover:shadow-xl"}
            `}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    )
}