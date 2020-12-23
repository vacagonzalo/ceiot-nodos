FROM python:3.8-alpine
LABEL maintainer="Gonzalo Nahuel Vaca <vacagonzalo@gmail.com>"
RUN addgroup -g 1000 -S pythonuser && \
    adduser -u 1000 -S pythonuser -G pythonuser && \
    mkdir -p /app && \
    pip3 install pyModbusTCP && \
    pip3 install paho-mqtt
ADD --chown=root:root app/* /app/

USER pythonuser
EXPOSE 1883 5020/tcp

CMD [ "python", "-u", "/app/service.py" ]