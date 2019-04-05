FROM node:6

EXPOSE 3000

RUN npm install lite-server --save-dev

RUN mkdir -p /chobot-ui
WORKDIR /chobot-ui

COPY package.json /dw-client
RUN npm i

COPY dist /chobot-ui/dist

CMD lite-server --baseDir="dist/chobot-ui"

#npm install lite-server --save-dev
#lite-server --baseDir="dist/chobot-ui"
