#!/bin/bash

# 确保脚本在出错时退出
set -e

# 默认输出颜色
DEFAULT="\033[0m"
# 绿色输出
GREEN="\033[0;32m"
# 红色输出
RED="\033[0;31m"
# 黄色输出
YELLOW="\033[0;33m"

# 打印带颜色的日志
function log() {
    echo -e "$GREEN[INFO]$DEFAULT $1"
}

# 打印错误日志
function error() {
    echo -e "$RED[ERROR]$DEFAULT $1"
}

# 打印警告日志
function warn() {
    echo -e "$YELLOW[WARN]$DEFAULT $1"
}

log "开始热编译..."

# 确保dist目录存在
mkdir -p dist

# 运行npm watch命令，并将输出重定向到一个临时文件
npm run watch > /tmp/ast-explorer-helper-watch.log 2>&1 &
WATCH_PID=$!

log "热编译已启动，PID: $WATCH_PID"
log "按 Ctrl+C 停止热编译"

# 捕获SIGINT信号（Ctrl+C）
trap 'log "停止热编译..."; kill $WATCH_PID; exit 0' SIGINT

# 保持脚本运行
while true; do
    sleep 1
    # 如果npm watch进程不存在，输出错误信息并退出
    if ! kill -0 $WATCH_PID 2>/dev/null; then
        error "热编译进程异常终止，请检查日志 /tmp/ast-explorer-helper-watch.log"
        exit 1
    fi
done