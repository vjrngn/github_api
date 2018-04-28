# github_api

# Installation
Clone the repository
```sh
  git clone git@github.com:vjrngn/github_api.git
```

# Usage
`cd` into the directory and install all dependencies.
```sh
  cd github_api && yarn
```

You need to provide an access token to serach for users. Go to the [settings](https://github.com/settings/tokens) page of your GitHub profile to create a new personal access token.

Let's tell the application about our access token.

### Step 1
```sh
  cp ./env.example .env
```

### Step 2
Paste in your access token
```sh
  REACT_APP_GITHUB_ACCESS_TOKEN="your access token"
```

### Step 3
That's it! We're all setup. Let's run the application.
```sh
  npm start
```