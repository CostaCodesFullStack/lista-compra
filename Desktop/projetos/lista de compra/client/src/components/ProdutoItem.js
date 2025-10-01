import React, { useState } from 'react';
import { ListGroupItem, Form, Button, Badge } from 'react-bootstrap';
import ModalConfirmacao from './ModalConfirmacao';

const ProdutoItem = ({ produto, onMarcarComprado, onRemover }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCheckboxChange = (e) => {
    onMarcarComprado(produto._id, e.target.checked);
  };

  const handleRemover = () => {
    setShowModal(true);
  };

  const handleConfirmarRemocao = () => {
    onRemover(produto._id);
    setShowModal(false);
  };

  const handleCancelarRemocao = () => {
    setShowModal(false);
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <ListGroupItem 
      className={`produto-item d-flex justify-content-between align-items-center ${
        produto.comprado ? 'produto-comprado' : ''
      }`}
    >
      <div className="d-flex align-items-center flex-grow-1">
        <Form.Check
          type="checkbox"
          checked={produto.comprado}
          onChange={handleCheckboxChange}
          className="me-3"
          aria-label={`Marcar ${produto.nome} como comprado`}
        />
        
        <div className="flex-grow-1">
          <div className="d-flex align-items-center">
            <span className="fw-bold me-2">{produto.nome}</span>
            {produto.quantidade > 1 && (
              <Badge bg="info" className="me-2">
                {produto.quantidade}x
              </Badge>
            )}
          </div>
          
          <small className="text-muted">
            Adicionado em {formatarData(produto.dataCriacao)}
          </small>
        </div>
      </div>
      
      <Button
        variant="outline-danger"
        size="sm"
        onClick={handleRemover}
        className="btn-remover ms-2"
        aria-label={`Remover ${produto.nome} da lista`}
      >
        🗑️
      </Button>
      
      <ModalConfirmacao
        show={showModal}
        onHide={handleCancelarRemocao}
        onConfirm={handleConfirmarRemocao}
        titulo="Confirmar Remoção"
        mensagem="Tem certeza que deseja remover este produto da lista? Esta ação não pode ser desfeita."
        produtoNome={produto.nome}
        variant="danger"
        confirmText="Sim, Remover"
        cancelText="Cancelar"
      />
    </ListGroupItem>
  );
};

export default ProdutoItem;
