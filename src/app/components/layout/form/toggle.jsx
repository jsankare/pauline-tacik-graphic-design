export default function Toggle({ name, description, onChange, checked }) {
    return (
        <div className="w-full relative flex justify-between items-center gap-4">
            <div className="flex flex-col gap-2">
                <p>{name}</p>
                <small className="text-sm text-gray-500">{description}</small>
            </div>

            <div className="relative">
                <input
                    type="checkbox"
                    id={name}
                    checked={checked}
                    onChange={onChange}
                    className="hidden peer"
                />

                {/* Label = toggle wrapper */}
                <label
                    htmlFor={name}
                    className="w-20 h-8 bg-red-600 rounded-full shadow-md cursor-pointer flex items-center relative overflow-hidden transition-colors duration-300 peer-checked:bg-green-600"
                >
                    {/* Contenu Off/On */}
                    <div className="flex w-40 font-medium transition-transform duration-300 transform translate-x-[10%] peer-checked:translate-x-[-60%]">
                        <div className="w-20 text-center text-white select-none pointer-events-none">
                            Off
                        </div>
                        <div className="w-20 text-center text-white select-none pointer-events-none">
                            On
                        </div>
                    </div>

                    {/* Slider rond */}
                    <div className="w-8 h-8 rounded-full bg-purple-500 shadow-md absolute transition-transform duration-300 peer-checked:translate-x-12"></div>
                </label>
            </div>
        </div>
    );
}
