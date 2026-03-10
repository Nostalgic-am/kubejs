# Commands

Rituals can execute server commands when they complete. This enables integration with other mods, world changes, achievements, and more.

## `.commands()`

The simplest form — pass an array of command strings. The leading `/` is **optional**:

```js
.commands(["say Hi", "/say Hello"])  // both work the same way
```

## Method Overloads

The commands method has three signatures:

### Basic: `.commands(commands)`

Just a list of commands with no JEI tooltip:

```js
.commands(["say Ritual complete!", "give @p diamond 1"])
```

### With Tooltip: `.commands(commands, tooltip)`

Commands with a tooltip that appears in JEI/EMI recipe views:

```js
.commands(
    ["give @p diamond 5", "effect give @p regeneration 60 2"],
    [Text.of("Grants 5 diamonds and regeneration").gold()]
)
```

### With Player Requirement: `.commands(commands, tooltip, requiresPlayer)`

Commands that **only fire** if a player started the ritual. If the ritual was started by automation, these commands are skipped:

```js
.commands(
    ["advancement grant @p only my_pack:ritual_master"],
    [Text.of("Grants an advancement").green()],
    true  // requires a player — won't execute if started by automation
)
```

::: info
The `requiresPlayer` flag is useful for commands that use `@p` or `@s` and would fail without a player context. Set it to `true` for commands like advancements, player effects, or player-targeted messages.
:::

## Aliases

`.command()` is also accepted as an alias for `.commands()` — both work identically with all three overloads:

```js
.command(["say Hello"])
.commands(["say Hello"])  // same thing
```

## Examples

### Chat Messages

```js
.commands(["say The ritual is complete!"])
```

### Player Effects

```js
.commands([
    "effect give @p minecraft:regeneration 60 2",
    "effect give @p minecraft:strength 60 1",
    "effect give @p minecraft:glowing 30 0",
])
```

### Multiple Commands with Tooltip

```js
.commands(
    [
        "say A dark ritual has been completed...",
        "playsound minecraft:entity.wither.spawn master @a ~ ~ ~ 0.5 0.5",
        "effect give @p minecraft:darkness 100 0",
    ],
    [Text.of("Triggers dark effects").darkPurple()]
)
```

## Selectors

Commands are executed as the **server** with full permissions. Standard target selectors work:

| Selector | Description |
|---|---|
| `@p` | Nearest player (typically the one who started the ritual) |
| `@a` | All players |
| `@e` | All entities |
| `@s` | The executing entity (the server) |

::: warning SECURITY
Commands run with **full server permissions** (equivalent to op level 4). Be careful what you expose in a modpack.
:::

::: tip
For complex per-player logic (checking inventory, XP, cancelling the ritual), use [Events](/events) instead of commands.
:::
