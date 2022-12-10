## Characteristics

- REST API
- Django with Django Rest Framework 
- OAuth 2.0
- JWT
- Docker
- Swagger & ReDoc
- SQLite3

## Usage

### Environment

- `backend.settings.prod` - for production
- `backend.settings.dev` - for development
- `backend.settings.test` - for test

### Install Dependencies

```shell
pip3 install -r requirements.txt
```

### Migrations

```shell
python3 manage.py makemigrations --settings=backend.settings.prod
python3 manage.py migrate --settings=backend.settings.prod
```

### Unit Testing

```shell
python3 manage.py test --settings=backend.settings.test
```

### Run

```shell
python3 manage.py runserver 8000
```

And send requests to http://localhost:8000/