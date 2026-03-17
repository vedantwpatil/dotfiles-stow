# SECTION 1: INSTANT PROMPT (P10k Optimization)
# Toggle: Uncomment this block ONLY if using Powerlevel10k
# if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
#   source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
# fi

# SECTION 2: CORE CONFIGURATION & PATHS (Optimized)
export ZSH="$HOME/.oh-my-zsh"

# --- THEME SELECTION ---
# Option A: Starship (Current) - Disable OMZ theme to let Starship handle rendering
ZSH_THEME="" 

# Option B: Powerlevel10k (Disabled)
# ZSH_THEME="powerlevel10k/powerlevel10k"

# --- PLUGINS ---
# Minimized plugin list for speed. Heavier tools are lazy-loaded below.
plugins=(
    git 
    zsh-autosuggestions 
    fast-syntax-highlighting
    tmux
    python
    rust
    golang
    web-search
)

# --- ENVIRONMENT VARIABLES ---
export BKMR_DB_URL="$HOME/.config/bkmr/bkmr.db"
export LANG=en_US.UTF-8
export EDITOR=nvim
export VISUAL=nvim 
export EZA_CONFIG_DIR="$HOME/.config/eza"
export AWS_REGION=us-east-1

# --- PATH OPTIMIZATION (Zero-Fork Strategy) ---
# Hardcoded paths prevent slow $(brew --prefix) subshells at startup
export OPENSSL_ROOT_DIR="/opt/homebrew/opt/openssl@3"
export CMAKE_PREFIX_PATH="/opt/homebrew/opt/qt@5"

# Unique path array construction
typeset -U path 
path=(
    "$HOME/.local/bin"
    "$HOME/.pixi/bin"
    "$HOME/go/bin"
    "$HOME/.cabal/bin"
    "$HOME/.ghcup/bin"
    "$HOME/.cargo/bin"
    "$HOME/.spicetify"
    "/opt/homebrew/opt/qt@5/bin"
    "/usr/local/opt/postgresql@15/bin"
    "/opt/homebrew/lib/pkgconfig" 
    $path
)

# SECTION 3: LAZY LOADING 

# Lazy Load Conda
conda() {
    unfunction conda
    if [ -f "$HOME/miniconda3/etc/profile.d/conda.sh" ]; then
        . "$HOME/miniconda3/etc/profile.d/conda.sh"
    else
        export PATH="$HOME/miniconda3/bin:$PATH"
    fi
    conda "$@"
}

# Lazy Load NVM
export NVM_DIR="$HOME/.nvm"
nvm() {
    unfunction nvm
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
    nvm "$@"
}

# Lazy Load rbenv
rbenv() {
    unfunction rbenv
    eval "$(command rbenv init -)"
    rbenv "$@"
}

# SECTION 4: OH MY ZSH & TOOLS

# Initialize Docker Completions (Pre-compinit fix)
fpath=($HOME/.docker/completions $fpath)

source $ZSH/oh-my-zsh.sh

# Initialize Zoxide (Fast enough to keep eager)
eval "$(zoxide init --cmd cd zsh)"

# iTerm2 Integration
[[ -e "$HOME/.iterm2_shell_integration.zsh" ]] && source "$HOME/.iterm2_shell_integration.zsh"

# SECTION 5: ALIASES & FUNCTIONS
alias ls='eza --icons --group-directories-first'
alias la='eza -l --icons --git --header --time-style=relative --hyperlink --group-directories-first --all'
alias lt='eza --tree --icons=auto --level=2'
alias clangs='clang -pedantic-errors -Wall'
alias spt="spotify_player"
alias helium="bkmr search --fzf | xargs open"
alias rm='trash'
alias realrm='/bin/rm'
alias g='git'

# ROS Development Wrapper
ros_dev() {
  if (( $# % 2 != 0 )); then
    echo "Usage: ros_dev <container_name> <project_path> ..."
    return 1
  fi
  while (( $# >= 2 )); do
    ROS_DEV_CONTAINER_NAME=$1
    local SCRIPT_DIR="$HOME/Documents/cs/research/ros2-docker-dev" 
    shift 2
    if [ -d "$SCRIPT_DIR" ]; then
        (cd "$SCRIPT_DIR" && docker-compose up -d --build)
    fi
  done
}

# Bookmarker
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

# SECTION 6: PROMPT ENGINE INIT (Bottom of file)

# --- OPTION A: STARSHIP (Active) ---
# Initialize Starship
eval "$(starship init zsh)"

# --- OPTION B: POWERLEVEL10K (Disabled) ---
# Load Powerlevel10k config (must be at the very end)
# [[ -f ~/.p10k.zsh ]] && source ~/.p10k.zsh
