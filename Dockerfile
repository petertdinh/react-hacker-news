FROM node

RUN mkdir /code
ADD . /code

WORKDIR /code
RUN npm install
RUN webpack

EXPOSE 8080
CMD ["npm", "start"]