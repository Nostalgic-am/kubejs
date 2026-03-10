# Ritual Events

If recipes are set up properly, you can use two events to alter the functionality of summoning rituals. These events require **KubeJS**.

## Event Properties

Both events share the same event object with the following properties:

| Property | Type | Description |
|---|---|---|
| `event.level` | `ServerLevel` | The world/level the ritual was started in |
| `event.pos` | `BlockPos` | The block position of the altar |
| `event.recipe` | `AltarRecipe` | The altar recipe being crafted |
| `event.player` | `ServerPlayer?` | The player who invoked the ritual |

::: warning
The `event.player` can be `null` if the ritual was started through automation (e.g. by a mod or redstone). Always check for `null` before accessing player properties.
:::

## `summoningrituals.start`

Fired **right after** the catalyst is inserted and **before** the ritual actually starts. You can cancel this event to prevent the ritual from beginning.

```js
ServerEvents.generic("summoningrituals.start", event => {
    // Lightning strike when starting the ritual
    event.level.spawnLightning(event.pos.x, event.pos.y, event.pos.z, true);

    // Player can be null if started by automation
    if (!event.player) return;

    // Require at least 3 XP levels to start
    if (event.player.getXpLevel() < 3) {
        event.cancel();
    }
})
```

### Use Cases

- Add visual/sound effects when a ritual starts
- Check for additional conditions (XP levels, inventory items, etc.)
- Cancel the ritual based on custom logic
- Deduct XP or items from the player

## `summoningrituals.complete`

Fired **when the ritual is complete** and the outputs have already been spawned. This event cannot be cancelled.

```js
ServerEvents.generic("summoningrituals.complete", event => {
    // Player can be null if started by automation
    if (!event.player) return;

    // Reward the player with 10 XP levels
    event.player.addXPLevels(10);
})
```

### Use Cases

- Reward the player with XP, items, or effects
- Trigger advancements or custom progression
- Spawn additional particles or effects
- Log ritual completions

## Full Events Example

```js
// Ritual start event
ServerEvents.generic("summoningrituals.start", event => {
    // Visual effect: lightning strike
    event.level.spawnLightning(
        event.pos.x, event.pos.y, event.pos.z, true
    );

    if (!event.player) return;

    // Cost: 5 XP levels to perform any ritual
    if (event.player.getXpLevel() < 5) {
        event.cancel();
        return;
    }
    event.player.addXPLevels(-5);
})

// Ritual complete event
ServerEvents.generic("summoningrituals.complete", event => {
    if (!event.player) return;

    // Reward: 10 XP levels
    event.player.addXPLevels(10);

    // Give a potion effect
    event.player.potionEffects.add("minecraft:regeneration", 200, 1);
})
```

::: info
Events apply to **all** summoning rituals. If you want different behavior for different recipes, check `event.recipe` to identify which ritual is being performed.
:::
