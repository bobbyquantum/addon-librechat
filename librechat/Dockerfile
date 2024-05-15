ARG BUILD_FROM=ghcr.io/bobbyquantum/addon-base-ubuntu-node-mongo:1.0.1
FROM $BUILD_FROM
ARG BUILD_ARCH

ARG MEILISEARCH_VERSION
ARG LIBRECHAT_VERSION

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Copy root filesystem
COPY rootfs /

RUN cd /opt/proxy && npm install http-proxy express http-proxy-middleware body-parser && \
    curl -OL https://github.com/meilisearch/meilisearch/releases/download/${MEILISEARCH_VERSION}/meilisearch-linux-${BUILD_ARCH} && \
    mv meilisearch-linux-${BUILD_ARCH} /opt/meilisearch && \
    # install librechat
    mkdir /opt/librechat && \
    cd /opt/librechat && \
    git clone https://github.com/danny-avila/LibreChat.git . && \
    git checkout tags/${LIBRECHAT_VERSION} && \
    npm ci && npm run frontend && \
    # fix permissions
    chmod +x /etc/services.d/mongodb/run \
    /etc/services.d/mongodb/finish \
    /etc/services.d/librechat/run \
    /etc/services.d/librechat/finish \
    /etc/services.d/meilisearch/run \
    /etc/services.d/meilisearch/finish \
    /etc/services.d/ingress_proxy/run \
    /etc/services.d/ingress_proxy/finish \
    /opt/meilisearch


# Expose the MongoDB default port
#EXPOSE 27017

EXPOSE 3080
EXPOSE 5054