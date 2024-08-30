FROM node:18.13.0-alpine as base

FROM base as dependencies
WORKDIR /dependencies
COPY ["package.json", "tsconfig.json","package-lock.json", "./"]
RUN npm ci --prod --ignore-scripts

FROM base as builder
WORKDIR /build
COPY ["package.json", "tsconfig.json","package-lock.json", "./"]
COPY ["./src", "./src"]
RUN npm ci
COPY [".eslintignore", ".eslintrc",".prettierrc",".prettierignore", "./"]
RUN npm run style
RUN npm run lint
RUN npm run compile

FROM base as final
WORKDIR /usr/app
COPY ./oas3.yaml .
COPY --from=dependencies /dependencies .
COPY --from=builder /build/dist .
COPY ./src/domain/entities/sheets/brief_semanal.xlsx ./src/domain/entities/sheets/brief_semanal.xlsx

CMD [ "npm","run","start" ]