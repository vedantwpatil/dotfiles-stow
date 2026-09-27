-- Kanagawa Paper Ink (extended)
-- Every color role for kanagawa-paper's ink theme.
-- Upstream palette: https://github.com/thesimonho/kanagawa-paper.nvim
-- Derived colors use kanagawa-paper's own HSLuv functions; formulas in the comments.
--
-- local ink = require("kanagawa-paper-ink-extended")
-- vim.api.nvim_set_hl(0, "DiffAdd", { bg = ink.roles.diff.add_bg })

local M = {}

M.palette = {
  autumnGreen = "#76946a",
  autumnRed = "#c34043",
  autumnYellow = "#dca561",
  boatYellow1 = "#938056",
  boatYellow2 = "#c0a36e",
  canvasAqua1 = "#7b958e",
  canvasAsh1 = "#637263",
  canvasBlue1 = "#809ba7",
  canvasBlue2 = "#6b8998",
  canvasBlue3 = "#577888",
  canvasBlue4 = "#516e7d",
  canvasBlue5 = "#3a515e",
  canvasCyan1 = "#4a905d",
  canvasGray1 = "#aeaea6",
  canvasGray2 = "#8e8a80",
  canvasGray3 = "#73787d",
  canvasGreen1 = "#7e9579",
  canvasGreen2 = "#7a8c6a",
  canvasGreen3 = "#9ba98e",
  canvasOrange1 = "#b28d77",
  canvasOrange2 = "#a8826a",
  canvasPink1 = "#9e7e98",
  canvasPink2 = "#c1b4c1",
  canvasPink3 = "#d4cdd4",
  canvasRed1 = "#c27672",
  canvasTeal1 = "#7e8faf",
  canvasViolet1 = "#7880a5",
  canvasViolet2 = "#9ba1bf",
  canvasWhite1 = "#cbc8bc",
  canvasWhite2 = "#d1cfc5",
  canvasWhite3 = "#d8d8d2",
  canvasWhite4 = "#e1e1de",
  canvasWhite5 = "#e6e6e3",
  canvasWhite6 = "#ecece8",
  canvasYellow1 = "#a7956a",
  canvasYellow2 = "#b4a88a",
  carpYellow = "#e6c384",
  crystalBlue = "#7e9cd8",
  dragonAqua = "#8ea49e",
  dragonAsh = "#737c73",
  dragonBlack0 = "#0d0c0c",
  dragonBlack1 = "#12120f",
  dragonBlack2 = "#1d1c19",
  dragonBlack3 = "#181616",
  dragonBlack4 = "#282727",
  dragonBlack5 = "#393836",
  dragonBlack6 = "#625e5a",
  dragonBlue = "#658594",
  dragonBlue2 = "#859fac",
  dragonBlue3 = "#708e9e",
  dragonBlue4 = "#5d7a88",
  dragonBlue5 = "#435965",
  dragonGray = "#a6a69c",
  dragonGray2 = "#9e9b93",
  dragonGray3 = "#7a8382",
  dragonGreen = "#699469",
  dragonGreen2 = "#8a9a7b",
  dragonGreen3 = "#717e67",
  dragonOrange = "#b6927b",
  dragonOrange2 = "#9d7665",
  dragonPink = "#a292a3",
  dragonRed = "#c4746e",
  dragonTeal = "#949fb5",
  dragonViolet = "#8992a7",
  dragonWhite = "#c5c9c5",
  dragonYellow = "#c4b28a",
  fujiGray = "#727169",
  fujiWhite = "#dcd7ba",
  katanaGray = "#717c7c",
  lightBlue = "#a3d4d5",
  lotusAqua = "#597b75",
  lotusAqua2 = "#5e857a",
  lotusBlue1 = "#c7d7e0",
  lotusBlue2 = "#b5cbd2",
  lotusBlue3 = "#9fb5c9",
  lotusBlue4 = "#4d699b",
  lotusBlue5 = "#5d57a3",
  lotusCyan = "#d7e3d8",
  lotusGray = "#dcd7ba",
  lotusGray2 = "#716e61",
  lotusGray3 = "#8a8980",
  lotusGreen = "#6f894e",
  lotusGreen2 = "#6e915f",
  lotusGreen3 = "#b7d0ae",
  lotusInk0 = "#3d3d5e",
  lotusInk1 = "#545464",
  lotusInk2 = "#43436c",
  lotusOrange = "#cc6d00",
  lotusOrange2 = "#e98a00",
  lotusPink = "#b35b79",
  lotusRed = "#c84053",
  lotusRed2 = "#d7474b",
  lotusRed3 = "#e82424",
  lotusRed4 = "#d9a594",
  lotusTeal1 = "#4e8ca2",
  lotusTeal2 = "#6693bf",
  lotusTeal3 = "#5a7785",
  lotusViolet1 = "#a09cac",
  lotusViolet2 = "#766b90",
  lotusViolet3 = "#c9cbd1",
  lotusViolet4 = "#624c83",
  lotusWhite0 = "#d5cea3",
  lotusWhite1 = "#dcd5ac",
  lotusWhite2 = "#e5ddb0",
  lotusWhite3 = "#f2ecbc",
  lotusWhite4 = "#e7dba0",
  lotusWhite5 = "#e4d794",
  lotusYellow = "#77713f",
  lotusYellow2 = "#836f4a",
  lotusYellow3 = "#de9800",
  lotusYellow4 = "#f9d791",
  oldWhite = "#c8c093",
  oniViolet = "#957fb8",
  oniViolet2 = "#b8b4d0",
  peachRed = "#ff5d62",
  roninYellow = "#ff9e3b",
  sakuraPink = "#d27e99",
  samuraiRed = "#e82424",
  springBlue = "#7fb4ca",
  springGreen = "#98bb6c",
  springViolet1 = "#938aa9",
  springViolet2 = "#9cabca",
  sumiInk0 = "#16161d",
  sumiInk1 = "#181820",
  sumiInk2 = "#1a1a22",
  sumiInk3 = "#1f1f28",
  sumiInk4 = "#2a2a37",
  sumiInk5 = "#363646",
  sumiInk6 = "#54546d",
  sumiInkn1 = "#0f0f15",
  surimiOrange = "#ffa066",
  waveAqua1 = "#6a9589",
  waveAqua2 = "#7aa89f",
  waveBlue1 = "#223249",
  waveBlue2 = "#2d4f67",
  waveRed = "#e46876",
  winterBlue = "#252535",
  winterGreen = "#2b3328",
  winterRed = "#43242b",
  winterYellow = "#49443c",
}

M.derived = {
  dragonGreenTint = "#2c3732", -- dragonGreen blended 90% toward sumiInk3 (ink)
  dragonRedTint = "#452f33", -- dragonRed blended 90% toward sumiInk3 (ink)
  dragonYellowTint = "#45403a", -- dragonYellow blended 90% toward sumiInk3 (ink)
  dragonBlueTint = "#2b333c", -- dragonBlue blended 90% toward sumiInk3 (ink)
  dragonGreenMist = "#2a3331", -- dragonGreen blended 92% toward sumiInk3 (ink)
  dragonRedMist = "#3f2c31", -- dragonRed blended 92% toward sumiInk3 (ink)
  dragonYellowMist = "#3f3a37", -- dragonYellow blended 92% toward sumiInk3 (ink)
  dragonBlueMist = "#293039", -- dragonBlue blended 92% toward sumiInk3 (ink)
  dragonAquaMist = "#32373b", -- dragonAqua blended 92% toward sumiInk3 (ink)
  dragonBlack5Bright = "#aca9a4", -- dragonBlack5 brightened 0.6 (HSLuv L) (ink)
  dragonRedBright = "#cc928e", -- dragonRed brightened 0.2 (HSLuv L) (ink)
  dragonGreenBright = "#72a072", -- dragonGreen brightened 0.1 (HSLuv L) (ink)
  dragonYellowBright = "#d4c196", -- dragonYellow brightened 0.2 (HSLuv L) (ink)
  dragonBlue5Bright = "#698a9b", -- dragonBlue5 brightened 0.3 (HSLuv L) (ink)
  dragonPinkBright = "#b4a7b5", -- dragonPink brightened 0.2 (HSLuv L) (ink)
  dragonAquaBright = "#96ada7", -- dragonAqua brightened 0.1 (HSLuv L) (ink)
  oldWhiteBright = "#d5cd9d", -- oldWhite brightened 0.2 (HSLuv L) (ink)
  dragonRedShade = "#522c2a", -- dragonRed darkened 0.6 (HSLuv L) (ink)
  dragonPinkShade = "#413941", -- dragonPink darkened 0.6 (HSLuv L) (ink)
  dragonBlueShade = "#27363d", -- dragonBlue darkened 0.6 (HSLuv L) (ink)
  dragonOrange2Shade = "#412f27", -- dragonOrange2 darkened 0.6 (HSLuv L) (ink)
  dragonGreenShade = "#283b28", -- dragonGreen darkened 0.6 (HSLuv L) (ink)
  dragonAshShade = "#2e322e", -- dragonAsh darkened 0.6 (HSLuv L) (ink)
  dragonGreen3Wash = "#4b5348", -- dragonGreen3 blended 60% toward sumiInk3 (ink)
  dragonBlue5Wash = "#313d47", -- dragonBlue5 blended 60% toward sumiInk3 (ink)
  dragonOrange2Wash = "#664e47", -- dragonOrange2 blended 60% toward sumiInk3 (ink)
  dragonRedLift = "#c8837e", -- dragonRed brightened 0.1 (HSLuv L) (ink)
  dragonGreenEmph = "#394c3d", -- dragonGreen blended 77% toward sumiInk3
  dragonRedEmph = "#623e3f", -- dragonRed blended 77% toward sumiInk3
  dragonYellowEmph = "#625a4b", -- dragonYellow blended 77% toward sumiInk3
  dragonBlueEmph = "#38454f", -- dragonBlue blended 77% toward sumiInk3
  springViolet1Emph = "#4c4858", -- springViolet1 blended 77% toward sumiInk3
  springViolet1Mist = "#33313d", -- springViolet1 blended 92% toward sumiInk3
  fujiWhiteBright = "#e8e3c5", -- fujiWhite brightened 0.3 (HSLuv L)
  dragonBlue2Bright = "#96b3c1", -- dragonBlue2 brightened 0.2 (HSLuv L)
  sumiInk6Bright = "#6b6b83", -- sumiInk6 brightened 0.15 (HSLuv L)
  sumiInk45 = "#30303f", -- sumiInk5 blended 50% toward sumiInk4
  sumiInkn1Scrim = "#0f0f1599", -- sumiInkn1 at 60% opacity
  sumiInkn1Shadow = "#0f0f1580", -- sumiInkn1 at 50% opacity
  dragonBlack5Dim = "#2f2e2c", -- dragonBlack5 darkened 0.2 (HSLuv L)
  dragonRedDim = "#9d5a55", -- dragonRed darkened 0.2 (HSLuv L)
  dragonGreenDim = "#527552", -- dragonGreen darkened 0.2 (HSLuv L)
  dragonYellowDim = "#9a8b6b", -- dragonYellow darkened 0.2 (HSLuv L)
  dragonBlue5Dim = "#354751", -- dragonBlue5 darkened 0.2 (HSLuv L)
  dragonPinkDim = "#817282", -- dragonPink darkened 0.2 (HSLuv L)
  dragonAquaDim = "#6f817c", -- dragonAqua darkened 0.2 (HSLuv L)
  oldWhiteDim = "#9d9672", -- oldWhite darkened 0.2 (HSLuv L)
  dragonOrangeVivid = "#be7f46", -- dragonOrange saturate 0.6, brighten -0.075
  waveAqua1Vivid = "#37a28b", -- waveAqua1 saturate 0.75, brighten 0.05
  oniVioletVivid = "#987cc2", -- oniViolet saturate 0.15
  dragonYellowVivid = "#aa8f41", -- dragonYellow saturate 0.65, brighten -0.175
  sakuraPinkVivid = "#ce6c8d", -- sakuraPink brighten -0.075
  dragonGreenVivid = "#528b52", -- dragonGreen saturate 0.25, brighten -0.075
  crystalBlueVivid = "#6b8fd3", -- crystalBlue brighten -0.075
  dragonRedVivid = "#c8726b", -- dragonRed saturate 0.05
  seqBlue1 = "#39527f", -- crystalBlue hue at OKLCH L 0.44 / C 0.08
  seqBlue2 = "#46669c", -- crystalBlue hue at OKLCH L 0.51 / C 0.095
  seqBlue3 = "#547aba", -- crystalBlue hue at OKLCH L 0.58 / C 0.108
  seqBlue4 = "#678fd4", -- crystalBlue hue at OKLCH L 0.65 / C 0.113
  seqBlue5 = "#86a4e1", -- crystalBlue hue at OKLCH L 0.72 / C 0.096
  seqBlue6 = "#a6bae9", -- crystalBlue hue at OKLCH L 0.79 / C 0.07
  seqBlue7 = "#c4d1ef", -- crystalBlue hue at OKLCH L 0.86 / C 0.044
  divRed1 = "#794d4b", -- dragonRed hue at OKLCH L 0.47 / C 0.06
  divBlue1 = "#495b7d", -- crystalBlue hue at OKLCH L 0.47 / C 0.06
  divRed2 = "#a8635d", -- dragonRed hue at OKLCH L 0.575 / C 0.09
  divBlue2 = "#5d78ae", -- crystalBlue hue at OKLCH L 0.575 / C 0.09
  divRed3 = "#d67b73", -- dragonRed hue at OKLCH L 0.68 / C 0.115
  divBlue3 = "#7098df", -- crystalBlue hue at OKLCH L 0.68 / C 0.115
}

M.roles = {
  surface = { -- Surfaces
    -- Background ladder
    bg_m4 = "#0f0f15", -- sumiInkn1
    bg_m3 = "#16161d", -- sumiInk0
    bg_m2 = "#181820", -- sumiInk1
    bg_m1 = "#1a1a22", -- sumiInk2
    bg = "#1f1f28", -- sumiInk3
    bg_p1 = "#2a2a37", -- sumiInk4
    bg_p2 = "#363646", -- sumiInk5
    bg_p3 = "#54546d", -- sumiInk6
    -- Overlays
    overlay = "#0f0f1599", -- sumiInkn1Scrim
    shadow = "#0f0f1580", -- sumiInkn1Shadow
  },
  text = { -- Text
    -- Foreground ladder
    fg_bright = "#e8e3c5", -- fujiWhiteBright
    fg = "#dcd7ba", -- fujiWhite
    fg_float = "#c8c093", -- oldWhite
    fg_dim = "#9e9b93", -- dragonGray2
    fg_muted = "#727169", -- fujiGray
    fg_subtle = "#54546d", -- sumiInk6
    fg_dimmer = "#393836", -- dragonBlack5
    -- Text on fills
    on_accent = "#1f1f28", -- sumiInk3
    fg_reverse = "#1d1c19", -- dragonBlack2
    fg_dark = "#181616", -- dragonBlack3
    -- Purpose
    link = "#938aa9", -- springViolet1 · underline
    link_visited = "#a292a3", -- dragonPink
    placeholder = "#727169", -- fujiGray
    disabled = "#54546d", -- sumiInk6
  },
  border = { -- Borders & lines
    -- Borders
    border = "#625e5a", -- dragonBlack6
    border_float = "#363646", -- sumiInk5
    border_focus = "#c4b28a", -- dragonYellow
    border_search = "#938aa9", -- springViolet1
    win_separator = "#8992a7", -- dragonViolet
    -- Guides
    indent = "#363646", -- sumiInk5
    indent_scope = "#8992a7", -- dragonViolet
    ruler = "#2a2a37", -- sumiInk4
  },
  state = { -- Interaction states
    -- Lines & selection
    cursorline = "#2a2a37", -- sumiInk4
    cursorline_alt = "#363646", -- sumiInk5
    selection = "#363646", -- sumiInk5
    selection_inactive = "#30303f", -- sumiInk45
    hover = "#2a2a37", -- sumiInk4
    active = "#363646", -- sumiInk5
    reference = "#363646", -- sumiInk5
    -- Search & matching
    search = "#938aa9", -- springViolet1
    search_current = "#938aa9", -- springViolet1 · bold
    search_other = "#4c4858", -- springViolet1Emph
    substitute = "#c4746e", -- dragonRed
    match_paren = "#c4b28a", -- dragonYellow · bold
    -- Marks & motion
    mark = "#7aa89f", -- waveAqua2
    yank = "#54546d", -- sumiInk6
    paste = "#c8837e", -- dragonRedLift
    jump_label = "#c4746e", -- dragonRed · bold
    jump_label_2 = "#b6927b", -- dragonOrange
    jump_backdrop = "#727169", -- fujiGray
    -- Scrollbars & folds
    scrollbar = "#363646", -- sumiInk5
    scrollbar_thumb = "#54546d", -- sumiInk6
    scrollbar_thumb_hover = "#6b6b83", -- sumiInk6Bright
    fold_bg = "#181820", -- sumiInk1
    fold_fg = "#8ea49e", -- dragonAqua
  },
  modes = { -- Cursor & modes
    -- Modes
    normal = "#c4b28a", -- dragonYellow
    insert = "#c4746e", -- dragonRed
    visual = "#938aa9", -- springViolet1
    replace = "#c4746e", -- dragonRed
    command = "#c4b28a", -- dragonYellow
    terminal = "#699469", -- dragonGreen
    select = "#a292a3", -- dragonPink
    pending = "#b6927b", -- dragonOrange
    -- Cursor
    cursor = "#c4b28a", -- dragonYellow
    cursor_text = "#1f1f28", -- sumiInk3
    cursor_insert = "#c4746e", -- dragonRed
    cursor_visual = "#938aa9", -- springViolet1
  },
  accent = { -- Accents
    -- Brand
    primary = "#c4b28a", -- dragonYellow
    primary_hover = "#d4c196", -- dragonYellowBright
    secondary = "#c4746e", -- dragonRed
    tertiary = "#938aa9", -- springViolet1
    -- Panel accents
    accent1 = "#658594", -- dragonBlue
    accent2 = "#b6927b", -- dragonOrange
    accent3 = "#6a9589", -- waveAqua1
    accent4 = "#7a8382", -- dragonGray3
    accent5 = "#c4746e", -- dragonRed
    invert = "#2a2a37", -- sumiInk4
  },
  chrome = { -- Editor chrome
    -- Statusline
    statusline_bg = "#2a2a37", -- sumiInk4
    statusline_fg = "#9e9b93", -- dragonGray2
    statusline_section_bg = "#363646", -- sumiInk5
    statusline_inactive_bg = "#0f0f15", -- sumiInkn1
    statusline_inactive_fg = "#9e9b93", -- dragonGray2
    statusline_debug_bg = "#b6927b", -- dragonOrange
    -- Tabline
    tabline_bg = "#16161d", -- sumiInk0
    tab_active_bg = "#1f1f28", -- sumiInk3
    tab_active_fg = "#c5c9c5", -- dragonWhite
    tab_inactive_bg = "#16161d", -- sumiInk0
    tab_inactive_fg = "#393836", -- dragonBlack5
    tab_alternate_fg = "#a292a3", -- dragonPink
    tab_indicator = "#658594", -- dragonBlue
    tab_modified = "#c4b28a", -- dragonYellow
    tab_close = "#c4746e", -- dragonRed
    -- Floats & popup menus
    float_bg = "#2a2a37", -- sumiInk4
    float_fg = "#c8c093", -- oldWhite
    float_border = "#363646", -- sumiInk5
    float_title = "#8ea49e", -- dragonAqua · bold
    float_footer = "#54546d", -- sumiInk6
    pmenu_bg = "#2a2a37", -- sumiInk4
    pmenu_fg = "#dcd7ba", -- fujiWhite
    pmenu_sel_bg = "#363646", -- sumiInk5
    pmenu_match = "#859fac", -- dragonBlue2
    pmenu_kind = "#7a8382", -- dragonGray3
    pmenu_extra = "#8ea49e", -- dragonAqua
    pmenu_thumb = "#54546d", -- sumiInk6
    sidebar_bg = "#2a2a37", -- sumiInk4
    sidebar_fg = "#c8c093", -- oldWhite
    -- Gutter & text decorations
    line_nr = "#54546d", -- sumiInk6
    line_nr_current = "#c4b28a", -- dragonYellow · bold
    gutter_bg = nil, -- transparent
    nontext = "#54546d", -- sumiInk6
    whitespace = "#54546d", -- sumiInk6
    special_key = "#8ea49e", -- dragonAqua
    winbar_fg = "#393836", -- dragonBlack5
    -- Titles & messages
    title = "#8ea49e", -- dragonAqua · bold
    header1 = "#8992a7", -- dragonViolet
    header2 = "#b6927b", -- dragonOrange
    msg_fg = "#9e9b93", -- dragonGray2
    more_msg = "#658594", -- dragonBlue
    mode_msg = "#c4b28a", -- dragonYellow · bold
    error_msg = "#c4746e", -- dragonRed
    warning_msg = "#c4b28a", -- dragonYellow
  },
  controls = { -- Controls
    -- Buttons
    button_bg = "#c4b28a", -- dragonYellow
    button_fg = "#1f1f28", -- sumiInk3
    button_hover_bg = "#d4c196", -- dragonYellowBright
    button_secondary_bg = "#363646", -- sumiInk5
    button_secondary_fg = "#dcd7ba", -- fujiWhite
    button_secondary_hover_bg = "#54546d", -- sumiInk6
    button_danger_bg = "#c4746e", -- dragonRed
    -- Inputs & toggles
    input_bg = "#2a2a37", -- sumiInk4
    input_fg = "#dcd7ba", -- fujiWhite
    input_border = "#363646", -- sumiInk5
    input_border_focus = "#c4b28a", -- dragonYellow
    input_placeholder = "#727169", -- fujiGray
    toggle_on = "#c4b28a", -- dragonYellow
    toggle_off = "#54546d", -- sumiInk6
    -- Badges, progress, keys
    badge_bg = "#363646", -- sumiInk5
    badge_fg = "#dcd7ba", -- fujiWhite
    badge_accent_bg = "#c4b28a", -- dragonYellow
    progress = "#c4b28a", -- dragonYellow
    progress_track = "#363646", -- sumiInk5
    kbd_bg = "#2a2a37", -- sumiInk4
    kbd_border = "#54546d", -- sumiInk6
    kbd_fg = "#dcd7ba", -- fujiWhite
  },
  syntax = { -- Syntax
    -- Core
    variable = "#dcd7ba", -- fujiWhite
    comment = "#727169", -- fujiGray
    docstring = "#717e67", -- dragonGreen3 · italic
    string = "#8a9a7b", -- dragonGreen2
    character = "#8a9a7b", -- dragonGreen2
    number = "#a292a3", -- dragonPink
    float = "#a292a3", -- dragonPink
    boolean = "#b6927b", -- dragonOrange · bold
    constant = "#b6927b", -- dragonOrange
    constant_builtin = "#c4b28a", -- dragonYellow
    identifier = "#c4b28a", -- dragonYellow
    property = "#c4b28a", -- dragonYellow
    member = "#c4746e", -- dragonRed
    parameter = "#a6a69c", -- dragonGray
    variable_builtin = "#b6927b", -- dragonOrange · italic
    global = "#b6927b", -- dragonOrange
    -- Functions & types
    ["function"] = "#859fac", -- dragonBlue2
    method = "#859fac", -- dragonBlue2
    function_builtin = "#c4b28a", -- dragonYellow
    constructor = "#8ea49e", -- dragonAqua
    macro = "#c4746e", -- dragonRed
    type = "#8ea49e", -- dragonAqua
    type_builtin = "#c4b28a", -- dragonYellow
    type_parameter = "#8ea49e", -- dragonAqua
    enum_member = "#b6927b", -- dragonOrange
    namespace = "#a292a3", -- dragonPink
    attribute = "#c4b28a", -- dragonYellow
    -- Keywords & punctuation
    keyword = "#a292a3", -- dragonPink
    keyword_import = "#c4746e", -- dragonRed
    keyword_operator = "#c4746e", -- dragonRed · bold
    statement = "#8992a7", -- dragonViolet
    label = "#8992a7", -- dragonViolet
    preproc = "#c4746e", -- dragonRed
    operator = "#c4746e", -- dragonRed
    punctuation = "#9e9b93", -- dragonGray2
    punctuation_special = "#c4746e", -- dragonRed
    regex = "#c4746e", -- dragonRed
    escape = "#c4746e", -- dragonRed · bold
    symbol = "#c4746e", -- dragonRed
    lifetime = "#c4746e", -- dragonRed
    string_special = "#c4b28a", -- dragonYellow
    url = "#938aa9", -- springViolet1 · underline
    -- Markup tags
    tag = "#c4b28a", -- dragonYellow
    tag_attribute = "#c4b28a", -- dragonYellow
    tag_delimiter = "#9e9b93", -- dragonGray2
    -- Specials
    special1 = "#c4b28a", -- dragonYellow
    special2 = "#c4746e", -- dragonRed
    special3 = "#938aa9", -- springViolet1
    -- Annotations
    deprecated = "#717c7c", -- katanaGray · strikethrough
    unused = "#727169", -- fujiGray
    inlay_hint = "#9e9b93", -- dragonGray2 · italic
    code_lens = "#727169", -- fujiGray
    ghost_text = "#727169", -- fujiGray
    active_parameter = "#c4746e", -- dragonRed · bold italic
  },
  diag = { -- Diagnostics
    -- Levels
    error = "#c4746e", -- dragonRed
    warning = "#c4b28a", -- dragonYellow
    info = "#658594", -- dragonBlue
    hint = "#8ea49e", -- dragonAqua
    ok = "#699469", -- dragonGreen
    -- Backgrounds
    error_bg = "#3f2c31", -- dragonRedMist
    warning_bg = "#3f3a37", -- dragonYellowMist
    info_bg = "#293039", -- dragonBlueMist
    hint_bg = "#32373b", -- dragonAquaMist
    ok_bg = "#2a3331", -- dragonGreenMist
    -- Spelling (undercurl color)
    spell_bad = "#c4746e", -- dragonRed · undercurl
    spell_cap = "#c4b28a", -- dragonYellow · undercurl
    spell_local = "#c4b28a", -- dragonYellow · undercurl
    spell_rare = "#c4b28a", -- dragonYellow · undercurl
  },
  diff = { -- Diff
    -- Accents
    add = "#699469", -- dragonGreen
    delete = "#c4746e", -- dragonRed
    change = "#c4b28a", -- dragonYellow
    text = "#658594", -- dragonBlue
    -- Line backgrounds
    add_bg = "#2c3732", -- dragonGreenTint
    delete_bg = "#452f33", -- dragonRedTint
    change_bg = "#45403a", -- dragonYellowTint
    text_bg = "#2b333c", -- dragonBlueTint
    -- Word emphasis
    add_emph = "#394c3d", -- dragonGreenEmph
    delete_emph = "#623e3f", -- dragonRedEmph
    change_emph = "#625a4b", -- dragonYellowEmph
    text_emph = "#38454f", -- dragonBlueEmph
    -- Merge conflicts
    conflict_ours = "#717e67", -- dragonGreen3
    conflict_theirs = "#435965", -- dragonBlue5
    conflict_ancestor = "#9d7665", -- dragonOrange2
    conflict_ours_bg = "#4b5348", -- dragonGreen3Wash
    conflict_theirs_bg = "#313d47", -- dragonBlue5Wash
    conflict_ancestor_bg = "#664e47", -- dragonOrange2Wash
    -- Headers
    file_header = "#8ea49e", -- dragonAqua · bold
    hunk_header = "#8992a7", -- dragonViolet
  },
  git = { -- Git
    -- File status
    added = "#699469", -- dragonGreen
    modified = "#c4b28a", -- dragonYellow
    deleted = "#c4746e", -- dragonRed
    untracked = "#7aa89f", -- waveAqua2
    renamed = "#658594", -- dragonBlue
    conflicted = "#c4746e", -- dragonRed · bold
    ignored = "#727169", -- fujiGray
    submodule = "#8992a7", -- dragonViolet
    -- Gutter signs
    sign_add = "#699469", -- dragonGreen
    sign_change = "#c4b28a", -- dragonYellow
    sign_delete = "#c4746e", -- dragonRed
    -- Log & blame
    commit_hash = "#c4b28a", -- dragonYellow
    head = "#8ea49e", -- dragonAqua · bold
    branch_local = "#699469", -- dragonGreen
    branch_remote = "#c4746e", -- dragonRed
    tag = "#b6927b", -- dragonOrange
    stash = "#a292a3", -- dragonPink
    author = "#859fac", -- dragonBlue2
    date = "#727169", -- fujiGray
    blame = "#727169", -- fujiGray
    graph = nil, -- cycle M.roles.rainbow.rainbow1..7
  },
  terminal = { -- Terminal
    -- Normal (0–7)
    black = "#393836", -- dragonBlack5
    red = "#c4746e", -- dragonRed
    green = "#699469", -- dragonGreen
    yellow = "#c4b28a", -- dragonYellow
    blue = "#435965", -- dragonBlue5
    magenta = "#a292a3", -- dragonPink
    cyan = "#8ea49e", -- dragonAqua
    white = "#c8c093", -- oldWhite
    -- Bright (8–15)
    bright_black = "#aca9a4", -- dragonBlack5Bright
    bright_red = "#cc928e", -- dragonRedBright
    bright_green = "#72a072", -- dragonGreenBright
    bright_yellow = "#d4c196", -- dragonYellowBright
    bright_blue = "#698a9b", -- dragonBlue5Bright
    bright_magenta = "#b4a7b5", -- dragonPinkBright
    bright_cyan = "#96ada7", -- dragonAquaBright
    bright_white = "#d5cd9d", -- oldWhiteBright
    -- Dim (SGR 2 / faint)
    dim_black = "#2f2e2c", -- dragonBlack5Dim
    dim_red = "#9d5a55", -- dragonRedDim
    dim_green = "#527552", -- dragonGreenDim
    dim_yellow = "#9a8b6b", -- dragonYellowDim
    dim_blue = "#354751", -- dragonBlue5Dim
    dim_magenta = "#817282", -- dragonPinkDim
    dim_cyan = "#6f817c", -- dragonAquaDim
    dim_white = "#9d9672", -- oldWhiteDim
    -- Extended
    color16 = "#b6927b", -- dragonOrange
    color17 = "#c4746e", -- dragonRed
    -- Terminal UI
    background = "#1f1f28", -- sumiInk3
    foreground = "#dcd7ba", -- fujiWhite
    cursor = "#c4b28a", -- dragonYellow
    cursor_text = "#1f1f28", -- sumiInk3
    selection_bg = "#363646", -- sumiInk5
    selection_fg = "#9e9b93", -- dragonGray2
    url = "#938aa9", -- springViolet1
    split = "#8992a7", -- dragonViolet
    tab_bar_bg = "#2a2a37", -- sumiInk4
    tab_active_bg = "#1f1f28", -- sumiInk3
    tab_active_fg = "#c4b28a", -- dragonYellow
    tab_inactive_bg = "#2a2a37", -- sumiInk4
    tab_inactive_fg = "#9e9b93", -- dragonGray2
    border_active = "#c4b28a", -- dragonYellow
    border_inactive = "#625e5a", -- dragonBlack6
    border_bell = "#c4746e", -- dragonRed
    search_match_bg = "#4c4858", -- springViolet1Emph
    search_focused_bg = "#938aa9", -- springViolet1
    hint_start_bg = "#c4746e", -- dragonRed
    hint_end_bg = "#363646", -- sumiInk5
    footer_bg = "#2a2a37", -- sumiInk4
    footer_fg = "#9e9b93", -- dragonGray2
    vi_cursor = "#938aa9", -- springViolet1
    visual_bell = "#363646", -- sumiInk5
    scrollbar_thumb = "#54546d", -- sumiInk6
    compose_cursor = "#b6927b", -- dragonOrange
    mark1 = "#7aa89f", -- waveAqua2
    mark2 = "#a292a3", -- dragonPink
    mark3 = "#b6927b", -- dragonOrange
  },
  rainbow = { -- Rainbow
    -- Levels
    rainbow1 = "#c4746e", -- dragonRed
    rainbow2 = "#a292a3", -- dragonPink
    rainbow3 = "#658594", -- dragonBlue
    rainbow4 = "#9d7665", -- dragonOrange2
    rainbow5 = "#699469", -- dragonGreen
    rainbow6 = "#737c73", -- dragonAsh
    rainbow7 = "#949fb5", -- dragonTeal
  },
  markup = { -- Markup & prose
    -- Headings
    h1 = "#c4746e", -- dragonRed
    h2 = "#a292a3", -- dragonPink
    h3 = "#658594", -- dragonBlue
    h4 = "#9d7665", -- dragonOrange2
    h5 = "#699469", -- dragonGreen
    h6 = "#737c73", -- dragonAsh
    -- Heading backgrounds
    h1_bg = "#522c2a", -- dragonRedShade
    h2_bg = "#413941", -- dragonPinkShade
    h3_bg = "#27363d", -- dragonBlueShade
    h4_bg = "#412f27", -- dragonOrange2Shade
    h5_bg = "#283b28", -- dragonGreenShade
    h6_bg = "#2e322e", -- dragonAshShade
    -- Inline & blocks
    link_text = "#938aa9", -- springViolet1
    link_url = "#938aa9", -- springViolet1 · underline
    code = "#8a9a7b", -- dragonGreen2
    code_bg = "#2a2a37", -- sumiInk4
    quote = "#9e9b93", -- dragonGray2
    quote_bar = "#54546d", -- sumiInk6
    list_marker = "#c4b28a", -- dragonYellow
    checkbox_done = "#699469", -- dragonGreen
    checkbox_todo = "#9e9b93", -- dragonGray2
    table_border = "#54546d", -- sumiInk6
    table_header = "#8992a7", -- dragonViolet · bold
    rule = "#54546d", -- sumiInk6
    math = "#b6927b", -- dragonOrange
    environment = "#a292a3", -- dragonPink
    highlight_bg = "#49443c", -- winterYellow
    footnote = "#938aa9", -- springViolet1
    -- Callouts (GitHub alerts / admonitions)
    note = "#658594", -- dragonBlue
    note_bg = "#293039", -- dragonBlueMist
    tip = "#699469", -- dragonGreen
    tip_bg = "#2a3331", -- dragonGreenMist
    important = "#938aa9", -- springViolet1
    important_bg = "#33313d", -- springViolet1Mist
    warning = "#c4b28a", -- dragonYellow
    warning_bg = "#3f3a37", -- dragonYellowMist
    caution = "#c4746e", -- dragonRed
    caution_bg = "#3f2c31", -- dragonRedMist
  },
  tags = { -- Comment tags
    -- Tags
    todo = "#658594", -- dragonBlue
    fix = "#c4746e", -- dragonRed
    hack = "#c4b28a", -- dragonYellow
    note = "#8ea49e", -- dragonAqua
    perf = "#957fb8", -- oniViolet
    test = "#a292a3", -- dragonPink
  },
  debug = { -- Debugger
    -- Signs & lines
    breakpoint = "#c4746e", -- dragonRed
    breakpoint_condition = "#b6927b", -- dragonOrange
    breakpoint_rejected = "#727169", -- fujiGray
    logpoint = "#658594", -- dragonBlue
    stopped = "#c4b28a", -- dragonYellow
    stopped_line_bg = "#49443c", -- winterYellow
    -- Panels & controls
    continue = "#8a9a7b", -- dragonGreen2
    stop = "#c4746e", -- dragonRed
    step = "#c4b28a", -- dragonYellow
    modified_value = "#c4b28a", -- dragonYellow · bold
    value = "#c4b28a", -- dragonYellow
    source = "#c4746e", -- dragonRed
    unavailable = "#727169", -- fujiGray
  },
  test = { -- Tests
    -- States
    passed = "#699469", -- dragonGreen
    failed = "#c4746e", -- dragonRed
    running = "#c4b28a", -- dragonYellow
    skipped = "#8ea49e", -- dragonAqua
    queued = "#658594", -- dragonBlue
    unknown = "#717c7c", -- katanaGray
    marked = "#c4b28a", -- dragonYellow · italic
    adapter = "#938aa9", -- springViolet1
  },
  log = { -- Log levels
    -- Levels
    error = "#c4746e", -- dragonRed
    warn = "#c4b28a", -- dragonYellow
    info = "#658594", -- dragonBlue
    debug = "#7a8382", -- dragonGray3
    trace = "#a292a3", -- dragonPink
    success = "#699469", -- dragonGreen
  },
  kinds = { -- Completion & symbol kinds
    -- LSP kinds
    Text = "#dcd7ba", -- fujiWhite
    Method = "#859fac", -- dragonBlue2
    Function = "#859fac", -- dragonBlue2
    Constructor = "#8ea49e", -- dragonAqua
    Field = "#c4746e", -- dragonRed
    Variable = "#dcd7ba", -- fujiWhite
    Class = "#8ea49e", -- dragonAqua
    Interface = "#8ea49e", -- dragonAqua
    Module = "#a292a3", -- dragonPink
    Property = "#c4b28a", -- dragonYellow
    Unit = "#a292a3", -- dragonPink
    Value = "#8a9a7b", -- dragonGreen2
    Enum = "#8ea49e", -- dragonAqua
    Keyword = "#a292a3", -- dragonPink
    Snippet = "#c4b28a", -- dragonYellow
    Color = "#c4b28a", -- dragonYellow
    File = "#859fac", -- dragonBlue2
    Reference = "#c4b28a", -- dragonYellow
    Folder = "#859fac", -- dragonBlue2
    EnumMember = "#b6927b", -- dragonOrange
    Constant = "#b6927b", -- dragonOrange
    Struct = "#8ea49e", -- dragonAqua
    Event = "#8ea49e", -- dragonAqua
    Operator = "#c4746e", -- dragonRed
    TypeParameter = "#8ea49e", -- dragonAqua
    -- Extra symbol kinds
    Namespace = "#a292a3", -- dragonPink
    Package = "#a292a3", -- dragonPink
    Object = "#8ea49e", -- dragonAqua
    Array = "#9e9b93", -- dragonGray2
    Key = "#c4b28a", -- dragonYellow
    String = "#8a9a7b", -- dragonGreen2
    Number = "#a292a3", -- dragonPink
    Boolean = "#b6927b", -- dragonOrange
    Null = "#c4b28a", -- dragonYellow
    AI = "#8a9a7b", -- dragonGreen2
  },
  files = { -- Files
    -- Explorer
    directory = "#859fac", -- dragonBlue2
    directory_open = "#658594", -- dragonBlue
    root = "#c4746e", -- dragonRed · bold
    file = "#dcd7ba", -- fujiWhite
    file_opened = "#8ea49e", -- dragonAqua · italic
    file_modified = "#c4b28a", -- dragonYellow
    symlink = "#8ea49e", -- dragonAqua
    symlink_broken = "#c4746e", -- dragonRed
    hidden = "#727169", -- fujiGray
    special_file = "#c4b28a", -- dragonYellow
    -- File types
    executable = "#cc928e", -- dragonRedBright · bold
    source = "#699469", -- dragonGreen
    build_tooling = "#72a072", -- dragonGreenBright
    config = "#c4b28a", -- dragonYellow
    document = "#c4b28a", -- dragonYellow
    office = "#8ea49e", -- dragonAqua
    media = "#a292a3", -- dragonPink
    archive = "#96ada7", -- dragonAquaBright · underline
    unimportant = "#54546d", -- sumiInk6
  },
  prompt = { -- Shell prompt
    -- Segments
    prompt_ok = "#699469", -- dragonGreen
    prompt_err = "#c4746e", -- dragonRed
    path = "#859fac", -- dragonBlue2
    git_branch = "#a292a3", -- dragonPink
    git_status = "#c4b28a", -- dragonYellow
    duration = "#b6927b", -- dragonOrange
    user = "#8ea49e", -- dragonAqua
    root = "#c4746e", -- dragonRed · bold
    host = "#949fb5", -- dragonTeal
    context = "#938aa9", -- springViolet1
    jobs = "#658594", -- dragonBlue
    time = "#727169", -- fujiGray
  },
  hues = { -- Named hues
    -- Hues
    red = "#c4746e", -- dragonRed
    orange = "#b6927b", -- dragonOrange
    yellow = "#c4b28a", -- dragonYellow
    green = "#699469", -- dragonGreen
    teal = "#7aa89f", -- waveAqua2
    cyan = "#8ea49e", -- dragonAqua
    blue = "#859fac", -- dragonBlue2
    purple = "#938aa9", -- springViolet1
    pink = "#a292a3", -- dragonPink
    brown = "#9d7665", -- dragonOrange2
    gray = "#9e9b93", -- dragonGray2
  },
  charts = { -- Charts
    -- Categorical (fixed order — assign in sequence, never cycle)
    series1 = "#be7f46", -- dragonOrangeVivid
    series2 = "#37a28b", -- waveAqua1Vivid
    series3 = "#987cc2", -- oniVioletVivid
    series4 = "#aa8f41", -- dragonYellowVivid
    series5 = "#ce6c8d", -- sakuraPinkVivid
    series6 = "#528b52", -- dragonGreenVivid
    series7 = "#6b8fd3", -- crystalBlueVivid
    series8 = "#c8726b", -- dragonRedVivid
    -- Sequential (low → high)
    seq1 = "#39527f", -- seqBlue1
    seq2 = "#46669c", -- seqBlue2
    seq3 = "#547aba", -- seqBlue3
    seq4 = "#678fd4", -- seqBlue4
    seq5 = "#86a4e1", -- seqBlue5
    seq6 = "#a6bae9", -- seqBlue6
    seq7 = "#c4d1ef", -- seqBlue7
    -- Diverging (low → neutral → high)
    div_neg3 = "#d67b73", -- divRed3
    div_neg2 = "#a8635d", -- divRed2
    div_neg1 = "#794d4b", -- divRed1
    div_mid = "#393836", -- dragonBlack5
    div_pos1 = "#495b7d", -- divBlue1
    div_pos2 = "#5d78ae", -- divBlue2
    div_pos3 = "#7098df", -- divBlue3
    -- Status (reserved meaning — pair with icon + label)
    good = "#699469", -- dragonGreen
    warning = "#c4b28a", -- dragonYellow
    serious = "#b6927b", -- dragonOrange
    critical = "#c4746e", -- dragonRed
    -- Chart chrome
    surface = "#1f1f28", -- sumiInk3
    grid = "#363646", -- sumiInk5
    axis = "#54546d", -- sumiInk6
    label = "#9e9b93", -- dragonGray2
    title = "#dcd7ba", -- fujiWhite
    tooltip_bg = "#2a2a37", -- sumiInk4
    tooltip_border = "#363646", -- sumiInk5
  },
}

M.base24 = {
  base00 = "#1f1f28", -- sumiInk3: default background
  base01 = "#2a2a37", -- sumiInk4: lighter background (status bars)
  base02 = "#363646", -- sumiInk5: selection background
  base03 = "#727169", -- fujiGray: comments, invisibles
  base04 = "#9e9b93", -- dragonGray2: dark foreground (status bars)
  base05 = "#dcd7ba", -- fujiWhite: default foreground
  base06 = "#c8c093", -- oldWhite: light foreground
  base07 = "#e1e1de", -- canvasWhite4: light background (kanagawa-paper canvas)
  base08 = "#c4746e", -- dragonRed: variables, tags, deleted
  base09 = "#b6927b", -- dragonOrange: numbers, constants, booleans
  base0A = "#c4b28a", -- dragonYellow: classes, search, bold
  base0B = "#8a9a7b", -- dragonGreen2: strings, inserted
  base0C = "#8ea49e", -- dragonAqua: support, regex, escapes
  base0D = "#859fac", -- dragonBlue2: functions, headings
  base0E = "#a292a3", -- dragonPink: keywords, changed
  base0F = "#9d7665", -- dragonOrange2: deprecated, embedded tags
  base10 = "#16161d", -- sumiInk0: darker background
  base11 = "#0f0f15", -- sumiInkn1: darkest background
  base12 = "#cc928e", -- dragonRedBright: bright red
  base13 = "#d4c196", -- dragonYellowBright: bright yellow
  base14 = "#72a072", -- dragonGreenBright: bright green
  base15 = "#96ada7", -- dragonAquaBright: bright cyan
  base16 = "#96b3c1", -- dragonBlue2Bright: bright blue
  base17 = "#b4a7b5", -- dragonPinkBright: bright magenta
}

return M
