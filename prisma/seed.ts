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
      email: 'admin@cpgo.fr',
      name: 'Admin CPGO',
      password: hashedPassword,
      role: 'admin',
    },
  })

  // Categories
  const dongles = await prisma.category.create({
    data: { name: 'Dongles CarPlay', slug: 'dongles-carplay', description: 'Transformez votre écran automobile en CarPlay/Android Auto sans fil via USB' }
  })
  const adaptateurs = await prisma.category.create({
    data: { name: 'Adaptateurs USB', slug: 'adaptateurs-usb', description: 'Câbles et adaptateurs USB-C / Lightning compatibles' }
  })
  const accessoires = await prisma.category.create({
    data: { name: 'Accessoires Auto', slug: 'accessoires-auto', description: 'Supports, chargeurs et accessoires pour votre voiture connectée' }
  })

  // Produit : Dongle USB CarPlay principal
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Dongle USB CarPlay Sans Fil CPGO V1',
        slug: 'dongle-usb-carplay-v1',
        reference: 'DGL-V1',
        shortDesc: 'Transformez votre écran auto d\'origine en CarPlay/Android Auto via USB. Plug-and-play, latence ultra-faible.',
        description: 'Le dongle CPGO V1 se branche directement sur le port USB de votre autoradio d\'origine pour déployer CarPlay sans fil et Android Auto. Compatible avec la très grande majorité des véhicules disposant d\'un écran d\'origine (OEM) fonctionnant avec CarPlay filaire. Latence <80ms, mise à jour automatique, support des commandes au volant.',
        price: 8900,
        comparePrice: 12900,
        stock: 156,
        sku: 'CPGO-V1-BLK',
        status: 'active',
        featured: true,
        categoryId: dongles.id,
      }
    }),
    prisma.product.create({
      data: {
        name: 'Dongle USB CarPlay Sans Fil CPGO V2 — CarPlay & Android Auto',
        slug: 'dongle-usb-carplay-v2',
        reference: 'DGL-V2',
        shortDesc: 'Version double : CarPlay + Android Auto sans fil sur le même boîtier. Micrologiciel OTA.',
        description: 'Le CPGO V2 est le dongle double-protocol le plus rapide du marché : bascule automatique entre CarPlay et Android Auto selon le téléphone connecté. Latence <60ms, OTA auto, microphone intégré pour les appels mains-libres, support des applications tierces (YouTube, Netflix via interface).',
        price: 12900,
        comparePrice: 17900,
        stock: 89,
        sku: 'CPGO-V2-SLV',
        status: 'active',
        featured: true,
        categoryId: dongles.id,
      }
    }),
    prisma.product.create({
      data: {
        name: 'Adaptateur USB-C vers USB-A Blindé',
        slug: 'adaptateur-usb-c-vers-a',
        reference: 'ADP-001',
        shortDesc: 'Convertisseur USB-C mâle vers USB-A femelle blindé pour connecter le dongle aux nouvelles autoradios.',
        description: 'Adaptateur premium avec blindage aluminium pour éviter les interférences. Supporte le transfert de données haute vitesse et la charge rapide. Idéal si votre autoradio moderne ne dispose que d\'une prise USB-C.',
        price: 1500,
        stock: 245,
        sku: 'ADP-USBC-A',
        status: 'active',
        featured: false,
        categoryId: adaptateurs.id,
      }
    }),
    prisma.product.create({
      data: {
        name: 'Support Adhésif Métallique pour Dongle CPGO',
        slug: 'support-adhesif-dongle',
        reference: 'ACC-001',
        shortDesc: 'Support aimanté + adhésif 3M pour fixer discrètement le dongle derrière l\'autoradio.',
        description: 'Fixation invisible pour votre dongle CPGO. Plaque métallique ultra-mince, adhésif 3M résistant à la chaleur jusqu\'à 90°C. Maintient fermement le boîtier tout en le rendant entièrement dissimulable.',
        price: 900,
        stock: 340,
        sku: 'ACC-MNT-01',
        status: 'active',
        featured: false,
        categoryId: accessoires.id,
      }
    }),
    prisma.product.create({
      data: {
        name: 'Câble USB-C Tressé Nylon 1m — Charge Rapide 60W',
        slug: 'cable-usb-c-tresse',
        reference: 'CBL-001',
        shortDesc: 'Câble USB-C vers USB-C tressé nylon, charge rapide 60W, transmission stable pour dongle et smartphone.',
        description: 'Câble court parfait pour connecter le dongle CPGO à l\'alimentation. Tressage nylon renforcé, connecteurs aluminium, supporte la charge rapide 60W et la transmission de données à haute vitesse sans perte de signal.',
        price: 1299,
        stock: 0,
        sku: 'CBL-USBC-1M',
        status: 'out_of_stock',
        featured: false,
        categoryId: adaptateurs.id,
      }
    }),
    prisma.product.create({
      data: {
        name: 'Chargeur Allume-Cigare Dual USB-C 45W',
        slug: 'chargeur-allume-cigare-dual',
        reference: 'PWR-001',
        shortDesc: 'Chargeur voiture double sortie USB-C 45W total, compatible charge rapide smartphone et dongle.',
        description: 'Alimentation stable pour votre dongle CPGO et votre smartphone simultanément. Double port USB-C Power Delivery, protection contre les surtensions et la surchauffe. Design compact qui ne dépasse pas de la prise allume-cigare.',
        price: 2499,
        stock: 67,
        sku: 'PWR-PD45',
        status: 'active',
        featured: true,
        categoryId: accessoires.id,
      }
    }),
  ])

  // SEO pages for each product
  for (const p of products) {
    await prisma.sEOPage.create({
      data: {
        productId: p.id,
        path: `/produit/${p.slug}`,
        title: p.name,
        metaTitle: `${p.name} | CPGO — Dongle USB CarPlay Sans Fil`,
        metaDescription: p.shortDesc,
        score: [72, 85, 91, 68, 55, 88][products.indexOf(p)],
        issues: [8, 4, 2, 10, 15, 3][products.indexOf(p)],
        checked: true,
      }
    })
  }

  // Customers
  const customers = await Promise.all([
    prisma.customer.create({ data: { email: 'sophie.martin@email.com', firstName: 'Sophie', lastName: 'Martin', phone: '+33612345678', address: '12 Rue de la Paix', city: 'Paris', zip: '75002' } }),
    prisma.customer.create({ data: { email: 'kevin.durant@email.com', firstName: 'Kévin', lastName: 'Durand', phone: '+33687654321', address: '45 Av. Jean Jaurès', city: 'Lyon', zip: '69007' } }),
    prisma.customer.create({ data: { email: 'laura.petit@email.com', firstName: 'Laura', lastName: 'Petit', phone: '+33611223344', address: '8 Boulevard Saint-Germain', city: 'Marseille', zip: '13001' } }),
  ])

  // Orders (linked to customers)
  const order1 = await prisma.order.create({
    data: {
      number: 'CPGO-2024-001',
      status: 'delivered',
      total: 10400,
      subtotal: 8900,
      shipping: 0,
      tax: 1500,
      notes: 'Colis livré en 48h. Client satisfait.',
      customerId: customers[0].id,
      items: {
        create: [
          { quantity: 1, price: 8900, productId: products[0].id },
        ]
      }
    }
  })

  const order2 = await prisma.order.create({
    data: {
      number: 'CPGO-2024-002',
      status: 'shipped',
      total: 15398,
      subtotal: 12900,
      shipping: 0,
      tax: 2498,
      notes: 'Expédié via Colissimo. Suivi envoyé par email.',
      customerId: customers[1].id,
      items: {
        create: [
          { quantity: 1, price: 12900, productId: products[1].id },
          { quantity: 1, price: 1500, productId: products[2].id },
        ]
      }
    }
  })

  const order3 = await prisma.order.create({
    data: {
      number: 'CPGO-2024-003',
      status: 'confirmed',
      total: 24999,
      subtotal: 12900 + 2499 + 900 + 8900,
      shipping: 0,
      tax: 0,
      notes: 'Commande pack complet.',
      customerId: customers[2].id,
      items: {
        create: [
          { quantity: 1, price: 12900, productId: products[1].id },
          { quantity: 1, price: 2499, productId: products[5].id },
          { quantity: 1, price: 900, productId: products[3].id },
          { quantity: 1, price: 8900, productId: products[0].id },
        ]
      }
    }
  })

  // Theme
  await prisma.theme.create({ data: {} })

  console.log('✅ Seed completed!')
  console.log(`   ${products.length} produits dongle CarPlay créés`)
  console.log(`   ${customers.length} clients`)
  console.log(`   3 commandes (dont 1 livrée, 1 expédiée, 1 confirmée)`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
