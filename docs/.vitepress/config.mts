import { defineConfig } from "vitepress";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Slurm DIUF Faith HPC Cluster",
  description:
    "Unofficial Documentation for the high performance computing (HPC) cluster of DIUF at the UniFR using Slurm.",
  outDir: "../public",
  // As it uses GitLab pages, the URL starts with the repository name.
  base: "/docs/",
  // Creates links without the `.html` suffix, i.e. "/page" instead of "/page.html".
  cleanUrls: true,
  sitemap: {
    // Generate sitemap.xml for the pages to be indexed correctly.
    hostname: "https://slurm.pages.diuf-gitlab.unifr.ch/docs/",
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    sidebar: [{ text: "Introduction", link: "/" }],
    socialLinks: [{ icon: "gitlab", link: "https://diuf-gitlab.unifr.ch/slurm/docs" }],
    editLink: {
      pattern: "https://diuf-gitlab.unifr.ch/slurm/docs/-/edit/main/docs/:path",
      text: "Edit this page on GitLab",
    },
    search: {
      provider: "local",
      options: {
        detailedView: true,
      },
    },
  },
  lastUpdated: true,
  markdown: {
    theme: {
      light: "catppuccin-latte",
      dark: "catppuccin-mocha",
    },
    config(md) {
      md.use(tabsMarkdownPlugin);
    },
  },
});
