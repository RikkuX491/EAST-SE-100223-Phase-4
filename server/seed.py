#!/usr/bin/env python3

from app import app
from models import db

with app.app_context():
    print("🌱 Hotels successfully seeded! 🌱")