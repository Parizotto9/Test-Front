## Instruções <h2>

Você deverá criar um fork deste projeto, e desenvolver em cima do seu fork. Use o README do seu repositório para nos contar como foi resolver seu teste, as decisões tomadas, como você organizou e separou seu código, e principalmente as instruções de como rodar seu projeto, afinal a primeira pessoa que irá rodar seu projeto será um programador backend de nossa equipe, e se você conseguir explicar para ele como fazer isso, você já começou bem!

Lembre-se que este é um teste técnico e não um concurso público, portanto, não existe apenas uma resposta correta. Mostre que você é bom e nos impressione, mas não esqueça do objetivo do projeto.

Nós não definimos um tempo limite para resolução deste teste, o que vale para nós é o resultado e a evolução da criação do projeto até se atingir este resultado, mas acreditamos que este desafio pode ser resolvido em cerca de 24 horas de codificação.

## O desafio <h2>

Você irá construir uma aplicação de e-commerce consumindo um backend construído  pela nossa equipe, segue link da [Documentação](https://documenter.getpostman.com/view/23378264/2s8YRgrueg). É uma aplicação simples, onde iremos buscar por algum produto ou categoria, e ter acesso aos produtos disponíveis no e-commerce referente ao que foi pesquisado.

Nossa ideia de interface é bem similar a do [Submarino](https://www.submarino.com.br/) , será dividido em 3 telas. Uma delas será a home que deve ter um campo de pesquisar no topo site(*todas as telas devem ter esse campo*), e ao longo do mesmo um carrossel contendo alguns produtos, e outro carrossel contendo as seguintes categorias:
* SMARTPHONES
* NOTEBOOKS
* GAMES
* TV
* HOME

Ao clicar em algumas delas, deverá ser direcionado para a segunda tela, a de pesquisa, em que irá listar os produtos da categoria selecionada.

Mais referente a tela de pesquisa, também será a utilizada quando algo for pesquisado na tela de pesquisa, como, por exemplo, "iphone". No meio da tela deverão estar os produtos referentes, e do lado esquerdo as opções de filtro que devem ser:
* Preço
* Avaliação
* Desconto

No canto superior direito, alinhado com os produtos, deverá ter um select referente a ordenação dos produtos contendo as seguintes opções:
* Menores preços
* Maiores preços
* Mais avaliados

Os produtos devem ter 24 itens por página.

A terceira e ultima tela será a referente a compra de um produto específico. Para acessar a mesma o usuário deve clicar em algum item de sua escolha. Na tela deverá ter obrigatoriamente, a foto principal e um carrossel das outras fotos(Ao clicar em alguma foto abrir um modal com a mesma), o valor, com o desconto caso exista, um botão de compra, a descrição, as informações detalhadas do produto, os comentários e um carrossel com produtos similares.

Lembrando a interface deve ser bem similar a do site [Submarino](https://www.submarino.com.br/),  caso tenha alguma dúvida referente a alguma das telas basta utilizá-lo como base.

Todos os produtos e comentários estarão disponíveis na api disponibilizada. Com dois endpoints um list que irá trazer só dados básicos do produto, e um find que traz tudo referente a ele.

### O que nós esperamos do seu teste <h3>

* Ver na solução a utilização de Vue.js
* Um código escrito da maneira mais semântica possível
* CSS3/4 - Com um pre processador de CSS
* Layout responsivo

### O que nós ficaríamos felizes de ver em seu teste <h3>

* Testes unitários
* Alguma metodologia para definição e organização do seu código 
* Um autocomplete na pesquisa, novamente utilizar o [Submarino](https://www.submarino.com.br/) como base


### O que nos impressionaria <h3>

* Aplicação de animações em css quando possível e tome cuidado com a performance da sua animação :)
* Ver o código rodando live (Bucket estático S3, Heroku, Firebase Hosting)

### O que nós não gostaríamos <h3>

* Descobrir que não foi você quem fez seu teste
* Ver commits grandes, sem muita explicação nas mensagens em seu repositório

## O que avaliaremos de seu teste <h2>

* Histórico de commits do git
* As instruções de como rodar o projeto
* Organização, semântica, estrutura, legibilidade, manutenibilidade do seu código
* Alcance dos objetivos propostos
* Adaptação mobile (layout responsivo)
* Componentização e extensibilidade dos componentes Vue.js