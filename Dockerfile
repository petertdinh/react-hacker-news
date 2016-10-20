FROM node

RUN mkdir /code
ADD . /code

WORKDIR /code
RUN npm install
RUN npm install webpack -g
RUN webpack

EXPOSE 8080
CMD ["npm", "start"]