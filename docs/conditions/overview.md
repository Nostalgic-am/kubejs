# Conditions Overview

Conditions restrict **when** and **where** a ritual can be performed. They're added to a recipe using the `.conditions()` method with a builder callback.

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

## All Available Conditions

These are **all** conditions available in the 1.21.1 `ConditionsBuilder`, confirmed from [source code](https://github.com/AlmostReliable/summoningrituals/blob/1.21.1/src/main/java/com/almostreliable/summoningrituals/compat/kubejs/builder/ConditionsBuilder.java):

### Location Conditions

| Method | Description | Page |
|---|---|---|
| `.biomes(biomes)` | Require specific biomes | [Biome & Dimension](/conditions/biome-dimension) |
| `.dimension(id)` | Require a specific dimension | [Biome & Dimension](/conditions/biome-dimension) |
| `.setOpenSky(bool)` | Require open or covered sky | [Height, Sky & Structures](/conditions/environment) |
| `.structures(structures)` | Require a structure nearby | [Height, Sky & Structures](/conditions/environment) |

### Height Conditions

| Method | Description | Page |
|---|---|---|
| `.maxHeight(max)` | Altar must be at or below Y level | [Height, Sky & Structures](/conditions/environment) |
| `.minHeight(min)` | Altar must be at or above Y level | [Height, Sky & Structures](/conditions/environment) |
| `.height(exact)` | Altar must be at an exact Y level | [Height, Sky & Structures](/conditions/environment) |
| `.height(min, max)` | Altar must be between two Y levels | [Height, Sky & Structures](/conditions/environment) |

### Time Conditions

| Method | Description | Page |
|---|---|---|
| `.time(timeType)` | Require `"day"` or `"night"` | [Time & Weather](/conditions/time-weather) |
| `.minTime(ticks)` | Minimum time of day (in ticks, mod 24000) | [Time & Weather](/conditions/time-weather) |
| `.maxTime(ticks)` | Maximum time of day (in ticks, mod 24000) | [Time & Weather](/conditions/time-weather) |
| `.time(min, max)` | Time range in ticks (mod 24000) | [Time & Weather](/conditions/time-weather) |

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

::: warning DUPLICATE TYPES
Only **one condition of each type** is allowed. If you add two of the same type (e.g. two time checks), the builder will throw an error. Use the combined forms instead (e.g. `.height(min, max)` instead of `.minHeight()` + `.maxHeight()`).
:::

## Not Yet Implemented

The source code contains a TODO note indicating these conditions are **planned but not yet available**:

- **Light level** — restrict by light at the altar
- **Block below** — require a specific block under the altar (existed in 1.19/1.20 as `.blockBelow()`)
- **Water** — restrict based on water presence

::: info
If you need `blockBelow` functionality from 1.19/1.20, you can work around it using the [summoningrituals.start event](/events) to check the block below the altar manually and cancel the ritual if it doesn't match.
:::

## Full Conditions Example

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
