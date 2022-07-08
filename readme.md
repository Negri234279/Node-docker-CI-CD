# Node-docker-CI-CD

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/Negri234279/Node-docker-CI-CD)

Skeleton node.js environment with docker for production, development and testing with continuous integration

## .env file

| KEY | VALUE |
| ------ | ------ |
| BACKEND_PORT | 3000 | 
| BACKEND_NAME | nodejs-backend |
| DB_HOST | db |
| DB_PORT | 5432 |
| DB_USER | postgres |
| DB_PASSWORD | postgres |
| DB_NAME | postgres |
| NGINX_PORT | 3100 |


## default.conf.template
```nginx
server {
    listen 80;

    location /api {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        proxy_set_header Host $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_pass http://${BACKEND_NAME}:${BACKEND_PORT};
        proxy_redirect off;
        proxy_hide_header X-Powered-By;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
    
    error_page 404 /custom_404.html;
    location = /custom_404.html {
            root /usr/share/nginx/html;
            internal;
    }
}
```

## Description

* **BACKEND_PORT**: port of the node api and used by the nginx proxy
* **BACKEND_NAME**: container name of the node api and used by the nginx proxy
* **DB_HOST**: name of the database container and used by the api for its connection
* **DB_PORT**: database port used by the api for its connection
* **DB_USER**:  database user and used by the api for its connection
* **DB_PASSWORD**: database password and used by the api for its connection
* **DB_NAME**: database name and used by the api for its connection
* **NGINX_PORT**: nginx proxy port, port used to communicate with the api


## How the network works ?

Docker containers communicate using their internal network via container name, so we only expose the nginx proxy port


## Quick Start

Build the server:
```
docker compose -f "docker-compose.dev.yml" up -d --build
```

Down the server:
```
docker compose -f "docker-compose.dev.yml" down
```

Start the server:
```
docker compose -f "docker-compose.dev.yml" start
```

Stop the server:
```
docker compose -f "docker-compose.dev.yml" stop
```