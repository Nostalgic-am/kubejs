# Commands

Rituals can execute server commands when they complete. This is useful for triggering effects, giving advancements, changing the world, or integrating with other mods.

## `.commands()`

Pass an array of command strings. The leading `/` is optional — both formats work identically.

```js
.commands(["say Hi", "/say Hello"])
```

### Examples

```js
// Send a chat message
.commands(["say The ritual is complete!"])

// Give an advancement
.commands(["advancement grant @p only my_pack:my_advancement"])

// Play a sound
.commands(["playsound minecraft:entity.ender_dragon.growl master @p"])

// Set weather
.commands(["weather thunder"])

// Multiple commands at once
.commands([
    "say Ritual complete!",
    "playsound minecraft:entity.wither.spawn master @p",
    "effect give @p minecraft:regeneration 30 2",
])
```

::: info
Commands are executed as the **server** (with full permissions), so they have access to all commands including `/op`-level ones. Be careful with what you expose in your modpack.
:::

::: tip
The `@p` selector targets the nearest player, which in the context of a ritual will typically be the player who started it. You can also use `@a`, `@e`, `@s`, and other selectors as usual.
:::
