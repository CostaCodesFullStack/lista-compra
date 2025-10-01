import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'react-bootstrap';
import FormularioProduto from './components/FormularioProduto';
import ListaProdutos from './components/ListaProdutos';
import axios from 'axios';
import './App.css';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar produtos da API
  const buscarProdutos = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/produtos');
      setProdutos(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar produtos. Verifique se o servidor está rodando.');
      console.error('Erro ao buscar produtos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Adicionar novo produto
  const adicionarProduto = async (novoProduto) => {
    try {
      const response = await axios.post('/api/produtos', novoProduto);
      setProdutos([response.data, ...produtos]);
      setError(null);
    } catch (err) {
      setError('Erro ao adicionar produto.');
      console.error('Erro ao adicionar produto:', err);
    }
  };

  // Marcar produto como comprado
  const marcarComprado = async (id, comprado) => {
    try {
      const response = await axios.put(`/api/produtos/${id}`, { comprado });
      setProdutos(produtos.map(produto => 
        produto._id === id ? response.data : produto
      ));
      setError(null);
    } catch (err) {
      setError('Erro ao atualizar produto.');
      console.error('Erro ao marcar produto:', err);
    }
  };

  // Remover produto
  const removerProduto = async (id) => {
    try {
      await axios.delete(`/api/produtos/${id}`);
      setProdutos(produtos.filter(produto => produto._id !== id));
      setError(null);
    } catch (err) {
      setError('Erro ao remover produto.');
      console.error('Erro ao remover produto:', err);
    }
  };

  // Carregar produtos ao montar o componente
  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <div className="lista-compras">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="mb-4">
              <CardHeader>
                <h1 className="text-center mb-0">
                  🛒 Lista de Compras
                </h1>
              </CardHeader>
              <CardBody>
                <FormularioProduto onAdicionar={adicionarProduto} />
                
                {error && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {error}
                  </div>
                )}
                
                <ListaProdutos
                  produtos={produtos}
                  loading={loading}
                  onMarcarComprado={marcarComprado}
                  onRemover={removerProduto}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
