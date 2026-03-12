# Height, Light, Sky & Structures

## Height Conditions

Four ways to restrict the altar's Y position.

### `.maxHeight(max)` — At or Below

```js
.conditions(c => c.maxHeight(30))    // Y ≤ 30
.conditions(c => c.maxHeight(63))    // at or below sea level
```

### `.minHeight(min)` — At or Above

```js
.conditions(c => c.minHeight(100))   // Y ≥ 100
.conditions(c => c.minHeight(64))    // above sea level
```

### `.height(exact)` — Exact Y Level

```js
.conditions(c => c.height(0))       // exactly Y = 0
```

### `.height(min, max)` — Y Range

```js
.conditions(c => c.height(-64, 0))   // deep underground
.conditions(c => c.height(100, 256)) // high altitude
```

### Height Quick Reference

| Scenario | Method |
|---|---|
| Underground only | `.maxHeight(30)` |
| Above ground only | `.minHeight(64)` |
| Exact level | `.height(0)` |
| Range | `.height(-64, 0)` |

## Light Level Conditions

::: tip NEW IN v3.3.0
Light level conditions were added in Summoning Rituals v3.3.0.
:::

Restrict the ritual based on the composite light level at the altar (0–15). This combines block light and sky light.

### `.minLightLevel(min)` — At Least

```js
.conditions(c => c.minLightLevel(10))   // bright area (light ≥ 10)
.conditions(c => c.minLightLevel(15))   // maximum brightness only
```

### `.maxLightLevel(max)` — At Most

```js
.conditions(c => c.maxLightLevel(7))    // dark area (light ≤ 7, mobs can spawn)
.conditions(c => c.maxLightLevel(0))    // pitch black only
```

### `.lightLevel(exact)` — Exact Level

```js
.conditions(c => c.lightLevel(0))      // complete darkness
.conditions(c => c.lightLevel(15))     // full brightness
```

### `.lightLevel(min, max)` — Range

```js
.conditions(c => c.lightLevel(0, 7))    // dark enough for mob spawns
.conditions(c => c.lightLevel(8, 15))   // well-lit area
.conditions(c => c.lightLevel(4, 8))    // dim/twilight range
```

### Light Level Quick Reference

| Scenario | Method | Notes |
|---|---|---|
| Pitch black | `.maxLightLevel(0)` | Only in sealed rooms |
| Dark (mob spawnable) | `.maxLightLevel(7)` | Caves, unlit areas |
| Well-lit | `.minLightLevel(8)` | Torches, glowstone nearby |
| Full brightness | `.lightLevel(15)` | Direct sunlight or glowstone |
| Dim | `.lightLevel(4, 8)` | Partial light |

### Example: Dark Ritual

```js
event.recipes.summoningrituals
    .altar("sculk_catalyst")
    .itemInputs(["echo_shard", "amethyst_shard"])
    .entityOutputs(["minecraft:warden"])
    .conditions(c =>
        c.maxLightLevel(4)
         .maxHeight(0)
         .setOpenSky(false)
    )
```

## `.setOpenSky()` — Sky Visibility

Require or forbid a clear view of the sky above the altar.

```js
.conditions(c => c.setOpenSky(true))   // must be outdoors
.conditions(c => c.setOpenSky(false))  // must be covered/underground
```

## `.setSmoked()` — Campfire Smoke

::: tip NEW IN v3.3.0
The smoked condition was added in Summoning Rituals v3.3.0.
:::

Requires the altar to be (or not be) in a smoky area. Smoke comes from campfires.

```js
.conditions(c => c.setSmoked(true))    // must have campfire smoke
.conditions(c => c.setSmoked(false))   // must not be smoky
```

### Example: Smoke Ritual

```js
// Ritual that requires campfire smoke (mystical atmosphere)
event.recipes.summoningrituals
    .altar("blaze_powder")
    .itemInputs(["coal", "bone_meal", "gunpowder"])
    .entityOutputs(["minecraft:blaze"])
    .conditions(c =>
        c.setSmoked(true)
         .time("night")
    )
```

::: info
Smoke is detected from campfires. Place a campfire near the altar to create smoke. A soul campfire also counts.
:::

## `.structures()` — Structure Requirement

Restricts the ritual to within the bounds of a specific structure.

```js
.conditions(c => c.structures("#minecraft:mineshaft"))
```

### Structure Tags

```js
.conditions(c => c.structures("#minecraft:village"))
.conditions(c => c.structures("#minecraft:ocean_ruin"))
```

### Specific Structures

```js
.conditions(c => c.structures("minecraft:stronghold"))
.conditions(c => c.structures("minecraft:monument"))
```

### Common Structure Tags (1.21.1)

| Tag | Includes |
|---|---|
| `#minecraft:mineshaft` | Mineshaft, Mesa Mineshaft |
| `#minecraft:village` | All village types |
| `#minecraft:ocean_ruin` | Cold and Warm ocean ruins |
| `#minecraft:shipwreck` | All shipwrecks |
| `#minecraft:ruined_portal` | All ruined portals |

## Combining Conditions

```js
// Underground, dark, smoky cave ritual
.conditions(c =>
    c.height(-64, 30)
     .maxLightLevel(4)
     .setOpenSky(false)
     .setSmoked(true)
     .structures("#minecraft:mineshaft")
)
```
