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
    && rm -rf /var/lib/apt/lists/*

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

# Expose the API port
EXPOSE 8000

# Set up s6-overlay entrypoint
ENTRYPOINT ["/init"]
