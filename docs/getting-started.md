# Getting Started

::: tip VERSION
This documentation covers **Summoning Rituals for Minecraft 1.21.1** on **NeoForge** with **KubeJS 6+**.
If you're migrating from 1.19 or 1.20, see the [Migration Guide](/migration).
:::

[Summoning Rituals](https://github.com/AlmostReliable/summoningrituals) is a Minecraft mod that lets modpack developers create custom summoning rituals for items, mobs, and commands. The mod **does not add any recipes by default** — everything is configured through KubeJS scripts.

## Requirements

- Minecraft **1.21.1** with **NeoForge**
- [Summoning Rituals](https://www.curseforge.com/minecraft/mc-mods/summoningrituals)
- [KubeJS](https://kubejs.com/) (6.x for 1.21.1)

## Installation

1. Download the Summoning Rituals jar from [CurseForge](https://www.curseforge.com/minecraft/mc-mods/summoningrituals) or [Modrinth](https://modrinth.com/mod/summoningrituals)
2. Download KubeJS for 1.21.1
3. Drop both jars into your `mods` folder

## Your First Ritual

Create a server script at:

```
kubejs/server_scripts/my_rituals.js
```

Every ritual starts with `event.recipes.summoningrituals.altar()` inside `ServerEvents.recipes`:

```js
ServerEvents.recipes(event => {
    event.recipes.summoningrituals
        .altar("minecraft:iron_ingot")
        .itemInputs(["minecraft:stone", "minecraft:cobblestone"])
        .itemOutputs(["minecraft:diamond"])
})
```

This creates a ritual where:
1. Place items on the altar (stone and cobblestone)
2. Right-click the altar with an **iron ingot** (the catalyst) to start the ritual
3. When complete, a **diamond** spawns

::: tip
The **catalyst** is the item placed on the altar to start the ritual. **Inputs** are items/entities placed on the altar or in the sacrifice zone before starting.
:::

## How Rituals Work

1. Place an **Altar** block in the world
2. Place items on the altar (these are the item inputs)
3. If the recipe requires entity inputs, make sure the required mobs are in the **sacrifice zone**
4. Right-click the altar with the **catalyst** item
5. If all **conditions** are met (biome, time, weather, etc.), the ritual begins
6. After the ritual completes, **outputs** are produced (items spawn, entities are summoned, commands execute)

## Script Structure

All rituals go inside `ServerEvents.recipes`. You can define multiple rituals in a single script:

```js
ServerEvents.recipes(event => {
    // Ritual 1: Simple item transformation
    event.recipes.summoningrituals
        .altar("stick")
        .itemInputs(["cobblestone"])
        .itemOutputs(["diamond"])

    // Ritual 2: Mob summoning
    event.recipes.summoningrituals
        .altar("bone")
        .itemInputs(["rotten_flesh", "spider_eye"])
        .entityOutputs(["minecraft:skeleton"])

    // Ritual 3: Complex ritual with conditions
    event.recipes.summoningrituals
        .altar("nether_star")
        .itemInputs(["obsidian", "crying_obsidian", "#c:ingots"])
        .entityOutputs(["minecraft:wither"])
        .conditions(c => c.dimension("minecraft:the_nether"))
})
```

## Next Steps

- [Altar Recipe](/recipes/altar) — Full recipe builder API reference
- [Item Inputs & Outputs](/recipes/items) — Working with `SummoningItem`
- [Entity Inputs & Outputs](/recipes/entities) — Working with `SummoningEntity`
- [Commands](/recipes/commands) — Execute commands on completion
- [Conditions](/conditions/overview) — Restrict when rituals can run
- [Events](/events) — Custom logic on start/complete
- [Full Example](/example) — A complete example using every feature
