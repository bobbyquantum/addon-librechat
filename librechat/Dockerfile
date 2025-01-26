ARG BUILD_FROM=ghcr.io/hassio-addons/ubuntu-base:10.0.3
FROM $BUILD_FROM

ARG BUILD_ARCH
ARG MONGODB_VERSION=7.0
ARG NODE_VERSION=v20.13.1
ARG MEILISEARCH_VERSION

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Install Node.js, MongoDB
RUN apt-get update && apt-get install -y gnupg git && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    curl -fsSL https://www.mongodb.org/static/pgp/server-${MONGODB_VERSION}.asc | \
    gpg --dearmor -o /usr/share/keyrings/mongodb-server-${MONGODB_VERSION}.gpg && \
    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-${MONGODB_VERSION}.gpg ] \
    https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/${MONGODB_VERSION} multiverse" | \
    tee /etc/apt/sources.list.d/mongodb-org-${MONGODB_VERSION}.list && \
    apt-get update && apt-get install -y mongodb-org-server && \
    echo "mongodb-org-server hold" | dpkg --set-selections && \
    apt-get purge -y gnupg && apt-get autoremove -y && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# CodeNotary configuration
ENV CAS_API_KEY=${CAS_API_KEY}
ENV CAS_SIGNER_EMAIL=bobby@quantum.observer
ENV CAS_BASE_IMAGE=notary@home-assistant.io

COPY rootfs /

RUN curl -OL https://github.com/meilisearch/meilisearch/releases/download/${MEILISEARCH_VERSION}/meilisearch-linux-${BUILD_ARCH} && \
    mv meilisearch-linux-${BUILD_ARCH} /opt/meilisearch && \
    # install librechat
    mkdir /opt/librechat && \
    cd /opt/librechat && \
    git clone https://github.com/danny-avila/LibreChat.git . && \
    npm ci && npm run frontend && \
    # fix permissions
    chmod +x /etc/services.d/mongodb/run \
    /etc/services.d/mongodb/finish \
    /etc/services.d/librechat/run \
    /etc/services.d/librechat/finish \
    /etc/services.d/meilisearch/run \
    /etc/services.d/meilisearch/finish \
    /opt/meilisearch && \
    chmod 644 /etc/ssl/openssl.cnf \
    /etc/lsb-release


# Expose the MongoDB default port
#EXPOSE 27017

EXPOSE 3080