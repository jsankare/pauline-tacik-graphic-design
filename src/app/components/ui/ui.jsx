export const H1 = ({
                    title,
                    color = "text-black",
                    align = "text-center",
                    italic = false,
                    bold = true,
                    size = "text-5xl",
                    noMt = false,
                }) => {
    return (
        <h1
            className={`
        ${noMt ? "mt-0" : "mt-10"}
        ${color}
        ${align}
        ${italic ? "italic" : ""}
        ${bold ? "font-bold" : "font-normal"}
        ${size}
        `}
            style={{fontFamily: 'var(--font-aracau)'}}
        >
            {title}
        </h1>
    );
};

export const H2 = ({
                    title,
                    color = "text-black",
                    align = "text-center",
                    italic = false,
                    bold = true,
                    size = "text-3xl",
                }) => {
    return (
        <h2
            className={`
        mt-8
        ${color}
        ${align}
        ${italic ? "italic" : ""}
        ${bold ? "font-bold" : "font-normal"}
        ${size}
        `}
            style={{fontFamily: 'var(--font-aracau)'}}
        >
            {title}
        </h2>
    );
};

export const MainTitle = ({
                       title,
                       color = "text-black",
                       align = "text-left",
                       italic = false,
                       bold = true,
                       size = "text-xl",
                   }) => {
    return (
        <h3
            className={`
        font-thin
        mt-5
        ${color}
        ${align}
        ${italic ? "italic" : ""}
        ${bold ? "font-bold" : "font-normal"}
        ${size}
        `}
            // style={{fontFamily: 'var(--font-aracau)'}}
        >
            {title}
        </h3>
    );
};

export const H3 = ({
                title,
                color = "text-black",
                align = "text-left",
                italic = false,
                bold = true,
                size = "text-xl",
                    }) => {
    return (
        <h3
            className={`
        mt-5
        ${color}
        ${align}
        ${italic ? "italic" : ""}
        ${bold ? "font-bold" : "font-normal"}
        ${size}
        `}
            // style={{fontFamily: 'var(--font-aracau)'}}
        >
            {title}
        </h3>
    );
};


export const Button = ({ text, onClick, disabled = false, danger = false, admin = false }) => {
    return (
        <button
            className={`w-full min-w-fit transition-all duration-200 hover:scale-105 hover:cursor-pointer px-6 py-3 
            font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 font-omnes-semicond
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