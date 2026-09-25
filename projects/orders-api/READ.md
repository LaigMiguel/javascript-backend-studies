api de pedidos

A loja possui clientes e produtos

Um cliente pode fazer um pedido que contenha um ou mais produtos

- A mesma pessoa pode fazer vários pedidos

Então serão 4 tabelas diferentes:

- Cliente
- Produto
- Pedido
- Movimentação de estoque (Eu só adicionei essa para o caso de esta api lidar com uma loja de roupas por exemplo, se for uma cozinha, essa tabela pode ser retirada inicialmente)

cliente:

- id
- nome

Produto:

- id
- nome
- quantidade
- preço

pedido:
-id

- cliente_id
- produto_id
- quantidade
- preco (esses três últimos podem ser unidos com um reduce no caso de ter mais de um produto dentro do pedido)
- status (pending, confirmed, cancelled)

produtos do pedido:

- pedido_id
- produto_id
- quantidade
- produto_preço

movimentação de estoque: (eu acho que essa tabela seja necessária, porque independe do tipo de loja, o estoque tem que ser reposto de alguma forma, então só pedidos não é o suficiente, precisa haver uma movimentação de entrada também, ou saúda por qualquer outro motivo n que seja)

- id
- id produto
- quantity
- type(entry, exit)
- created_at

REGRAS PRINCIPAIS
Pediddos só podem ser feitos por um cliente que exista
Só podem ser feitos pedidos de produtos que existem
A quantidade do produto no pedido deve ser um inteiro positivo
Um pedido começa com status pending
Um pedido pending pode ser cancelado
Um pedido confirmed não pode ser cancelado
Um pedido cancelled não pode ser confirmado
Ao confirmar um pedido o estoque dos produtos precisa ser reduzido de acordo com as quantidades do pedido
Não pode confirmar um pedido se o estoque for insuficiente para aquele produto
Se a confirmação envolveer múltiplos produtos, ou todos os estoques são atualizados e o pedido é confirmado, ou nada é alterado

Relacionamento entre tabelas:
pedido se relaciona com cliente e produtos
movimentação de estoque se relaciona com produto
clientes e produtos são um pouco mais independentes (no sentido de que outras tabelas dependem deles mas eles não dependem de outras, com exceção de um dado da tabela produtos)
Produto é relativamente dependende de movimentação de estoque porque um dos dados da tabela pode ser alterado usando movimentação de estoque

Principais dificuldades na construç~çao da api (provavelmente):
CONDIÇÔES:

- principalmente na rota de update de produto

TRANSAÇÔES:

- essa parte ainda não está completamente conslidada
  - Saber quando fazer "rollback" e saber o momento correto de fazer "commit" com as sintaxes de sql corretas vão ser um desafio
