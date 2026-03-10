# Item Inputs & Outputs

## Item Inputs

Use `.itemInputs()` to define the items that must be placed on the pedestals around the altar. Pass an array of item strings.

```js
.itemInputs(["cobblestone", "#c:glass_blocks", "3x #c:ingots"])
```

### Item String Format

Items can be specified in several ways:

| Format | Example | Description |
|---|---|---|
| `"item_id"` | `"cobblestone"` | A single item |
| `"Nx item_id"` | `"3x minecraft:stone"` | Multiple of an item |
| `"#tag"` | `"#c:glass_blocks"` | Any item matching a tag |
| `"Nx #tag"` | `"3x #c:ingots"` | Multiple of a tagged item |

The `minecraft:` namespace prefix is optional — `"cobblestone"` and `"minecraft:cobblestone"` are equivalent.

### Example

```js
.itemInputs([
    "cobblestone",           // 1 cobblestone
    "#c:glass_blocks",       // 1 item from the glass blocks tag
    "3x #c:ingots",          // 3 items from the ingots tag
    "64x minecraft:stone",   // 64 stone
])
```

## Item Outputs

Use `.itemOutputs()` to define items that spawn when the ritual completes. You can use simple strings or `SummoningItem` for advanced control.

### Simple Outputs

```js
.itemOutputs(["apple", "carrot", "3x diamond"])
```

### SummoningItem

For more control over spawning behavior, use `SummoningItem.of()`:

```js
.itemOutputs([
    "apple",
    SummoningItem.of("3x diamond"),
    SummoningItem.of("emerald")
        .offset([1, 2, 2])
        .spread([4, 2, 4]),
])
```

### SummoningItem Methods

| Method | Description |
|---|---|
| `SummoningItem.of(item)` | Create a summoning item (supports `Nx` prefix) |
| `.offset([x, y, z])` | Offset the spawn position relative to the altar |
| `.spread([x, y, z])` | Randomize the spawn position within a range |

### Offset & Spread

**Offset** moves the spawn point by a fixed amount from the altar's position. **Spread** adds randomness to the spawn location.

```js
// Spawns emeralds offset by (1, 2, 2) from the altar,
// with random spread in a 4x2x4 area
SummoningItem.of("emerald")
    .offset([1, 2, 2])
    .spread([4, 2, 4])
```

::: info
If no offset or spread is specified, items spawn directly at the altar's position.
:::
