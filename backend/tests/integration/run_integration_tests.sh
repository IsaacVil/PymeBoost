#!/bin/bash
pytest src/backend/tests/integration --cov=src/backend --cov-report=term-missing --cov-fail-under=80
