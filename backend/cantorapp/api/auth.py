from cantor_tools.config import get_api_token_header, get_api_token_value
from ninja.security import APIKeyHeader


class MyAPIKeyHeaderAuth(APIKeyHeader):
    param_name = get_api_token_header()

    def authenticate(
            self,
            request, 
            key: str
        ):
        if key == get_api_token_value():
            return True
        return None
