export default function Modal({ text, showModal, setShowModal, handleDelete }) {
    return (
        showModal && (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center text-white bg-gray-900 bg-opacity-50">
                <div className="flex flex-col max-w-md p-8 rounded bg-background">
                    <h2 className="m-10 text-xl text-center">{text}</h2>
                    <button className="p-2 bg-highlight hover:bg-sky-600" onClick={() => setShowModal(!showModal)}>
                        Cancel
                    </button>
                    <button className="p-2 mt-5 bg-red-400 hover:bg-red-900" onClick={handleDelete}>
                        Remove
                    </button>
                </div>
            </div>
        )
    )
}
