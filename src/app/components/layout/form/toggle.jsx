export default function Toggle({ name, description, onChange, checked, onLabel = "On", offLabel = "Off" }) {
    return (
        <div className="w-full relative flex flex-col justify-between items-start gap-4">
            <div className="flex flex-col gap-2 w-full">
                <p className="block text-sm font-medium text-gray-700 mb-1">{name}</p>
                <small className="block text-sm font-medium text-gray-700 mb-1">{description}</small>
            </div>

            <div className="flex justify-between items-center gap-3 w-full md:w-1/4">
                {/* Label externe */}
                <span className="text-sm font-medium text-gray-700">
                    {checked ? onLabel : offLabel}
                </span>

                {/* Toggle horizontal */}
                <div className="relative">
                    <input
                        type="checkbox"
                        id={name}
                        checked={checked}
                        onChange={(e) => onChange(e.target.checked)}
                        className="hidden peer"
                    />

                    {/* Label = toggle wrapper */}
                    <label
                        htmlFor={name}
                        className={`w-20 h-8 rounded-full shadow-md cursor-pointer flex items-center relative overflow-hidden transition-all duration-300 ${
                            checked ? 'bg-primary' : 'bg-secondary'
                        }`}
                    >
                        {/* Slider rond */}
                        <div className={`w-8 h-8 rounded-full bg-black shadow-md absolute transition-all duration-300 ${
                            checked ? 'left-12' : 'left-0'
                        }`}></div>
                    </label>
                </div>
            </div>
        </div>
    );
}
