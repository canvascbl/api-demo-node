# api-demo-node

A demo of the CanvasCBL API, written in Node.JS.

Just looking for the API docs? [https://go.canvascbl.com/docs](https://go.canvascbl.com/docs).

## Getting Started

1. Clone repo `git clone https://github.com/canvascbl/api-demo-node.git`
2. Enter the directory `cd api-demo-node`
3. Set up your env vars-- you can do this with your favorite text editor
   1. Create a file called `.env`
   2. Fill it with key-value pairs, one per line.
      1. `CLIENT_ID=yourcanvascblclientid`
      2. `CLIENT_SECRET=yourcanvascblclientsecret`
      3. `REDIRECT_URI="http://localhost:8002/response"` - if your server is somwhere else or on a different port, change this!
         - Make sure this is authorized in your CanvasCBL Developer Key!
4. Make sure Node.JS (the version in the `.nvmrc`) is installed. 
On a Mac, run `brew install nvm`, then `nvm install && nvm use`. 
5. Install deps-- `yarn install` (preferred) or `npm i`
6. Run the server-- `yarn start` (preferred) or `npm run start`

Now we can start using the server-- check that out [here](#usage).

## Usage

1. First, you'll need to be redirected to CanvasCBL for authentication.
To do this, visit [`http://localhost:8002/authorize`](http://localhost:8002/authorize) for this.
Specify scopes with the `scopes[]` query param. You'll only need grades, so your final authorize call
should look like this: `http://localhost:8002/authorize?scopes[]=grades`. If you just want to preview
the URL you'll be sent to, append `&redirect=false`.
2. Once you've signed into CanvasCBL and authorized the request, you'll be redirected to
`http://localhost:8002/response`. This is your Redirect URI, and you should see the tokens from the new grant!
3. Get some grades: visit `http://localhost:8002/grades` to see them.

That's it!

You can also use `/tokens` to see all of the stored tokens (also in your cookies).

## Environment Variables

The following code snippet shows a completely filled out `.env` file.

```sh
# CanvasCBL API Client ID
CLIENT_ID=yourcanvascblclientid

# CanvasCBL API Client Secret
CLIENT_SECRET=yourcanvascblclientsecret

# Redirect URI. Must be on your list of approved URIs and 
# point to this server with the path of /response.
REDIRECT_URI="http://localhost:8002/response"

# --- Advanced, Optional Env Vars Below ---

# [OPTIONAL] The port for the server to run on
PORT=8002

# [OPTIONAL] The URI for the CanvasCBL API
CANVASCBL_API_URI="https://api.canvascbl.com"
```

## Contributing

We love PRs! Please make sure that your code is formatted using `yarn format` or `npm run format` before submitting.

We also do not accept PRs that add an NPM lockfile-- please use Yarn for PRs.