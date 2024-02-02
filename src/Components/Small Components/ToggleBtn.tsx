function ToggleBtn({
    onShow,
    onClick,
}: {
    onShow: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={() => onClick()}
            className=" absolute right-3 top-3 bg-slate-900 h-6 w-6 leading-4 flex justify-center items-center rounded-full"
        >
            {onShow ? "-" : "+"}
        </button>
    );
}

export default ToggleBtn;
