# Time & Weather

## Time Conditions

### `.time(timeType)` — Day or Night

The simplest form — pass `"day"` or `"night"`:

```js
.conditions(c => c.time("night"))
.conditions(c => c.time("day"))
```

### Tick-Based Time Control

For finer control, use the tick-based methods. Minecraft day/night runs on a 24,000 tick cycle:

| Ticks | Time of Day |
|---|---|
| 0 | Sunrise (06:00) |
| 1000 | Early morning (07:00) |
| 6000 | Noon (12:00) |
| 12000 | Sunset (18:00) |
| 13000 | Night begins (19:00) |
| 18000 | Midnight (00:00) |
| 23000 | Pre-dawn (05:00) |

All tick values are **modulo 24,000** — they wrap around automatically.

### `.minTime(ticks)` — Earliest Allowed Time

```js
.conditions(c => c.minTime(6000))    // only after noon
.conditions(c => c.minTime(12000))   // only after sunset
```

### `.maxTime(ticks)` — Latest Allowed Time

```js
.conditions(c => c.maxTime(6000))    // only before noon
.conditions(c => c.maxTime(3000))    // only in the morning
```

### `.time(min, max)` — Time Range

```js
.conditions(c => c.time(12000, 13000))  // sunset only
.conditions(c => c.time(17500, 18500))  // midnight hour
.conditions(c => c.time(0, 3000))       // early morning
```

## Weather Conditions

### `.weather(callback)`

Restricts the ritual based on weather using a callback:

```js
.conditions(c =>
    c.weather(w => w.setThundering(true))
)
```

### Weather Builder Methods

| Method | Description |
|---|---|
| `w.setRaining(bool)` | Require rain (`true`) or clear skies (`false`) |
| `w.setThundering(bool)` | Require thunder (`true`) or no thunder (`false`) |

Both can be combined:

```js
// Raining but NOT thundering
.conditions(c =>
    c.weather(w => w.setRaining(true).setThundering(false))
)

// Thunderstorm (rain + thunder)
.conditions(c =>
    c.weather(w => w.setRaining(true).setThundering(true))
)

// Clear skies
.conditions(c =>
    c.weather(w => w.setRaining(false).setThundering(false))
)
```

::: warning INVALID COMBINATIONS
You **cannot** set thundering to `true` and raining to `false` — it can't thunder without rain. The builder will throw an error. You must also set at least one of `setRaining` or `setThundering`.
:::

### Weather Quick Reference

| Weather State | Builder |
|---|---|
| Clear | `w => w.setRaining(false)` |
| Rain only | `w => w.setRaining(true).setThundering(false)` |
| Thunderstorm | `w => w.setThundering(true)` |
| Any rain | `w => w.setRaining(true)` |

## Combining Time and Weather

```js
// Thunderstorm at night
.conditions(c =>
    c.time("night")
     .weather(w => w.setThundering(true))
)

// Sunset in the rain
.conditions(c =>
    c.time(12000, 13000)
     .weather(w => w.setRaining(true))
)

// Clear morning
.conditions(c =>
    c.time(0, 6000)
     .weather(w => w.setRaining(false))
)
```
