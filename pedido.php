<?php
// Configurações do banco de dados
$dbservidor = "localhost";
$dbusuario = "root";
$dbsenha = "";
$dbbanco = "projeto";

try {
    // Conexão com o banco de dados usando PDO
    $pdo = new PDO("mysql:host=$dbservidor;dbname=$dbbanco;charset=utf8", $dbusuario, $dbsenha);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Receber os dados do pedido via POST
    $dados = json_decode(file_get_contents('php://input'), true);

    // Valida se os dados necessários foram enviados
    if (!isset($dados['nome_cliente']) || !isset($dados['itens']) || !isset($dados['total'])) {
        http_response_code(400);
        echo json_encode(['erro' => 'Dados inválidos.']);
        exit;
    }

    // Inserir o pedido no banco de dados
    $stmt = $pdo->prepare("INSERT INTO pedidos (nome_cliente, itens, total) VALUES (:nome_cliente, :itens, :total)");
    $stmt->execute([
        ':nome_cliente' => $dados['nome_cliente'],
        ':itens' => json_encode($dados['itens']), // Itens armazenados como JSON
        ':total' => $dados['total']
    ]);

    echo json_encode(['sucesso' => 'Pedido salvo com sucesso.']);

} catch (PDOException $e) {
    // Em caso de erro, retorna uma mensagem de erro
    http_response_code(500);
    echo json_encode(['erro' => 'Erro no servidor: ' . $e->getMessage()]);
}
?>
