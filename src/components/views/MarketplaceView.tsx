import React, { useState } from 'react';
import { ShoppingBag, Star, Heart, Check, Sparkles } from 'lucide-react';
import { MARKETPLACE_PRODUCTS } from '../../data/downloadsData';

export const MarketplaceView: React.FC = () => {
  const [cartItems, setCartItems] = useState<string[]>([]);

  const handleAddToCart = (id: string, title: string) => {
    setCartItems([...cartItems, id]);
    alert(`Added "${title}" to your cart!`);
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Header */}
      <div className="bg-emerald-900 text-white p-6 sm:p-8 rounded-3xl border border-emerald-800 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 text-xs px-3 py-1 rounded-full border border-amber-400/30">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Curated Halal Products & Bofferly Press</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold font-serif text-white">
          Bofferly Islamic Marketplace & Shop
        </h1>
        <p className="text-xs sm:text-sm text-emerald-200/90 max-w-2xl">
          Purchase authentic hardcover Qurans, Seerah boxsets, joint-friendly memory foam prayer mats, and organic alcohol-free Attar perfumes.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MARKETPLACE_PRODUCTS.map((product) => (
          <div key={product.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800 overflow-hidden shadow-sm hover:border-amber-400 transition-all flex flex-col justify-between">
            <div>
              <img src={product.imageUrl} alt={product.title} className="w-full h-48 object-cover" />
              
              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-semibold">{product.authorOrVendor}</span>
                  <span className="text-amber-500 font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{product.rating}</span>
                  </span>
                </div>

                <h3 className="font-bold text-base font-serif text-emerald-950 dark:text-white leading-snug">{product.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{product.description}</p>
              </div>
            </div>

            <div className="p-5 pt-0 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-baseline space-x-2">
                  <span className="text-xl font-bold font-mono text-emerald-900 dark:text-amber-300">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-slate-400 line-through font-mono">${product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-900 dark:bg-slate-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded">
                  {product.type}
                </span>
              </div>

              <button
                onClick={() => handleAddToCart(product.id, product.title)}
                className="w-full bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
