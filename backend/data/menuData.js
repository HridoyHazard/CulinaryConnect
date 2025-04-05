const menuData = [
  // Desserts
  {
    name: "Tuna Poke Bowl",
    description:
      "Tuna poke bowl with fresh avocado, cucumber, and a tangy sauce.",
    price: 12.99,
    picture:
      "https://res.cloudinary.com/dfyewpdn8/image/upload/v1742021720/Culinary/dinner/iljpkdabxjz3kbmzxpz6.png",
    category: "Desserts",
    quantity: 1,
  },
  {
    name: "Harvest Chicken Salad",
    description:
      "Grilled chicken breast served with quinoa, arugula, and roasted sweet potatoes for a wholesome and nutritious meal.",
    price: 12.99,
    picture:
      "https://res.cloudinary.com/dfyewpdn8/image/upload/v1742021721/Culinary/dinner/r229k53rrkf6rcjxixkx.png",
    category: "Desserts",
    quantity: 1,
  },
  {
    name: "Seared Salmon Greens",
    description:
      "Perfectly grilled salmon served over a bed of fresh mixed greens, cherry tomatoes, and red onions, lightly dressed for a refreshing meal.",
    price: 10.99,
    picture:
      "https://res.cloudinary.com/dfyewpdn8/image/upload/v1742021721/Culinary/dinner/tpiium1yz6zdt6wl63df.png",
    category: "Desserts",
    quantity: 1,
  },
  {
    name: "Chicken Shawarma Fries",
    description:
      "Crispy fries loaded with juicy chicken shawarma, a creamy garlic drizzle, and a spicy harissa kick, garnished with fresh parsley for a bold, flavorful bite.",
    price: 8.99,
    picture:
      "https://res.cloudinary.com/dfyewpdn8/image/upload/v1742021721/Culinary/dinner/oye5i6softrzrq9vhasj.png",
    category: "Desserts",
    quantity: 1,
  },

  // Entrees
  {
    name: "Grilled salmon",
    description:
      "Tender herb-crusted salmon accompanied by crisp asparagus and a touch of lemon.",
    price: 14.99,
    picture:
      "https://res.cloudinary.com/dfyewpdn8/image/upload/v1742021747/Culinary/lunch/jqmpp3acb9bgmmwjdikn.png",
    category: "Entrees",
    quantity: 1,
  },
  {
    name: "Grilled chicken breast",
    description:
      "Juicy grilled chicken served with caramelized pineapple, sautéed green onions, and a tangy sauce.",
    price: 12.99,
    picture:
      "https://res.cloudinary.com/dfyewpdn8/image/upload/v1742021748/Culinary/lunch/kmw5nskxoefk2qhcucy2.png",
    category: "Entrees",
    quantity: 1,
  },
  {
    name: "Meat & Medley",
    description:
      "Grilled steak, grilled chicken, and a selection of seasonal sides.",
    price: 19.99,
    picture:
      "https://res.cloudinary.com/dfyewpdn8/image/upload/v1742021748/Culinary/lunch/rkdqoh5cklqs64v7tvcw.png",
    category: "Entrees",
    quantity: 1,
  },
  {
    name: "Roast Chicken Combo Plate",
    description:
      "Grilled chicken breast, roasted vegetables, and a selection of seasonal sides.",
    price: 16.99,
    picture:
      "https://res.cloudinary.com/dfyewpdn8/image/upload/v1742021748/Culinary/lunch/lk1r0psc4j4v1rh4ppuh.png",
    category: "Entrees",
    quantity: 1,
  },
  {
    name: "Traditional Curry Platter",
    description:
      "A hearty meal featuring tender beef curry, steamed white rice, crispy papadum, a golden egg slice, and a fresh garden salad",
    price: 16.99,
    picture:
      "https://res.cloudinary.com/dfyewpdn8/image/upload/v1742021748/Culinary/lunch/ctwls88ibfr7c88wwzgq.png",
    category: "Entrees",
    quantity: 1,
  },

  // Appetizers
  {
    name: "Hearty Morning Plate",
    description:
      "It highlights the sunny-side-up eggs and the classic breakfast vibe.",
    price: 12.99,
    picture:
      "https://res.cloudinary.com/dfyewpdn8/image/upload/v1742021699/Culinary/breakfast/jraxvde3e2mptptg6o91.png",
    category: "Appetizers",
    quantity: 1,
  },
  {
    name: "Ham & Eggs Combo",
    description: "Tender grilled chicken breast marinated in herbs and spices.",
    price: 15.49,
    picture:
      "https://res.cloudinary.com/dfyewpdn8/image/upload/v1742021698/Culinary/breakfast/khr6osyg7txxhrffeywf.png",
    category: "Appetizers",
    quantity: 1,
  },
  {
    name: "Tomato & Basil Delight",
    description:
      "A light breakfast of soft-boiled egg, fresh tomatoes, basil, and creamy cheese, served with whole grain toast.",
    price: 6.99,
    picture:
      "https://res.cloudinary.com/dfyewpdn8/image/upload/v1742021699/Culinary/breakfast/f2bd4fgspjtaf8revs7y.png",
    category: "Appetizers",
    quantity: 1,
  },
  {
    name: "Scramble & Toast Combo",
    description:
      "A comforting breakfast with scrambled eggs, grilled tomato, sausage, bacon, mushrooms, and toast.",
    price: 9,
    picture:
      "https://res.cloudinary.com/dfyewpdn8/image/upload/v1742021699/Culinary/breakfast/csmvyu35s9ojmkiu9ryf.png",
    category: "Appetizers",
    quantity: 1,
  },
  {
    name: "BBQ Loaded Potato",
    description:
      "A fluffy baked potato topped with savory bacon, melted cheese, sour cream, green onions, and a drizzle of BBQ sauce.",
    price: 8.99,
    picture:
      "https://res.cloudinary.com/dfyewpdn8/image/upload/v1742021699/Culinary/breakfast/dsgptk99kxyeyq5fntsd.png",
    category: "Appetizers",
    quantity: 1,
  },

  // Beverages (with fixed typo)
  {
    name: "Iced Orange Tea",
    description: "Refreshing iced tea made with fresh orange juice",
    price: 3.99,
    picture:
      "https://res.cloudinary.com/dfyewpdn8/image/upload/v1742412875/Culinary/beverage/pbvdstzcdm1xwkloycmc.png",
    category: "Beverages",
    quantity: 1,
  },
  {
    name: "Lemon Soda",
    description: "Refreshing lemon-flavored soda",
    price: 3.99,
    picture:
      "https://res.cloudinary.com/dfyewpdn8/image/upload/v1742412875/Culinary/beverage/gat3lksikfcyqugkwfaa.png",
    category: "Beverages",
    quantity: 1,
  },

  {
    name: "Strawberry Smoothie",
    description:
      "A refreshing blend of strawberries, yogurt, and ice, served in a glass.",
    price: 6.99,
    picture:
      "https://res.cloudinary.com/dfyewpdn8/image/upload/v1743611644/zxc_agqify.png",
    category: "Beverages",
    quantity: 1,
  },

  {
    name: "Craft Beer",
    description: "Craft beer from local breweries",
    price: 5.99,
    picture:
      "https://res.cloudinary.com/dfyewpdn8/image/upload/v1742412875/Culinary/beverage/uxdg944lr29g6coa1vzz.png",
    category: "Beverages",
    quantity: 1,
  },
  {
    name: "Hot Chocolate",
    description: "Warm and creamy hot chocolate",
    price: 4.99,
    picture:
      "https://res.cloudinary.com/dfyewpdn8/image/upload/v1742462976/Culinary/beverage/lg2xjbhyqr19ohkgojhr.png",
    category: "Beverages",
    quantity: 1,
  },
  {
    name: "Orange Juice",
    description: "Freshly squeezed orange juice",
    price: 2.5,
    picture:
      "https://res.cloudinary.com/dfyewpdn8/image/upload/v1742412875/Culinary/beverage/nvip0lrrmliob02ilg1h.png",
    category: "Beverages",
    quantity: 1,
  },
  {
    name: "Red Wine",
    description: "Delicious red wine",
    price: 7.99,
    picture:
      "https://res.cloudinary.com/dfyewpdn8/image/upload/v1743611504/ghj_hd0xe4.png",
    category: "Beverages",
    quantity: 1,
  },
];

export default menuData;
