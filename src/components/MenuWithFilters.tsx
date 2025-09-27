'use client';

import React, { useState, useTransition } from 'react';
import {
  Coffee,
  Wine,
  Utensils,
  Fish,
  Beef,
  Soup,
  Pizza,
  IceCream,
  Salad,
  ChefHat,
  Sparkles,
  Loader2,
} from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface MenuItem {
  id: number;
  title: string;
  titleDe?: string;
  titleEn?: string;
  description: string;
  descriptionDe?: string;
  descriptionEn?: string;
  price: number;
  category: string;
  categoryDe?: string;
  categoryEn?: string;
  isAvailable: boolean;
  allergens?: string;
  imageUrl?: string | null;
}

interface MenuWithFiltersProps {
  menuItems: MenuItem[];
  locale: string;
}

// Translation helper - since we're in client component
const translations = {
  en: {
    title: 'Our Menu',
    available: 'Available',
    unavailable: 'Currently Unavailable',
    allergens: 'Allergens',
    all: 'All',
    food: 'Food',
    drinks: 'Drinks',
    allFood: 'All Food',
    allDrinks: 'All Drinks',
    alcoholic: 'Alcoholic',
    nonAlcoholic: 'Non-Alcoholic',
    appetizers: 'Appetizers',
    soup: 'Soup',
    salads: 'Salads',
    pasta: 'Pasta',
    pizza: 'Pizza',
    fish: 'Fish',
    meat: 'Meat',
    desserts: 'Desserts',
    other: 'Other',
    noItems: 'No items found in this category.',
    selectOther: 'Please select a different category.',
    menuOverview: 'Our Menu at a Glance',
    foodItems: 'Food Items',
    beverages: 'Beverages',
    menuDescription: 'Discover our authentic Italian cuisine',
    loading: 'Loading delicious items...',
  },
  de: {
    title: 'Unsere Speisekarte',
    available: 'Verfügbar',
    unavailable: 'Derzeit nicht verfügbar',
    allergens: 'Allergene',
    all: 'Alles',
    food: 'Speisen',
    drinks: 'Getränke',
    allFood: 'Alle Speisen',
    allDrinks: 'Alle Getränke',
    alcoholic: 'Alkoholisch',
    nonAlcoholic: 'Alkoholfrei',
    appetizers: 'Vorspeisen',
    soup: 'Suppen',
    salads: 'Salate',
    pasta: 'Pasta',
    pizza: 'Pizza',
    fish: 'Fisch',
    meat: 'Fleisch',
    desserts: 'Desserts',
    other: 'Sonstiges',
    noItems: 'Keine Artikel in dieser Kategorie gefunden.',
    selectOther: 'Bitte wählen Sie eine andere Kategorie aus.',
    menuOverview: 'Unsere Speisekarte im Überblick',
    foodItems: 'Speisen',
    beverages: 'Getränke',
    menuDescription: 'Entdecken Sie unsere authentische italienische Küche',
    loading: 'Leckere Artikel werden geladen...',
  },
};

export default function MenuWithFilters({
  menuItems,
  locale,
}: MenuWithFiltersProps) {
  const t =
    translations[locale as keyof typeof translations] || translations.en;

  // Main sections - simplified to just Food and Drinks for better mobile layout
  const mainSections = ['Food', 'Drinks'];
  const [selectedSection, setSelectedSection] = useState<string>('Food');
  const [selectedFoodType, setSelectedFoodType] = useState<string>('All Food');
  const [selectedDrinkType, setSelectedDrinkType] =
    useState<string>('All Drinks');

  // Add loading states to prevent blank white screens
  const [isPending, startTransition] = useTransition();
  const [currentlyLoading, setCurrentlyLoading] = useState<string>('');

  // Helper function to determine if item is a drink
  const isDrink = (item: MenuItem): boolean => {
    const category = (
      locale === 'de'
        ? item.categoryDe || item.category
        : item.categoryEn || item.category
    ).toLowerCase();
    return (
      category.includes('bevande') ||
      category.includes('drink') ||
      category.includes('getränk') ||
      category.includes('wine') ||
      category.includes('wein') ||
      category.includes('beer') ||
      category.includes('bier') ||
      category.includes('cocktail') ||
      category.includes('coffee') ||
      category.includes('tea') ||
      category.includes('kaffee') ||
      category.includes('tee')
    );
  };

  // Helper function to determine if drink is alcoholic
  const isAlcoholic = (item: MenuItem): boolean => {
    const category = (
      locale === 'de'
        ? item.categoryDe || item.category
        : item.categoryEn || item.category
    ).toLowerCase();
    const title = (
      locale === 'de' ? item.titleDe || item.title : item.titleEn || item.title
    ).toLowerCase();
    const description = (
      locale === 'de'
        ? item.descriptionDe || item.description
        : item.descriptionEn || item.description
    ).toLowerCase();

    const alcoholicKeywords = [
      'wine',
      'wein',
      'beer',
      'bier',
      'cocktail',
      'prosecco',
      'champagne',
      'whisky',
      'vodka',
      'gin',
      'rum',
      'liqueur',
      'likör',
      'aperitif',
      'digestif',
    ];

    return alcoholicKeywords.some(
      (keyword) =>
        category.includes(keyword) ||
        title.includes(keyword) ||
        description.includes(keyword)
    );
  };

  // Helper function to categorize food items
  const getFoodType = (item: MenuItem): string => {
    const category = (
      locale === 'de'
        ? item.categoryDe || item.category
        : item.categoryEn || item.category
    ).toLowerCase();
    const title = (
      locale === 'de' ? item.titleDe || item.title : item.titleEn || item.title
    ).toLowerCase();
    const description = (
      locale === 'de'
        ? item.descriptionDe || item.description
        : item.descriptionEn || item.description
    ).toLowerCase();

    // Fish/Seafood
    if (
      category.includes('pesce') ||
      category.includes('fish') ||
      category.includes('fisch') ||
      title.includes('salmon') ||
      title.includes('lachs') ||
      title.includes('tuna') ||
      title.includes('thun') ||
      title.includes('shrimp') ||
      title.includes('garnele') ||
      title.includes('seafood') ||
      title.includes('meeresfrüchte')
    ) {
      return 'Fish';
    }

    // Meat
    if (
      category.includes('carne') ||
      category.includes('meat') ||
      category.includes('fleisch') ||
      title.includes('beef') ||
      title.includes('rindfleisch') ||
      title.includes('chicken') ||
      title.includes('hähnchen') ||
      title.includes('pork') ||
      title.includes('schwein') ||
      title.includes('lamb') ||
      title.includes('lamm') ||
      title.includes('steak') ||
      title.includes('osso buco') ||
      title.includes('brasato')
    ) {
      return 'Meat';
    }

    // Pizza
    if (category.includes('pizza') || title.includes('pizza')) {
      return 'Pizza';
    }

    // Pasta
    if (
      category.includes('primi') ||
      category.includes('pasta') ||
      title.includes('spaghetti') ||
      title.includes('tagliatelle') ||
      title.includes('penne') ||
      title.includes('risotto') ||
      title.includes('gnocchi')
    ) {
      return 'Pasta';
    }

    // Soup
    if (
      category.includes('zuppa') ||
      category.includes('soup') ||
      category.includes('suppe') ||
      title.includes('minestrone') ||
      title.includes('broth') ||
      title.includes('brühe')
    ) {
      return 'Soup';
    }

    // Appetizers/Antipasti
    if (
      category.includes('antipasti') ||
      category.includes('antipasto') ||
      category.includes('appetizer') ||
      category.includes('vorspeise') ||
      title.includes('bruschetta') ||
      title.includes('carpaccio')
    ) {
      return 'Appetizers';
    }

    // Desserts
    if (
      category.includes('dolci') ||
      category.includes('dessert') ||
      category.includes('nachspeise') ||
      title.includes('tiramisu') ||
      title.includes('panna cotta') ||
      title.includes('gelato') ||
      title.includes('cannoli') ||
      title.includes('semifreddo')
    ) {
      return 'Desserts';
    }

    // Salads
    if (
      category.includes('insalata') ||
      category.includes('salad') ||
      category.includes('salat') ||
      title.includes('rucola') ||
      title.includes('arugula') ||
      title.includes('caprese')
    ) {
      return 'Salads';
    }

    return 'Other';
  };

  // Categorize items
  const foodItems = menuItems.filter((item) => !isDrink(item));
  const drinkItems = menuItems.filter((item) => isDrink(item));
  const alcoholicDrinks = drinkItems.filter((item) => isAlcoholic(item));
  const nonAlcoholicDrinks = drinkItems.filter((item) => !isAlcoholic(item));

  // Categorize food by type
  const foodByType = {
    Appetizers: foodItems.filter((item) => getFoodType(item) === 'Appetizers'),
    Soup: foodItems.filter((item) => getFoodType(item) === 'Soup'),
    Salads: foodItems.filter((item) => getFoodType(item) === 'Salads'),
    Pasta: foodItems.filter((item) => getFoodType(item) === 'Pasta'),
    Pizza: foodItems.filter((item) => getFoodType(item) === 'Pizza'),
    Fish: foodItems.filter((item) => getFoodType(item) === 'Fish'),
    Meat: foodItems.filter((item) => getFoodType(item) === 'Meat'),
    Desserts: foodItems.filter((item) => getFoodType(item) === 'Desserts'),
    Other: foodItems.filter((item) => getFoodType(item) === 'Other'),
  };

  // Get food categories with items
  const availableFoodTypes = [
    'All Food',
    ...Object.keys(foodByType).filter(
      (type) => foodByType[type as keyof typeof foodByType].length > 0
    ),
  ];

  // Get items to display based on selection
  const getItemsToDisplay = () => {
    switch (selectedSection) {
      case 'Food':
        if (selectedFoodType === 'All Food') return foodItems;
        return foodByType[selectedFoodType as keyof typeof foodByType] || [];
      case 'Drinks':
        if (selectedDrinkType === 'Alcoholic') return alcoholicDrinks;
        if (selectedDrinkType === 'Non-Alcoholic') return nonAlcoholicDrinks;
        return drinkItems;
      default:
        return menuItems;
    }
  };

  const itemsToDisplay = getItemsToDisplay();

  // Get icon for food type
  const getFoodIcon = (type: string) => {
    switch (type) {
      case 'Fish':
        return <Fish className='w-4 h-4' />;
      case 'Meat':
        return <Beef className='w-4 h-4' />;
      case 'Soup':
        return <Soup className='w-4 h-4' />;
      case 'Pizza':
        return <Pizza className='w-4 h-4' />;
      case 'Desserts':
        return <IceCream className='w-4 h-4' />;
      case 'Salads':
        return <Salad className='w-4 h-4' />;
      case 'Pasta':
        return <ChefHat className='w-4 h-4' />;
      case 'Appetizers':
        return <Sparkles className='w-4 h-4' />;
      default:
        return <Utensils className='w-4 h-4' />;
    }
  };

  // Smooth category change with loading states
  const handleSectionChange = (section: string) => {
    setCurrentlyLoading(section);
    startTransition(() => {
      setSelectedSection(section);
      setSelectedFoodType('All Food');
      setSelectedDrinkType('All Drinks');
      setTimeout(() => setCurrentlyLoading(''), 150); // Brief loading state
    });
  };

  const handleFoodTypeChange = (foodType: string) => {
    setCurrentlyLoading(foodType);
    startTransition(() => {
      setSelectedFoodType(foodType);
      setTimeout(() => setCurrentlyLoading(''), 150);
    });
  };

  const handleDrinkTypeChange = (drinkType: string) => {
    setCurrentlyLoading(drinkType);
    startTransition(() => {
      setSelectedDrinkType(drinkType);
      setTimeout(() => setCurrentlyLoading(''), 150);
    });
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className='bg-card rounded-3xl shadow-lg border border-border/30 p-6 animate-pulse'
        >
          <div className='flex justify-between items-start mb-4'>
            <div className='space-y-2 flex-1 pr-4'>
              <div className='h-6 bg-muted rounded w-3/4'></div>
              <div className='h-4 bg-muted rounded w-1/2'></div>
            </div>
            <div className='h-8 w-20 bg-muted rounded-full'></div>
          </div>
          <div className='space-y-2 mb-4'>
            <div className='h-4 bg-muted rounded w-full'></div>
            <div className='h-4 bg-muted rounded w-2/3'></div>
          </div>
          <div className='flex justify-between items-center'>
            <div className='h-6 w-16 bg-muted rounded-full'></div>
            <div className='h-6 w-20 bg-muted rounded-full'></div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMenuItem = (item: MenuItem) => {
    const title =
      locale === 'de' ? item.titleDe || item.title : item.titleEn || item.title;
    const description =
      locale === 'de'
        ? item.descriptionDe || item.description
        : item.descriptionEn || item.description;

    return (
      <div
        key={item.id}
        className='group bg-card rounded-3xl shadow-lg border border-border/30 p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 hover:border-primary/20 relative overflow-hidden'
        data-testid={`menu-item-${item.id}`}
      >
        {/* Subtle background pattern */}
        <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

        <div className='relative z-10'>
          {/* Image Display */}
          {item.imageUrl && (
            <div className='mb-4 relative overflow-hidden rounded-2xl'>
              <Image
                src={item.imageUrl}
                alt={title}
                width={400}
                height={192}
                className='w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700'
                sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            </div>
          )}

          <div className='flex justify-between items-start mb-4'>
            <h3 className='text-xl font-serif font-bold text-foreground pr-4 leading-tight group-hover:text-primary transition-colors duration-300'>
              {title}
            </h3>
            <div className='text-right'>
              <span className='text-2xl font-bold text-primary bg-primary/10 px-3 py-1 rounded-full'>
                €{item.price.toFixed(2)}
              </span>
            </div>
          </div>

          {description && (
            <p className='text-muted-foreground mb-4 text-sm leading-relaxed'>
              {description}
            </p>
          )}

          <div className='flex justify-between items-center flex-wrap gap-2'>
            <div className='flex items-center gap-2'>
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                  item.isAvailable
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}
              >
                {item.isAvailable ? '✓ ' + t.available : '✗ ' + t.unavailable}
              </span>
            </div>

            {item.allergens && (
              <div className='bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs border border-amber-200'>
                <span className='font-medium'>{t.allergens}:</span>{' '}
                {item.allergens}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-primary/5'>
      {/* Floating Header */}
      <div className='sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50'>
        <div className='container mx-auto px-6 py-6'>
          <div className='max-w-7xl mx-auto text-center'>
            <h1 className='text-5xl font-serif text-primary font-bold mb-2'>
              {t.title}
            </h1>
            <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
              {t.menuDescription}
            </p>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-6 py-12'>
        <div className='max-w-7xl mx-auto'>
          {/* Main Section Tabs - Enhanced */}
          <div className='flex justify-center mb-12'>
            <div className='bg-card/80 backdrop-blur-sm rounded-3xl p-4 border border-border shadow-2xl'>
              <div className='flex'>
                {mainSections.map((section) => (
                  <button
                    key={section}
                    onClick={() => handleSectionChange(section)}
                    disabled={isPending && currentlyLoading === section}
                    className={`px-12 py-4 rounded-2xl font-bold transition-all duration-400 flex items-center gap-3 text-lg ${
                      selectedSection === section
                        ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-xl scale-110 transform'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:scale-105'
                    } ${isPending && currentlyLoading === section ? 'opacity-75' : ''}`}
                    data-testid={`section-${section.toLowerCase()}`}
                  >
                    {isPending && currentlyLoading === section ? (
                      <Loader2 className='w-6 h-6 animate-spin' />
                    ) : (
                      <>
                        {section === 'Food' && <Utensils className='w-6 h-6' />}
                        {section === 'Drinks' && <Wine className='w-6 h-6' />}
                        {section === 'All' && <ChefHat className='w-6 h-6' />}
                      </>
                    )}
                    {section === 'Food'
                      ? t.food
                      : section === 'Drinks'
                        ? t.drinks
                        : t.all}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Food Sub-categories - Enhanced */}
          {selectedSection === 'Food' && (
            <div className='flex justify-center mb-12'>
              <div className='flex flex-wrap gap-4 justify-center max-w-6xl bg-card/50 backdrop-blur-sm rounded-3xl p-6 border border-border/30'>
                {availableFoodTypes.map((foodType) => (
                  <button
                    key={foodType}
                    onClick={() => handleFoodTypeChange(foodType)}
                    disabled={isPending && currentlyLoading === foodType}
                    className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 text-sm ${
                      selectedFoodType === foodType
                        ? 'bg-secondary text-secondary-foreground shadow-lg scale-105 border-2 border-secondary'
                        : 'bg-card text-muted-foreground border border-border hover:text-foreground hover:shadow-md hover:scale-105'
                    } ${isPending && currentlyLoading === foodType ? 'opacity-75' : ''}`}
                    data-testid={`food-type-${foodType.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {isPending && currentlyLoading === foodType ? (
                      <Loader2 className='w-4 h-4 animate-spin' />
                    ) : (
                      getFoodIcon(foodType)
                    )}
                    {t[
                      foodType
                        .toLowerCase()
                        .replace(/\s+/g, '') as keyof typeof t
                    ] || foodType}
                    <span className='text-xs bg-primary/20 px-2 py-0.5 rounded-full font-bold'>
                      {foodType === 'All Food'
                        ? foodItems.length
                        : foodByType[foodType as keyof typeof foodByType]
                            ?.length || 0}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Drinks Sub-categories - Enhanced */}
          {selectedSection === 'Drinks' && (
            <div className='flex justify-center mb-12'>
              <div className='flex flex-wrap gap-4 justify-center bg-card/50 backdrop-blur-sm rounded-3xl p-6 border border-border/30'>
                {['All Drinks', 'Alcoholic', 'Non-Alcoholic'].map(
                  (drinkType) => (
                    <button
                      key={drinkType}
                      onClick={() => handleDrinkTypeChange(drinkType)}
                      disabled={isPending && currentlyLoading === drinkType}
                      className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                        selectedDrinkType === drinkType
                          ? 'bg-secondary text-secondary-foreground shadow-lg scale-105 border-2 border-secondary'
                          : 'bg-card text-muted-foreground border border-border hover:text-foreground hover:shadow-md hover:scale-105'
                      } ${isPending && currentlyLoading === drinkType ? 'opacity-75' : ''}`}
                      data-testid={`drink-type-${drinkType.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {isPending && currentlyLoading === drinkType ? (
                        <Loader2 className='w-5 h-5 animate-spin' />
                      ) : (
                        <>
                          {drinkType === 'Alcoholic' && (
                            <Wine className='w-5 h-5' />
                          )}
                          {drinkType === 'Non-Alcoholic' && (
                            <Coffee className='w-5 h-5' />
                          )}
                          {drinkType === 'All Drinks' && (
                            <Utensils className='w-5 h-5' />
                          )}
                        </>
                      )}
                      {drinkType === 'All Drinks'
                        ? t.allDrinks
                        : drinkType === 'Alcoholic'
                          ? t.alcoholic
                          : t.nonAlcoholic}
                      <span className='text-xs bg-primary/20 px-2 py-0.5 rounded-full font-bold'>
                        {drinkType === 'All Drinks'
                          ? drinkItems.length
                          : drinkType === 'Alcoholic'
                            ? alcoholicDrinks.length
                            : nonAlcoholicDrinks.length}
                      </span>
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Items Display - Enhanced Grid with Loading States */}
          <div className='space-y-12'>
            {isPending && currentlyLoading ? (
              <div className='space-y-8'>
                <div className='text-center py-8'>
                  <Loader2 className='w-8 h-8 animate-spin text-primary mx-auto mb-4' />
                  <p className='text-muted-foreground text-lg'>{t.loading}</p>
                </div>
                <LoadingSkeleton />
              </div>
            ) : itemsToDisplay.length === 0 ? (
              <div className='text-center py-24 bg-card/50 backdrop-blur-sm rounded-3xl border border-border/30'>
                <div className='text-8xl mb-6'>🍽️</div>
                <h3 className='text-2xl font-bold text-foreground mb-3'>
                  {t.noItems}
                </h3>
                <p className='text-muted-foreground text-lg'>{t.selectOther}</p>
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
                {itemsToDisplay.map(renderMenuItem)}
              </div>
            )}
          </div>

          {/* Enhanced Stats Display */}
          <div className='mt-20 bg-gradient-to-r from-card/80 via-card/90 to-card/80 backdrop-blur-sm rounded-3xl p-10 border border-border/50 shadow-2xl'>
            <div className='text-center mb-10'>
              <h3 className='text-3xl font-serif font-bold text-foreground mb-2'>
                {t.menuOverview}
              </h3>
              <div className='w-24 h-1 bg-primary rounded-full mx-auto'></div>
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
              <div className='text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl border border-primary/20 hover:scale-105 transition-transform duration-300'>
                <div className='text-4xl mb-2'>🍽️</div>
                <h4 className='text-4xl font-bold text-primary mb-2'>
                  {foodItems.length}
                </h4>
                <p className='text-muted-foreground font-semibold'>
                  {t.foodItems}
                </p>
              </div>

              <div className='text-center p-6 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-3xl border border-secondary/20 hover:scale-105 transition-transform duration-300'>
                <div className='text-4xl mb-2'>🥤</div>
                <h4 className='text-4xl font-bold text-secondary mb-2'>
                  {drinkItems.length}
                </h4>
                <p className='text-muted-foreground font-semibold'>
                  {t.beverages}
                </p>
              </div>

              <div className='text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl border border-emerald-200 hover:scale-105 transition-transform duration-300'>
                <div className='text-4xl mb-2'>🍷</div>
                <h4 className='text-4xl font-bold text-emerald-600 mb-2'>
                  {alcoholicDrinks.length}
                </h4>
                <p className='text-muted-foreground font-semibold'>
                  {t.alcoholic}
                </p>
              </div>

              <div className='text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl border border-blue-200 hover:scale-105 transition-transform duration-300'>
                <div className='text-4xl mb-2'>☕</div>
                <h4 className='text-4xl font-bold text-blue-600 mb-2'>
                  {nonAlcoholicDrinks.length}
                </h4>
                <p className='text-muted-foreground font-semibold'>
                  {t.nonAlcoholic}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
