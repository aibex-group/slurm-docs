import { defineConfig } from "vitepress";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Slurm DIUF Faith HPC Cluster",
  description:
    "Unofficial Documentation for the high performance computing (HPC) cluster of DIUF at the UniFR using Slurm.",
  outDir: "../public",
  // As it uses GitLab pages, the URL starts with the repository name.
  base: "/slurm/docs/",
  // Creates links without the `.html` suffix, i.e. "/page" instead of "/page.html".
  cleanUrls: true,
  sitemap: {
    // Generate sitemap.xml for the pages to be indexed correctly.
    hostname: "https://diuf-gitlab.unifr.ch:8091/slurm/docs/",
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    sidebar: [
      { text: "Introduction", link: "/" },
      {
        text: "Getting Started",
        link: "/getting-started/",
        items: [
          { text: "Connecting to the Cluster", link: "/getting-started/connecting" },
          { text: "Setting up SSH Keys", link: "/getting-started/ssh-keys" },
          { text: "Setting up your Environment", link: "/getting-started/environment" },
          {
            text: "Running Jobs",
            link: "/getting-started/running-jobs",
            items: [
              { text: "Interactive Jobs with srun", link: "/getting-started/running-jobs/srun" },
              { text: "Background Jobs with sbatch", link: "/getting-started/running-jobs/sbatch" },
            ],
          },
          { text: "Monitoring Jobs", link: "/getting-started/monitoring" },
          { text: "Testing GPU Support with PyTorch", link: "/getting-started/test-gpu" },
        ],
      },
      {
        text: "Hardware",
        link: "/hardware/",
        items: [
          { text: "Available Nodes", link: "/hardware/nodes" },
          { text: "Choosing Resources", link: "/hardware/choosing-resources" },
        ],
      },
    ],
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
