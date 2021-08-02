FROM postgres:12.3-alpine

COPY migrations/*.sql /docker-entrypoint-initdb.d/

RUN chmod a+r /docker-entrypoint-initdb.d/*.sql