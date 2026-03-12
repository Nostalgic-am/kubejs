import { defineConfig } from "vitepress";

const BASE = "/summoning-rituals/";

export default defineConfig({
  title: "Summoning Rituals",
  description:
    "KubeJS documentation for Summoning Rituals (Minecraft 1.21.1 / NeoForge)",
  base: BASE,

  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/getting-started" },
      {
        text: "Links",
        items: [
          {
            text: "GitHub (Mod)",
            link: "https://github.com/AlmostReliable/summoningrituals",
          },
          {
            text: "CurseForge",
            link: "https://www.curseforge.com/minecraft/mc-mods/summoningrituals",
          },
          {
            text: "Modrinth",
            link: "https://modrinth.com/mod/summoningrituals",
          },
          {
            text: "Discord",
            link: "https://discord.com/invite/ThFnwZCyYY",
          },
        ],
      },
    ],

    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "Home", link: "/" },
          { text: "Getting Started", link: "/getting-started" },
          { text: "Migration from 1.19/1.20", link: "/migration" },
        ],
      },
      {
        text: "Recipes",
        items: [
          { text: "Altar Recipe", link: "/recipes/altar" },
          { text: "Item Inputs & Outputs", link: "/recipes/items" },
          { text: "Entity Inputs & Outputs", link: "/recipes/entities" },
          { text: "Commands", link: "/recipes/commands" },
        ],
      },
      {
        text: "Conditions",
        items: [
          { text: "Overview", link: "/conditions/overview" },
          { text: "Biome & Dimension", link: "/conditions/biome-dimension" },
          { text: "Time & Weather", link: "/conditions/time-weather" },
          {
            text: "Height, Light, Sky & Structures",
            link: "/conditions/environment",
          },
          {
            text: "Block & Altar State",
            link: "/conditions/block-altar",
          },
        ],
      },
      {
        text: "Events",
        items: [{ text: "Ritual Events", link: "/events" }],
      },
      {
        text: "Reference",
        items: [
          { text: "Full Example", link: "/example" },
          { text: "Source Code", link: "/source" },
        ],
      },
    ],

    editLink: {
      pattern:
        "https://github.com/Nostalgic-am/summoning-rituals/edit/main/docs/:path",
      text: "Edit this page",
    },

    search: {
      provider: "local",
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/Nostalgic-am/summoning-rituals",
      },
    ],

    footer: {
      message:
        'Summoning Rituals by <a href="https://github.com/AlmostReliable">AlmostReliable</a>',
      copyright: "Wiki maintained by Nostalgic-am",
    },

    lastUpdated: {
      text: "Last updated",
    },
  },

  lastUpdated: true,
});
