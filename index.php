<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bolos da Bia</title>
  <link rel="stylesheet" href="est.css">
</head>
<body>

  <!-- Cabeçalho -->
  <header class="header">
    <h1 class="titulo">Bolos da Bia</h1>
    <img class="logo-destaque" src="doces.png" alt="Logo Bolos da Bia">
  </header>

  <!-- Conteúdo Principal -->
  <main class="conteudo">
    <!-- Seção de descrição -->
    <section class="descricao">
      <h2>Doces</h2>
      <p>Doces saborosos para alegrar seu dia!</p>
    </section>

    <!-- Cardápio -->
    <section class="cardapio">
      <h2>Cardápio</h2>
      <div class="produtos">
        <!-- Produto 1 -->
        <div class="produto">
          <img src="chocolate.jpg" alt="Bolo de chocolate">
          <p>Bolo de Chocolate - R$10,00</p>
          <button class="adicionar">+</button>
        </div>
        <!-- Produto 2 -->
        <div class="produto">
          <img src="ninho.jpg" alt="Bolo de Leite Ninho">
          <p>Bolo de Leite Ninho - R$10,00</p>
          <button class="adicionar">+</button>
        </div>
        <!-- Produto 3 -->
        <div class="produto">
          <img src="cenoura.jpg" alt="Bolo de Cenoura">
          <p>Bolo de Cenoura - R$10,00</p>
          <button class="adicionar">+</button>
        </div>
        <!-- Produto 4 -->
        <div class="produto">
          <img src="abacaxi.jpg" alt="Bolo de Abacaxi">
          <p>Bolo de Abacaxi - R$10,00</p>
          <button class="adicionar">+</button>
        </div>
      </div>
    </section>
  </main>

  <!-- Rodapé -->
  <footer class="navegacao">
    <button class="icone" onclick="window.location.reload();">
      <img src="home.jpg" alt="home">
    </button>
    <button class="icone" onclick="exibirCarrinho();">
      <img src="carrinho.jpg" alt="carrinho">
    </button>
    <button id="finalizarPedido" class="icone">
    <img src="checkout.jpg" alt="Finalizar pedido no WhatsApp">
  </button>
  </footer>


  <!-- Importando o JavaScript -->
  <script src="carrinho.js"></script>
  <div id="carrinhoContainer">
</div>
</body>
</html>
