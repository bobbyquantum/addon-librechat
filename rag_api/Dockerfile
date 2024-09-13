ARG BUILD_FROM=ghcr.io/home-assistant/amd64-base-debian:bullseye
FROM $BUILD_FROM

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Install PostgreSQL 15 and other dependencies
RUN apt-get update && apt-get install -y curl gnupg2 lsb-release && \
    curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor -o /usr/share/keyrings/postgresql-keyring.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/postgresql-keyring.gpg] http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list && \
    apt-get update && \
    apt-get install -y \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    git \
    postgresql-15 \
    postgresql-client-15 \
    postgresql-server-dev-15 \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Set PostgreSQL environment variables
ENV PATH $PATH:/usr/lib/postgresql/15/bin
ENV PGDATA /var/lib/postgresql/data

# Install pgvector
RUN git clone https://github.com/pgvector/pgvector.git \
    && cd pgvector \
    && make \
    && make install

# Set working directory
WORKDIR /app

# Clone the RAG API repository
RUN git clone https://github.com/danny-avila/rag_api.git .

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
