from sqlalchemy import Column, String, Integer
from database import Base


class StewardRecord(Base):
    __tablename__ = "records"

    id = Column(String, primary_key=True, index=True)
    company_name = Column(String, nullable=False)
    country = Column(String, nullable=False)
    specialty = Column(String, nullable=False)

    data_quality_score = Column(Integer, nullable=False)

    flag_reason = Column(String, nullable=False)

    status = Column(String, nullable=False, default="pending")

    duplicate_of = Column(String, nullable=True)

    last_updated = Column(String, nullable=False)