# Calculadora de IMC Avançada

Uma calculadora de IMC (Índice de Massa Corporal) moderna, interativa e completa, desenvolvida com HTML5, CSS3 e JavaScript puro.

## 🚀 Funcionalidades

### Funcionalidades Principais
- **Cálculo de IMC** - Suporte para peso (kg/lb) e altura (m/ft)
- **Classificação detalhada** - 6 categorias de IMC com cores visuais
- **Indicador visual** - Barra de progresso mostrando posição na escala
- **Histórico de medições** - Salva e exibe medições anteriores
- **Gráfico de evolução** - Visualização temporal do IMC

### Recursos Avançados
- **Peso ideal** - Calcula faixa de peso saudável
- **Meta de peso** - Define e acompanha progresso
- **Dicas de saúde** - Recomendações personalizadas
- **Tema escuro/claro** - Alternância de temas
- **Unidades de medida** - Métrico (kg/m) e Imperial (lb/ft)
- **Animações suaves** - Transições e efeitos visuais
- **Exportação CSV** - Baixe seu histórico completo
- **Compartilhamento** - Compartilhe resultados via Web Share API
- **Lembretes** - Notificações personalizáveis para medições
- **Modo offline** - Funciona sem conexão com internet

### Design
- Interface moderna e responsiva
- Cores indicativas para diferentes faixas de IMC
- Layout limpo e intuitivo
- Compatível com mobile e desktop
- Ícones Font Awesome

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna com CSS Grid e Flexbox
- **JavaScript ES6+** - Lógica da aplicação
- **Chart.js** - Gráficos interativos
- **Font Awesome** - Ícones
- **Local Storage** - Persistência de dados

## 📱 Como Usar

1. **Abrir a aplicação** - Abra o arquivo `index.html` em qualquer navegador moderno
2. **Selecionar unidade** - Escolha entre sistema métrico ou imperial
3. **Inserir dados** - Digite peso e altura
4. **Calcular IMC** - Clique no botão "Calcular IMC"
5. **Visualizar resultado** - Veja o IMC, classificação e dicas
6. **Acompanhar histórico** - Visualize medições anteriores no gráfico

## 🎨 Características Visuais

### Cores do IMC
- **Azul** - Abaixo do peso (< 18.5)
- **Verde** - Peso normal (18.5 - 24.9)
- **Amarelo** - Sobrepeso (25 - 29.9)
- **Laranja** - Obesidade Grau I (30 - 34.9)
- **Vermelho** - Obesidade Grau II (35 - 39.9)
- **Vermelho escuro** - Obesidade Grau III (≥ 40)

### Temas
- **Claro** - Fundo branco com texto escuro
- **Escuro** - Fundo escuro com texto claro

## 💾 Armazenamento

A aplicação utiliza o Local Storage do navegador para:
- Histórico de medições
- Meta de peso definida
- Preferência de tema
- Unidade de medida selecionada

## 📊 Funcionalidades do Histórico

- **Lista de medições** - Data, peso, altura e IMC
- **Gráfico de evolução** - Linha temporal do IMC
- **Limpeza de dados** - Opção para limpar histórico
- **Persistência** - Dados salvos automaticamente

## 📊 Novas Funcionalidades Avançadas

### 📥 Exportação de Dados
- **Download CSV** - Exporte todo seu histórico para análise externa
- **Dados completos** - Inclui data, peso, altura, IMC, categoria e unidade
- **Nome automático** - Arquivo nomeado com data atual

### 📤 Compartilhamento
- **Web Share API** - Compartilhe nativamente em dispositivos compatíveis
- **Cópia para área de transferência** - Fallback para todos os navegadores
- **Modal personalizado** - Interface para copiar texto de compartilhamento

### 🔔 Sistema de Lembretes
- **Frequência personalizável** - Diário, semanal ou mensal
- **Horário configurável** - Escolha o melhor momento para medir
- **Notificações nativas** - Lembretes via sistema operacional
- **Persistência** - Configurações salvas automaticamente

### 🌐 Modo Offline
- **Service Worker** - Cache inteligente de recursos
- **Funcionamento completo** - Todas as funcionalidades offline
- **Sincronização automática** - Dados sincronizados quando online
- **PWA instalável** - Instale como app nativo

### 🏥 Integração com APIs de Saúde
- **Busca nutricional** - Informações detalhadas de alimentos
- **Receitas saudáveis** - Sugestões baseadas no seu IMC
- **Exercícios personalizados** - Por tipo e intensidade
- **Calculadora de calorias** - Necessidades calóricas diárias
- **Distribuição de macros** - Proteína, carboidratos e gorduras
- **Dicas personalizadas** - Baseadas no seu perfil de saúde

## 🔧 Personalização

### Adicionar novas funcionalidades
1. Edite o arquivo `script.js`
2. Adicione métodos na classe `IMCCalculator`
3. Atualize o HTML se necessário
4. Estilize com CSS

### Modificar cores
1. Edite as variáveis CSS em `:root` no arquivo `styles.css`
2. Ajuste as cores do tema escuro em `[data-theme="dark"]`

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- **Desktop** - Layout completo com grid
- **Tablet** - Adaptação de colunas
- **Mobile** - Layout em coluna única

## 🚀 Instalação como PWA

A aplicação pode ser instalada como Progressive Web App (PWA):
1. Abra no navegador
2. Clique no ícone de instalação na barra de endereços
3. Confirme a instalação

## 📄 Estrutura de Arquivos

```
├── index.html          # Estrutura principal
├── styles.css          # Estilos e temas
├── script.js           # Lógica da aplicação
├── manifest.json       # Manifesto PWA
└── README.md          # Este arquivo
```

## 🎯 Funcionalidades Avançadas Implementadas

- [x] **Exportar dados para CSV** - Baixe seu histórico completo
- [x] **Compartilhamento de resultados** - Compartilhe via Web Share API ou cópia
- [x] **Notificações de lembretes** - Lembretes personalizáveis (diário/semanal/mensal)
- [x] **Modo offline completo** - Service Worker para funcionamento offline
- [x] **Integração com APIs de saúde** - Busca nutricional, receitas e exercícios

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir funcionalidades
- Enviar pull requests
- Melhorar a documentação

---

**Desenvolvido com ❤️ para promover saúde e bem-estar**
