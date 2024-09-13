ARG BUILD_FROM=ghcr.io/home-assistant/amd64-base-debian:bullseye
FROM $BUILD_FROM

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Install dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    git \
    postgresql \
    postgresql-server-dev-13 \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

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
RUN mkdir -p /var/log/postgresql && chown postgres:postgres /var/log/postgresql

# Expose the API port and PostgreSQL port
EXPOSE 8000 5432

# Set up s6-overlay entrypoint
ENTRYPOINT ["/init"]
