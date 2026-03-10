# Entity Inputs & Outputs

Summoning Rituals supports both entity inputs (sacrifices) and entity outputs (summoned mobs).

## Entity Inputs

Use `.entityInputs()` to require entities to be present in the sacrifice zone when the ritual starts. These entities are consumed by the ritual.

```js
.entityInputs([
    "3x minecraft:elder_guardian",
    "phantom",
    "silverfish",
    "3x cow",
    "minecraft:wither",
    SummoningEntity.input("cat").tooltip("Meow"),
])
```

### Simple Entity Strings

Like items, entities can use the `Nx` prefix for count:

| Format | Example | Description |
|---|---|---|
| `"entity_id"` | `"phantom"` | A single entity |
| `"Nx entity_id"` | `"3x cow"` | Multiple entities |

### SummoningEntity.input()

For more control, use `SummoningEntity.input()`:

```js
SummoningEntity.input("cat").tooltip("Meow")
```

| Method | Description |
|---|---|
| `SummoningEntity.input(entity)` | Create an entity input |
| `.tooltip(text)` | Add a tooltip shown in JEI/recipe viewers |

::: tip
Make sure `.sacrificeZone()` is large enough for the required entities to be detected around the altar.
:::

## Entity Outputs

Use `.entityOutputs()` to summon entities when the ritual completes.

```js
.entityOutputs([
    "bat",
    "ender_dragon",
    "4x creeper",
    SummoningEntity.output("fox", 2),
])
```

### SummoningEntity.output()

The `SummoningEntity.output()` builder gives full control over spawned entities:

```js
SummoningEntity.output("blaze", 2)
    .data({
        Health: 50,
        Attributes: [{ Name: "generic.max_health", Base: 50 }],
    })
    .offset([1, 2, 2])
    .tooltip([Text.of("50 health").aqua()])
```

### Output Methods

| Method | Description |
|---|---|
| `SummoningEntity.output(entity, count?)` | Create an entity output with optional count |
| `.data({...})` | Apply NBT data to the spawned entity |
| `.offset([x, y, z])` | Offset spawn position from the altar |
| `.spread([x, y, z])` | Randomize spawn position within a range |
| `.tooltip(text)` | Add a tooltip (string or `Text` component) |

### NBT Data

The `.data()` method accepts an NBT compound object. This lets you customize entity attributes, equipment, health, and more:

```js
// Zombie with a diamond sword (Sharpness I)
SummoningEntity.output("zombie", 3)
    .data({
        HandItems: [
            {
                id: "minecraft:diamond_sword",
                Count: 1,
                tag: { ench: [{ id: 16, lvl: 1 }] },
            },
        ],
    })
    .tooltip("Has Sword lol")
```

```js
// Ghast with 50 health, offset and spread
SummoningEntity.output("ghast")
    .offset([1, 2, 2])
    .spread([4, 2, 4])
    .data({
        Health: 50,
        Attributes: [{ Name: "generic.max_health", Base: 50 }],
    })
```

### Tooltips

Tooltips can be a plain string or a styled `Text` component:

```js
.tooltip("Has Sword lol")                    // plain string
.tooltip([Text.of("50 health").aqua()])       // styled text
```

::: warning
NBT data structure depends on the entity type and Minecraft version. Check the [Minecraft Wiki](https://minecraft.wiki/w/Entity_format) for valid NBT tags.
:::
