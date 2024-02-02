function Main({ children }) {
    return (
        <div className="flex md:h-full justify-center flex-col md:flex-row gap-4 flex-wrap">
            {children}
        </div>
    );
}

export default Main;
