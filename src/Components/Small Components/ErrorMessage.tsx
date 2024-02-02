function ErrorMessage({ message }: { message: string }) {
    return (
        <div className=" py-10 text-center text-3xl font-extrabold">
            <span>🛑 </span>
            {message}
        </div>
    );
}

export default ErrorMessage;
