#!/bin/bash
pytest src/backend/tests/unit/api --cov=src/backend --cov-report=term-missing
