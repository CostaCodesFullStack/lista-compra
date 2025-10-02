import React from 'react';
import { ListGroup, Badge, Spinner, Alert } from 'react-bootstrap';
import ProdutoItem from './ProdutoItem';

const ListaProdutos = ({ produtos, loading, onMarcarComprado, onRemover }) => {
  if (loading) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
        <p className="mt-2 text-muted">Carregando produtos...</p>
      </div>
    );
  }

  if (produtos.length === 0) {
    return (
      <Alert variant="info" className="mt-4">
        <div className="text-center">
          <h5>📝 Sua lista está vazia!</h5>
          <p className="mb-0">
            Adicione produtos usando o formulário acima para começar sua lista de compras.
          </p>
        </div>
      </Alert>
    );
  }

  const produtosPendentes = produtos.filter(produto => !produto.comprado);
  const produtosComprados = produtos.filter(produto => produto.comprado);

  return (
    <div className="mt-4">
      {/* Produtos Pendentes */}
      {produtosPendentes.length > 0 && (
        <div className="mb-4">
          <h5 className="text-primary mb-3">
            📋 Produtos Pendentes ({produtosPendentes.length})
          </h5>
          <ListGroup>
            {produtosPendentes.map(produto => (
              <ProdutoItem
                key={produto._id}
                produto={produto}
                onMarcarComprado={onMarcarComprado}
                onRemover={onRemover}
              />
            ))}
          </ListGroup>
        </div>
      )}

      {/* Produtos Comprados */}
      {produtosComprados.length > 0 && (
        <div>
          <h5 className="text-success mb-3">
            ✅ Produtos Comprados ({produtosComprados.length})
          </h5>
          <ListGroup>
            {produtosComprados.map(produto => (
              <ProdutoItem
                key={produto._id}
                produto={produto}
                onMarcarComprado={onMarcarComprado}
                onRemover={onRemover}
              />
            ))}
          </ListGroup>
        </div>
      )}

      {/* Estatísticas */}
      <div className="mt-4 p-3 bg-light rounded">
        <div className="row text-center">
          <div className="col">
            <h6 className="text-muted">Total</h6>
            <Badge bg="secondary" className="fs-6">{produtos.length}</Badge>
          </div>
          <div className="col">
            <h6 className="text-muted">Pendentes</h6>
            <Badge bg="warning" className="fs-6">{produtosPendentes.length}</Badge>
          </div>
          <div className="col">
            <h6 className="text-muted">Comprados</h6>
            <Badge bg="success" className="fs-6">{produtosComprados.length}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaProdutos;
