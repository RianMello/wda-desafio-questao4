import Modal from 'react-modal';
Modal.setAppElement('#root')

interface ModalProps {
    isOpen: boolean;
    onRequestClose?: () => void;
    isDeleteModal: boolean;
}

export const ModalComponent: React.FC<ModalProps> = ({isOpen, onRequestClose,children, isDeleteModal}) => {
    return(
        <Modal
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
            overlayClassName= {isDeleteModal ? 'modalDelete-overlay' : 'modal-overlay'}
            className={isDeleteModal ? 'modalDelete-content' : 'modal-content'}
        >
            {children}
        </Modal>
    )
}
