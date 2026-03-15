'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, ShoppingBag, Edit, Trash2, Plus, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const CATEGORIES = ['Salon', 'Bureau', 'Rangement', 'Électroménager'];

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: '',
    stock: ''
  });

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur de chargement des produits');
    }
  };

  const loadOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur de chargement des commandes');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.category) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setLoading(true);
    try {
      let response;
      if (editingProduct) {
        response = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        response = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }

      const data = await response.json();
      
      if (data.success || response.ok) {
        toast.success(editingProduct ? 'Produit modifié' : 'Produit ajouté');
        resetForm();
        loadProducts();
      } else {
        toast.error('Erreur lors de l\'enregistrement');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      image: product.image || '',
      description: product.description || '',
      stock: product.stock?.toString() || '100'
    });
    setShowAddProduct(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast.success('Produit supprimé');
        loadProducts();
      } else {
        toast.error('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur de connexion');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', price: '', category: '', image: '', description: '', stock: '' });
    setEditingProduct(null);
    setShowAddProduct(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      case 'Confirmée': return 'bg-blue-100 text-blue-800';
      case 'Livrée': return 'bg-green-100 text-green-800';
      case 'Annulée': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard - Tara shopp</h1>
            <p className="text-gray-600">Gestion de votre boutique</p>
          </div>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la boutique
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="products" className="space-y-4">
          <TabsList>
            <TabsTrigger value="products">
              <Package className="w-4 h-4 mr-2" />
              Produits ({products.length})
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Commandes ({orders.length})
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-4">
            {!showAddProduct ? (
              <>
                <div className="flex justify-end">
                  <Button onClick={() => setShowAddProduct(true)} className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter un produit
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map(product => (
                    <Card key={product.id}>
                      <CardHeader className="p-0">
                        <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-t-lg" />
                      </CardHeader>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                        <p className="text-lg font-bold text-green-600">{formatPrice(product.price)}</p>
                        <p className="text-xs text-gray-500">Stock: {product.stock || 0}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 gap-2">
                        <Button variant="outline" onClick={() => handleEdit(product)} className="flex-1">
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier
                        </Button>
                        <Button variant="outline" onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>{editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nom du produit *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Ex: Canapé 5 places"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Prix (FCFA) *</Label>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                          placeholder="Ex: 350000"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="stock">Stock</Label>
                        <Input
                          id="stock"
                          type="number"
                          value={formData.stock}
                          onChange={(e) => setFormData({...formData, stock: e.target.value})}
                          placeholder="Ex: 50"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="category">Catégorie *</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => setFormData({...formData, category: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="image">URL de l'image</Label>
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        placeholder="https://exemple.com/image.jpg"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Description du produit"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" disabled={loading} className="flex-1 bg-green-600 hover:bg-green-700">
                        {loading ? 'Enregistrement...' : (editingProduct ? 'Modifier' : 'Ajouter')}
                      </Button>
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Annuler
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            {orders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">Aucune commande pour le moment</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {order.customerInfo.firstName} {order.customerInfo.lastName}
                          </CardTitle>
                          <p className="text-sm text-gray-600">{order.customerInfo.phone}</p>
                          <p className="text-sm text-gray-600">{order.customerInfo.location}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="font-semibold">Articles:</p>
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span>{item.name} x {item.quantity}</span>
                            <span>{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                        <div className="border-t pt-2 flex justify-between font-bold">
                          <span>Total:</span>
                          <span className="text-green-600">{formatPrice(order.total)}</span>
                        </div>
                        <p className="text-sm text-gray-600 border-t pt-2">
                          Paiement: <span className="font-semibold">{order.paymentMethod}</span>
                        </p>
                        <p className="text-xs text-gray-500">
                          Commande passée le {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AdminPage;