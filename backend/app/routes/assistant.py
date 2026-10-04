from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user
from app.schemas.assistant import AssistantMessage
from app.services.assistant_service import AssistantService


router = APIRouter(prefix="/assistant", tags=["assistant"])


@router.post("/chat")
def chat(body: AssistantMessage, user=Depends(get_current_user)):
    return AssistantService().respond(user, body.message, body.context)
