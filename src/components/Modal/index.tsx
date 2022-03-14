import { useTranslation } from "react-i18next";
import Modal from "react-modal";

import { IoMdClose } from "react-icons/io";

Modal.setAppElement("#root");

interface ModalProps {
  isOpen: boolean;
  onRequestClose?: () => void;
  isDeleteModal: boolean;
  title: string;
}

export const ModalComponent: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  children,
  isDeleteModal,
  title,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName={isDeleteModal ? "modalDelete-overlay" : "modal-overlay"}
      className={isDeleteModal ? "modalDelete-content" : "modal-content"}
    >
      <div className="contentModal">{children}</div>
    </Modal>
  );
};
