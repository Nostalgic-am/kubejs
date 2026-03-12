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

Individual `.input()` calls have been replaced with a single `.itemInputs()` array.

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
Tag namespaces changed from `#forge:` to `#c:` on NeoForge 1.21.1.
:::

## Outputs

Individual output calls have been replaced with arrays.

**Before:**
```js
.itemOutput('3x gold_ingot')
.itemOutput('diamond')
.mobOutput('wolf')
```

**After:**
```js
.itemOutputs(["3x gold_ingot", "diamond"])
.entityOutputs(["wolf"])
```

## Entity Helpers

| Before (1.19/1.20) | After (1.21.1) |
|---|---|
| `SummoningOutput.mob("blaze")` | `SummoningEntity.output("blaze")` |
| `.count(5)` | Second parameter: `SummoningEntity.output("blaze", 5)` |
| N/A | `SummoningEntity.input("cat")` |
| N/A | `SummoningItem.of("3x diamond")` |

## Sacrifices

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

`.sacrificeZone()` takes a 3D array `[x, y, z]`. Aliases: `.entityInputZone()`, `.inputZone()`, `.entityZone()`.

## Recipe Time

**Before:** `.recipeTime(200)` → **After:** `.ticks(200)`

## Conditions

Conditions have been consolidated into a `.conditions()` builder.

**Before:**
```js
.blockBelow('minecraft:furnace', { lit: true })
.weather('clear')
.dayTime('day')
```

**After:**
```js
.conditions(c =>
    c.blockBelow("minecraft:furnace", { lit: "true" })
     .weather(w => w.setRaining(false))
     .time("day")
)
```

::: tip BLOCK BELOW IS BACK
`.blockBelow()` was missing in early 1.21.1 builds but was **re-added in v3.3.0**. It now lives inside the `.conditions()` builder and block state values must be **strings** (e.g. `{ lit: "true" }` not `{ lit: true }`).
:::

### Weather Changes

| Before | After |
|---|---|
| `.weather('clear')` | `.weather(w => w.setRaining(false))` |
| `.weather('rain')` | `.weather(w => w.setRaining(true).setThundering(false))` |
| `.weather('thunder')` | `.weather(w => w.setThundering(true))` |

### New Conditions in 1.21.1

| Condition | Version | Description |
|---|---|---|
| `.biomes([...])` | 3.0+ | Restrict by biome |
| `.dimension(id)` | 3.0+ | Restrict by dimension |
| `.minHeight(y)` / `.height(min, max)` | 3.0+ | Height restrictions |
| `.setOpenSky(bool)` | 3.0+ | Sky visibility |
| `.structures(id)` | 3.0+ | Structure requirement |
| `.minTime(ticks)` / `.time(min, max)` | 3.0+ | Tick-based time |
| `.blockBelow(block, state?)` | **3.3.0** | Block under altar |
| `.minLightLevel(min)` / `.lightLevel(min, max)` | **3.3.0** | Light level |
| `.setSmoked(bool)` | **3.3.0** | Campfire smoke |
| `.facing(direction)` | **3.3.0** | Altar facing direction |
| `.setWaterlogged(bool)` | **3.3.0** | Waterlogged altar |

## Commands

```js
.commands(["say Ritual complete!"])
.commands(["give @p diamond 5"], [Text.of("Grants diamonds").gold()])
.commands(["advancement grant @p only my_pack:ritual"], [Text.of("Advancement").green()], true)
```

## Events

Events now use `SummoningRituals` (not `ServerEvents`):

**Before:**
```js
onEvent('summoningrituals.start', event => { ... })
onEvent('summoningrituals.complete', event => { ... })
```

**After:**
```js
SummoningRituals.start(event => { ... })
SummoningRituals.complete(event => { ... })
```

### Event Property Changes

| Before | After |
|---|---|
| `event.recipe` | `event.recipeInfo` (a `RecipeInfoContainer`) |
| N/A | `event.recipeInfo.id` (recipe ID) |
| N/A | `event.recipeInfo.entities` (actual entities used) |

The `event.level.spawnLightning()` method from old examples **no longer exists**.

## Quick Reference

| Feature | 1.19/1.20 | 1.21.1 |
|---|---|---|
| Recipe events | `onEvent('recipes', ...)` | `ServerEvents.recipes(...)` |
| Ritual events | `onEvent('summoningrituals.start', ...)` | `SummoningRituals.start(...)` |
| Item inputs | `.input(item)` (chained) | `.itemInputs([...])` (array) |
| Item outputs | `.itemOutput(item)` (chained) | `.itemOutputs([...])` (array) |
| Mob outputs | `.mobOutput(mob)` (chained) | `.entityOutputs([...])` (array) |
| Sacrifices | `.sacrifice(mob, count)` | `.entityInputs([...])` |
| Sacrifice area | `.sacrificeRegion(x, z)` | `.sacrificeZone([x, y, z])` |
| Entity helper | `SummoningOutput.mob()` | `SummoningEntity.output()` |
| Recipe time | `.recipeTime(ticks)` | `.ticks(ticks)` |
| Conditions | Individual methods | `.conditions(builder)` |
| Block below | `.blockBelow(block, state)` | `.conditions(c => c.blockBelow(...))` |
| Commands | N/A | `.commands([...])` |
| Tags | `#forge:` | `#c:` |
| Event recipe prop | `event.recipe` | `event.recipeInfo` |
