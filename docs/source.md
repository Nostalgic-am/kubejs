# Source Code

The KubeJS integration for Summoning Rituals is implemented in Java. These are the key source files on the **1.21.1** branch.

## Key Files

### AltarKubeRecipe.java
The main recipe builder class. Defines `.commands()` (with 3 overloads) and `.conditions()`.

[View on GitHub →](https://github.com/AlmostReliable/summoningrituals/blob/1.21.1/src/main/java/com/almostreliable/summoningrituals/compat/kubejs/recipe/AltarKubeRecipe.java)

### AltarRecipeSchema.java
Defines the recipe schema — all recipe keys including `INITIATOR` (catalyst), `ITEM_OUTPUTS`, `ENTITY_OUTPUTS`, `COMMANDS`, `ITEM_INPUTS`, `ENTITY_INPUTS`, `ZONE` (sacrifice zone with 4 aliases), `TICKS`, and `CONDITIONS`.

[View on GitHub →](https://github.com/AlmostReliable/summoningrituals/blob/1.21.1/src/main/java/com/almostreliable/summoningrituals/compat/kubejs/recipe/AltarRecipeSchema.java)

### ConditionsBuilder.java
The conditions builder that powers `.conditions()`. Exposes: `.biomes()`, `.dimension()`, `.minHeight()`, `.maxHeight()`, `.height()` (exact and range), `.setOpenSky()`, `.structures()`, `.minTime()`, `.maxTime()`, `.time()` (named and tick range), and `.weather()`.

[View on GitHub →](https://github.com/AlmostReliable/summoningrituals/blob/1.21.1/src/main/java/com/almostreliable/summoningrituals/compat/kubejs/builder/ConditionsBuilder.java)

## Not Yet Implemented

The `ConditionsBuilder.java` contains this TODO:

```
// TODO: implement more from the LocationPredicate (light, block below, water)
```

These conditions are planned but not available yet:
- **Light level** at the altar
- **Block below** the altar (was `.blockBelow()` in 1.19/1.20)
- **Water** presence check

## Repository

- **Repository:** [AlmostReliable/summoningrituals](https://github.com/AlmostReliable/summoningrituals)
- **Branch:** `1.21.1`
- **KubeJS package:** `com.almostreliable.summoningrituals.compat.kubejs`

## Community Resources

- [CurseForge](https://www.curseforge.com/minecraft/mc-mods/summoningrituals) — Downloads
- [Modrinth](https://modrinth.com/mod/summoningrituals) — Downloads
- [Discord](https://discord.com/invite/ThFnwZCyYY) — AlmostReliable community
- [KubeJS Wiki](https://kubejs.com/) — General KubeJS docs

::: info
This documentation is community-maintained. When in doubt, check the source code or ask on the Discord.
:::
