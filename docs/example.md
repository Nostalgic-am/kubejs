# Full Example

A complete working example demonstrating every feature of the Summoning Rituals KubeJS API.

## Recipe

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

## Breakdown

This example creates a ritual that:

**Catalyst:** A stick placed on the altar.

**Item Inputs:** Cobblestone, any glass block, and 3 of any ingot on the pedestals.

**Entity Inputs:** 3 elder guardians, a phantom, a silverfish, 3 cows, a wither, and a cat (with a "Meow" tooltip in JEI) must all be in the sacrifice zone.

**Item Outputs:** An apple, a carrot, 3 diamonds, and emeralds that spawn offset from the altar with random spread.

**Entity Outputs:**
- A bat, an ender dragon, and 4 creepers (simple spawns)
- 2 foxes
- 2 blazes with 50 max health, offset spawn, and an aqua "50 health" tooltip
- 3 zombies holding enchanted diamond swords
- A ghast with 50 max health, offset, and spread

**Commands:** Sends "Hi" and "Hello" in chat.

**Conditions:** Only works in plains or desert biomes, in the overworld, below Y=30, with open sky, inside a mineshaft structure, at night, during a thunderstorm.
