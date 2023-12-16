FROM denoland/deno:alpine-1.37.0

EXPOSE 7777

WORKDIR /drill-and-practice


COPY deps.js .
RUN deno cache deps.js

COPY . .

CMD ["run", "--unstable", "--watch", "--allow-net", "--allow-read", "--allow-env", "--no-check", "app-launch.js"]
