FROM reactnativecommunity/react-native-android

WORKDIR /app
ADD ./PyroApp .

RUN npm install

CMD npm run start