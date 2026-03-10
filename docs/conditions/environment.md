# Height, Sky & Structures

## Height Conditions

The conditions builder provides four ways to restrict the altar's Y position.

### `.maxHeight(max)` — At or Below

Altar must be at or below the given Y level:

```js
.conditions(c => c.maxHeight(30))    // Y ≤ 30
.conditions(c => c.maxHeight(63))    // at or below sea level
.conditions(c => c.maxHeight(0))     // deep underground
```

### `.minHeight(min)` — At or Above

Altar must be at or above the given Y level:

```js
.conditions(c => c.minHeight(100))   // Y ≥ 100 (mountain level)
.conditions(c => c.minHeight(200))   // Y ≥ 200 (high altitude)
.conditions(c => c.minHeight(64))    // above sea level
```

### `.height(exact)` — Exact Y Level

Altar must be at an exact Y level:

```js
.conditions(c => c.height(0))       // exactly Y = 0
.conditions(c => c.height(64))      // exactly sea level
```

### `.height(min, max)` — Y Range

Altar must be between two Y levels (inclusive):

```js
.conditions(c => c.height(-64, 0))   // deep underground range
.conditions(c => c.height(60, 70))   // around sea level
.conditions(c => c.height(100, 256)) // high altitude range
```

::: warning ONE HEIGHT CONDITION
Only **one** height condition is allowed per recipe. Using `.minHeight()` and `.maxHeight()` together will throw a duplicate condition error. Use `.height(min, max)` instead:

```js
// WRONG — will throw an error
.conditions(c => c.minHeight(10).maxHeight(50))

// CORRECT — use the range form
.conditions(c => c.height(10, 50))
```
:::

### Height Quick Reference

| Scenario | Method |
|---|---|
| Underground only | `.maxHeight(30)` |
| Above ground only | `.minHeight(64)` |
| Exact level | `.height(0)` |
| Range | `.height(-64, 0)` |
| Mountain tops | `.minHeight(200)` |
| Below sea level | `.maxHeight(63)` |

## `.setOpenSky()`

Requires the altar to have (or not have) a clear line of sight to the sky.

```js
.conditions(c => c.setOpenSky(true))   // must be outdoors
.conditions(c => c.setOpenSky(false))  // must be covered/underground
```

| Value | Description |
|---|---|
| `true` | Altar must have open sky above (no blocks overhead) |
| `false` | Altar must be covered (blocks above it) |

### Example: Outdoor Summoning

```js
event.recipes.summoningrituals
    .altar("sunflower")
    .itemInputs(["gold_ingot", "glowstone_dust"])
    .entityOutputs(["minecraft:allay"])
    .conditions(c =>
        c.setOpenSky(true)
         .time("day")
    )
```

### Example: Cave Ritual

```js
event.recipes.summoningrituals
    .altar("sculk_catalyst")
    .itemInputs(["echo_shard", "amethyst_shard"])
    .entityOutputs(["minecraft:warden"])
    .conditions(c =>
        c.setOpenSky(false)
         .maxHeight(0)
    )
```

## `.structures()`

Restricts the ritual to within the bounds of a specific structure.

```js
.conditions(c => c.structures("#minecraft:mineshaft"))
```

The altar must be inside the **bounding box** of the matching structure.

### Structure Tags

Use `#` for structure tags:

```js
.conditions(c => c.structures("#minecraft:village"))
.conditions(c => c.structures("#minecraft:ocean_ruin"))
```

### Specific Structures

```js
.conditions(c => c.structures("minecraft:stronghold"))
.conditions(c => c.structures("minecraft:monument"))
.conditions(c => c.structures("minecraft:fortress"))
```

### Common Structure Tags (1.21.1)

| Tag | Includes |
|---|---|
| `#minecraft:mineshaft` | Mineshaft, Mesa Mineshaft |
| `#minecraft:village` | All village types |
| `#minecraft:ocean_ruin` | Cold and Warm ocean ruins |
| `#minecraft:shipwreck` | All shipwrecks |
| `#minecraft:ruined_portal` | All ruined portals |

::: tip EXPLORATION REWARD
Structure conditions reward exploration. Require players to find a specific structure before they can perform a powerful ritual.
:::

## Combining All Three

```js
// Underground mineshaft ritual at night
.conditions(c =>
    c.height(-64, 30)
     .setOpenSky(false)
     .structures("#minecraft:mineshaft")
     .time("night")
)
```
