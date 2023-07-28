interface Props {
    showError: boolean;
    errorMsg: string;
}

const ErrorHandler = ({ showError, errorMsg }: Props) => {
    return (
        <>
            {
                showError &&
                <div className="text-white text-center  font-bold p-3 mb-3 rounded-md bg-red-600">
                    <p>{errorMsg}</p>
                </div>
            }

        </>

    )
}

export default ErrorHandler
