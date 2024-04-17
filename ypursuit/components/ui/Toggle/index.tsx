interface IToggle {
    checked: boolean;
    onClick: any;
}

function Toggle({ checked = false, onClick }: IToggle) {
    return (
        <div
            onClick={onClick}
            className={
                `w-14 h-7 flex items-center rounded-full px-1 cursor-pointer ${checked ? "bg-greenPrimary" : "bg-grayPrimary"}`
            }
        >
            <div
                className={
                    `bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${checked ? "translate-x-7" : ""}`
                }
            />
        </div>
    );
}

export default Toggle;
