FROM ubuntu:latest
RUN useradd -m -u 1000 app \
  && apt update && apt install git curl unzip -y \
  && curl -fsSL https://deno.land/x/install/install.sh | DENO_INSTALL=/usr sh
USER 1000
WORKDIR /app
