import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalConfirmacao = ({ 
  show, 
  onHide, 
  onConfirm, 
  titulo, 
  mensagem, 
  produtoNome,
  variant = 'danger',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar'
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center">
          <span className="me-2">⚠️</span>
          {titulo}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <p className="mb-0">
          {mensagem}
        </p>
        {produtoNome && (
          <div className="mt-3 p-3 bg-light rounded">
            <strong>Produto:</strong> {produtoNome}
          </div>
        )}
      </Modal.Body>
      
      <Modal.Footer>
        <Button 
          variant="outline-secondary" 
          onClick={onHide}
          className="me-2"
        >
          {cancelText}
        </Button>
        <Button 
          variant={variant} 
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmacao;
