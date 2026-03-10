# Time & Weather

## `.time()`

Restricts the ritual to a specific time of day.

```js
.conditions(c => c.time("night"))
```

### Valid Values

| Value | Description |
|---|---|
| `"day"` | Ritual can only be performed during daytime |
| `"night"` | Ritual can only be performed during nighttime |

## `.weather()`

Restricts the ritual based on weather conditions. Uses a callback with a weather builder.

```js
.conditions(c =>
    c.weather(w => w.setThundering(true))
)
```

### Weather Builder Methods

| Method | Description |
|---|---|
| `w.setThundering(bool)` | Require thunderstorm (`true`) or no thunder (`false`) |

### Examples

```js
// Require a thunderstorm
.conditions(c =>
    c.weather(w => w.setThundering(true))
)

// Require no thunder
.conditions(c =>
    c.weather(w => w.setThundering(false))
)
```

### Combining Time and Weather

```js
// Ritual only works during a thunderstorm at night
.conditions(c =>
    c.time("night")
     .weather(w => w.setThundering(true))
)
```
