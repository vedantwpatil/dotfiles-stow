# ===== Fast Prompt Initialization =====
# Powerlevel10k instant prompt (must stay at top)
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# ===== Oh My Zsh Configuration =====
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="powerlevel10k/powerlevel10k"

# Essential plugins
plugins=(
    git 
    zsh-autosuggestions 
    fast-syntax-highlighting
    tmux
    python
    golang
    rust
    you-should-use
    web-search
)

# ===== Environment Variables =====
export LANG=en_US.UTF-8
export OPENSSL_ROOT_DIR="$(brew --prefix openssl@3)"
export EDITOR=nvim
export VISUAL=nvim 
export EZA_CONFIG_DIR="$HOME/.config/eza"
export AWS_REGION=us-east-1

# ===== Path Configuration =====
# Group all PATH exports together
path_additions=(
    "$HOME/.pixi/bin"
    "$HOME/go/bin"
    "$HOME/.cargo/bin:$PATH"
    "$HOME/.spicetify"
    "$(brew --prefix qt@5)/bin"
    "/usr/local/opt/postgresql@15/bin"
)

# Add all paths at once (more efficient)
export PATH=$PATH:${(j.:.)path_additions}

# Add CMAKE path
export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$(brew --prefix qt@5)

# ===== Load Oh My Zsh =====
source $ZSH/oh-my-zsh.sh

# ===== Conda Setup (with optimized initialization) =====
# Initialize conda
__conda_setup="$('$HOME/miniconda3/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "$HOME/miniconda3/etc/profile.d/conda.sh" ]; then
        . "$HOME/miniconda3/etc/profile.d/conda.sh"
    else
        export PATH="$HOME/miniconda3/bin:$PATH"
    fi
fi
unset __conda_setup

# ===== Tool Initializations =====
# Zoxide (modern cd command)
 eval "$(zoxide init --cmd cd zsh)"

# TheFuck command correction tool
eval $(thefuck --alias tf)

# Ruby Version manager 
eval "$(rbenv init -)"

# iTerm2 integration (conditionally loaded)
[[ -e "$HOME/.iterm2_shell_integration.zsh" ]] && source "$HOME/.iterm2_shell_integration.zsh"

# EZA - better ls command configuration 

alias ls='eza'

# Alias to show all files, including hidden ones, in a long list format
alias la='eza -la --icons=auto --git'

# Alias for a tree view
alias lt='eza --tree --icons=auto --level=2' # Shows a directory tree up to 2 levels deep 

# Clang Parameters for stricter guildines while writing C 
alias clangs='clang -pedantic-errors -Wall'


# ===== Theme Configuration =====
# Load Powerlevel10k config
[[ -f ~/.p10k.zsh ]] && source ~/.p10k.zsh

# ===== Development Tools =====
# NVM (lazy-loaded to improve startup time)
export NVM_DIR="$HOME/.nvm"
# Only load NVM when first needed
nvm() {
  unset -f nvm
  [ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
  [ -s "$NVM_DIR/bash_completion" ] && source "$NVM_DIR/bash_completion"
  nvm "$@"
}

# ===== Custom Functions =====
# ROS Development Environment Setup
  
ros_dev() {
  # Check if the correct number of arguments were provided
  if (( $# % 2 != 0 )); then
    echo "Usage: ros_dev <container_name1> <project_path1> [<container_name2> <project_path2> ...]"
    return 1
  fi

  while (( $# >= 2 )); do
    # Set environment variables
    ROS_DEV_CONTAINER_NAME=$1
    ROS_PROJECT_PATH=$2
    SCRIPT_DIR = /Users/vedantpatil/Documents/cs/research/ros2-docker-dev
    shift 2

    # Run docker-compose from the correct directory
    cd "$SCRIPT_DIR" && docker-compose up -d --build
  done
}

# Yazi Shell wrapper 
y() {
  local tmp="$(mktemp -t "yazi-cwd.XXXXXX")" cwd target

  # Determine target directory using zoxide if an argument is provided
  if [ -n "$1" ]; then
    target=$(zoxide query "$1")
    if [ -n "$target" ]; then
      # Launch yazi in the directory zoxide found
      yazi "$target" --cwd-file="$tmp"
    else
      # Zoxide didn't find a match, launch yazi in current directory
      yazi "$@" --cwd-file="$tmp"
    fi
  else
    # No argument provided, launch yazi in the current directory
    yazi --cwd-file="$tmp"
  fi

  # Change directory after yazi closes
  if cwd="$(command cat -- "$tmp")" && [ -n "$cwd" ] && [ "$cwd" != "$PWD" ]; then
    builtin cd -- "$cwd"
  fi

  rm -f -- "$tmp"
}

# Ensuring remote sessions features the proper colors 
case "$TERM" in
  xterm-color|*-256color|xterm-ghostty) color_prompt=yes;;
esac

# ===== Optional Features (currently disabled) =====
# Starship prompt (alternative to Powerlevel10k)
# eval "$(starship init zsh)"
# The following lines have been added by Docker Desktop to enable Docker CLI completions.

fpath=(/Users/vedantpatil/.docker/completions $fpath)
autoload -Uz compinit
compinit
# End of Docker CLI completions
eval "$(alias sketchybar="$HOME/.config/sketchybar/set-bar-mode.sh")"
