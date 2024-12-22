# Build stage for pgvector
ARG BUILD_FROM=ghcr.io/home-assistant/amd64-base-debian:bullseye
FROM $BUILD_FROM as builder

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    curl \
    gnupg2 \
    lsb-release \
    && curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor -o /usr/share/keyrings/postgresql-keyring.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/postgresql-keyring.gpg] http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
    postgresql-server-dev-15 \
    && apt-get remove -y curl gnupg2 lsb-release \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*

# Build pgvector
WORKDIR /build
RUN git clone --depth 1 https://github.com/pgvector/pgvector.git . && \
    make USE_PGXS=1 && \
    make USE_PGXS=1 install && \
    echo "Verifying installation..." && \
    ls -la /usr/lib/postgresql/15/lib/vector.so && \
    ls -la /usr/share/postgresql/15/extension/vector* && \
    cp /usr/lib/postgresql/15/lib/vector.so /usr/lib/postgresql/15/lib/pgvector.so

# Download RAG API source
WORKDIR /rag_api
RUN apt-get update && apt-get install -y --no-install-recommends git && \
    git clone --depth 1 -b v0.3.0 https://github.com/danny-avila/rag_api.git . && \
    rm -rf .git

# Final stage
FROM $BUILD_FROM

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Install runtime dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    curl \
    gnupg2 \
    lsb-release \
    && curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor -o /usr/share/keyrings/postgresql-keyring.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/postgresql-keyring.gpg] http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    postgresql-15 \
    postgresql-client-15 \
    libpq5 \
    && apt-get remove -y curl gnupg2 lsb-release \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*

# Set PostgreSQL environment variables
ENV PATH $PATH:/usr/lib/postgresql/15/bin
ENV PGDATA /var/lib/postgresql/data

# Copy pgvector from builder
COPY --from=builder /usr/lib/postgresql/15/lib/pgvector.so /usr/lib/postgresql/15/lib/
COPY --from=builder /usr/share/postgresql/15/extension/vector* /usr/share/postgresql/15/extension/

# Set working directory
WORKDIR /app

# Copy RAG API source
COPY --from=builder /rag_api /app

# Install Python dependencies
RUN pip3 install --no-cache-dir -r requirements.txt

# Create an empty .env file
RUN touch .env

# Copy rootfs
COPY rootfs /

# Make sure scripts are executable
RUN chmod a+x /etc/services.d/*/run /etc/services.d/*/finish

# Create necessary directories
RUN mkdir -p /var/lib/postgresql/data && chown -R postgres:postgres /var/lib/postgresql

# Expose the API port and PostgreSQL port
EXPOSE 8000 5432

# Set up s6-overlay entrypoint
ENTRYPOINT ["/init"]
