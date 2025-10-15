from cantor_tools.config import get_api_token_header, get_api_token_value


def check_auth(
        request
):
    token_header = get_api_token_header()
    return token_header in request.headers and request.headers[f"{token_header}"] == get_api_token_value()