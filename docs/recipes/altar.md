# Altar Recipe

The altar recipe is the core of Summoning Rituals. Every recipe starts with `event.recipes.summoningrituals.altar()` and uses a fluent builder pattern to configure inputs, outputs, conditions, and more.

## Basic Structure

```js
ServerEvents.recipes(event => {
    event.recipes.summoningrituals
        .altar("catalyst_item")
        .itemInputs([...])
        .itemOutputs([...])
})
```

## `.altar(catalyst)`

Sets the **catalyst** item — the item the player right-clicks onto the altar to begin the ritual.

```js
.altar("minecraft:stick")
.altar("minecraft:diamond_sword")
.altar("#c:ingots")  // can use tags
```

The catalyst is consumed when the ritual starts.

## Builder Methods

Here is a summary of all methods available on the altar recipe builder:

| Method | Description |
|---|---|
| `.altar(catalyst)` | Set the catalyst item |
| `.itemInputs([...])` | Items required on pedestals |
| `.entityInputs([...])` | Entities required in the sacrifice zone |
| `.itemOutputs([...])` | Items produced by the ritual |
| `.entityOutputs([...])` | Entities spawned by the ritual |
| `.commands([...])` | Commands executed on completion |
| `.sacrificeZone([x, y, z])` | Size of the entity detection area |
| `.conditions(cb)` | Add biome, time, weather, etc. conditions |

## Chaining

All methods return the recipe builder, so you can chain them:

```js
event.recipes.summoningrituals
    .altar("stick")
    .itemInputs(["cobblestone", "dirt"])
    .itemOutputs(["diamond"])
    .entityOutputs(["bat"])
    .commands(["say Ritual complete!"])
    .sacrificeZone([3, 3, 3])
    .conditions(c => c.time("night"))
```

## Sacrifice Zone

The `.sacrificeZone([x, y, z])` method defines the area around the altar where entity inputs (sacrifices) are detected. The values represent the half-size of the detection box in each axis.

```js
.sacrificeZone([3, 3, 3])  // 6x6x6 area centered on the altar
```

::: tip
If your ritual uses `.entityInputs()`, make sure the sacrifice zone is large enough for the entities to be detected.
:::
