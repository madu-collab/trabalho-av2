RELATÓRIO DO TRABALHO: CONTROLE DE DESPESAS DE VIAGENS DE NEGÓCIOS

Nome: [Maria Eduarda Felício Passos]
Data: [06/10/2025]
Descrição: Desenvolvi um sistema front-end para controlar despesas de viagens de negócios, focando em categorias como transporte (voos, táxi), hospedagem (hotéis) e alimentação (refeições). Inclui registro de itens com valores, aprovações individuais e cálculo automático de reembolso total. Usei HTML semântico, CSS responsivo e JavaScript para interatividade.

Funcionalidades Principais:
- Registro de despesas: Campos para data, local, categoria, descrição e valor (com validação nativa e JS).
- Aprovações: Checkbox para aprovar itens para reembolso.
- Lista dinâmica: Tabela com filtro por categoria, edição/exclusão de itens.
- Reembolsos: Cálculo de total aprovado (formato R$), aviso se > R$5.000, botão para solicitar.
- Persistência: Dados salvos no navegador (localStorage) para simular uso real.
- Extras: Responsivo para mobile, acessível (labels, foco visível), validação de data/valor.

Tecnologias: HTML5, CSS3 (com media queries), Vanilla JS (sem bibliotecas).
Testes: Funciona em Chrome/Firefox. Validação impede erros (ex: data futura). Total ex: R$ 1.234,56.

Pontos de Destaque pela Rubrica:
- Estrutura semântica e form funcional: Tags <header>/<main>/<section>, required/minlength.
- CSS externo: Separação total, :hover/:focus, cores harmoniosas (verde para aprovação).
- Validação: Atributos HTML + JS (valor >0, data <= hoje).
- Usabilidade: Layout limpo, responsivo, acessível (navegação por teclado).
- Boas Práticas: Original (customizado para viagens), entregue no prazo, com extras (filtro/edição).

Abrir: index.html no navegador.