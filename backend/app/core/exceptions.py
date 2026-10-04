from fastapi import HTTPException, status


class CareerAIException(Exception):
    """Base exception for application-level errors."""


class NotConfiguredError(CareerAIException):
    """Raised when an optional integration has not been configured yet."""


def bad_request(message: str) -> HTTPException:
    return HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=message)


def unauthorized(message: str = "Authentication required") -> HTTPException:
    return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=message)
