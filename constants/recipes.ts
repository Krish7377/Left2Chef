/**
 * Recipe Data & Matching Engine
 * Defines the core recipe database, dietary types, and the matching algorithm
 * that calculates ingredient compatibility scores while handling common synonyms.
 */

export type DietaryType = "veg" | "non-veg" | "vegan";

export interface Recipe {
  id: string;
  title: string;
  image: any;
  ingredients: string[];
  dietaryType: DietaryType;
  instructions: string[];
  cookTime: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  matchPercentage?: number;
}

export const RECIPES: Recipe[] = [
  {
    id: "1",
    title: "Masala Poha",
    image: require("../assets/masalaPoha.jpg"),
    ingredients: [
      "poha",
      "onion",
      "green chillies",
      "curry leaves",
      "turmeric",
      "salt",
      "lemon juice",
      "oil",
      "mustard seeds",
      "coriander leaves",
    ],
    dietaryType: "vegan",
    cookTime: "15 min",
    servings: 2,
    difficulty: "Easy",
    instructions: [
      "Rinse poha under water and let it soften for 5 minutes.",
      "Heat oil in a pan, add mustard seeds and let them splutter.",
      "Add curry leaves, chopped onions and green chillies, saute till onions turn soft.",
      "Add turmeric and salt, mix well.",
      "Add the softened poha and mix gently.",
      "Cook for 3 to 4 minutes on low flame.",
      "Finish with lemon juice and fresh coriander leaves. Serve hot.",
    ],
  },
  {
    id: "2",
    title: "Besan Chilla",
    image: require("../assets/besanChilla.png"),
    ingredients: [
      "besan",
      "onion",
      "green chillies",
      "coriander leaves",
      "turmeric",
      "cumin",
      "salt",
      "water",
      "oil",
    ],
    dietaryType: "vegan",
    cookTime: "20 min",
    servings: 2,
    difficulty: "Easy",
    instructions: [
      "In a bowl, mix besan, turmeric, cumin, and salt.",
      "Add chopped onion, green chillies, and coriander leaves.",
      "Gradually add water and whisk into a smooth lump-free batter.",
      "Heat a tawa or non-stick pan and grease lightly with oil.",
      "Pour a ladle of batter and spread into a thin circle.",
      "Cook till the bottom turns golden, then flip and cook the other side.",
      "Serve hot with green chutney or curd.",
    ],
  },
  {
    id: "3",
    title: "One-Pot Vegetable Pulao",
    image: require("../assets/pulao.jpg"),
    ingredients: [
      "rice",
      "peas",
      "carrot",
      "beans",
      "onion",
      "ginger",
      "garlic",
      "garam masala",
      "turmeric",
      "salt",
      "oil",
      "water",
    ],
    dietaryType: "vegan",
    cookTime: "30 min",
    servings: 3,
    difficulty: "Easy",
    instructions: [
      "Wash and soak rice for 20 minutes, then drain.",
      "Heat oil in a pot, add chopped onions and saute till golden.",
      "Add ginger-garlic paste and cook for 2 minutes.",
      "Add chopped vegetables, turmeric, garam masala and salt.",
      "Stir fry the vegetables for 3 to 4 minutes.",
      "Add drained rice and mix gently.",
      "Add water, bring to a boil, then cover and cook on low flame till rice is done.",
      "Fluff with a fork and serve with raita.",
    ],
  },
  {
    id: "4",
    title: "Spicy Masala Eggs",
    image: require("../assets/masalaEggs.jpg"),
    ingredients: [
      "eggs",
      "onion",
      "tomato",
      "turmeric",
      "chilli powder",
      "salt",
      "oil",
      "coriander leaves",
    ],
    dietaryType: "non-veg",
    cookTime: "15 min",
    servings: 2,
    difficulty: "Easy",
    instructions: [
      "Heat oil in a pan and saute finely chopped onions till golden.",
      "Add chopped tomatoes and cook till soft and mushy.",
      "Add turmeric, chilli powder and salt, mix well.",
      "Crack eggs directly into the masala.",
      "Scramble and cook till eggs are fully done.",
      "Garnish with coriander leaves and serve with roti or bread.",
    ],
  },
  {
    id: "5",
    title: "Rava Upma",
    image: require("../assets/ravaUpma.jpg"),
    ingredients: [
      "rava",
      "mustard seeds",
      "curry leaves",
      "green chilli",
      "onion",
      "salt",
      "water",
      "oil",
      "coriander leaves",
    ],
    dietaryType: "vegan",
    cookTime: "20 min",
    servings: 2,
    difficulty: "Easy",
    instructions: [
      "Dry roast rava in a pan till lightly golden and aromatic, set aside.",
      "Heat oil in the same pan, add mustard seeds and let them splutter.",
      "Add curry leaves, green chillies and chopped onions, saute till soft.",
      "Add boiling water and salt, bring to a boil.",
      "Slowly add the roasted rava while stirring continuously to avoid lumps.",
      "Cover and cook on low flame for 3 to 4 minutes till thick.",
      "Garnish with coriander and serve hot with chutney.",
    ],
  },
  {
    id: "6",
    title: "Spicy Tomato Rice",
    image: require("../assets/tomatoRice.webp"),
    ingredients: [
      "cooked rice",
      "onion",
      "tomato",
      "ginger garlic paste",
      "turmeric",
      "chilli powder",
      "coriander leaves",
      "lemon juice",
      "oil",
      "salt",
    ],
    dietaryType: "vegan",
    cookTime: "15 min",
    servings: 2,
    difficulty: "Easy",
    instructions: [
      "Heat oil in a pan and saute onions till golden brown.",
      "Add ginger garlic paste and cook for 2 minutes.",
      "Add chopped tomatoes, turmeric, chilli powder and salt.",
      "Cook till tomatoes are soft and oil separates.",
      "Add cooked rice and mix gently till well coated.",
      "Cook for 2 minutes on low flame.",
      "Garnish with coriander leaves and a squeeze of lemon. Serve hot.",
    ],
  },
  {
    id: "7",
    title: "Quick Chana Salad",
    image: require("../assets/chanaSalad.jpg"),
    ingredients: [
      "boiled chickpeas",
      "onion",
      "tomato",
      "cucumber",
      "lemon juice",
      "chaat masala",
      "salt",
      "coriander leaves",
      "green chilli",
    ],
    dietaryType: "vegan",
    cookTime: "10 min",
    servings: 2,
    difficulty: "Easy",
    instructions: [
      "Drain and rinse boiled chickpeas.",
      "Finely chop onion, tomato, cucumber and green chilli.",
      "Combine all chopped vegetables with chickpeas in a bowl.",
      "Add lemon juice, chaat masala and salt.",
      "Toss everything well to combine.",
      "Garnish with fresh coriander leaves and serve immediately.",
    ],
  },
  {
    id: "8",
    title: "Lasuni Dal Tadka",
    image: require("../assets/lasuniDalTadka.webp"),
    ingredients: [
      "toor dal",
      "garlic",
      "cumin seeds",
      "hing",
      "dry red chilli",
      "tomato",
      "turmeric",
      "ghee",
      "salt",
      "coriander leaves",
    ],
    dietaryType: "veg",
    cookTime: "30 min",
    servings: 3,
    difficulty: "Easy",
    instructions: [
      "Wash and pressure cook toor dal with turmeric and salt until soft.",
      "Mash the dal lightly and adjust consistency with water.",
      "Heat ghee in a small pan for the tadka.",
      "Add cumin seeds, hing and dry red chillies, let them sizzle.",
      "Add finely chopped garlic and fry till golden and fragrant.",
      "Add chopped tomato and cook for 2 minutes.",
      "Pour the hot tadka over the cooked dal.",
      "Garnish with coriander leaves and serve with rice or roti.",
    ],
  },
  {
    id: "9",
    title: "Aloo Tikki Chaat",
    image: require("../assets/alooTikkiChaat.jpg"),
    ingredients: [
      "potato",
      "green chutney",
      "tamarind chutney",
      "yogurt",
      "onion",
      "sev",
      "chaat masala",
      "cumin powder",
      "salt",
      "oil",
      "coriander leaves",
    ],
    dietaryType: "veg",
    cookTime: "30 min",
    servings: 3,
    difficulty: "Medium",
    instructions: [
      "Boil and mash potatoes, mix with salt, cumin powder and chaat masala.",
      "Shape into round flat patties.",
      "Shallow fry on a greased tawa till crispy and golden on both sides.",
      "Place hot tikkis on a serving plate.",
      "Top with whisked yogurt, green chutney and tamarind chutney.",
      "Sprinkle chopped onions, coriander leaves and sev on top.",
      "Serve immediately before the tikkis get soggy.",
    ],
  },
  {
    id: "10",
    title: "Pav Bhaji",
    image: require("../assets/pavBhaji.jpg"),
    ingredients: [
      "potato",
      "cauliflower",
      "carrot",
      "peas",
      "onion",
      "garlic",
      "tomato",
      "pav bhaji masala",
      "butter",
      "pav buns",
      "lemon",
      "coriander leaves",
      "salt",
    ],
    dietaryType: "veg",
    cookTime: "40 min",
    servings: 4,
    difficulty: "Medium",
    instructions: [
      "Boil potato, cauliflower, carrot and peas together until soft, then mash well.",
      "Heat butter in a pan, saute onions and garlic till golden.",
      "Add chopped tomatoes and cook till mushy.",
      "Add pav bhaji masala and salt, mix well.",
      "Add the mashed vegetables and mix everything together.",
      "Cook on medium flame mashing continuously for 8 to 10 minutes.",
      "Slit pav buns and toast on buttered tawa till golden.",
      "Serve bhaji hot topped with butter, lemon juice and coriander alongside pav.",
    ],
  },
  {
    id: "11",
    title: "Aloo Paratha",
    image: require("../assets/alooParatha.jpg"),
    ingredients: [
      "wheat flour",
      "potato",
      "onion",
      "green chilli",
      "cumin",
      "coriander leaves",
      "salt",
      "butter",
      "oil",
      "water",
    ],
    dietaryType: "veg",
    cookTime: "35 min",
    servings: 3,
    difficulty: "Medium",
    instructions: [
      "Knead wheat flour with water and salt into a soft dough, rest for 15 minutes.",
      "Boil and mash potatoes, mix with chopped onion, green chilli, cumin, coriander and salt.",
      "Divide dough into balls, flatten each and place a spoonful of filling in the center.",
      "Seal the edges and roll gently into a flat paratha.",
      "Cook on a hot tawa with butter or oil, flipping until both sides are golden.",
      "Serve hot with curd, pickle or green chutney.",
    ],
  },
  {
    id: "12",
    title: "Moong Dal Khichdi",
    image: require("../assets/moongDalKhichdi.jpg"),
    ingredients: [
      "rice",
      "moong dal",
      "ghee",
      "cumin seeds",
      "turmeric",
      "ginger",
      "salt",
      "water",
      "coriander leaves",
    ],
    dietaryType: "veg",
    cookTime: "25 min",
    servings: 3,
    difficulty: "Easy",
    instructions: [
      "Wash rice and moong dal together and soak for 15 minutes.",
      "Heat ghee in a pressure cooker, add cumin seeds and let them splutter.",
      "Add grated ginger and saute for a minute.",
      "Add drained rice and dal, turmeric and salt, mix well.",
      "Add water and pressure cook for 3 whistles.",
      "Let pressure release naturally, then open and stir.",
      "Drizzle with extra ghee, garnish with coriander and serve hot.",
    ],
  },
];

export function matchRecipes(userIngredients: string[]): Recipe[] {
  const normalized = userIngredients.map((i) => i.toLowerCase().trim());

  const scored = RECIPES.map((recipe) => {
    const recipeIngredients = recipe.ingredients.map((i) => i.toLowerCase());

    const matchCount = recipeIngredients.filter((ri) =>
      normalized.some((ui) => {
        if (ri === ui) return true;
        if (ri.includes(ui) || ui.includes(ri)) return true;
        if (ui === "atta" && ri === "wheat flour") return true;
        if (ui === "wheat flour" && ri === "atta") return true;
        if (ui === "flour" && ri === "wheat flour") return true;
        if (ui === "gram flour" && ri === "besan") return true;
        if (ui === "besan" && ri === "gram flour") return true;
        if (ui === "semolina" && ri === "rava") return true;
        if (ui === "suji" && ri === "rava") return true;
        if (ui === "rava" && ri === "semolina") return true;
        if (ui === "chilli" && ri.includes("chilli")) return true;
        if (ui === "chili" && ri.includes("chilli")) return true;
        if (ui === "chickpeas" && ri.includes("chana")) return true;
        if (ui === "chana" && ri.includes("chickpeas")) return true;
        if (ui === "curd" && ri === "yogurt") return true;
        if (ui === "yogurt" && ri === "curd") return true;
        if (ui === "rice" && ri === "cooked rice") return true;
        if (ui === "cooked rice" && ri === "rice") return true;
        if (ui === "dal" && ri.includes("dal")) return true;
        if (ui === "green chilli" && ri === "green chillies") return true;
        if (ui === "green chillies" && ri === "green chilli") return true;
        return false;
      }),
    ).length;

    const percentage = Math.round(
      (matchCount / recipeIngredients.length) * 100,
    );

    return {
      recipe: { ...recipe, matchPercentage: percentage },
      percentage,
    };
  });

  return scored
    .filter(({ percentage }) => percentage > 0)
    .sort((a, b) => b.percentage - a.percentage)
    .map(({ recipe }) => recipe);
}
