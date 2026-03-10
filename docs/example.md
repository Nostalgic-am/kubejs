# Full Example

A complete working example demonstrating every feature of the Summoning Rituals KubeJS API for **Minecraft 1.21.1**.

## Complete Recipe

```js
ServerEvents.recipes(event => {
    event.recipes.summoningrituals
        .altar("stick")
        .itemInputs(["cobblestone", "#c:glass_blocks", "3x #c:ingots"])
        .entityInputs([
            "3x minecraft:elder_guardian",
            "phantom",
            "silverfish",
            "3x cow",
            "minecraft:wither",
            SummoningEntity.input("cat").tooltip("Meow"),
        ])
        .itemOutputs([
            "apple",
            "carrot",
            SummoningItem.of("3x diamond"),
            SummoningItem.of("emerald").offset([1, 2, 2]).spread([4, 2, 4]),
        ])
        .entityOutputs([
            "bat",
            "ender_dragon",
            "4x creeper",
            SummoningEntity.output("fox", 2),
            SummoningEntity.output("blaze", 2)
                .data({
                    Health: 50,
                    Attributes: [{ Name: "generic.max_health", Base: 50 }],
                })
                .offset([1, 2, 2])
                .tooltip([Text.of("50 health").aqua()]),
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
                .tooltip("Has Sword lol"),
            SummoningEntity.output("ghast")
                .offset([1, 2, 2])
                .spread([4, 2, 4])
                .data({
                    Health: 50,
                    Attributes: [{ Name: "generic.max_health", Base: 50 }],
                }),
        ])
        .commands(["say Hi", "/say Hello"])
        .sacrificeZone([3, 3, 3])
        .ticks(200)
        .conditions(conditions =>
            conditions
                .biomes(["minecraft:plains", "minecraft:desert"])
                .dimension("minecraft:overworld")
                .maxHeight(30)
                .setOpenSky(true)
                .structures("#minecraft:mineshaft")
                .time("night")
                .weather(w => w.setThundering(true))
        )
})
```

## What This Does

### Catalyst
A **stick** placed on the altar starts this ritual.

### Item Inputs
- 1 cobblestone
- 1 item from the `#c:glass_blocks` tag
- 3 items from the `#c:ingots` tag

### Entity Inputs (Sacrifice Zone)
All of these entities must be present in the 6×6×6 sacrifice zone:
- 3 elder guardians, 1 phantom, 1 silverfish, 3 cows, 1 wither
- 1 cat (shown with "Meow" tooltip in JEI)

### Item Outputs
- 1 apple, 1 carrot, 3 diamonds (at altar center)
- Emeralds offset by (1, 2, 2) with random spread in a 4×2×4 area

### Entity Outputs
- 1 bat, 1 ender dragon, 4 creepers, 2 foxes (at altar center)
- 2 blazes: 50 max health, offset (1, 2, 2), aqua "50 health" tooltip
- 3 zombies: holding enchanted diamond swords, "Has Sword lol" tooltip
- 1 ghast: 50 max health, offset (1, 2, 2), spread (4, 2, 4)

### Commands
Sends "Hi" and "Hello" in server chat.

### Duration
200 ticks (10 seconds).

### Conditions
**All** must be true: plains/desert biome, overworld, Y ≤ 30, open sky, inside mineshaft, nighttime, thunderstorm.

## Simpler Examples

### Basic Item Transformation

```js
ServerEvents.recipes(event => {
    event.recipes.summoningrituals
        .altar("iron_ingot")
        .itemInputs(["8x coal"])
        .itemOutputs(["diamond"])
        .ticks(100)
})
```

### Mob Summoning with Tick-Based Time

```js
ServerEvents.recipes(event => {
    event.recipes.summoningrituals
        .altar("bone")
        .itemInputs(["rotten_flesh", "spider_eye", "gunpowder"])
        .entityOutputs(["minecraft:skeleton", "minecraft:zombie", "minecraft:creeper"])
        .ticks(300)
        .conditions(c =>
            c.time(12000, 13000)  // only during sunset
             .weather(w => w.setRaining(true))
        )
})
```

### Commands with Tooltip and Player Requirement

```js
ServerEvents.recipes(event => {
    event.recipes.summoningrituals
        .altar("nether_star")
        .itemInputs(["4x obsidian", "4x crying_obsidian"])
        .entityInputs(["minecraft:wither"])
        .commands(
            ["advancement grant @p only my_pack:defeated_wither"],
            [Text.of("Grants an advancement").gold()],
            true  // requires a player
        )
        .itemOutputs(["elytra"])
        .sacrificeZone([5, 5, 5])
        .conditions(c =>
            c.dimension("minecraft:the_end")
             .setOpenSky(true)
             .minHeight(64)
        )
})
```

### Height Range Example

```js
ServerEvents.recipes(event => {
    event.recipes.summoningrituals
        .altar("sculk_catalyst")
        .itemInputs(["echo_shard", "amethyst_shard"])
        .entityOutputs(["minecraft:warden"])
        .conditions(c =>
            c.height(-64, 0)        // deep underground only
             .setOpenSky(false)      // must be covered
             .weather(w => w.setRaining(false))  // clear skies above
        )
})
```
