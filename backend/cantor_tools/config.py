####################
# EXTERNAL LIBRARIES
####################
import os
####################
# INTERNAL LIBRARIES
####################
from .tools import read_yaml


config_yaml_path = os.path.dirname(
    os.path.realpath(
        __file__
    )) + '/config.yaml'
config = read_yaml(config_yaml_path)

RELATIVE_STATIC_PATH = 'static/'
RELATIVE_ASSETS_PATH = RELATIVE_STATIC_PATH + 'assets/'

RELATIVE_APP_API = 'api/'


def get_cantor_app_config():
    return config['cantor_app']


def get_run_app_mode():
    return get_cantor_app_config()['mode']


def get_secret_key_config():
    return get_cantor_app_config()['secret_key']


def get_main_path():
    if get_run_app_mode() == 'develop':
        return get_cantor_app_config()['path']['main_win']
    if get_run_app_mode() == 'production':
        return get_cantor_app_config()['path']['server_cloud']


def get_static_path():
    return get_main_path() + '/static'


def get_assets_path():
    return get_static_path() + '/assets'


def get_api_token_header():
    return get_cantor_app_config()['api_token']['header']


def get_api_token_value():
    return get_cantor_app_config()['api_token']['value']


# LOGGING

def get_log_level():
    return get_cantor_app_config()['logging']['level']


def get_log_module_name():
    return get_cantor_app_config()['logging']['logmodulename']