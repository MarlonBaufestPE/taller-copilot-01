from fastapi import FastAPI, HTTPException, status

from app.auth import (
    ACCESS_TOKEN_EXPIRE_SECONDS,
    authenticate_user,
    create_access_token,
    create_refresh_token,
    decode_refresh_token,
)
from app.models import AccessTokenResponse, LoginRequest, RefreshRequest, TokenResponse

app = FastAPI(
    title="JWT Authentication Service",
    description="FastAPI service that issues and refreshes JWT tokens.",
    version="0.1.0",
)


@app.get("/health", tags=["health"])
def health_check() -> dict:
    """Simple liveness probe."""
    return {"status": "ok"}


@app.post(
    "/auth/login",
    response_model=TokenResponse,
    status_code=status.HTTP_200_OK,
    tags=["auth"],
    summary="Login and obtain JWT tokens",
)
def login(request: LoginRequest) -> TokenResponse:
    """
    Authenticate with **username** and **password**.

    Returns an `access_token` (valid for 300 s) and a `refresh_token`.
    """
    user = authenticate_user(request.username, request.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return TokenResponse(
        access_token=create_access_token(user["username"]),
        refresh_token=create_refresh_token(user["username"]),
        expires_in=ACCESS_TOKEN_EXPIRE_SECONDS,
    )


@app.post(
    "/auth/refresh",
    response_model=AccessTokenResponse,
    status_code=status.HTTP_200_OK,
    tags=["auth"],
    summary="Refresh the access token",
)
def refresh_token(request: RefreshRequest) -> AccessTokenResponse:
    """
    Exchange a valid **refresh_token** for a new `access_token`.
    """
    username = decode_refresh_token(request.refresh_token)
    if not username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return AccessTokenResponse(
        access_token=create_access_token(username),
        expires_in=ACCESS_TOKEN_EXPIRE_SECONDS,
    )
