from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import StewardRecord

router = APIRouter(prefix="/api/records", tags=["records"])


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# helper: consistent response shape
def to_dict(record: StewardRecord):
    return {
        "id": record.id,
        "company_name": record.company_name,
        "country": record.country,
        "specialty": record.specialty,
        "data_quality_score": record.data_quality_score,
        "flag_reason": record.flag_reason,
        "status": record.status,
        "duplicate_of": record.duplicate_of,
        "last_updated": record.last_updated,
    }


# GET ALL RECORDS
@router.get("")
def get_records(status: str | None = None, db: Session = Depends(get_db)):
    query = db.query(StewardRecord)

    if status:
        query = query.filter(StewardRecord.status == status)

    records = query.order_by(StewardRecord.data_quality_score.asc()).all()
    return [to_dict(r) for r in records]


# APPROVE
@router.post("/{record_id}/approve")
def approve(record_id: str, db: Session = Depends(get_db)):
    record = db.query(StewardRecord).filter_by(id=record_id).first()

    if not record:
        raise HTTPException(404, "Record not found")

    record.status = "approved"
    db.commit()
    db.refresh(record)

    return to_dict(record)


# REJECT
@router.post("/{record_id}/reject")
def reject(record_id: str, db: Session = Depends(get_db)):
    record = db.query(StewardRecord).filter_by(id=record_id).first()

    if not record:
        raise HTTPException(404, "Record not found")

    record.status = "rejected"
    db.commit()
    db.refresh(record)

    return to_dict(record)


# REVIEW
@router.post("/{record_id}/review")
def review(record_id: str, db: Session = Depends(get_db)):
    record = db.query(StewardRecord).filter_by(id=record_id).first()

    if not record:
        raise HTTPException(404, "Record not found")

    record.status = "needs_review"
    db.commit()
    db.refresh(record)

    return to_dict(record)