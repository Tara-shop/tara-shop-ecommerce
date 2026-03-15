'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Package, Phone, MapPin, User, Minus, Plus, X, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const CATEGORIES = ['Tous', 'Salon', 'Bureau', 'Rangement', 'Électroménager'];
const PAYMENT_METHODS = [
  { id: 'wave', name: 'Wave', color: 'bg-blue-500', icon: '💳' },
  { id: 'orange-money', name: 'Orange Money', color: 'bg-orange-500', icon: '📱' },
  { id: 'cash-on-delivery', name: 'Paiement à la livraison', color: 'bg-green-600', icon: '💵' }
];

const LOCATIONS = [
  'Dakar - Plateau',
  'Dakar - Almadies',
  'Dakar - Mermoz',
  'Dakar - Sacré-Coeur',
  'Dakar - Ouakam',
  'Dakar - Point E',
  'Pikine',
  'Guédiawaye',
  'Rufisque',
  'Thiès',
  'Saint-Louis',
  'Kaolack',
  'Ziguinchor',
  'Autre'
];

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Checkout form state
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    location: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cash-on-delivery');

  // Load products
  useEffect(() => {
    loadProducts();
    loadCartFromStorage();
  }, []);

  // Filter products by category
  useEffect(() => {
    if (selectedCategory === 'Tous') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  // Save cart to localStorage
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      
      if (data.products.length === 0) {
        // Initialize sample data if empty
        await fetch('/api/init-data', { method: 'POST' });
        const response2 = await fetch('/api/products');
        const data2 = await response2.json();
        setProducts(data2.products);
      } else {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Erreur chargement produits:', error);
      toast.error('Erreur de chargement des produits');
    }
  };

  const loadCartFromStorage = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success(`${product.name} ajouté au panier`);
  };

  const updateQuantity = (id, change) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        if (newQuantity <= 0) return null;
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    toast.success('Produit retiré du panier');
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Votre panier est vide');
      return;
    }
    setShowCart(false);
    setShowCheckout(true);
  };

  const validateForm = () => {
    if (!customerInfo.firstName.trim()) {
      toast.error('Veuillez entrer votre prénom');
      return false;
    }
    if (!customerInfo.lastName.trim()) {
      toast.error('Veuillez entrer votre nom');
      return false;
    }
    if (!customerInfo.phone.trim()) {
      toast.error('Veuillez entrer votre numéro de téléphone');
      return false;
    }
    if (customerInfo.phone.length < 9) {
      toast.error('Numéro de téléphone invalide');
      return false;
    }
    if (!customerInfo.location) {
      toast.error('Veuillez sélectionner votre quartier/ville');
      return false;
    }
    return true;
  };

  const submitOrder = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const orderData = {
        customerInfo,
        items: cart,
        paymentMethod,
        total: getCartTotal()
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (data.success) {
        setOrderSuccess(true);
        setCart([]);
        localStorage.removeItem('cart');
        setCustomerInfo({ firstName: '', lastName: '', phone: '', location: '' });
        toast.success('Commande passée avec succès!');
      } else {
        toast.error('Erreur lors de la commande');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const resetCheckout = () => {
    setShowCheckout(false);
    setOrderSuccess(false);
  };

  // Order Success View
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-700">Commande Confirmée !</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">Merci {customerInfo.firstName} ! Votre commande a été enregistrée avec succès.</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Méthode de paiement</p>
              <p className="font-semibold">{PAYMENT_METHODS.find(m => m.id === paymentMethod)?.name}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Livraison</p>
              <p className="font-semibold">{customerInfo.location}</p>
            </div>
            <p className="text-sm text-gray-500">Nous vous contacterons au {customerInfo.phone} pour confirmer la livraison.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={resetCheckout} className="w-full bg-green-600 hover:bg-green-700">
              Retour à la boutique
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Checkout View
  if (showCheckout) {
    const selectedPayment = PAYMENT_METHODS.find(m => m.id === paymentMethod);
    
    return (
      <div className="min-h-screen bg-gray-50 p-4 pb-24">
        <div className="max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => setShowCheckout(false)}
            className="mb-4"
          >
            ← Retour au panier
          </Button>
          
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Finaliser votre commande
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Customer Info */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Informations personnelles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={customerInfo.firstName}
                      onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      value={customerInfo.lastName}
                      onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                      placeholder="Votre nom"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Téléphone *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    placeholder="77 123 45 67"
                  />
                </div>
                <div>
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Quartier / Ville *
                  </Label>
                  <Select 
                    value={customerInfo.location} 
                    onValueChange={(value) => setCustomerInfo({...customerInfo, location: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre quartier" />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATIONS.map(loc => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="font-semibold">Mode de paiement</h3>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  {PAYMENT_METHODS.map(method => (
                    <div key={method.id} className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50" onClick={() => setPaymentMethod(method.id)}>
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label htmlFor={method.id} className="flex-1 cursor-pointer flex items-center gap-2">
                        <span className="text-2xl">{method.icon}</span>
                        <span className="font-medium">{method.name}</span>
                      </Label>
                      <div className={`w-3 h-3 rounded-full ${method.color}`}></div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Order Summary */}
              <div className="space-y-4 border-t pt-4">
                <h3 className="font-semibold">Récapitulatif ({cart.length} articles)</h3>
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x {item.quantity}</span>
                    <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span className="text-green-600">{formatPrice(getCartTotal())}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={submitOrder} 
                disabled={loading}
                className={`w-full ${selectedPayment?.color} text-white hover:opacity-90 text-lg py-6`}
              >
                {loading ? 'Traitement...' : `Confirmer la commande - ${formatPrice(getCartTotal())}`}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  // Cart View
  if (showCart) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 pb-24">
        <div className="max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => setShowCart(false)}
            className="mb-4"
          >
            ← Continuer vos achats
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Mon Panier ({cart.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p>Votre panier est vide</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 border-b pb-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-green-600 font-bold">{formatPrice(item.price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <Button size="sm" variant="ghost" onClick={() => removeFromCart(item.id)}>
                          <X className="w-4 h-4" />
                        </Button>
                        <p className="font-bold mt-2">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            {cart.length > 0 && (
              <CardFooter className="flex-col gap-4">
                <div className="w-full flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-green-600">{formatPrice(getCartTotal())}</span>
                </div>
                <Button onClick={handleCheckout} className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg">
                  Passer la commande
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    );
  }

  // Main Shop View
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img 
                src="https://customer-assets.emergentagent.com/job_nextjs-senegal/artifacts/tldegc8p_image.png" 
                alt="Tara shopp" 
                className="h-12 w-auto object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Tara shopp</h1>
                <p className="text-xs text-gray-600">Bienvenue chez vous</p>
              </div>
            </div>
            <Button onClick={() => setShowCart(true)} className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto">
            {CATEGORIES.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat)}
                className="whitespace-nowrap"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="container mx-auto px-4 py-6">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">Aucun produit dans cette catégorie</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                    loading="lazy"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  <p className="text-xl font-bold text-green-600">{formatPrice(product.price)}</p>
                  {product.stock < 20 && (
                    <p className="text-xs text-orange-500 mt-1">Plus que {product.stock} en stock</p>
                  )}
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button 
                    onClick={() => addToCart(product)} 
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Ajouter au panier
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Admin Link */}
      <div className="fixed bottom-4 left-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => window.location.href = '/admin'}
          className="bg-white"
        >
          Admin
        </Button>
      </div>
    </div>
  );
}

export default App;