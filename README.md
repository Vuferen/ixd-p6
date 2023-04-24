# P6



## Developing

**DO NOT COMMIT DIRECTLY TO THE MASTER BRANCH!** The master branch is automatically build and hosted on a server, so make sure to do a pull request instead or use the experimental branch.

### Setup
Clone the project to your local machine and run:
```
npm install
```

Please note that the database and openai api only work if you add the following keys in a ```.env``` file in the root directory:
```
PUBLIC_SUPABASE_URL=""
PUBLIC_SUPABASE_ANON_KEY=""
OPENAI_API_KEY=""
OPENAI_ORGANIZATION_ID=""
```

### Run it
To host the project locally, run:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

