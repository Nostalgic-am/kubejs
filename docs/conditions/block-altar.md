# Block & Altar State

::: tip NEW IN v3.3.0
Block below, facing, and waterlogged conditions are new in Summoning Rituals v3.3.0.
:::

## Block Below

Require a specific block directly underneath the altar.

### `.blockBelow(block)` — Simple Block Check

```js
.conditions(c => c.blockBelow("minecraft:stone"))
.conditions(c => c.blockBelow("minecraft:diamond_block"))
.conditions(c => c.blockBelow("minecraft:soul_sand"))
```

### `.blockBelow(block, blockState)` — With Block State Properties

Pass a JSON object as the second argument to match specific block state properties:

```js
// Lit furnace only (unlit won't work)
.conditions(c =>
    c.blockBelow("minecraft:furnace", { lit: "true" })
)

// Campfire that is lit and NOT waterlogged
.conditions(c =>
    c.blockBelow("minecraft:campfire", { lit: "true", waterlogged: "false" })
)

// Facing-specific block
.conditions(c =>
    c.blockBelow("minecraft:observer", { facing: "up" })
)
```

::: warning BLOCK STATE VALUES ARE STRINGS
All block state property values must be passed as **strings**, even booleans and numbers. Use `"true"` not `true`, `"3"` not `3`.
:::

### Common Block State Properties

| Property | Values | Common Blocks |
|---|---|---|
| `lit` | `"true"`, `"false"` | Furnace, Blast Furnace, Smoker, Campfire, Candle |
| `waterlogged` | `"true"`, `"false"` | Many blocks (slabs, stairs, etc.) |
| `facing` | `"north"`, `"south"`, `"east"`, `"west"`, `"up"`, `"down"` | Observer, Piston, Dispenser |
| `powered` | `"true"`, `"false"` | Lever, Button, Pressure Plate |
| `level` | `"0"` – `"15"` | Cauldron (water/lava level) |

### Practical Examples

```js
// Require a lit campfire below (for cooking/fire rituals)
.conditions(c => c.blockBelow("minecraft:campfire", { lit: "true" }))

// Require a beacon below (for powerful rituals)
.conditions(c => c.blockBelow("minecraft:beacon"))

// Require a redstone-powered block
.conditions(c => c.blockBelow("minecraft:observer", { powered: "true" }))
```

## Altar Facing

Require the altar block itself to face a specific horizontal direction.

### `.facing(direction)`

```js
.conditions(c => c.facing("north"))
.conditions(c => c.facing("south"))
.conditions(c => c.facing("east"))
.conditions(c => c.facing("west"))
```

Valid values are the four horizontal directions: `"north"`, `"south"`, `"east"`, `"west"`.

::: info
This checks the **horizontal facing** block state property of the altar block. The altar must be placed facing the required direction for the ritual to work.
:::

### Example: Directional Ritual

```js
// Altar must face north (toward the "top" of the world map)
event.recipes.summoningrituals
    .altar("compass")
    .itemInputs(["lodestone", "iron_ingot"])
    .itemOutputs(["recovery_compass"])
    .conditions(c => c.facing("north"))
```

## Waterlogged

Require the altar to be (or not be) waterlogged.

### `.setWaterlogged(bool)`

```js
.conditions(c => c.setWaterlogged(true))   // altar must be underwater
.conditions(c => c.setWaterlogged(false))  // altar must be dry
```

### Example: Underwater Ritual

```js
// Ritual that only works when the altar is submerged
event.recipes.summoningrituals
    .altar("heart_of_the_sea")
    .itemInputs(["8x nautilus_shell"])
    .itemOutputs(["conduit"])
    .conditions(c =>
        c.setWaterlogged(true)
         .biomes(["#minecraft:is_ocean"])
    )
```

## Combining Block & Altar Conditions

```js
// Altar facing north, on top of a lit furnace, not waterlogged
.conditions(c =>
    c.blockBelow("minecraft:furnace", { lit: "true" })
     .facing("north")
     .setWaterlogged(false)
)
```
