# Welcome to Todo

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── front/                  # This is an Astro App
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── lib/
│   │   └── pages/
│   └── package.json
└── back/
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

### `front/`

| Command            | Action                                       |
| :----------------- | :------------------------------------------- |
| `pnpm install`     | Installs dependencies                        |
| `pnpm dev`         | Starts local dev server at `localhost:3000`  |
| `pnpm build`       | Build your production site to `./dist/`      |
| `pnpm preview`     | Preview your build locally, before deploying |
| `pnpm connect`     | Connect to planet scale on port 3009         |

### `back/`

| Command            | Action                                       |
| :----------------- | :------------------------------------------- |
| `./dev.sh`         | Run the dev server in watch mode             |
