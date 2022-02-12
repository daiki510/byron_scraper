FROM node:14.15.1
# アプリケーションディレクトリを作成する
WORKDIR /usr/src/app

# アプリケーションの依存関係をインストールする
COPY package*.json ./

RUN npm install

RUN apt-get update && apt-get install -y libgtk-3.0 libgbm-dev libnss3 libatk-bridge2.0-0 libasound2

# アプリケーションのソースをバンドルする
COPY . .

EXPOSE 3001

# CMD [ "node", "server.js" ]