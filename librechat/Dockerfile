ARG BUILD_FROM=ghcr.io/hassio-addons/ubuntu-base:9.0.5
FROM $BUILD_FROM
ARG BUILD_ARCH

ARG MEILISEARCH_VERSION
ARG MONGODB_VERSION
ARG LIBRECHAT_VERSION
ARG NODE_VERSION
ARG NVM_VERSION


SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Copy root filesystem
COPY rootfs /

RUN apt-get update && apt-get install -y gnupg curl git && \
    #install meilisearch https://github.com/meilisearch/meilisearch/releases/download/v1.8.0/meilisearch-linux-aarch64
    curl -OL https://github.com/meilisearch/meilisearch/releases/download/${MEILISEARCH_VERSION}/meilisearch-linux-${BUILD_ARCH} && \
    mv meilisearch-linux-${BUILD_ARCH} /opt/meilisearch && \
    #install mongo
    curl -fsSL https://www.mongodb.org/static/pgp/server-${MONGODB_VERSION}.asc | \
    gpg --dearmor -o /usr/share/keyrings/mongodb-server-${MONGODB_VERSION}.gpg && \
    #todo review arch
    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-${MONGODB_VERSION}.gpg ] \
    https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/${MONGODB_VERSION} multiverse" | \
    tee /etc/apt/sources.list.d/mongodb-org-${MONGODB_VERSION}.list && \
    apt-get update && apt-get install -y mongodb-org && \
    echo "mongodb-org hold" | dpkg --set-selections && \
    echo "mongodb-org-database hold" | dpkg --set-selections && \
    echo "mongodb-org-server hold" | dpkg --set-selections && \
    echo "mongodb-mongosh hold" | dpkg --set-selections && \
    echo "mongodb-org-mongos hold" | dpkg --set-selections && \
    echo "mongodb-org-tools hold" | dpkg --set-selections  && \
    #install nvm and node
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/${NVM_VERSION}/install.sh | bash && \
    echo "source $HOME/.nvm/nvm.sh" >> $HOME/.bashrc && \
    /bin/bash -c "source $HOME/.nvm/nvm.sh; nvm install ${NODE_VERSION}" && \
    apt-get clean && rm -rf /var/lib/apt/lists/* && \
    chmod +x /etc/services.d/mongodb/run \
    /etc/services.d/mongodb/finish \
    /etc/services.d/librechat/run \
    /etc/services.d/librechat/finish \
    /etc/services.d/meilisearch/run \
    /etc/services.d/meilisearch/finish \
    /opt/meilisearch

WORKDIR /opt/librechat

RUN git clone https://github.com/danny-avila/LibreChat.git . && \
    git checkout tags/${LIBRECHAT_VERSION} && \
    /bin/bash -c "source $HOME/.nvm/nvm.sh; npm ci && npm run frontend"

# Expose the MongoDB default port
#EXPOSE 27017

EXPOSE 3080