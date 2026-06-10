#!/bin/bash
pytest src/backend/tests/unit/contract --cov=src/backend --cov-report=term-missing
