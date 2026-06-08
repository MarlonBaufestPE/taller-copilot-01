from datetime import datetime, timedelta, timezone
from typing import Optional

from jose import JWTError, jwt
from passlib.context import CryptContext

SECRET_KEY = "change-me-in-production-use-a-long-random-secret"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_SECONDS = 300
REFRESH_TOKEN_EXPIRE_SECONDS = 7 * 24 * 3600  # 7 days

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# In-memory "user database" with a single admin account
USERS_DB: dict[str, dict] = {
    "admin": {
        "username": "admin",
        "hashed_password": pwd_context.hash("admin123"),
    }
}


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def authenticate_user(username: str, password: str) -> Optional[dict]:
    user = USERS_DB.get(username)
    if not user:
        return None
    if not verify_password(password, user["hashed_password"]):
        return None
    return user


def create_token(data: dict, expires_delta: timedelta, token_type: str = "access") -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire, "type": token_type})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def create_access_token(username: str) -> str:
    return create_token(
        data={"sub": username},
        expires_delta=timedelta(seconds=ACCESS_TOKEN_EXPIRE_SECONDS),
        token_type="access",
    )


def create_refresh_token(username: str) -> str:
    return create_token(
        data={"sub": username},
        expires_delta=timedelta(seconds=REFRESH_TOKEN_EXPIRE_SECONDS),
        token_type="refresh",
    )


def decode_refresh_token(token: str) -> Optional[str]:
    """Decode a refresh token and return the username, or None if invalid."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("type") != "refresh":
            return None
        username: Optional[str] = payload.get("sub")
        return username
    except JWTError:
        return None
