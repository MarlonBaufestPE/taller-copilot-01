FROM python:3.11-slim

# Install Poetry
ENV POETRY_VERSION=1.8.3 \
    POETRY_HOME=/opt/poetry \
    POETRY_VENV=/opt/poetry-venv \
    POETRY_CACHE_DIR=/opt/.cache

RUN python3 -m venv $POETRY_VENV \
    && $POETRY_VENV/bin/pip install --upgrade pip \
    && $POETRY_VENV/bin/pip install poetry==${POETRY_VERSION}

ENV PATH="${POETRY_VENV}/bin:${PATH}"

WORKDIR /app

# Copy dependency files first to leverage Docker layer caching
COPY pyproject.toml poetry.lock* ./

# Install production dependencies only (no virtualenv inside container)
RUN poetry config virtualenvs.create false \
    && poetry install --without dev --no-interaction --no-ansi

# Copy application source
COPY app ./app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
