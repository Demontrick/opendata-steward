from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine, SessionLocal
from routers.record import router
from models import StewardRecord

app = FastAPI(title="OpenData Steward API")

# -----------------------
# CORS (frontend access)
# -----------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------
# ROUTES
# -----------------------
app.include_router(router)


# -----------------------
# SEED DATA
# -----------------------
def seed_data():
    db = SessionLocal()

    try:
        if db.query(StewardRecord).count() == 0:
            sample = [
                StewardRecord(
                    id="1",
                    company_name="Roche Pharma",
                    country="Germany",
                    specialty="Oncology",
                    data_quality_score=32,
                    flag_reason="Duplicate Entry Detected",
                    status="pending",
                    duplicate_of=None,
                    last_updated="2026-04-24",
                ),
                StewardRecord(
                    id="2",
                    company_name="St Thomas Hospital",
                    country="UK",
                    specialty="Cardiology",
                    data_quality_score=78,
                    flag_reason="Missing Specialty Data",
                    status="pending",
                    duplicate_of=None,
                    last_updated="2026-04-24",
                ),
                StewardRecord(
                    id="3",
                    company_name="Sanofi",
                    country="France",
                    specialty="Neurology",
                    data_quality_score=55,
                    flag_reason="Invalid Country Code",
                    status="needs_review",
                    duplicate_of=None,
                    last_updated="2026-04-24",
                ),
            ]

            db.add_all(sample)
            db.commit()

    finally:
        db.close()


# -----------------------
# STARTUP EVENT (IMPORTANT FIX)
# -----------------------
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
    seed_data()


# -----------------------
# ROOT
# -----------------------
@app.get("/")
def root():
    return {"message": "OpenData Steward API Running"}