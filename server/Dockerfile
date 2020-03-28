#FROM node:6.16.0-jessie AS build
FROM node:8.15.1-jessie AS build
# set user configurations
ENV USER=builder
ENV USER_HOME=/home/${USER}

RUN mkdir -p $USER_HOME/Nomination
ADD . $USER_HOME/Nomination
WORKDIR $USER_HOME/Nomination
RUN ./build.sh

# FROM node:6.16.0-jessie
FROM node:8.15.1-jessie
# set user configurations
ENV USER=lsf
ENV USER_ID=1001
ENV USER_GROUP=lsf
ENV USER_GROUP_ID=1001
ENV USER_HOME=/home/${USER}

# create a user group and a user
RUN groupadd --system -g ${USER_GROUP_ID} ${USER_GROUP} && \
    useradd --system --create-home --home-dir ${USER_HOME} --no-log-init -g ${USER_GROUP_ID} -u ${USER_ID} ${USER}

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
supervisor

RUN mkdir -p $USER_HOME/Nomination
RUN mkdir -p $USER_HOME/Nomination/api-docs
RUN mkdir -p $USER_HOME/Nomination/node_modules
RUN mkdir -p $USER_HOME/Nomination/build
RUN mkdir -p $USER_HOME/Nomination/build/uploads
RUN mkdir -p $USER_HOME/Nomination/build/partySymbols


WORKDIR $USER_HOME/Nomination

COPY --from=build /home/builder/Nomination/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN touch /home/lsf/Nomination/.env
COPY --from=build /home/builder/Nomination/api-docs/ /home/lsf/Nomination/api-docs/
COPY --from=build /home/builder/Nomination/node_modules/ /home/lsf/Nomination/node_modules/
COPY --from=build /home/builder/Nomination/build/ /home/lsf/Nomination/build/
COPY --from=build /home/builder/Nomination/src/config/development.json /home/lsf/Nomination/prod.json 
RUN chown lsf:lsf /home/lsf/Nomination/build/uploads
RUN chown lsf:lsf /home/lsf/Nomination/build/partySymbols
RUN rm /etc/localtime
RUN ln -s /usr/share/zoneinfo/Asia/Colombo /etc/localtime

ENV APP_ID 'nomination-api'

EXPOSE 9001

#start application
#CMD ["/bin/bash"]
CMD ["/usr/bin/supervisord"]
