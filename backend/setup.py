from setuptools import setup, find_packages

with open(
        'requirements.txt'
) as file:
    requirements = file.read().splitlines()

setup(
    name='Cantor-App',
    version='1.0.0',
    packages=find_packages(),
    package_data={
        'cantor_tools': [
            'config.yaml',
        ],
    },
    install_requires=requirements
)