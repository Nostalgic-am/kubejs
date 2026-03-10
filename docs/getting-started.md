# Getting Started

[Summoning Rituals](https://github.com/AlmostReliable/summoningrituals) is a Minecraft mod that allows modpack developers to create custom summoning rituals for items, mobs, and commands. The mod does not add any recipes by default — everything is configured through **KubeJS**.

## Requirements

- Minecraft **1.21.1** with **NeoForge**
- [Summoning Rituals](https://www.curseforge.com/minecraft/mc-mods/summoningrituals) mod
- [KubeJS](https://kubejs.com/) mod

## Installation

1. Download the latest Summoning Rituals jar from [CurseForge](https://www.curseforge.com/minecraft/mc-mods/summoningrituals) or [Modrinth](https://modrinth.com/mod/summoningrituals)
2. Install KubeJS for your Minecraft version
3. Drop both jars into your `mods` folder

## Your First Ritual

All recipes are defined in a **server script**. Create a file at:

```
kubejs/server_scripts/summoning_rituals.js
```

Every ritual starts with `event.recipes.summoningrituals.altar()` inside the recipes event:

```js
ServerEvents.recipes(event => {
    event.recipes.summoningrituals
        .altar("minecraft:iron_ingot")       // the catalyst item
        .itemInputs(["minecraft:stone"])      // items placed around the altar
        .itemOutputs(["minecraft:diamond"])   // items produced by the ritual
})
```

This creates a simple ritual where placing an iron ingot on the altar and surrounding it with stone will produce a diamond.

::: tip
The **catalyst** is the item placed on top of the altar to start the ritual. The **inputs** are the items or entities placed on the pedestals around the altar.
:::

## How Rituals Work

1. Place an **Altar** block in the world
2. Place items on the **pedestals** surrounding the altar (these are the inputs)
3. Right-click the altar with the **catalyst** item to start the ritual
4. If all **conditions** are met, the ritual begins
5. After the ritual completes, **outputs** spawn (items, entities, or commands execute)

## Next Steps

- [Altar Recipe](/recipes/altar) — Learn the full recipe builder API
- [Item Inputs & Outputs](/recipes/items) — Working with items
- [Entity Inputs & Outputs](/recipes/entities) — Summoning and sacrificing mobs
- [Conditions](/conditions/overview) — Restricting when rituals can run
- [Events](/events) — Custom logic on ritual start/complete
- [Full Example](/example) — A complete example using every feature
