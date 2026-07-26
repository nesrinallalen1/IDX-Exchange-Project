export function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
}

export function isFavorite(id) {
  return getFavorites().includes(id);
}

export function toggleFavorite(id) {
  const favorites = getFavorites();

  if (favorites.includes(id)) {
    const updated = favorites.filter(fav => fav !== id);
    localStorage.setItem('favorites', JSON.stringify(updated));
    return false;
  }

  favorites.push(id);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  return true;
}