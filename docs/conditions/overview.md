# Conditions Overview

Conditions let you restrict when a ritual can be performed. They are added to a recipe using the `.conditions()` method, which takes a callback with a conditions builder.

## Basic Usage

```js
event.recipes.summoningrituals
    .altar("stick")
    .itemInputs(["cobblestone"])
    .itemOutputs(["diamond"])
    .conditions(conditions =>
        conditions
            .dimension("minecraft:overworld")
            .time("night")
    )
```

## Available Conditions

| Method | Description | Details |
|---|---|---|
| `.biomes([...])` | Require specific biomes | [Biome & Dimension](/conditions/biome-dimension) |
| `.dimension(dim)` | Require a specific dimension | [Biome & Dimension](/conditions/biome-dimension) |
| `.time(time)` | Require day or night | [Time & Weather](/conditions/time-weather) |
| `.weather(cb)` | Require weather conditions | [Time & Weather](/conditions/time-weather) |
| `.maxHeight(y)` | Require altar below a Y level | [Environment](/conditions/environment) |
| `.setOpenSky(bool)` | Require open sky above altar | [Environment](/conditions/environment) |
| `.structures(structure)` | Require a structure nearby | [Environment](/conditions/environment) |

## Combining Conditions

All conditions are **AND**-combined — every condition must be satisfied for the ritual to start. You can chain as many as you need:

```js
.conditions(conditions =>
    conditions
        .biomes(["minecraft:plains", "minecraft:desert"])
        .dimension("minecraft:overworld")
        .maxHeight(30)
        .setOpenSky(true)
        .structures("#minecraft:mineshaft")
        .time("night")
        .weather(w => w.setThundering(true))
)
```

::: warning
If any condition is not met, the ritual will simply not start when the player inserts the catalyst. There is no error message by default — the catalyst is returned to the player.
:::
