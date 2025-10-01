# 🚀 Configuração do GitHub Pages

Este guia explica como configurar o GitHub Pages para exibir sua aplicação React em vez do README.

## ✅ Configurações Realizadas

### 1. **Package.json do Cliente Atualizado**
- ✅ Adicionado `homepage` com URL do GitHub Pages
- ✅ Adicionado script `deploy` com gh-pages
- ✅ Adicionado dependência `gh-pages`

### 2. **GitHub Actions Configurado**
- ✅ Criado `.github/workflows/deploy.yml`
- ✅ Deploy automático na branch `main`
- ✅ Build e deploy do React app

### 3. **Arquivos de Suporte**
- ✅ Criado `index.html` na raiz com redirecionamento
- ✅ Criado `.nojekyll` para evitar processamento Jekyll

## 🛠️ Como Fazer o Deploy

### **Opção 1: Deploy Automático (Recomendado)**
1. Faça commit e push das alterações:
   ```bash
   git add .
   git commit -m "Configurar GitHub Pages"
   git push origin main
   ```

2. O GitHub Actions fará o deploy automaticamente

### **Opção 2: Deploy Manual**
1. Instale as dependências:
   ```bash
   cd client
   npm install
   ```

2. Execute o deploy:
   ```bash
   npm run deploy
   ```

## ⚙️ Configuração no GitHub

### **1. Ativar GitHub Pages**
1. Vá para **Settings** do repositório
2. Role até **Pages** no menu lateral
3. Em **Source**, selecione **GitHub Actions**
4. Aguarde o workflow ser executado

### **2. Verificar Deploy**
- Acesse: `https://seu-usuario.github.io/lista-de-compras`
- A aplicação React deve carregar normalmente

## 🔧 Solução de Problemas

### **Se ainda mostrar o README:**
1. Verifique se o GitHub Actions foi executado
2. Confirme se a branch `gh-pages` foi criada
3. Verifique se o GitHub Pages está configurado para usar **GitHub Actions**

### **Se a aplicação não carregar:**
1. Verifique se o build foi executado sem erros
2. Confirme se todos os arquivos estão na branch `gh-pages`
3. Verifique o console do navegador para erros

### **Se houver erro de CORS:**
- A aplicação React está configurada para funcionar com backend local
- Para produção, você precisará configurar um backend na nuvem

## 📝 Próximos Passos

1. **Configurar Backend na Nuvem** (opcional):
   - Heroku, Vercel, Railway, etc.
   - Atualizar URL da API no frontend

2. **Personalizar Domínio** (opcional):
   - Configurar domínio customizado no GitHub Pages

3. **Monitorar Deploys**:
   - Acompanhar logs do GitHub Actions
   - Verificar status dos deploys

## 🎯 Resultado Esperado

Após a configuração, ao acessar `https://seu-usuario.github.io/lista-de-compras`:
- ✅ A aplicação React carrega normalmente
- ✅ Interface responsiva e funcional
- ✅ Não mostra mais o README como página principal

---

**Nota**: O backend (Express + MongoDB) precisa estar rodando separadamente para funcionalidade completa. Para uma solução completa, considere hospedar o backend na nuvem também.
