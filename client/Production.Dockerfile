FROM tiangolo/node-frontend:10 as builder

ADD ./src /app/src
COPY package*.json /app/
COPY ./public /app/public
WORKDIR /app
RUN npm ci
ENV REACT_APP_API_BASE_URL=https://apim-gw-lgc.elections.gov.lk/nominations/0.9
ENV REACT_APP_PDF_GENARATION_SERVICE_URL=https://apim-gw-lgc.elections.gov.lk/nominations/0.9
ENV REACT_APP_AUTH_BASE_URL=https://nominations.elections.gov.lk
ENV REACT_APP_NOMINATION_URL=https://nominations.elections.gov.lk

RUN npm run build
RUN rm /etc/localtime
RUN ln -s /usr/share/zoneinfo/Asia/Colombo /etc/localtime

FROM nginx:1.15

COPY --from=builder /app/build/ /usr/share/nginx/html
COPY --from=builder /nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html/

EXPOSE 80
CMD echo 'window._env_ = {}; window._env_.API_BASE ="'http://localhost:3000'"' > env-config.js && nginx -g 'daemon off;'

