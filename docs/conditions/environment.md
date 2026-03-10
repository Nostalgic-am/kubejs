# Height, Sky & Structures

## `.maxHeight()`

Restricts the ritual so the altar must be below a specific Y level.

```js
.conditions(c => c.maxHeight(30))
```

This is useful for underground-only rituals. In the example above, the altar must be at Y=30 or below.

### Examples

```js
// Deep underground only
.conditions(c => c.maxHeight(0))

// Below sea level
.conditions(c => c.maxHeight(63))
```

## `.setOpenSky()`

Requires the altar to have (or not have) a clear view of the sky.

```js
.conditions(c => c.setOpenSky(true))
```

| Value | Description |
|---|---|
| `true` | Altar must have open sky above it (no blocks overhead) |
| `false` | Altar must be covered (blocks above it) |

### Examples

```js
// Must be outdoors
.conditions(c => c.setOpenSky(true))

// Must be indoors / underground
.conditions(c => c.setOpenSky(false))
```

## `.structures()`

Restricts the ritual to a specific structure or structure tag.

```js
.conditions(c => c.structures("#minecraft:mineshaft"))
```

The altar must be located within the bounding box of the specified structure for the ritual to work.

### Using Structure Tags

Use the `#` prefix for structure tags:

```js
.conditions(c => c.structures("#minecraft:village"))
```

### Using Specific Structures

```js
.conditions(c => c.structures("minecraft:stronghold"))
```

### Common Structure Tags

| Tag | Description |
|---|---|
| `#minecraft:mineshaft` | Any type of mineshaft |
| `#minecraft:village` | Any type of village |
| `#minecraft:ocean_ruin` | Ocean ruins |
| `#minecraft:shipwreck` | Shipwrecks |

::: tip
Structure conditions are great for creating rituals that reward exploration — requiring players to find specific structures before they can perform powerful summons.
:::
