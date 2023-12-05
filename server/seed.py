#!/usr/bin/env python3

from app import app
from models import db, Hotel

with app.app_context():
    print("🌱 Hotels successfully seeded! 🌱")