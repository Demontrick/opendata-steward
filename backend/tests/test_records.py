from fastapi.testclient import TestClient
from  main import app

client = TestClient(app)


def test_root():
    res = client.get("/")
    assert res.status_code == 200
    assert "OpenData Steward API" in res.json()["message"]


def test_get_records():
    res = client.get("/api/records")
    assert res.status_code == 200
    assert isinstance(res.json(), list)


def test_approve_record():
    res = client.post("/api/records/1/approve")
    assert res.status_code == 200
    assert res.json()["status"] == "approved"


def test_reject_record():
    res = client.post("/api/records/2/reject")
    assert res.status_code == 200
    assert res.json()["status"] == "rejected"


def test_review_record():
    res = client.post("/api/records/3/review")
    assert res.status_code == 200
    assert res.json()["status"] == "needs_review"


def test_filter_by_status():
    res = client.get("/api/records?status=approved")
    assert res.status_code == 200