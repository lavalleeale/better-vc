# pull official base image
FROM python:3-alpine
# set work directory
WORKDIR /app
# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
RUN apk update && apk add  --no-cache libressl-dev musl-dev libffi-dev postgresql-dev gcc python3-dev musl-dev make build-base cargo
# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /app/requirements.txt

RUN pip install -r requirements.txt
# copy project
COPY . /app/
EXPOSE 5000

ENTRYPOINT ["/app/gunicorn.sh"]