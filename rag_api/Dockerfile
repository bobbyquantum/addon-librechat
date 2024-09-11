ARG BUILD_FROM
FROM $BUILD_FROM

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Install dependencies
RUN apk add --no-cache \
    build-base \
    python3-dev \
    libffi-dev \
    git

# Set working directory
WORKDIR /app

# Clone the RAG API repository
RUN git clone https://github.com/danny-avila/rag_api.git . && \
    pip install --no-cache-dir -r requirements.txt

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
