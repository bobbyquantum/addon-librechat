ARG BUILD_FROM
FROM $BUILD_FROM

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Use build arguments
ARG PYTHON_VERSION
ARG RAG_API_VERSION

# Install dependencies
RUN apk add --no-cache \
    build-base \
    python3-dev \
    libffi-dev

# Set working directory
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip${PYTHON_VERSION} install --no-cache-dir -r requirements.txt

# Copy RAG API files
COPY rag_api/ .

# Copy .env.example
COPY .env.example .

# Copy run script
COPY run.sh /
RUN chmod a+x /run.sh

# Set labels
LABEL \
    io.hass.name="RAG API" \
    io.hass.description="RAG API for LibreChat" \
    io.hass.version=${RAG_API_VERSION} \
    io.hass.type="addon" \
    io.hass.arch="aarch64,amd64"

# Expose the API port
EXPOSE 3085

# Start the service
CMD [ "/run.sh" ]
