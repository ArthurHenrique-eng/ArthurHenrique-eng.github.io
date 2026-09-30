# Arthur Barbosa — Portfólio pessoal

Portfólio pessoal de Arthur Henrique de Paula Barbosa, estudante de Desenvolvimento de Sistemas no SENAC Minas.

**Site:** [arthurhenrique-eng.github.io](https://arthurhenrique-eng.github.io/)

## Identidade visual

A versão de setembro de 2026 segue o [design do Canva atualizado por Arthur](https://canva.link/6edghj6g9hnrigr): fundo preto, títulos expressivos, retrato em moldura clara com tecnologias, cartões de projetos e galeria de marcas antes da apresentação pessoal. O tema escuro é o padrão, com opção de tema claro persistente.

## Estrutura

- `index.html`: conteúdo semântico, sete projetos, galeria, apresentação, formação, certificações e contato.
- `css/style.css`: identidade visual, temas claro/escuro e estilos responsivos.
- `js/script.js`: menu, filtros, galeria com teclado, tema, cópia de contatos e preparação de e-mail.
- `DOCS/`: todas as logos, os anexos originais e suas versões WebP para o site, com um índice de correspondências.
- `assets/img/optimized/`: foto e capturas dos projetos em WebP.
- `assets/img/Prints/` e `assets/img/perfil/`: capturas e foto originais preservadas.
- `assets/fonts/`: fontes Anton e Manrope hospedadas localmente e suas licenças OFL.
- `md/REDESIGN.md`: decisões de implementação, origem dos novos recursos e validação.

## Executar localmente

Na raiz do repositório:

```bash
python -m http.server 5500
```

Acesse `http://localhost:5500`. Não há etapa de build, instalação de dependências ou backend para este portfólio. A publicação continua no GitHub Pages. Ao publicar alterações em CSS ou JavaScript, atualize o parâmetro `v` dos respectivos links em `index.html` para renovar o cache dos visitantes.

## Atualizar projetos

Cada projeto é um `<article class="project-card">` em `index.html`. Atualize título, descrição, tecnologias e link do repositório. O atributo `data-categories` aceita `web`, `python` e `dados`, separados por espaços.

A capa aponta para uma imagem real e inclui `data-gallery-item`, `data-image` e `data-title`. O JavaScript reutiliza imagens iguais sem duplicá-las na navegação da galeria. Ao adicionar ou remover projetos, atualize o número inicial no filtro “Todos” e em `#projectCount`.

Os caminhos diferenciam maiúsculas de minúsculas no GitHub Pages. As imagens originais estão em `assets/img/Prints/`, com **P** maiúsculo.

## Contato

O formulário valida os campos e prepara um link `mailto:` com assunto e mensagem codificados. O visitante revisa e envia a mensagem em seu próprio aplicativo de e-mail. O site não simula envio, não armazena mensagens e não exige credenciais de serviço.

E-mail direto, telefone, GitHub e LinkedIn permanecem disponíveis. Sem JavaScript, os projetos, a navegação e os links diretos continuam acessíveis.

LinkedIn atualizado: [arthurhenrique-eng](https://www.linkedin.com/in/arthurhenrique-eng/). O ícone Lattes aguarda a URL pessoal para ser transformado em link.
