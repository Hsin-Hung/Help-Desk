import { ModalState } from "@/data/modal";

export default function Modal({
  modal,
  setModal,
}: {
  modal: ModalState;
  setModal: React.Dispatch<React.SetStateAction<ModalState>>;
}) {
  return (
    <>
      {modal.open && (
        <div
          className={`flex items-center space-x-2 pt-2 ${
            modal.isSuccess ? "text-green-500" : "text-red-500"
          }`}
        >
          <p>{modal.message}</p>
          <button
            onClick={() => setModal((prev) => ({ ...prev, open: false }))}
            className={`${
              modal.isSuccess
                ? "bg-green-500 hover:bg-green-300"
                : "bg-red-500 hover:bg-red-300"
            } text-white font-bold py-1 px-2 text-xs rounded inline-flex items-center`}
          >
            X
          </button>
        </div>
      )}
    </>
  );
}
