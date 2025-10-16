####################
# Minimal project config helpers
####################
import os
from .tools import read_yaml


config = {}
cfg_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'config.yaml')
if os.path.exists(cfg_path):
    try:
        config = read_yaml(cfg_path) or {}
    except Exception:
        config = {}


def get_config() -> dict:
    return config.get('cantor_app', {})


def get_run_app_mode():
    return get_config().get('mode', 'develop')


def get_secret_key_config():
    return get_config().get('secret_key')


def get_api_token_header():
    return get_config().get('api_token', {}).get('header')


def get_api_token_value():
    return get_config().get('api_token', {}).get('value')


def get_allowed_hosts():
    app = get_config()
    return app.get('allowed_hosts')