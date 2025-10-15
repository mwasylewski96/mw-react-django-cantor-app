####################
# EXTERNAL LIBRARIES
####################
import os
import yaml
from typing import (
    Dict,
    Generic,
    Optional,
    TypeVar,
    Any
)

def read_yaml(
        path: os.PathLike
) -> dict:
    """
    Reads YAML file.

    :param path: path to YAML file
    :return: Dictionary converted from YAML
    """
    with open(
        path,
        encoding='utf-8'
    ) as stream:
        try:
            config = yaml.safe_load(stream)
        except yaml.YAMLError as e:
            raise Exception(
                f'Could not read yamlfile: {path}, e:{repr(e)}'
            )
    return config


def write_yaml(
        data: Dict,
        path: os.PathLike
) -> None:
    with open(
        path,
        'w'
    ) as stream:
        try:
            yaml.safe_dump(
                data,
                stream,
                default_style='\'',
                default_flow_style=False
            )
        except yaml.YAMLError as e:
            raise Exception(
                f'Could not write yamlfile: {path}, e:{repr(e)}'
            )
        return


T = TypeVar('T')
class Result(Generic[T]):
    def __init__(
            self,
            success: bool,
            value: T,
            error: Optional[str]
    ):
        self.success = success
        self.value = value
        self.error = error

    def __str__(
            self
    ):
        if self.success:
            return f"[Success]: '{self.value}'"
        else:
            return f"[Error]: '{self.error}'"

    @classmethod
    def success(
            cls,
            value: Any = None
    ):
        return cls(
            success=True,
            value=value,
            error=None
        )

    @classmethod
    def error(
            cls,
            error
    ):
        return cls(
            success=False,
            value=None,
            error=error
        )