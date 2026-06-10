#!/bin/bash
pytest src/backend/tests/unit/health --cov=src/backend --cov-report=term-missing
