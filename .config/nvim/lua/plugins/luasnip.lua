return {
  "L3MON4D3/LuaSnip",
  dependencies = {
    "rafamadriz/friendly-snippets",
    config = function()
      require("luasnip.loaders.from_lua").load({ paths = { "~/.config/nvim/lua/custom/snippets/" } })
      require("luasnip.loaders.from_vscode").lazy_load()
    end,
  },
  opts = function(_, opts)
    local ls = require("luasnip")
    local s = ls.snippet
    local t = ls.text_node
    local i = ls.insert_node
    local f = ls.function_node

    -- Merge the existing opts
    opts = vim.tbl_deep_extend("force", opts, {
      history = true,
      delete_check_events = "TextChanged",
    })

    -- Add your custom snippets here
    ls.add_snippets("all", {
      -- Example snippet
      s("mysnip", {
        t("This is my custom snippet. "),
        i(1, "Type something here"),
        t(" End of snippet."),
      }),

      -- Example date snippet
      s("date", {
        f(function()
          return os.date("%Y-%m-%d")
        end, {}),
      }),
    })

    -- You can add filetype-specific snippets like this:
    ls.add_snippets("lua", {
      s("lfun", {
        t("local function "),
        i(1, "name"),
        t("("),
        i(2, "args"),
        t(")"),
        t({ "", "\t" }),
        i(0),
        t({ "", "end" }),
      }),
    })

    -- All other tex/latex snippets live in lua/custom/snippets/tex.lua
    -- (loaded via the from_lua loader above) to avoid duplicate/conflicting
    -- trigger registrations. Only tex snippets unique to this file stay here.
    ls.add_snippets("tex", {
      s("mathcstemplate", {
        t({
          "\\documentclass[11pt]{article}",
          "",
          "% Essential Math Packages",
          "\\usepackage{amsmath,amssymb,amsthm,mathtools}",
          "\\usepackage{tikz-cd}  % Modern package for commutative diagrams",
          "",
          "% Document Layout and Structure",
          "\\usepackage[margin=1in]{geometry}",
          "\\usepackage{enumitem}",
          "\\usepackage{fancyhdr}",
          "\\pagestyle{fancy}",
          "",
          "% Algorithm Packages",
          "\\usepackage{algorithm2e}",
          "\\usepackage{algorithmicx}",
          "\\usepackage{algpseudocode}",
          "",
          "% Code and Color Packages",
          "\\usepackage{listings}",
          "\\usepackage{xcolor}",
          "\\usepackage{tcolorbox}",
          "",
          "% Custom Colors for Code",
          "\\definecolor{codegreen}{rgb}{0,0.6,0}",
          "\\definecolor{codegray}{rgb}{0.5,0.5,0.5}",
          "\\definecolor{codepurple}{rgb}{0.58,0,0.82}",
          "\\definecolor{backcolour}{rgb}{0.95,0.95,0.92}",
          "",
          "% Code Styles",
          "\\lstdefinestyle{pythonstyle}{",
          "    language=python,",
          "    backgroundcolor=\\color{backcolour},",
          "    commentstyle=\\color{codegreen},",
          "    keywordstyle=\\color{blue},",
          "    numberstyle=\\tiny\\color{codegray},",
          "    stringstyle=\\color{codepurple},",
          "    basicstyle=\\ttfamily\\footnotesize,",
          "    breakatwhitespace=false,",
          "    breaklines=true,",
          "    captionpos=b,",
          "    keepspaces=true,",
          "    numbers=left,",
          "    numbersep=5pt,",
          "    showspaces=false,",
          "    showstringspaces=false,",
          "    showtabs=false,",
          "    tabsize=2,",
          "    otherkeywords={self}",
          "}",
          "",
          "\\lstdefinestyle{cppstyle}{",
          "    language=C++,",
          "    backgroundcolor=\\color{backcolour},",
          "    commentstyle=\\color{codegreen},",
          "    keywordstyle=\\color{blue},",
          "    numberstyle=\\tiny\\color{codegray},",
          "    stringstyle=\\color{codepurple},",
          "    basicstyle=\\ttfamily\\footnotesize,",
          "    breakatwhitespace=false,",
          "    breaklines=true,",
          "    captionpos=b,",
          "    keepspaces=true,",
          "    numbers=left,",
          "    numbersep=5pt,",
          "    showspaces=false,",
          "    showstringspaces=false,",
          "    showtabs=false,",
          "    tabsize=2",
          "}",
          "",
          "\\lstset{style=pythonstyle}",
          "",
          "% Theorem Environments",
          "\\theoremstyle{plain}",
          "\\newtheorem{theorem}{Theorem}[section]",
          "\\newtheorem{lemma}[theorem]{Lemma}",
          "\\newtheorem{proposition}[theorem]{Proposition}",
          "\\newtheorem{corollary}[theorem]{Corollary}",
          "",
          "\\theoremstyle{definition}",
          "\\newtheorem{definition}[theorem]{Definition}",
          "\\newtheorem{example}[theorem]{Example}",
          "",
          "% Custom Math Commands",
          "\\newcommand{\\R}{\\mathbb{R}}",
          "\\newcommand{\\N}{\\mathbb{N}}",
          "\\newcommand{\\Z}{\\mathbb{Z}}",
          "\\newcommand{\\Q}{\\mathbb{Q}}",
          "\\newcommand{\\comp}{\\mathbb{C}}",
          "",
          "\\begin{document}",
          "\\title{",
        }),
        i(1, "Document Title"),
        t({
          "}",
          "\\author{",
        }),
        i(2, "Author Name"),
        t({
          "}",
          "\\date{\\today}",
          "",
          "\\maketitle",
          "",
          "\\section{",
        }),
        i(3, "First Section"),
        t({
          "}",
          "",
        }),
        i(4, "Your content here"),
        t({
          "",
          "\\end{document}",
        }),
      }),
    })

    return opts
  end,
}
