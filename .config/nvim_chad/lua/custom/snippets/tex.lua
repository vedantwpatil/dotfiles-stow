local ls = require "luasnip"
local s = ls.snippet
local t = ls.text_node
local i = ls.insert_node
local f = ls.function_node

local tex_snippets = {
  -- Math mode
  s("mk", {
    t "$",
    i(1),
    t "$",
    i(0),
  }),

  -- Display math
  s("dm", {
    t { "$$", "\t" },
    i(1),
    t { "", "$$" },
    i(0),
  }),

  -- Fraction
  s("/", {
    t "\\frac{",
    i(1),
    t "}{",
    i(2),
    t "}",
    i(0),
  }),

  -- Subscript
  s("__", {
    t "_{",
    i(1),
    t "}",
    i(0),
  }),

  -- Superscript
  s("^^", {
    t "^{",
    i(1),
    t "}",
    i(0),
  }),

  -- Square root
  s("sq", {
    t "\\sqrt{",
    i(1),
    t "}",
    i(0),
  }),

  -- Sum
  s("sum", {
    t "\\sum_{",
    i(1, "i=1"),
    t "}^{",
    i(2, "n"),
    t "}",
    i(0),
  }),

  -- Integral
  s("int", {
    t "\\int_{",
    i(1, "a"),
    t "}^{",
    i(2, "b"),
    t "} ",
    i(3),
    t " \\, d",
    i(4, "x"),
    i(0),
  }),

  -- Limit
  s("lim", {
    t "\\lim_{",
    i(1, "n \\to \\infty"),
    t "}",
    i(0),
  }),

  -- Trig functions
  s("sin", { t "\\sin" }),
  s("cos", { t "\\cos" }),
  s("tan", { t "\\tan" }),
  -- Calculus
  s("partial", { t "\\partial" }),
  s("nabla", { t "\\nabla" }),

  -- Greek letters
  s("alpha", { t "\\alpha" }),
  s("beta", { t "\\beta" }),
  s("gamma", { t "\\gamma" }),
  s("delta", { t "\\delta" }),
  s("epsilon", { t "\\epsilon" }),
  s("theta", { t "\\theta" }),
  s("pi", { t "\\pi" }),

  -- Begin/End environment
  s("beg", {
    t "\\begin{",
    i(1),
    t "}",
    t { "", "\t" },
    i(2),
    t { "", "\\end{" },
    f(function(args)
      return args[1][1]
    end, { 1 }),
    t "}",
  }),
  -- Basic fraction
  s("//", {
    t "\\frac{",
    i(1),
    t "}{",
    i(2),
    t "}",
  }),

  -- Fraction with numerator
  s({ trig = "(%d+)/", regTrig = true }, {
    f(function(_, snip)
      return "\\frac{" .. snip.captures[1] .. "}"
    end),
    t "{",
    i(1),
    t "}",
  }),

  -- Fraction with complex numerator
  s({ trig = "([^%s]+)/", regTrig = true }, {
    f(function(_, snip)
      return "\\frac{" .. snip.captures[1] .. "}"
    end),
    t "{",
    i(1),
    t "}",
  }),

  -- Fraction with parentheses
  s({ trig = "%((.-)%)/", regTrig = true }, {
    f(function(_, snip)
      return "\\frac{" .. snip.captures[1] .. "}"
    end),
    t "{",
    i(1),
    t "}",
  }),

  -- Nested fraction
  s({ trig = "%((.-)%+%((.-)/)%)", regTrig = true }, {
    t "(",
    f(function(_, snip)
      return snip.captures[1]
    end),
    t " + \\frac{",
    f(function(_, snip)
      return snip.captures[2]
    end),
    t "}{",
    i(1),
    t "})",
    i(0),
  }),

  -- Fraction with everything before it
  s({ trig = "(.+)/", regTrig = true }, {
    f(function(_, snip)
      return "\\frac{" .. snip.captures[1] .. "}"
    end),
    t "{",
    i(1),
    t "}",
  }),

  -- Align environment
  s("ali", {
    t { "\\begin{align*}", "\t" },
    i(1),
    t { "", "\\end{align*}" },
  }),

  s("lecturenotes", {
    t {
      "\\documentclass[12pt,a4paper]{article}",
      "",
      "% Packages",
      "\\usepackage{amsmath,amssymb,amsfonts}",
      "\\usepackage{graphicx}",
      "\\usepackage[margin=1in]{geometry}",
      "\\usepackage{hyperref}",
      "\\usepackage{enumitem}",
      "\\usepackage{tcolorbox}",
      "\\usepackage{fancyhdr}",
      "",
      "% Custom commands",
      "\\newcommand{\\R}{\\mathbb{R}}",
      "\\newcommand{\\N}{\\mathbb{N}}",
      "\\newcommand{\\Z}{\\mathbb{Z}}",
      "",
      "% Header and footer",
      "\\pagestyle{fancy}",
      "\\fancyhf{}",
      "\\rhead{",
    },
    i(1, "Course Name"),
    t {
      "}",
      "\\lhead{",
    },
    i(2, "Your Name"),
    t {
      "}",
      "\\cfoot{\\thepage}",
      "",
      "% Title",
      "\\title{Lecture Notes: ",
    },
    i(3, "Topic"),
    t {
      "}",
      "\\author{",
    },
    i(4, "Your Name"),
    t {
      "}",
      "\\date{\\today}",
      "",
      "\\begin{document}",
      "",
      "\\maketitle",
      "",
      "\\section{Overview}",
      "\\begin{tcolorbox}[colback=yellow!10!white,colframe=yellow!50!black,title=Key Points]",
      "  \\begin{itemize}",
      "    \\item ",
    },
    i(5, "Key point 1"),
    t {
      "",
      "    \\item ",
    },
    i(6, "Key point 2"),
    t {
      "",
      "    \\item ",
    },
    i(7, "Key point 3"),
    t {
      "",
      "  \\end{itemize}",
      "\\end{tcolorbox}",
      "",
      "\\section{Detailed Notes}",
      "\\subsection{",
    },
    i(8, "Subtopic 1"),
    t {
      "}",
      "",
    },
    i(9, "Your notes for subtopic 1"),
    t {
      "",
      "",
      "\\subsection{",
    },
    i(10, "Subtopic 2"),
    t {
      "}",
      "",
    },
    i(11, "Your notes for subtopic 2"),
    t {
      "",
      "",
      "\\section{Important Formulas/Theorems}",
      "\\begin{tcolorbox}[colback=blue!5!white,colframe=blue!75!black,title=Key Formula/Theorem]",
      "  ",
    },
    i(12, "State an important formula or theorem here"),
    t {
      "",
      "\\end{tcolorbox}",
      "",
      "\\section{Examples}",
      "\\begin{example}",
      "  ",
    },
    i(13, "Write an example here"),
    t {
      "",
      "\\end{example}",
      "",
      "\\section{Questions/Topics for Further Study}",
      "\\begin{itemize}",
      "  \\item ",
    },
    i(14, "Question or topic for further study"),
    t {
      "",
      "\\end{itemize}",
      "",
      "\\end{document}",
    },
  }),

  s("coursenotes", {
    t {
      "\\documentclass[12pt,a4paper]{article}",
      "",
      "% Essential Math Packages",
      "\\usepackage{amsmath,amssymb,amsfonts,amsthm}",
      "\\usepackage{mathtools}",
      "\\usepackage{thmtools}",
      "\\usepackage{tikz}",
      "\\usepackage{pgfplots}",
      "",
      "% Other Useful Packages",
      "\\usepackage[utf8]{inputenc}",
      "\\usepackage[T1]{fontenc}",
      "\\usepackage[margin=1in]{geometry}",
      "\\usepackage{hyperref}",
      "\\usepackage{cleveref}",
      "",
      "% Math Environments",
      "\\newtheorem{theorem}{Theorem}[section]",
      "\\newtheorem{lemma}[theorem]{Lemma}",
      "\\newtheorem{proposition}[theorem]{Proposition}",
      "\\newtheorem{corollary}[theorem]{Corollary}",
      "\\newtheorem{definition}[theorem]{Definition}",
      "\\newtheorem{example}[theorem]{Example}",
      "",
      "% Custom Math Commands",
      "\\newcommand{\\R}{\\mathbb{R}}",
      "\\newcommand{\\N}{\\mathbb{N}}",
      "\\newcommand{\\Z}{\\mathbb{Z}}",
      "\\newcommand{\\Q}{\\mathbb{Q}}",
      "\\newcommand{\\C}{\\mathbb{C}}",
      "\\newcommand{\\set}[1]{\\{#1\\}}",
      "\\newcommand{\\abs}[1]{\\left|#1\\right|}",
      "\\newcommand{\\norm}[1]{\\left\\|#1\\right\\|}",
      "\\newcommand{\\inner}[2]{\\langle#1,#2\\rangle}",
      "",
      "\\title{",
    },
    i(1, "Math Notes Title"),
    t {
      "}",
      "\\author{",
    },
    i(2, "Your Name"),
    t {
      "}",
      "\\date{\\today}",
      "",
      "\\begin{document}",
      "",
      "\\maketitle",
      "",
      "\\begin{abstract}",
      "  ",
    },
    i(3, "Brief summary of these math notes."),
    t {
      "",
      "\\end{abstract}",
      "",
      "\\tableofcontents",
      "",
      "\\section{",
    },
    i(4, "First Section"),
    t {
      "}",
      "",
    },
    i(5, "Your math content goes here."),
    t {
      "",
      "",
      "% Example of a theorem environment",
      "\\begin{theorem}",
      "  ",
    },
    i(6, "State your theorem here."),
    t {
      "",
      "\\end{theorem}",
      "",
      "\\begin{proof}",
      "  ",
    },
    i(7, "Proof goes here."),
    t {
      "",
      "\\end{proof}",
      "",
      "% Example of an equation",
      "\\begin{equation}",
      "  ",
    },
    i(8, "y = mx + b"),
    t {
      "",
      "\\end{equation}",
      "",
      "\\bibliographystyle{plain}",
      "\\bibliography{references}",
      "",
      "\\end{document}",
    },
  }),
}

return tex_snippets
