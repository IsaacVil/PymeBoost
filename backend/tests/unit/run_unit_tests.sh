#!/bin/bash
pytest src/backend/tests/unit --cov=src/backend --cov-report=term-missing --cov-fail-under=80
