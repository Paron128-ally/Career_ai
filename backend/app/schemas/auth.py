from typing import Any, Literal, Optional

from pydantic import BaseModel, EmailStr, Field


Role = Literal["student", "fresher", "working_professional"]


class SignInBody(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1)


class SignUpBody(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    role: Role = "student"


class CodeBody(BaseModel):
    code: str


class SessionUser(BaseModel):
    id: str
    email: Optional[str] = None
    role: Optional[str] = None
    user_metadata: dict[str, Any] = Field(default_factory=dict)


class SessionPayload(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: Optional[int] = None
    user: SessionUser
