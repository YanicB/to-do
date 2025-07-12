const ConfirmModal = ({ openModal, message, onConfirm }) => {
    return (
        <div className="w-screen h-screen bg-black/40 fixed flex justify-center items-start inset-0 pt-10">
            <div className="bg-white w-90 h-50 p-8 rounded-2xl shadow-lg flex flex-col items-between justify-between">
                <p className="text-xl font-semibold text-center">{message}</p>
                <div className="flex justify-around">
                    <button onClick={() => {
                        openModal(false)
                    }}
                        className="px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-100"
                    >
                        Cancel

                    </button>
                    <button onClick={() => {
                        onConfirm()
                    }} className="px-6 py-2 border border-blue-300 rounded-xl hover:bg-blue-100"> Yes </button>
                </div>
            </div>
        </div >
    )
}

export default ConfirmModal
