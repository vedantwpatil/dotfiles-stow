# =============================================================================
# 1. ZINIT INSTALLER
# =============================================================================
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
if [ ! -d "$ZINIT_HOME" ]; then
   mkdir -p "$(dirname "$ZINIT_HOME")"
   git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
fi
source "${ZINIT_HOME}/zinit.zsh"
autoload -Uz _zinit
(( ${+_comps} )) && _comps[zinit]=_zinit

# =============================================================================
# 2. ENVIRONMENT VARIABLES & PATH
# =============================================================================
export BKMR_DB_URL="$HOME/.config/bkmr/bkmr.db"
export EDITOR=nvim
export VISUAL=nvim
export LANG=en_US.UTF-8
export EZA_CONFIG_DIR="$HOME/.config/eza"
export AWS_REGION=us-east-1
export OPENSSL_ROOT_DIR="/opt/homebrew/opt/openssl@3"
export CMAKE_PREFIX_PATH="/opt/homebrew/opt/qt@5"

typeset -U path fpath
path=(
    "$HOME/.local/bin"
    "$HOME/.pixi/bin"
    "$HOME/go/bin"
    "$HOME/.cargo/bin"
    "$HOME/.spicetify"
    "/opt/homebrew/opt/qt@5/bin"
    "/usr/local/opt/postgresql@15/bin"
    "/opt/homebrew/lib/pkgconfig"
    $path
)

# =============================================================================
# 3. LOAD STARSHIP PROMPT (eager — must appear before turbo plugins)
# =============================================================================
zinit ice as"command" from"gh-r" \
          atclone"./starship init zsh > init.zsh; ./starship completions zsh > _starship" \
          atpull"%atclone" \
          src"init.zsh"
zinit load starship/starship

# =============================================================================
# 4. PLUGINS
# =============================================================================

# --- Core OMZ Utilities ---
zinit wait lucid for \
    OMZP::extract \
    OMZP::sudo \
    OMZP::web-search \
    MichaelAquilina/zsh-you-should-use

# --- BAT (cat replacement) ---
zinit ice as"program" from"gh-r" mv"bat* -> bat" pick"bat/bat" wait lucid \
    atclone"./bat/bat --generate shell-completions zsh > _bat" \
    atpull"%atclone"
zinit load sharkdp/bat

# --- EZA (ls replacement) ---
zinit ice wait lucid as"program" from"gh-r" pick"eza" \
    atclone"./eza --completions zsh > _eza" \
    atpull"%atclone"
zinit load eza-community/eza

# --- FD (find replacement) ---
zinit ice as"program" from"gh-r" mv"fd* -> fd" pick"fd/fd" wait lucid \
    atclone"./fd/fd --gen-completions zsh > _fd" \
    atpull"%atclone"
zinit load sharkdp/fd

# --- FZF (fuzzy finder) ---
zinit ice as"program" from"gh-r" wait lucid \
    atclone"./fzf --zsh > init.zsh" \
    atpull"%atclone" \
    src"init.zsh" \
    atload'export FZF_DEFAULT_COMMAND="fd --type f --strip-cwd-prefix --hidden --follow --exclude .git"; export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"'
zinit light junegunn/fzf

# --- RIPGREP (grep replacement) ---
zinit ice as"program" from"gh-r" mv"ripgrep* -> ripgrep" pick"ripgrep/rg" wait lucid \
    atclone"./ripgrep/rg --generate complete-zsh > _rg" \
    atpull"%atclone"
zinit load BurntSushi/ripgrep

# --- TLDR (tealdeer) ---
zinit ice wait lucid as"command" from"gh-r" mv"tealdeer* -> tldr" pick"tldr"
zinit load tealdeer-rs/tealdeer

# --- ZOXIDE (smarter cd) — eager so `cd` works from the first command ---
zinit ice as"program" from"gh-r" pick"zoxide" \
    atclone"./zoxide init zsh --cmd cd > init.zsh" \
    atpull"%atclone" \
    src"init.zsh" nocompile"init.zsh"
zinit light ajeetdsouza/zoxide

# --- Completions, Suggestions & Highlighting ---

# Docker completions (must be in fpath before compinit runs below)
fpath=($HOME/.docker/completions $fpath)

# Load extra completions first (blockf prevents them overriding zinit's fpath)
zinit wait lucid blockf atpull"zinit creinstall -q ." for \
    zsh-users/zsh-completions

# IMPORTANT ORDER: compinit -> fzf-tab -> syntax-highlighting -> autosuggestions
zinit wait lucid \
    atinit"zicompinit; zicdreplay" \
    atload'compdump="${ZSH_COMPDUMP:-${ZDOTDIR:-$HOME}/.zcompdump}";
            [[ ! -s "${compdump}.zwc" || "$compdump" -nt "${compdump}.zwc" ]] &&
            zcompile "$compdump" &!' \
    for Aloxaf/fzf-tab \
        zdharma-continuum/fast-syntax-highlighting \
    atload"_zsh_autosuggest_start" \
        zsh-users/zsh-autosuggestions

# =============================================================================
# 5. LAZY LOADERS
# =============================================================================

# Conda — only initialized on first use
conda() {
    unfunction conda
    if [ -f "$HOME/miniforge3/etc/profile.d/conda.sh" ]; then
        . "$HOME/miniforge3/etc/profile.d/conda.sh"
    else
        export PATH="$HOME/miniforge3/bin:$PATH"
    fi
    conda "$@"
}

# mise — polyglot version manager (node/ruby/python/go...). Replaces nvm+rbenv.
# Per-project .tool-versions / mise.toml auto-switch on cd. `mise use -g node@lts`.
if (( $+commands[mise] )); then
    eval "$(mise activate zsh)"
fi

# =============================================================================
# 6. SHELL INTEGRATIONS
# =============================================================================

# iTerm2
[[ -e "$HOME/.iterm2_shell_integration.zsh" ]] && source "$HOME/.iterm2_shell_integration.zsh"

# Clipboard (macOS early-exit, then Linux/WSL/Cygwin)
() {
  if [[ $OSTYPE == darwin* ]]; then
    pbcopy()  { command pbcopy  "$@"; }
    pbpaste() { command pbpaste "$@"; }
  elif [[ -n $WAYLAND_DISPLAY ]] && (( $+commands[wl-copy] )); then
    pbcopy()  { wl-copy "$@"; }
    pbpaste() { wl-paste --no-newline "$@"; }
  elif [[ -n $DISPLAY ]] && (( $+commands[xclip] )); then
    pbcopy()  { xclip -selection clipboard -in  "$@"; }
    pbpaste() { xclip -selection clipboard -out "$@"; }
  elif [[ -n $DISPLAY ]] && (( $+commands[xsel] )); then
    pbcopy()  { xsel --clipboard --input  "$@"; }
    pbpaste() { xsel --clipboard --output "$@"; }
  elif (( $+commands[wl-copy] )); then
    pbcopy()  { wl-copy "$@"; }
    pbpaste() { wl-paste --no-newline "$@"; }
  elif [[ $OSTYPE == linux* && -r /proc/version && "$(< /proc/version)" == *[Mm]icrosoft* ]]; then
    pbcopy()  { clip.exe; }
    pbpaste() { powershell.exe -NoProfile -NonInteractive -Command Get-Clipboard | tr -d '\r'; }
  elif [[ $OSTYPE == (cygwin*|msys) ]]; then
    pbcopy()  { tee > /dev/clipboard; }
    pbpaste() { print -- "$(< /dev/clipboard)"; }
  else
    clip() {
      print -u2 "clip: no clipboard backend detected on this system"
      return 127
    }
    return 0
  fi
  clip() {
    if [[ -t 0 ]]; then
      pbpaste
    else
      pbcopy
    fi
  }
}

# =============================================================================
# 7. HISTORY
# =============================================================================
HISTSIZE=20000
SAVEHIST=20000
HISTFILE=~/.zsh_history
setopt HIST_IGNORE_DUPS
setopt HIST_EXPIRE_DUPS_FIRST
setopt HIST_FIND_NO_DUPS
setopt HIST_IGNORE_SPACE
setopt HIST_VERIFY
setopt HIST_REDUCE_BLANKS
setopt SHARE_HISTORY
setopt AUTO_CD

# =============================================================================
# 8. COMPLETION STYLING
# =============================================================================

# Case-insensitive matching
zstyle ':completion:*' matcher-list 'm:{a-zA-Z}={A-Za-z}' 'r:|[._-]=* r:|=*'
# Colored completion list
zstyle ':completion:*' list-colors "${(s.:.)LS_COLORS}"
# Arrow-key menu navigation
zstyle ':completion:*:*:*:*:*' menu select
# Group results by category
zstyle ':completion:*' group-name ''
zstyle ':completion:::::' completer _expand _complete _ignored _approximate
# Required for fzf-tab group support
zstyle ':completion:*:descriptions' format '[%d]'

# fzf-tab: preview directory contents with eza when completing cd
zstyle ':fzf-tab:complete:cd:*' fzf-preview 'eza -1 --color=always -- "$realpath"'
# fzf-tab: switch groups with < and >
zstyle ':fzf-tab:*' switch-group '<' '>'
# fzf-tab: scroll preview with Ctrl-j/k
zstyle ':fzf-tab:*' fzf-flags --bind 'ctrl-j:preview-down' --bind 'ctrl-k:preview-up'

# =============================================================================
# 9. ALIASES & FUNCTIONS
# =============================================================================

# --- Navigation ---
alias -- -='cd -'
alias ..='cd ..'
alias ...='cd ../..'
alias md='mkdir -p'

# --- Quick Edits ---
_edit() {
  local editor="${VISUAL:-${EDITOR:-$(command -v nano 2>/dev/null || command -v vi 2>/dev/null)}}"
  if [[ -z "$editor" ]]; then
    echo "No editor found (tried \$VISUAL, \$EDITOR, nano, vi)" >&2
    return 1
  fi
  "$editor" "$@"
}
sconf()  { _edit "${XDG_CONFIG_HOME:-$HOME/.config}/starship.toml" }
zconf()  { _edit "${ZDOTDIR:-$HOME}/.zshrc" }
zlocal() { _edit "${ZDOTDIR:-$HOME}/.zshrc.local" }
alias reload='exec zsh'

# --- Git ---
alias g='git'
alias ga='git add'
alias gaa='git add -A'
alias gc='git commit'
alias gcm='git commit -m'
alias gcam='git commit --amend'
alias gcb='git checkout -b'
alias gcl='git clone'
alias gco='git checkout'
alias gd='git diff'
alias gds='git diff --staged'
alias gf='git fetch'
alias gl='git log --oneline --graph --decorate'
alias gla='git log --oneline --graph --decorate --all'
alias gm='git merge'
alias gp='git push'
alias gpf='git push --force-with-lease'
alias gpl='git pull'
alias gpr='git pull --rebase'
alias grb='git rebase'
alias grbi='git rebase -i'
alias grs='git restore'
alias grss='git restore --staged'
alias gs='git status'
alias gss='git status -s'
alias gst='git stash'
alias gstp='git stash pop'
alias gstl='git stash list'
alias gsw='git switch'
alias gswc='git switch -c'
alias gpsu='git push --set-upstream origin $(git branch --show-current)'
alias gundo='git reset --soft HEAD~1'
alias gnuke='git reset --hard HEAD~1'
alias gbr='git branch --sort=-committerdate'

gopen() {
  local url=$(git remote get-url origin 2>/dev/null)
  [[ -z "$url" ]] && echo "No remote 'origin' found" && return 1
  url=$(echo "$url" | sed 's|^git@\(.*\):|https://\1/|; s|\.git$||')
  open "$url" 2>/dev/null || xdg-open "$url" 2>/dev/null || { echo "Could not open: $url" >&2; return 1; }
}

# --- Disk ---
alias df='df -h'

# --- Eza (ls replacement) ---
if [[ -n "${commands[eza]}" ]]; then
    alias ls='eza --icons --group-directories-first --git'
    alias l='eza -lh --icons --git --group-directories-first'
    alias ll='eza -l --icons --git --group-directories-first'
    alias la='eza -lah --icons --git --group-directories-first --header --time-style=relative'
    alias lt='eza --tree --level=2 --icons'
else
    alias ls='ls --color=auto'
    alias ll='ls -lah'
fi

# --- Modern Toolset ---
alias cat='bat -p --paging=never'
alias catp='bat'
alias h='tldr'
alias hup='tldr --update'
alias du='dust'
alias top='btm'
alias htop='btm'
alias watch='viddy'
alias bench='hyperfine'
# rg, procs, gping, choose, delta — use directly; aliasing breaks scripts

help() { tldr "$@" 2>/dev/null || man "$@" }

# --- Personal ---
alias rm='trash'
alias realrm='/bin/rm'
alias spt='spotify_player'
alias helium='bkmr search --fzf | xargs open'
alias clangs='clang -pedantic-errors -Wall'

bks() {
   local cmd='bkmr search --json "" | jq -r ".[] | [.id, .url, (.metadata // \"No Title\")] | @tsv"'
   eval "$cmd" | fzf --height 40% --layout=reverse \
    --header="Enter: Open | Ctrl-D: Delete" \
    --delimiter="\t" --with-nth=2,3 \
    --bind 'enter:execute(
        url=$(echo {} | cut -f2);
        if [[ "$url" == http* ]]; then
            open "$url"
        else
            echo "Not a web URL: $url"
        fi
    )+abort' \
    --bind "ctrl-d:execute(echo {1} | xargs bkmr delete)+reload($cmd)"
}

ros_dev() {
  if (( $# < 2 )) || (( $# % 2 != 0 )); then
    echo "Usage: ros_dev <container_name> <project_path> ..."
    return 1
  fi
  while (( $# >= 2 )); do
    local ROS_DEV_CONTAINER_NAME=$1
    local ROS_DEV_PROJECT_PATH=$2
    local SCRIPT_DIR="$HOME/Documents/cs/research/ros2-docker-dev"
    shift 2
    if [ -d "$SCRIPT_DIR" ]; then
        (cd "$SCRIPT_DIR" && \
         ROS_DEV_CONTAINER_NAME="$ROS_DEV_CONTAINER_NAME" \
         ROS_DEV_PROJECT_PATH="$ROS_DEV_PROJECT_PATH" \
         docker-compose up -d --build)
    fi
  done
}

# --- Zinit Maintenance ---
alias zini='zinit'
alias zup='zinit self-update && zinit update --parallel && zinit cclear && tldr --update'
alias zclean='zinit cclear && zinit delete --clean'

(( ${+aliases[zi]}  )) && unalias zi
(( ${+aliases[zpl]} )) && unalias zpl
(( ${+aliases[zplg]} )) && unalias zplg

# =============================================================================
# 10. KEYBINDINGS
# =============================================================================

bindkey -v
KEYTIMEOUT=15

# Restore useful ctrl bindings
bindkey '^R' history-incremental-search-backward
bindkey '^A' beginning-of-line
bindkey '^E' end-of-line
bindkey '^W' backward-kill-word
bindkey '^U' backward-kill-line
bindkey '^ ' forward-char

# Fix backspace
bindkey '^?' backward-delete-char

# Arrow keys + j/k in both modes
bindkey -M viins "${terminfo[kcuu1]}" up-line-or-search
bindkey -M viins "${terminfo[kcud1]}" down-line-or-search
bindkey -M viins '^P' up-line-or-search
bindkey -M viins '^N' down-line-or-search
bindkey -M vicmd "${terminfo[kcuu1]}" up-line-or-search
bindkey -M vicmd "${terminfo[kcud1]}" down-line-or-search
bindkey -M vicmd 'k'  up-line-or-search
bindkey -M vicmd 'j'  down-line-or-search

# =============================================================================
# 10b. ATUIN — SQLite shell history, fuzzy Ctrl-R (must load AFTER ^R bind above)
# =============================================================================
# --disable-up-arrow keeps the j/k + arrow up-line-or-search bindings above.
if (( $+commands[atuin] )); then
    eval "$(atuin init zsh --disable-up-arrow)"
fi

# =============================================================================
# 11. Z-SHIFT SELF-MAINTENANCE
# =============================================================================
zshift-update() {
    local RED='\033[0;31m'
    local GREEN='\033[0;32m'
    local BLUE='\033[0;34m'
    local YELLOW='\033[1;33m'
    local NC='\033[0m'

    local DATE_STAMP BACKUP_FILE TEMP_ZSHRC UPDATE_URL
    DATE_STAMP=$(date +%Y%m%d_%H%M%S)
    BACKUP_FILE="$HOME/.zshrc.zshift_${DATE_STAMP}.bak"
    TEMP_ZSHRC="$(mktemp)"

    # Override ZSHIFT_CUSTOM_URL in .zshrc.local to point to your own fork
    UPDATE_URL="${ZSHIFT_CUSTOM_URL:-https://raw.githubusercontent.com/0xdilshan/Z-SHIFT/main/.zshrc}"

    echo -e "${BLUE}:: Initiating Z-Shift Update...${NC}"

    if ! curl -fsSL -o "$TEMP_ZSHRC" "$UPDATE_URL"; then
        echo -e "${RED}Error: Failed to download update.${NC}"
        rm -f "$TEMP_ZSHRC"
        return 1
    fi

    if ! grep -q "zdharma-continuum/zinit" "$TEMP_ZSHRC"; then
        echo -e "${RED}Error: Downloaded file is invalid.${NC}"
        rm -f "$TEMP_ZSHRC"
        return 1
    fi

    if [ -f "$HOME/.zshrc" ]; then
        echo -e "${YELLOW}:: Backing up current config to: ${NC}$BACKUP_FILE"
        cp "$HOME/.zshrc" "$BACKUP_FILE"
    fi

    if [ -f "$BACKUP_FILE" ] && ! diff -q "$HOME/.zshrc" "$BACKUP_FILE" > /dev/null 2>&1; then
        echo -e "${YELLOW}!! Warning: Your .zshrc has local modifications.${NC}"
        echo -e "${YELLOW}   These will be replaced. Move personal config to ~/.zshrc.local to preserve it.${NC}"
        echo -ne "${YELLOW}   Continue anyway? [y/N]: ${NC}"
        read -r REPLY
        if [[ ! "$REPLY" =~ ^[Yy]$ ]]; then
            echo -e "${BLUE}:: Update cancelled.${NC}"
            rm -f "$TEMP_ZSHRC"
            return 0
        fi
    fi

    mv "$TEMP_ZSHRC" "$HOME/.zshrc"
    echo -e "${GREEN}:: Configuration file updated.${NC}"

    if command -v zinit >/dev/null 2>&1; then
        echo -e "${BLUE}:: Updating Zinit and Plugins...${NC}"
        if ! (zinit self-update && zinit update --parallel); then
            echo -e "${RED}!! Plugin update failed. Rolling back...${NC}"
            if [ -f "$BACKUP_FILE" ]; then
                mv "$BACKUP_FILE" "$HOME/.zshrc"
            fi
            return 1
        fi
    fi

    echo -e "\n${GREEN}✔ Z-Shift Update Complete! Restarting shell...${NC}"
    exec zsh
}
alias zsu='zshift-update'

# =============================================================================
# 12. BYTE-COMPILATION & LOCAL CUSTOMIZATIONS
# =============================================================================
ZSHRC_DIR="${ZDOTDIR:-$HOME}"

auto_compile() {
    local file="$1"
    if [[ -f "$file" && ( ! -s "${file}.zwc" || "$file" -nt "${file}.zwc" ) ]]; then
        zcompile "$file" &!
    fi
}

auto_compile "$ZSHRC_DIR/.zshrc"

if [[ -f "$ZSHRC_DIR/.zshrc.local" ]]; then
    auto_compile "$ZSHRC_DIR/.zshrc.local"
    source "$ZSHRC_DIR/.zshrc.local"
fi


# Added by Antigravity CLI installer
export PATH="/Users/vedantpatil/.local/bin:$PATH"
