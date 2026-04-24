from pydantic import BaseModel
from typing import Optional


class StewardRecordBase(BaseModel):
    id: str
    company_name: str
    country: str
    specialty: str
    data_quality_score: int
    flag_reason: str
    status: str
    duplicate_of: Optional[str] = None
    last_updated: str


class StewardRecordResponse(StewardRecordBase):
    class Config:
        from_attributes = True