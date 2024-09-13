# pyro-app

## Installation (docker)

This install method requires you to already have Docker and Docker-compose installed on your system. More info [here](https://docs.docker.com/engine/install/).

### Init node.js modules and start metro server

In a CLI, go to the root folder and ...

`docker compose up -d`

It will install the required dependencies and init the Metro server.

### Connect an android device to test the app on

For this part, you'll need an android phone wirelessly connected on the same network as your docker host. 

First, [activate the developer options](https://developer.android.com/studio/debug/dev-options) on your device.

Then, retrieve the IP, port and code from your android device in the "wireless debugging" parameters, as described [here](https://developer.android.com/tools/adb).

Start an interactive shell into your new docker container by using: `docker exec -it pyro-app bash`

In this prompt, pair your android device using: 
`adb pair {ipaddr}:{port}`

... Where {ipaddr} is your android's IP address and {port} is the specified port.
Then type in the specified code to pair your device.

### Start it all

Now, to start the app: `npm run android` (in the container prompt)

Note: this can be a **long** process. 
Your android device should display the app at some point.

## troubleshooting

### Port is already used 

If you receive an error "port already used", you can change the default metro port in the package.json, to specify your own custom port (default is 8081).

`"start": "react-native start --port 8090",`