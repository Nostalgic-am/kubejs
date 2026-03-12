# Source Code

The KubeJS integration for Summoning Rituals is implemented in Java. These are the key source files on the **1.21.1** branch.

## Key Files

### AltarKubeRecipe.java
The main recipe builder class. Defines `.commands()` (with 3 overloads) and `.conditions()`.

[View on GitHub →](https://github.com/AlmostReliable/summoningrituals/blob/1.21.1/src/main/java/com/almostreliable/summoningrituals/compat/kubejs/recipe/AltarKubeRecipe.java)

### AltarRecipeSchema.java
Defines the recipe schema — all recipe keys including `INITIATOR`, `ITEM_OUTPUTS`, `ENTITY_OUTPUTS`, `COMMANDS`, `ITEM_INPUTS`, `ENTITY_INPUTS`, `ZONE`, `TICKS`, and `CONDITIONS`.

[View on GitHub →](https://github.com/AlmostReliable/summoningrituals/blob/1.21.1/src/main/java/com/almostreliable/summoningrituals/compat/kubejs/recipe/AltarRecipeSchema.java)

### ConditionsBuilder.java
The conditions builder. In **v3.3.0** this includes: `.biomes()`, `.dimension()`, height conditions, light level conditions, `.setOpenSky()`, `.setSmoked()`, `.structures()`, `.blockBelow()`, `.facing()`, `.setWaterlogged()`, time conditions, and `.weather()`.

[View on GitHub →](https://github.com/AlmostReliable/summoningrituals/blob/1.21.1/src/main/java/com/almostreliable/summoningrituals/compat/kubejs/builder/ConditionsBuilder.java)

### SummoningKubeEvent.java
The event class for `SummoningRituals.start` and `SummoningRituals.complete`. Exposes `level`, `pos`, `recipeInfo`, and `player`.

[View on GitHub →](https://github.com/AlmostReliable/summoningrituals/blob/1.21.1/src/main/java/com/almostreliable/summoningrituals/compat/kubejs/SummoningKubeEvent.java)

### RecipeInfoContainer.java
Container class holding recipe ID, recipe reference, and actual entities used in the ritual.

[View on GitHub →](https://github.com/AlmostReliable/summoningrituals/blob/1.21.1/src/main/java/com/almostreliable/summoningrituals/recipe/RecipeInfoContainer.java)

## Repository

- **Repository:** [AlmostReliable/summoningrituals](https://github.com/AlmostReliable/summoningrituals)
- **Branch:** `1.21.1`
- **Latest version:** v3.3.0

## Community Resources

- [CurseForge](https://www.curseforge.com/minecraft/mc-mods/summoningrituals) — Downloads
- [Modrinth](https://modrinth.com/mod/summoningrituals) — Downloads
- [Discord](https://discord.com/invite/ThFnwZCyYY) — AlmostReliable community
- [KubeJS Wiki](https://kubejs.com/) — General KubeJS docs

::: info
This documentation is community-maintained. When in doubt, check the source code or ask on the Discord.
:::
