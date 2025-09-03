#backend/app/api/routes/campaign.py
import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import Campaign, CampaignCreate, CampaignPublic, CampaignsPublic, CampaignUpdate, Message

router = APIRouter(prefix="/campaigns", tags=["campaigns"])


@router.get("/", response_model=CampaignsPublic)
def read_campaigns(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve campaigns.
    """

    if current_user.is_superuser:
        count_statement = select(func.count()).select_from(Campaign)
        count = session.exec(count_statement).one()
        statement = select(Campaign).offset(skip).limit(limit)
        campaigns = session.exec(statement).all()
    else:
        count_statement = (
            select(func.count())
            .select_from(Campaign)
            .where(Campaign.owner_id == current_user.id)
        )
        count = session.exec(count_statement).one()
        statement = (
            select(Campaign)
            .where(Campaign.owner_id == current_user.id)
            .offset(skip)
            .limit(limit)
        )
        campaigns = session.exec(statement).all()

    return CampaignsPublic(data=campaigns, count=count)


@router.get("/{id}", response_model=CampaignPublic)
def read_campaign(session: SessionDep, current_user: CurrentUser, id: uuid.UUID) -> Any:
    """
    Get campaign by ID.
    """
    campaign = session.get(Campaign, id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    if not current_user.is_superuser and (campaign.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return campaign


@router.post("/", response_model=CampaignPublic)
def create_campaign(
    *, session: SessionDep, current_user: CurrentUser, campaign_in: CampaignCreate
) -> Any:
    """
    Create new campaign.
    """
    campaign = Campaign.model_validate(campaign_in, update={"owner_id": current_user.id})
    session.add(campaign)
    session.commit()
    session.refresh(campaign)
    return campaign


@router.put("/{id}", response_model=CampaignPublic)
def update_campaign(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    campaign_in: CampaignUpdate,
) -> Any:
    """
    Update a campaign.
    """
    campaign = session.get(Campaign, id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    if not current_user.is_superuser and (campaign.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = campaign_in.model_dump(exclude_unset=True)
    campaign.sqlmodel_update(update_dict)
    session.add(campaign)
    session.commit()
    session.refresh(campaign)
    return campaign


@router.delete("/{id}")
def delete_campaign(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Message:
    """
    Delete a campaign.
    """
    campaign = session.get(Campaign, id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    if not current_user.is_superuser and (campaign.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(campaign)
    session.commit()
    return Message(message="Campaign deleted successfully")