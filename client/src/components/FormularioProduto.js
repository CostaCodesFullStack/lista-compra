import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

const FormularioProduto = ({ onAdicionar }) => {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    if (!nome.trim()) {
      return;
    }

    setLoading(true);
    
    try {
      await onAdicionar({
        nome: nome.trim(),
        quantidade: parseInt(quantidade)
      });
      
      // Limpar formulário após sucesso
      setNome('');
      setQuantidade(1);
      setValidated(false);
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="g-3">
        <Col md={8}>
          <Form.Group controlId="nomeProduto">
            <Form.Label>Nome do Produto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex: Arroz, Feijão, Leite..."
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              disabled={loading}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, informe o nome do produto.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        
        <Col md={4}>
          <Form.Group controlId="quantidadeProduto">
            <Form.Label>Quantidade</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="99"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              disabled={loading}
            />
          </Form.Group>
        </Col>
      </Row>
      
      <div className="d-grid gap-2 mt-3">
        <Button 
          type="submit" 
          variant="primary" 
          size="lg"
          disabled={loading || !nome.trim()}
        >
          {loading ? 'Adicionando...' : '➕ Adicionar à Lista'}
        </Button>
      </div>
      
      {nome.trim() && (
        <Alert variant="info" className="mt-3">
          <strong>Prévia:</strong> {quantidade}x {nome}
        </Alert>
      )}
    </Form>
  );
};

export default FormularioProduto;
