FROM anandafit/ec-nomination:latest
MAINTAINER anandafit;

#Create app directory
RUN mkdir -p /var/tmp/nomination-api
WORKDIR /var/tmp/nomination-api

#Installing Redis and Git
RUN apt-get update && apt-get install
ADD . /var/tmp/nomination-api
#Add Supervisor config
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

#start script is in this src
WORKDIR /var/tmp/nomination-api

ENV APP_ID 'nomination-api'

EXPOSE 8081
EXPOSE 12201


#start application
# CMD ["/usr/bin/supervisord"]
ENTRYPOINT ["tail", "-f", "/dev/null"]