# Conditions Overview

::: tip VERSION 3.3.0
This page reflects **Summoning Rituals v3.3.0** for Minecraft 1.21.1 / NeoForge. Several new conditions were added in this version including block below, light level, facing, smoked, and waterlogged.
:::

Conditions restrict **when** and **where** a ritual can be performed. They're added to a recipe using the `.conditions()` method with a builder callback.

## Basic Usage

```js
event.recipes.summoningrituals
    .altar("stick")
    .itemInputs(["cobblestone"])
    .itemOutputs(["diamond"])
    .conditions(c =>
        c.dimension("minecraft:overworld")
         .time("night")
    )
```

## All Available Conditions

### Location Conditions

| Method | Description | Page |
|---|---|---|
| `.biomes(biomes)` | Require specific biomes | [Biome & Dimension](/conditions/biome-dimension) |
| `.dimension(id)` | Require a specific dimension | [Biome & Dimension](/conditions/biome-dimension) |
| `.setOpenSky(bool)` | Require open or covered sky | [Environment](/conditions/environment) |
| `.setSmoked(bool)` | Require campfire smoke | [Environment](/conditions/environment) |
| `.structures(structures)` | Require a structure nearby | [Environment](/conditions/environment) |

### Height Conditions

| Method | Description | Page |
|---|---|---|
| `.maxHeight(max)` | Altar at or below Y level | [Environment](/conditions/environment) |
| `.minHeight(min)` | Altar at or above Y level | [Environment](/conditions/environment) |
| `.height(exact)` | Altar at exact Y level | [Environment](/conditions/environment) |
| `.height(min, max)` | Altar between two Y levels | [Environment](/conditions/environment) |

### Light Level Conditions

| Method | Description | Page |
|---|---|---|
| `.minLightLevel(min)` | Minimum light level (0–15) | [Environment](/conditions/environment) |
| `.maxLightLevel(max)` | Maximum light level (0–15) | [Environment](/conditions/environment) |
| `.lightLevel(exact)` | Exact light level | [Environment](/conditions/environment) |
| `.lightLevel(min, max)` | Light level range | [Environment](/conditions/environment) |

### Block Below Conditions

| Method | Description | Page |
|---|---|---|
| `.blockBelow(block)` | Require a block under the altar | [Block & Altar State](/conditions/block-altar) |
| `.blockBelow(block, blockState)` | Block with specific state | [Block & Altar State](/conditions/block-altar) |

### Altar State Conditions

| Method | Description | Page |
|---|---|---|
| `.facing(direction)` | Require altar facing direction | [Block & Altar State](/conditions/block-altar) |
| `.setWaterlogged(bool)` | Require waterlogged state | [Block & Altar State](/conditions/block-altar) |

### Time Conditions

| Method | Description | Page |
|---|---|---|
| `.time(timeType)` | Require `"day"` or `"night"` | [Time & Weather](/conditions/time-weather) |
| `.minTime(ticks)` | Minimum time of day (mod 24000) | [Time & Weather](/conditions/time-weather) |
| `.maxTime(ticks)` | Maximum time of day (mod 24000) | [Time & Weather](/conditions/time-weather) |
| `.time(min, max)` | Time range in ticks | [Time & Weather](/conditions/time-weather) |

### Weather Conditions

| Method | Description | Page |
|---|---|---|
| `.weather(callback)` | Require weather state via builder | [Time & Weather](/conditions/time-weather) |

## How Conditions Work

All conditions are **AND**-combined. Every condition must be satisfied simultaneously for the ritual to start.

If any condition fails when the player inserts the catalyst:
- The ritual does **not** start
- The catalyst is **returned** to the player
- There is **no** error message by default

## Full Conditions Example

Using every condition type:

```js
.conditions(c =>
    c.biomes(["minecraft:plains", "minecraft:desert"])
     .dimension("minecraft:overworld")
     .maxHeight(30)
     .setOpenSky(true)
     .setSmoked(false)
     .structures("#minecraft:mineshaft")
     .lightLevel(0, 7)
     .blockBelow("minecraft:furnace", { lit: "true" })
     .facing("north")
     .setWaterlogged(false)
     .time("night")
     .weather(w => w.setThundering(true))
)
```
