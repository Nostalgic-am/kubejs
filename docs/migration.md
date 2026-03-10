# Migration from 1.19/1.20

If you have existing Summoning Rituals scripts from Minecraft 1.19 or 1.20, several things have changed in the **1.21.1** version. This guide covers every breaking change.

## Event Registration

KubeJS 6 uses a new event registration syntax.

**Before (1.19/1.20):**
```js
onEvent('recipes', event => {
    event.recipes.summoningrituals
        .altar('iron_ingot')
        // ...
})
```

**After (1.21.1):**
```js
ServerEvents.recipes(event => {
    event.recipes.summoningrituals
        .altar("iron_ingot")
        // ...
})
```

## Inputs

Individual `.input()` calls have been replaced with a single `.itemInputs()` that takes an array.

**Before:**
```js
.input('64x minecraft:stone')
.input('5x prismarine_shard')
.input(Ingredient.of('#forge:glass'))
```

**After:**
```js
.itemInputs(["64x minecraft:stone", "5x prismarine_shard", "#c:glass_blocks"])
```

::: warning
Tag namespaces have changed from `#forge:` to `#c:` on NeoForge 1.21.1 (Common tags convention).
:::

## Outputs

Individual `.itemOutput()` and `.mobOutput()` calls have been replaced with `.itemOutputs()` and `.entityOutputs()` arrays.

**Before:**
```js
.itemOutput('3x gold_ingot')
.itemOutput('diamond')
.mobOutput('wolf')
.mobOutput(SummoningOutput.mob('blaze').count(5).offset(0, 3, 0))
```

**After:**
```js
.itemOutputs(["3x gold_ingot", "diamond"])
.entityOutputs([
    "wolf",
    SummoningEntity.output("blaze", 5).offset([0, 3, 0])
])
```

## Entity Helpers

`SummoningOutput.mob()` has been renamed to `SummoningEntity.output()`, and a new `SummoningEntity.input()` exists for sacrifice inputs.

| Before (1.19/1.20) | After (1.21.1) |
|---|---|
| `SummoningOutput.mob("blaze")` | `SummoningEntity.output("blaze")` |
| `.count(5)` | Second parameter: `SummoningEntity.output("blaze", 5)` |
| N/A | `SummoningEntity.input("cat")` |
| N/A | `SummoningItem.of("3x diamond")` |

## Sacrifices

The `.sacrifice()` method and `.sacrificeRegion()` have been replaced.

**Before:**
```js
.sacrifice('pig', 3)
.sacrifice('sheep')
.sacrificeRegion(3, 3)
```

**After:**
```js
.entityInputs(["3x pig", "sheep"])
.sacrificeZone([3, 3, 3])
```

Note that `.sacrificeZone()` now takes a **3D array** `[x, y, z]` instead of two values. It also has aliases: `.entityInputZone()`, `.inputZone()`, `.entityZone()`.

## Recipe Time

**Before:**
```js
.recipeTime(200)
```

**After:**
```js
.ticks(200)
```

## Conditions

Conditions like `.blockBelow()`, `.weather()`, and `.dayTime()` have been consolidated into a `.conditions()` builder.

**Before:**
```js
.blockBelow('minecraft:furnace', { lit: true })
.weather('clear')
.dayTime('day')
```

**After:**
```js
.conditions(c =>
    c.time("day")
     .weather(w => w.setRaining(false))
)
```

::: warning BLOCK BELOW REMOVED
`.blockBelow()` does **not** exist in 1.21.1. It is listed as a TODO in the source code. As a workaround, use the [summoningrituals.start event](/events) to check the block below manually and cancel the ritual.
:::

### Weather Changes

The old weather method took simple strings (`'clear'`, `'rain'`, `'thunder'`). The new builder uses `setRaining()` and `setThundering()`:

| Before | After |
|---|---|
| `.weather('clear')` | `.weather(w => w.setRaining(false))` |
| `.weather('rain')` | `.weather(w => w.setRaining(true).setThundering(false))` |
| `.weather('thunder')` | `.weather(w => w.setThundering(true))` |

### New Conditions in 1.21.1

These are **new** and didn't exist in 1.19/1.20:

| Condition | Description |
|---|---|
| `.biomes([...])` | Restrict by biome |
| `.dimension(id)` | Restrict by dimension |
| `.minHeight(y)` | Minimum Y level |
| `.height(exact)` | Exact Y level |
| `.height(min, max)` | Y level range |
| `.setOpenSky(bool)` | Require open/covered sky |
| `.structures(id)` | Require a structure |
| `.minTime(ticks)` | Minimum time of day in ticks |
| `.maxTime(ticks)` | Maximum time of day in ticks |
| `.time(min, max)` | Time range in ticks |

## Commands

A new `.commands()` method has been added with multiple overloads:

```js
// Basic
.commands(["say Ritual complete!"])

// With JEI tooltip
.commands(
    ["give @p diamond 5"],
    [Text.of("Grants diamonds").gold()]
)

// Requires player (won't fire from automation)
.commands(
    ["advancement grant @p only my_pack:ritual"],
    [Text.of("Grants advancement").green()],
    true
)
```

## Events

Event registration uses the new KubeJS 6 syntax:

**Before:**
```js
onEvent('summoningrituals.start', event => { ... })
onEvent('summoningrituals.complete', event => { ... })
```

**After:**
```js
ServerEvents.generic("summoningrituals.start", event => { ... })
ServerEvents.generic("summoningrituals.complete", event => { ... })
```

## Quick Reference

| Feature | 1.19/1.20 | 1.21.1 |
|---|---|---|
| Event registration | `onEvent('recipes', ...)` | `ServerEvents.recipes(...)` |
| Item inputs | `.input(item)` (chained) | `.itemInputs([...])` (array) |
| Item outputs | `.itemOutput(item)` (chained) | `.itemOutputs([...])` (array) |
| Mob outputs | `.mobOutput(mob)` (chained) | `.entityOutputs([...])` (array) |
| Sacrifices | `.sacrifice(mob, count)` | `.entityInputs([...])` |
| Sacrifice area | `.sacrificeRegion(x, z)` | `.sacrificeZone([x, y, z])` |
| Entity helper | `SummoningOutput.mob()` | `SummoningEntity.output()` |
| Recipe time | `.recipeTime(ticks)` | `.ticks(ticks)` |
| Conditions | Individual methods | `.conditions(builder)` |
| Block below | `.blockBelow(block, state)` | ❌ Not yet implemented |
| Commands | N/A | `.commands([...])` |
| Tags | `#forge:` | `#c:` |
