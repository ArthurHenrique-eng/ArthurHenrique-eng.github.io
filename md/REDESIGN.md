# Redesign do portfólio — 30/09/2026

## Direção visual

Referência: design **ArthurHenrique-eng.github.io** no Canva, `DAHWpfwU4MU`, versão consultada em 30/09/2026.

Foram aproveitados os títulos grandes, os cartões de projetos e a composição abstrata aprovada da seção de projetos. Após a revisão de Arthur, abertura, apresentação e contato usam fundo preto, sem estrelas decorativas. A abertura apresenta Arthur Barbosa como Desenvolvedor Web Full Stack, com localização em Belo Horizonte–MG, apresentação breve e foto pessoal em moldura simples. A faixa de tecnologias foi removida. A navegação preta e o favicon usam a nova marca PNG fornecida por Arthur. As marcas dos projetos mantêm a transparência original sobre cartões escuros. Os textos provisórios e imagens de produtos do template foram substituídos pelo conteúdo profissional e pelos projetos de Arthur.

A composição abstrata da seção de projetos é desenhada em CSS. Os ícones são SVG locais. Não há bibliotecas de interface, dependências de CDN ou rastreadores.

## Conteúdo preservado e ampliado

- Mantidos Lumora App, Academia Fit, Sistema Biblioteca, Sistema Python e Gestão de Estoque.
- Incluídos ChurrasPlan e Talentix, presentes no protótipo, com links para os repositórios públicos confirmados.
- Talentix identificado como projeto acadêmico em equipe.
- Preservadas apresentação, formação, idiomas, certificações, experiência em projetos e informações de contato.
- Preservadas as âncoras `inicio`, `sobre`, `projetos`, `certificacoes`, `formacao`, `galeria`, `experiencia`, `contato` e `conteudo`.
- Preservados os arquivos de imagem originais. A página utiliza versões WebP otimizadas.

## Origem das capturas novas

| Projeto     | Repositório de origem          | Revisão consultada                         | Tela           |
| ----------- | ------------------------------ | ------------------------------------------ | -------------- |
| ChurrasPlan | ArthurHenrique-eng/ChurrasPlan | `2afa7b0a0780d2c6090b2d2677b6e1b799958d90` | Página inicial |
| Talentix    | PROJETO-SENAC-MINAS/Talentix   | `d6a43893de5a3ddee302902c59afbe2a1eebb08f` | Área de acesso |

As capturas foram obtidas executando as interfaces localmente, sem autenticação ou dados de usuários. A imagem de Talentix mostra a parte superior da tela de acesso. Nenhum código dos repositórios de origem foi modificado.

## Correções de comportamento

- Galeria sem caminhos quebrados pela diferença entre `prints` e `Prints`.
- Imagens de projeto ampliáveis usando elementos de link e um diálogo nativo.
- Setas do teclado, Escape, foco contido no diálogo e retorno ao elemento de origem.
- Filtros usam `hidden` e `aria-pressed`, sem conflito com animações de rolagem.
- Menu móvel com estado acessível, fechamento por Escape e bloqueio do foco quando fechado.
- Tema escuro por padrão, com escolha persistente entre claro e escuro. As seções de abertura, apresentação e contato permanecem pretas em ambos os temas. A indisponibilidade de `localStorage` não interrompe o restante da página.
- Copiar contato apresenta uma alternativa manual se a área de transferência estiver indisponível.
- Formulário valida conteúdo, mantém os dados preenchidos e prepara um e-mail para revisão pelo visitante.
- Conteúdo e links essenciais disponíveis com JavaScript desativado.
- Movimento reduzido respeitado via `prefers-reduced-motion`.

## Validação realizada

Verificação no Chromium, com inspeção visual de desktop e mobile e testes automatizados de interação:

- Nove larguras: **320, 360, 390, 600, 768, 800, 1024, 1440 e 1920 px**, sem transbordamento horizontal.
- As **14 imagens utilizadas** carregadas; nenhum erro de JavaScript ou recurso HTTP ausente.
- Filtros: Todos 7, Web 6, Python 5, Dados 6; resultados permanecem corretos após rolagem.
- Galeria com sete imagens únicas, navegação circular, teclas direcionais, Tab e Escape.
- Tema claro/escuro, persistência após recarregar e uso com armazenamento bloqueado.
- Menu móvel, cópia de e-mail/telefone, alternativa manual e validação do formulário.
- E-mail de teste preparado com o acionamento externo bloqueado: nenhuma mensagem enviada.
- Navegação e conteúdo essencial com JavaScript desativado.
- Auditoria axe-core: **nenhuma violação detectada** nas verificações WCAG 2 A/AA e 2.1 AA em ambos os temas.
- Sintaxe JavaScript e `git diff --check` sem erros.

As 14 imagens exibidas na página somam aproximadamente **708 KB**, incluindo a nova marca PNG e a foto pessoal em WebP. Os arquivos originais continuam preservados no repositório. As fontes são servidas pelo próprio site, com suas licenças incluídas.
