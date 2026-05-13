from fastapi.testclient import TestClient
from app.main import app # Fix: Point to the app folder

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "API is running! Open frontend/index.html to use the app."}

