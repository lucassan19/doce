  // Carrinho (inicialmente vazio)
  let carrinho = [];

  // Função para adicionar itens ao carrinho
  function adicionarAoCarrinho(nome, preco) {
    // Verifica se o item já está no carrinho
    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
      // Atualiza a quantidade e subtotal se o item já estiver no carrinho
      itemExistente.quantidade += 1;
      itemExistente.subtotal = itemExistente.quantidade * preco;
    } else {
      // Adiciona um novo item ao carrinho
      carrinho.push({
        nome: nome,
        preco: preco,
        quantidade: 1,
        subtotal: preco
      });
    }

    // Salvar no localStorage para persistência
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(`Adicionado: ${nome}`);
  }

  // Função para exibir o carrinho (navegação)
  function exibirCarrinho() {
    // Recupera itens do carrinho no localStorage
    const itensCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    // Verifica se o carrinho está vazio
    if (itensCarrinho.length === 0) {
      alert('O carrinho está vazio!');
      return;
    }

    // Gera uma string para exibir os itens
    let detalhesCarrinho = 'Itens no carrinho:\n';
    itensCarrinho.forEach(item => {
      detalhesCarrinho += `${item.nome} - Qtd: ${item.quantidade} - Subtotal: R$${item.subtotal.toFixed(2)}\n`;
    });

    alert(detalhesCarrinho);
  }

  // Função para gerar mensagem do pedido no WhatsApp
  // Função para gerar mensagem do pedido no WhatsApp
  function redirecionarWhatsApp() {
    // Recupera itens do carrinho no localStorage
    const itensCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    // Verifica se o carrinho está vazio
    if (itensCarrinho.length === 0) {
      alert('O carrinho está vazio!');
      return;
    }

    // Gera a mensagem com os itens do carrinho
    let mensagem = 'Olá, gostaria de fazer um pedido:\n\n';
    itensCarrinho.forEach(item => {
      mensagem += `*${item.nome}* - Qtd: ${item.quantidade} - Subtotal: R$${item.subtotal.toFixed(2)}\n`;
    });

    // Calcula o total geral
    const total = itensCarrinho.reduce((acc, item) => acc + item.subtotal, 0);
    mensagem += `\n*Total: R$${total.toFixed(2)}*\n`;

    // Coleta dados do pedido (nome do cliente, itens e total)
    const dadosPedido = {
      nome_cliente: prompt('Por favor, insira seu nome:'), // Solicitar o nome do cliente
      itens: itensCarrinho,
      total: total
    };

    // Envia dados para o backend via fetch
    fetch('pedido.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosPedido)
    })
      .then(response => response.json())
      .then(data => {
        if (data.sucesso) {
          alert('Pedido salvo com sucesso no sistema.');
        } else if (data.erro) {
          alert('Erro ao salvar o pedido: ' + data.erro);
        }
      });

    // Número do WhatsApp (substitua pelo número correto)
    const numeroWhatsApp = '5517997530850'; // Substitua pelo número real
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    // Redireciona para o WhatsApp
    window.open(urlWhatsApp, '_blank');

  }

  // Aguarda o carregamento completo da página para adicionar eventos
  window.onload = function() {
    // Adiciona evento aos botões de adicionar
    document.querySelectorAll('.adicionar').forEach((botao, index) => {
      botao.addEventListener('click', () => {
        // Obtem o nome e preço baseado na posição do botão
        const produtoElement = botao.parentElement;
        const nomeProduto = produtoElement.querySelector('p').textContent.split(' - ')[0];
        const precoProduto = parseFloat(produtoElement.querySelector('p').textContent.split('R$')[1].replace(',', '.'));

        adicionarAoCarrinho(nomeProduto, precoProduto);
      });
    });

    // Adiciona evento ao botão "carrinho" no rodapé
    document.querySelector('.navegacao .icone:nth-child(2)').addEventListener('click', () => {
      exibirCarrinho();
    });

    // Adiciona evento ao botão "Finalizar Pedido no WhatsApp"
    const botaoWhatsApp = document.getElementById('finalizarPedido');
    if (botaoWhatsApp) {
      botaoWhatsApp.addEventListener('click', redirecionarWhatsApp);
    }
  };
