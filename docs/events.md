# Ritual Events

Summoning Rituals fires two events that let you hook in custom logic with KubeJS. Use these to add costs, effects, rewards, or cancel rituals based on custom conditions.

## Event Registration

```js
SummoningRituals.start(event => {
    // fired before the ritual starts
})

SummoningRituals.complete(event => {
    // fired after the ritual completes
})
```

## Event Properties

Both events share the same event object (`SummoningKubeEvent`):

| Property | Type | Description |
|---|---|---|
| `event.level` | `ServerLevel` | The world/level the ritual is in |
| `event.pos` | `BlockPos` | Block position of the altar |
| `event.recipeInfo` | `RecipeInfoContainer` | Container with recipe details (see below) |
| `event.player` | `ServerPlayer?` | The player who invoked the ritual |

::: warning NULL PLAYER
`event.player` is **null** if the ritual was started through automation (redstone, mods, etc.). Always check before accessing player properties:
```js
if (!event.player) return;
```
:::

## RecipeInfoContainer

The `event.recipeInfo` property provides access to recipe details:

| Property | Type | Description |
|---|---|---|
| `recipeInfo.id` | `ResourceLocation` | The recipe ID |
| `recipeInfo.recipe` | `AltarRecipe` | The recipe definition (reference only — does not contain the actual items used) |
| `recipeInfo.entities` | `List<Entity>` | The actual entities used/consumed in the ritual |

::: info
The `recipe` property is for **reference only**. It holds the recipe definition, not the actual items that were placed on the pedestals. Use it to identify which recipe was triggered (e.g. by checking `recipeInfo.id`) or to read recipe configuration.
:::

## `SummoningRituals.start`

Fired **after** the catalyst is inserted but **before** the ritual begins. This event **can be cancelled** to prevent the ritual from starting.

```js
SummoningRituals.start(event => {
    if (!event.player) return;

    // Require 3 XP levels to start
    if (event.player.getXpLevel() < 3) {
        event.cancel();  // prevents the ritual from starting
    }
})
```

### Use Cases

- **XP cost** — require and deduct experience levels
- **Item checks** — require the player to hold or carry specific items
- **Custom conditions** — cancel based on any logic you want
- **Cooldowns** — prevent spamming rituals
- **Per-recipe logic** — check `event.recipeInfo.id` to apply different rules per ritual

### XP Cost Example

```js
SummoningRituals.start(event => {
    if (!event.player) return;

    // Cost: 5 levels
    if (event.player.getXpLevel() < 5) {
        event.cancel();
        return;
    }
    event.player.addXPLevels(-5);
})
```

### Per-Recipe Conditions

Use `event.recipeInfo.id` to apply different logic to different rituals:

```js
SummoningRituals.start(event => {
    if (!event.player) return;

    // Only charge XP for a specific ritual
    if (event.recipeInfo.id.toString() === "kubejs:expensive_ritual") {
        if (event.player.getXpLevel() < 10) {
            event.cancel();
            return;
        }
        event.player.addXPLevels(-10);
    }
})
```

## `SummoningRituals.complete`

Fired **after** the ritual completes and the outputs have already been spawned. This event **cannot** be cancelled.

```js
SummoningRituals.complete(event => {
    if (!event.player) return;

    // Reward: 10 XP levels
    event.player.addXPLevels(10);
})
```

### Use Cases

- **XP rewards** — give experience on completion
- **Potion effects** — buff or debuff the player
- **Advancements** — grant custom advancements (via commands in the recipe, or server.runCommand)
- **Progression** — trigger gamestage or quest completion
- **Entity inspection** — check `event.recipeInfo.entities` for the actual entities that were used

### Full Reward Example

```js
SummoningRituals.complete(event => {
    if (!event.player) return;

    // XP reward
    event.player.addXPLevels(10);

    // Potion effects
    event.player.potionEffects.add("minecraft:regeneration", 200, 1);
    event.player.potionEffects.add("minecraft:glowing", 100, 0);
})
```

## Both Events Together

```js
// === Ritual Start ===
SummoningRituals.start(event => {
    if (!event.player) return;

    // Cost: 5 XP levels
    if (event.player.getXpLevel() < 5) {
        event.cancel();
        return;
    }
    event.player.addXPLevels(-5);
})

// === Ritual Complete ===
SummoningRituals.complete(event => {
    if (!event.player) return;

    // Reward: 10 XP levels + regeneration
    event.player.addXPLevels(10);
    event.player.potionEffects.add("minecraft:regeneration", 200, 2);
})
```

::: info GLOBAL EVENTS
Events apply to **all** summoning rituals, not individual ones. If you want different behavior per recipe, check `event.recipeInfo.id` to identify which ritual is being performed and branch accordingly.
:::

## Source Code

- [SummoningKubeEvent.java](https://github.com/AlmostReliable/summoningrituals/blob/1.21.1/src/main/java/com/almostreliable/summoningrituals/compat/kubejs/SummoningKubeEvent.java) — Event class
- [RecipeInfoContainer.java](https://github.com/AlmostReliable/summoningrituals/blob/1.21.1/src/main/java/com/almostreliable/summoningrituals/recipe/RecipeInfoContainer.java) — Recipe info container
