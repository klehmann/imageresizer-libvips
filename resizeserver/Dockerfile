# The Alpine Linux with preinstalled Node.js
FROM mindoo/node-bash-alpine:13-3.10

COPY app /app
WORKDIR /app
RUN rm -rf /app/node_modules && npm install
EXPOSE 4000

# CMD [ "bash" ]
CMD [ "npm", "start" ]
