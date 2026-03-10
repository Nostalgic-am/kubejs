# Biome & Dimension

## `.biomes()`

Restricts the ritual to specific biomes. Pass an array of biome IDs.

```js
.conditions(c =>
    c.biomes(["minecraft:plains", "minecraft:desert"])
)
```

The ritual will only work if the altar is located in one of the listed biomes. This is an **OR** check — the altar needs to be in **any one** of the specified biomes.

### Using Tags

You can also use biome tags with the `#` prefix:

```js
.conditions(c =>
    c.biomes(["#minecraft:is_forest"])
)
```

## `.dimension()`

Restricts the ritual to a specific dimension.

```js
.conditions(c =>
    c.dimension("minecraft:overworld")
)
```

### Common Dimensions

| Dimension | ID |
|---|---|
| Overworld | `minecraft:overworld` |
| Nether | `minecraft:the_nether` |
| End | `minecraft:the_end` |

Modded dimensions use their respective namespace, e.g. `aether:the_aether`.

### Combining Both

You can combine biome and dimension conditions:

```js
.conditions(c =>
    c.dimension("minecraft:overworld")
     .biomes(["minecraft:plains", "minecraft:sunflower_plains"])
)
```
