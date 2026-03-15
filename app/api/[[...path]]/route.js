import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';

const uri = process.env.MONGO_URL;
const dbName = process.env.DB_NAME || 'senegal_ecommerce';

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

// GET /api/
export async function GET(request) {
  const { pathname } = new URL(request.url);
  const path = pathname.replace('/api', '') || '/';

  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);

    // GET /api/ - Hello endpoint
    if (path === '/') {
      return NextResponse.json({ message: 'Boutique Sénégal API' });
    }

    // GET /api/products - Get all products
    if (path === '/products') {
      const products = await db.collection('products').find({}).toArray();
      return NextResponse.json({ products });
    }

    // GET /api/orders - Get all orders (Admin)
    if (path === '/orders') {
      const orders = await db.collection('orders').find({}).sort({ createdAt: -1 }).toArray();
      return NextResponse.json({ orders });
    }

    // GET /api/products/:id
    if (path.startsWith('/products/')) {
      const id = path.split('/')[2];
      const product = await db.collection('products').findOne({ id });
      if (!product) {
        return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
      }
      return NextResponse.json({ product });
    }

    return NextResponse.json({ error: 'Endpoint non trouvé' }, { status: 404 });
  } catch (error) {
    console.error('Error in GET:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// POST /api/
export async function POST(request) {
  const { pathname } = new URL(request.url);
  const path = pathname.replace('/api', '') || '/';

  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    
    // Try to parse body, but handle empty body gracefully
    let body = {};
    try {
      body = await request.json();
    } catch (e) {
      // No body or invalid JSON - use empty object for routes that don't need it
    }

    // POST /api/products - Add new product (Admin)
    if (path === '/products') {
      const { name, price, category, image, description, stock } = body;
      
      if (!name || !price || !category) {
        return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
      }

      const newProduct = {
        id: uuidv4(),
        name,
        price: parseInt(price),
        category,
        image: image || '/placeholder-product.jpg',
        description: description || '',
        stock: stock || 100,
        createdAt: new Date().toISOString()
      };

      await db.collection('products').insertOne(newProduct);
      return NextResponse.json({ success: true, product: newProduct });
    }

    // POST /api/orders - Create new order
    if (path === '/orders') {
      const { customerInfo, items, paymentMethod, total } = body;

      if (!customerInfo || !items || !paymentMethod || !total) {
        return NextResponse.json({ error: 'Données de commande manquantes' }, { status: 400 });
      }

      // Validation des informations client
      if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.phone || !customerInfo.location) {
        return NextResponse.json({ error: 'Informations client incomplètes' }, { status: 400 });
      }

      const newOrder = {
        id: uuidv4(),
        customerInfo,
        items,
        paymentMethod,
        total: parseInt(total),
        status: 'En attente',
        createdAt: new Date().toISOString()
      };

      await db.collection('orders').insertOne(newOrder);
      return NextResponse.json({ success: true, order: newOrder });
    }

    // POST /api/init-data - Initialize sample products
    if (path === '/init-data') {
      const existingProducts = await db.collection('products').countDocuments();
      
      if (existingProducts > 0) {
        return NextResponse.json({ message: 'Données déjà initialisées' });
      }

      const sampleProducts = [
        {
          id: uuidv4(),
          name: 'Canapé 5 places moderne',
          price: 350000,
          category: 'Salon',
          image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500',
          description: 'Canapé confortable en tissu, idéal pour le salon',
          stock: 15,
          createdAt: new Date().toISOString()
        },
        {
          id: uuidv4(),
          name: 'Table basse en bois',
          price: 75000,
          category: 'Salon',
          image: 'https://images.unsplash.com/photo-1565191999001-551c187427bb?w=500',
          description: 'Table basse élégante en bois massif',
          stock: 25,
          createdAt: new Date().toISOString()
        },
        {
          id: uuidv4(),
          name: 'Bureau professionnel',
          price: 125000,
          category: 'Bureau',
          image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500',
          description: 'Bureau spacieux avec tiroirs',
          stock: 20,
          createdAt: new Date().toISOString()
        },
        {
          id: uuidv4(),
          name: 'Chaise de bureau ergonomique',
          price: 65000,
          category: 'Bureau',
          image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500',
          description: 'Chaise confortable pour longues heures de travail',
          stock: 30,
          createdAt: new Date().toISOString()
        },
        {
          id: uuidv4(),
          name: 'Armoire en plastique 4 portes',
          price: 45000,
          category: 'Rangement',
          image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500',
          description: 'Armoire solide et légère, facile à déplacer',
          stock: 40,
          createdAt: new Date().toISOString()
        },
        {
          id: uuidv4(),
          name: 'Réfrigérateur 250L',
          price: 285000,
          category: 'Électroménager',
          image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500',
          description: 'Réfrigérateur économique et silencieux',
          stock: 10,
          createdAt: new Date().toISOString()
        },
        {
          id: uuidv4(),
          name: 'Ventilateur sur pied',
          price: 35000,
          category: 'Électroménager',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
          description: 'Ventilateur puissant avec 3 vitesses',
          stock: 50,
          createdAt: new Date().toISOString()
        },
        {
          id: uuidv4(),
          name: 'Cuisinière 4 feux',
          price: 175000,
          category: 'Électroménager',
          image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=500',
          description: 'Cuisinière à gaz avec four intégré',
          stock: 12,
          createdAt: new Date().toISOString()
        }
      ];

      await db.collection('products').insertMany(sampleProducts);
      return NextResponse.json({ success: true, message: 'Produits initialisés', count: sampleProducts.length });
    }

    return NextResponse.json({ error: 'Endpoint non trouvé' }, { status: 404 });
  } catch (error) {
    console.error('Error in POST:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// PUT /api/
export async function PUT(request) {
  const { pathname } = new URL(request.url);
  const path = pathname.replace('/api', '') || '/';

  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const body = await request.json();

    // PUT /api/products/:id - Update product
    if (path.startsWith('/products/')) {
      const id = path.split('/')[2];
      const { name, price, category, image, description, stock } = body;

      const updateData = {};
      if (name) updateData.name = name;
      if (price) updateData.price = parseInt(price);
      if (category) updateData.category = category;
      if (image) updateData.image = image;
      if (description !== undefined) updateData.description = description;
      if (stock !== undefined) updateData.stock = parseInt(stock);
      updateData.updatedAt = new Date().toISOString();

      const result = await db.collection('products').updateOne(
        { id },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
      }

      return NextResponse.json({ success: true, message: 'Produit mis à jour' });
    }

    // PUT /api/orders/:id - Update order status
    if (path.startsWith('/orders/')) {
      const id = path.split('/')[2];
      const { status } = body;

      if (!status) {
        return NextResponse.json({ error: 'Statut manquant' }, { status: 400 });
      }

      const result = await db.collection('orders').updateOne(
        { id },
        { $set: { status, updatedAt: new Date().toISOString() } }
      );

      if (result.matchedCount === 0) {
        return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 });
      }

      return NextResponse.json({ success: true, message: 'Commande mise à jour' });
    }

    return NextResponse.json({ error: 'Endpoint non trouvé' }, { status: 404 });
  } catch (error) {
    console.error('Error in PUT:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE /api/
export async function DELETE(request) {
  const { pathname } = new URL(request.url);
  const path = pathname.replace('/api', '') || '/';

  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);

    // DELETE /api/products/:id
    if (path.startsWith('/products/')) {
      const id = path.split('/')[2];
      
      const result = await db.collection('products').deleteOne({ id });

      if (result.deletedCount === 0) {
        return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
      }

      return NextResponse.json({ success: true, message: 'Produit supprimé' });
    }

    return NextResponse.json({ error: 'Endpoint non trouvé' }, { status: 404 });
  } catch (error) {
    console.error('Error in DELETE:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}