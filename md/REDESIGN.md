# Portfólio — atualização de 30/09/2026

Referência: [projeto do Canva enviado por Arthur](https://canva.link/6edghj6g9hnrigr), design `DAHWshT4zXw`, versão 52. A primeira página contém o portfólio; a segunda estava vazia na consulta. O projeto do Canva não foi alterado durante esta implementação.

## Layout e conteúdo

- Fundo preto como tema padrão, títulos Anton e textos Manrope, com fontes locais.
- Abertura com “Estudante de Engenharia de Software”, apresentação revisada, retrato em moldura clara e faixa com sete ícones de tecnologias.
- Perfis LinkedIn/GitHub e ícone Lattes na abertura e na apresentação pessoal.
- Sete projetos preservados, com capturas reais, cartões verdes e a faixa de composição abstrata em CSS.
- Galeria antes de “Sobre mim”, utilizando as novas marcas fornecidas e mantendo Lumora.
- Seções numeradas na ordem projetos, galeria, apresentação, formação e contato.
- Ferramentas, espanhol intermediário, curso Office de 110 horas, Python pelo IFMG e demais textos alinhados à referência.
- Formação em duas linhas e cartão de experiência em tom cinza amarronzado.
- Título do formulário “Entre em contato”, marca AB no rodapé e indicação de direitos reservados.
- Todos os sete links de LinkedIn atualizados para o perfil `arthurhenrique-eng`, incluindo certificações.

A composição desktop acompanha as medidas da referência de 1792 px. No celular, colunas, cartões e navegação se reorganizam para manter o conteúdo legível e utilizável.

## Recursos

As 19 imagens anexadas estão preservadas em `DOCS/`. Logos anteriores também foram reunidas nessa pasta; fotos e capturas permanecem em `assets/img/`. As versões WebP reduzem o peso dos SVGs com imagens incorporadas e dos PNGs de alta resolução. Detalhes e correspondências estão em `DOCS/README.md`.

O currículo Lattes não recebeu um endereço presumido: seu ícone permanece sem link até Arthur fornecer a URL pessoal. Os demais perfis profissionais estão ativos.

Origem das capturas acrescentadas na versão anterior:

| Projeto | Repositório | Revisão | Tela |
| --- | --- | --- | --- |
| ChurrasPlan | ArthurHenrique-eng/ChurrasPlan | `2afa7b0a0780d2c6090b2d2677b6e1b799958d90` | Página inicial |
| Talentix | PROJETO-SENAC-MINAS/Talentix | `d6a43893de5a3ddee302902c59afbe2a1eebb08f` | Área de acesso |

## Comportamento e validação

O JavaScript existente foi preservado: filtros, galeria com diálogo nativo, teclado, foco, menu móvel, tema persistente, cópia de contatos e preparação de e-mail. O formulário continua abrindo um rascunho no aplicativo de e-mail do visitante, sem backend e sem simular envio.

Verificação local no Chromium:

- Larguras de 320, 390, 600, 768, 800, 1024, 1440, 1792 e 1920 px, sem transbordamento horizontal.
- 28 elementos de imagem carregados, sem falhas HTTP ou erros de JavaScript.
- Filtros: Todos 7, Web 6, Python 5 e Dados 6.
- Galeria com sete imagens únicas, setas do teclado, Escape e retorno de foco.
- Menu móvel abre, fecha e navega pelas âncoras; estado `inert` e Escape verificados.
- Temas claro e escuro preservados após recarga.
- Auditoria axe-core WCAG 2 A/AA e 2.1 AA: nenhuma violação detectada em ambos os temas.
- Validação dos campos e geração do rascunho `mailto:` com acionamento externo bloqueado no teste; nenhuma mensagem enviada.
- Conteúdo e navegação essenciais disponíveis com JavaScript desativado.
- Anexos em `DOCS/` comparados byte a byte com os originais recebidos.
- Caminhos locais, âncoras, identificadores, sintaxe JavaScript e `git diff --check` verificados.
