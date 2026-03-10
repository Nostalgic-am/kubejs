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

All tick values are **modulo 24,000** — so they wrap around automatically.

### `.minTime(ticks)` — Earliest Allowed Time

Ritual only works **after** a specific tick:

```js
// Only after noon
.conditions(c => c.minTime(6000))

// Only after sunset
.conditions(c => c.minTime(12000))
```

### `.maxTime(ticks)` — Latest Allowed Time

Ritual only works **before** a specific tick:

```js
// Only before noon
.conditions(c => c.maxTime(6000))

// Only in the morning (before 9 AM)
.conditions(c => c.maxTime(3000))
```

### `.time(min, max)` — Time Range

Ritual works only within a tick range:

```js
// Only during sunset (roughly 18:00–19:00)
.conditions(c => c.time(12000, 13000))

// Only during midnight hour
.conditions(c => c.time(17500, 18500))

// Only during early morning (06:00–09:00)
.conditions(c => c.time(0, 3000))
```

::: warning ONE TIME CONDITION
You can only have **one** time condition per recipe. Using both `.time("night")` and `.minTime(12000)` will throw a duplicate condition error. Use the tick-based `.time(min, max)` form if you need a custom range.
:::

## Weather Conditions

### `.weather(callback)`

Restricts the ritual based on weather using a callback with a weather builder:

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

Both methods can be combined in a single weather builder:

```js
// Raining but NOT thundering
.conditions(c =>
    c.weather(w => w.setRaining(true).setThundering(false))
)

// Thunderstorm (rain + thunder)
.conditions(c =>
    c.weather(w => w.setRaining(true).setThundering(true))
)

// Clear skies (no rain, no thunder)
.conditions(c =>
    c.weather(w => w.setRaining(false).setThundering(false))
)
```

### Weather Quick Reference

| Weather State | Builder |
|---|---|
| Clear | `w => w.setRaining(false)` |
| Rain only | `w => w.setRaining(true).setThundering(false)` |
| Thunderstorm | `w => w.setThundering(true)` |
| Any rain (with or without thunder) | `w => w.setRaining(true)` |

## Combining Time and Weather

Create atmospheric rituals by combining both:

```js
// Dark ritual: thunderstorm at night
.conditions(c =>
    c.time("night")
     .weather(w => w.setThundering(true))
)

// Precise timing: during sunset in the rain
.conditions(c =>
    c.time(12000, 13000)
     .weather(w => w.setRaining(true))
)

// Clear morning ritual
.conditions(c =>
    c.time(0, 6000)
     .weather(w => w.setRaining(false))
)
```
