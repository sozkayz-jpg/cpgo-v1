import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Reset tables
  await prisma.orderItem.deleteMany({})
  await prisma.order.deleteMany({})
  await prisma.sEOPage.deleteMany({})
  await prisma.product.deleteMany({})
  await prisma.customer.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.theme.deleteMany({})
  await prisma.user.deleteMany({})

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.create({
    data: {
      email: 'admin@carplaygo.fr',
      name: 'Admin CarplayGO',
      password: hashedPassword,
      role: 'admin',
    },
  })

  // Categories
  const carplay = await prisma.category.create({
    data: { name: 'Dongles CarPlay', slug: 'dongles-carplay', description: 'Transformez votre écran auto en CarPlay/Android Auto sans fil' }
  })
  const accessoires = await prisma.category.create({
    data: { name: 'Accessoires', slug: 'accessoires', description: 'Supports, câbles et accessoires pour votre dongle' }
  })

  // Products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'CarplayGO Dongle Sans Fil V1',
        slug: 'carplaygo-v1',
        reference: 'CPG-V1',
        shortDesc: 'Dongle USB CarPlay sans fil. Connectivité instantanée Plug & Play pour votre véhicule.',
        description: 'Le CarplayGO V1 transforme votre écran d\'origine en CarPlay sans fil en quelques secondes. Branchez le dongle sur le port USB de votre autoradio compatible, appairez votre iPhone et profitez de la navigation, de la musique, des appels et de Siri sans toucher votre téléphone. Zéro latence, mise à jour OTA automatique, support des commandes au volant. Compatible avec 95% des véhicules équipés d\'un écran OEM avec CarPlay filaire.',
        price: 8900,
        comparePrice: 12900,
        stock: 342,
        sku: 'CPG-V1-BLK',
        status: 'active',
        featured: true,
        categoryId: carplay.id,
      }
    }),
    prisma.product.create({
      data: {
        name: 'CarplayGO Dongle Sans Fil V2 — CarPlay & Android Auto',
        slug: 'carplaygo-v2',
        reference: 'CPG-V2',
        shortDesc: 'Version double : CarPlay + Android Auto sans fil. Meme boîtier, double compatibilité.',
        description: 'Le CarplayGO V2 est le seul dongle double-protocol du marché. Il bascule automatiquement entre CarPlay (iPhone) et Android Auto (smartphones Android) selon le téléphone connecté. Latence réduite à<60ms, microphone intégré pour appels mains-libres, mises à jour OTA, support YouTube et Netflix via interface dédiée. Convient aux familles multi-OS.',
        price: 11900,
        comparePrice: 15900,
        stock: 198,
        sku: 'CPG-V2-SLV',
        status: 'active',
        featured: true,
        categoryId: carplay.id,
      }
    }),
    prisma.product.create({
      data: {
        name: 'CarplayGO Pack V2 + Support Magnétique',
        slug: 'carplaygo-pack-v2',
        reference: 'CPG-PACK-V2',
        shortDesc: 'Le dongle V2 avec son support magnétique premium dissimulable derrière le tableau de bord.',
        description: 'Pack complet : dongle CarplayGO V2 + support adhesif magnétique premium en aluminium + câble USB-C blindé 30cm. Le support se fixe discrètement derrière l\'autoradio et maintient le dongle en place. Installation en 2 minutes, zéro fil visible.',
        price: 13900,
        comparePrice: 18900,
        stock: 87,
        sku: 'CPG-PACK-V2',
        status: 'active',
        featured: true,
        categoryId: accessoires.id,
      }
    }),
    prisma.product.create({
      data: {
        name: 'Support Magnétique CarplayGO Premium',
        slug: 'support-magnetique-carplaygo',
        reference: 'CPG-ACC-001',
        shortDesc: 'Support aimanté + adhesif 3M VHB pour fixer disscretement votre dongle.',
        description: 'Fixation invisible pour votre dongle CarplayGO. Plaque métallique ultra-mince (2mm), adhésif 3M VHB résistant à la chaleur jusqu\'à 100°C. Maintient fermement le boîtier en cas de vibrations et chocs sur route. Installation réversible.',
        price: 1200,
        stock: 450,
        sku: 'CPG-ACC-001',
        status: 'active',
        featured: false,
        categoryId: accessoires.id,
      }
    }),
  ])

  // SEO pages for each product
  for (const p of products) {
    await prisma.sEOPage.create({
      data: {
        productId: p.id,
        path: `/boutique/${p.slug}`,
        title: p.name,
        metaTitle: `${p.name} | CarplayGO — Dongle USB CarPlay Sans Fil`,
        metaDescription: p.shortDesc,
        score: 88,
        issues: 2,
        checked: true,
      }
    })
  }

  // Customers
  const customers = await Promise.all([
    prisma.customer.create({ data: { email: 'sophie.martin@email.com', firstName: 'Sophie', lastName: 'Martin', phone: '+33612345678', address: '12 Rue de la Paix', city: 'Paris', zip: '75002' } }),
    prisma.customer.create({ data: { email: 'kevin.durand@email.com', firstName: 'Kevin', lastName: 'Durand', phone: '+33687654321', address: '45 Av. Jean Jaurès', city: 'Lyon', zip: '69007' } }),
    prisma.customer.create({ data: { email: 'laura.petit@email.com', firstName: 'Laura', lastName: 'Petit', phone: '+33611223344', address: '8 Boulevard Saint-Germain', city: 'Marseille', zip: '13001' } }),
  ])

  // Orders
  await prisma.order.create({
    data: {
      number: 'CPG-2024-001',
      status: 'delivered',
      total: 8900,
      subtotal: 8900,
      shipping: 0,
      tax: 0,
      notes: 'Colis livré en 48h Chronopost. Client satisfait.',
      customerId: customers[0].id,
      items: { create: [{ quantity: 1, price: 8900, productId: products[0].id }] }
    }
  })

  await prisma.order.create({
    data: {
      number: 'CPG-2024-002',
      status: 'shipped',
      total: 11900,
      subtotal: 11900,
      shipping: 0,
      tax: 0,
      notes: 'Expédié via Colissimo International.',
      customerId: customers[1].id,
      items: { create: [{ quantity: 1, price: 11900, productId: products[1].id }] }
    }
  })

  await prisma.order.create({
    data: {
      number: 'CPG-2024-003',
      status: 'confirmed',
      total: 13900,
      subtotal: 13900,
      shipping: 0,
      tax: 0,
      notes: 'Pack complet commandé.',
      customerId: customers[2].id,
      items: { create: [{ quantity: 1, price: 13900, productId: products[2].id }] }
    }
  })

  // Theme
  await prisma.theme.create({ data: {} })

  console.log('✅ Seed completed!')
  console.log(`   ${products.length} produits CarplayGO créés`)
  console.log(`   ${customers.length} clients`)
  console.log(`   3 commandes`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
