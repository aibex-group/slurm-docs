# Slurm Documentation

_Unofficial_ Documentation for the high performance computing (HPC) cluster of DIUF at the UniFR using Slurm.

The documentation is generated from Markdown files in `docs/` with [VitePress][vitepress], a static site generator (SSG)
using Vue.

## Dependencies

All dependencies are managed by [Bun][bun], a JavaScript / TypeScript runtime, packager manager and more, that is
compatible with Node.js.

Choose your preferred installation method for your OS as described in [Bun Docs - Installation][bun-install] and make
sure that the `bun` executable is available.

To install the dependencies of the project run:

```sh
bun install
```

## Development Server

VitePress includes a development server that will automatically recompile the docs if any file changes and also
automatically reload the browser to reflect the updates.

```sh
bun run dev
```

The dev server should be running at [http://localhost:5173](http://localhost:5173).

## Code Quality

In order to ensure a consistent code quality, the Markdown files are formatted with `prettier`. Ideally, you configure
your editor of choice to run `prettier` for any files you changed, but alternatively you can run the `format` script as
follows:

```sh
bun run format
```

> [!CAUTION]
> This will reformat all the files and overwrite them! If you just want to check if they are formatted correctly, use
> `bun run check:format` instead.

The formatting will be checked in CI. In addition to the formatting, any extended customisation of VitePress that is
done through TypeScript, are also type checked.

## Adding New Pages

All pages that are added to the `docs/` directory will be available on the server, but not necessarily accessible
through the documentation by the user, unless they have the direct link. Therefore, it is necessary to create a link to
the page at some point. In most cases, it should be added to the sidebar navigation, for which you need to modify the
config file in `docs/.vitepress/config.mts` under `themeConfig > sidebar`, where the link is pointing to the Markdown
file you added.

_The link needs to match what the actual link on the server will be, not the file path, e.g. if you added
`docs/new-page.md` the link has to be `/new-page`._

[bun]: https://bun.sh/
[bun-install]: https://bun.sh/docs/installation
[vitepress]: https://vitepress.dev/
