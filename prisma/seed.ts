import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@cpgo.fr' },
    update: {},
    create: {
      email: 'admin@cpgo.fr',
      name: 'Admin CPGO',
      password: hashedPassword,
      role: 'admin',
    },
  })

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({ where: { slug: 'mobilier' }, update: {}, create: { name: 'Mobilier', slug: 'mobilier', description: 'Chaises, bureaux et meubles ergonomiques' } }),
    prisma.category.upsert({ where: { slug: 'eclairage' }, update: {}, create: { name: 'Éclairage', slug: 'eclairage', description: 'Lampes et éclairage de bureau' } }),
    prisma.category.upsert({ where: { slug: 'accessoires' }, update: {}, create: { name: 'Accessoires', slug: 'accessoires', description: 'Accessoires de bureau' } }),
    prisma.category.upsert({ where: { slug: 'peripheriques' }, update: {}, create: { name: 'Périphériques', slug: 'peripheriques', description: 'Claviers, souris, webcams' } }),
  ])

  // Create products
  const productsData = [
    { name: 'Chaise ergonomique premium', slug: 'chaise-ergonomique-premium', reference: 'PRD-001', shortDesc: 'Chaise ergonomique haut de gamme avec support lombaire réglable.', description: 'Conçue pour les professionnels passant de longues heures assis, cette chaise ergonomique premium offre un confort exceptionnel grâce à son support lombaire dynamique, ses accoudoirs 4D réglables et son dossier en mesh respirant.', price: 49900, stock: 45, categoryId: categories[0].id, status: 'active', featured: true },
    { name: 'Bureau standing électrique', slug: 'bureau-standing-electrique', reference: 'PRD-002', shortDesc: 'Bureau à hauteur réglable électriquement.', description: 'Bureau standing électrique avec mémoire de position, plateau en bois massif et structure en acier.', price: 89900, stock: 12, categoryId: categories[0].id, status: 'active', featured: true },
    { name: 'Lampe de bureau LED', slug: 'lampe-bureau-led', reference: 'PRD-003', shortDesc: 'Lampe LED avec luminosité ajustable.', description: 'Lampe de bureau LED moderne avec température de couleur réglable et port USB intégré.', price: 12900, stock: 0, categoryId: categories[1].id, status: 'out_of_stock', featured: false },
    { name: 'Support écran double', slug: 'support-ecran-double', reference: 'PRD-004', shortDesc: 'Support articulé pour double écran.', description: 'Support de bureau pour deux écrans avec bras articulé et gestion de câbles.', price: 8900, stock: 78, categoryId: categories[2].id, status: 'active', featured: false },
    { name: 'Tapis de souris XL', slug: 'tapis-souris-xl', reference: 'PRD-005', shortDesc: 'Grand tapis de souris gaming.', description: 'Tapis de souris XL étendu avec surface optimisée pour la précision et base antidérapante.', price: 3500, stock: 156, categoryId: categories[2].id, status: 'active', featured: false },
    { name: 'Casque antibruit pro', slug: 'casque-antibruit-pro', reference: 'PRD-006', shortDesc: 'Casque à réduction de bruit active.', description: 'Casque antibruit professionnel avec réduction active du bruit, autonomie 30h et micro rétractable.', price: 29900, stock: 8, categoryId: categories[2].id, status: 'low_stock', featured: true },
    { name: 'Webcam 4K', slug: 'webcam-4k', reference: 'PRD-007', shortDesc: 'Webcam UHD 4K avec micro intégré.', description: 'Webcam 4K UHD avec autofocus, correction de la lumière faible et double micro stéréo.', price: 19900, stock: 23, categoryId: categories[3].id, status: 'active', featured: false },
    { name: 'Clavier mécanique RGB', slug: 'clavier-mecanique-rgb', reference: 'PRD-008', shortDesc: 'Clavier mécanique switches Cherry MX.', description: 'Clavier mécanique gaming RGB avec switches Cherry MX Red, rétroéclairage personnalisable et repose-poignet magnétique.', price: 15900, stock: 0, categoryId: categories[3].id, status: 'out_of_stock', featured: false },
  ]

  for (const p of productsData) {
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    })
    await prisma.sEOPage.upsert({
      where: { productId: product.id },
      update: {},
      create: {
        productId: product.id,
        path: `/produit/${p.slug}`,
        title: p.name,
        metaTitle: `${p.name} | CPGO`,
        metaDescription: p.shortDesc,
        score: Math.floor(Math.random() * 40) + 60,
        issues: Math.floor(Math.random() * 15),
        checked: true,
      },
    })
  }

  // Create customers & orders
  const customersData = [
    { email: 'marie@example.com', firstName: 'Marie', lastName: 'Dupont', address: '12 Rue de Paris', city: 'Paris', zip: '75001' },
    { email: 'jean@example.com', firstName: 'Jean', lastName: 'Martin', address: '34 Avenue Lyon', city: 'Lyon', zip: '69001' },
    { email: 'sophie@example.com', firstName: 'Sophie', lastName: 'Bernard', address: '56 Boulevard Marseille', city: 'Marseille', zip: '13001' },
  ]

  const createdCustomers = await Promise.all(
    customersData.map((c) =>
      prisma.customer.upsert({
        where: { email: c.email },
        update: {},
        create: c,
      })
    )
  )

  const ordersData = [
    { number: 'CMD-2024-001', status: 'delivered', total: 24500, subtotal: 23500, shipping: 1000, customerId: createdCustomers[0].id },
    { number: 'CMD-2024-002', status: 'shipped', total: 18900, subtotal: 17900, shipping: 1000, customerId: createdCustomers[1].id },
    { number: 'CMD-2024-003', status: 'confirmed', total: 32000, subtotal: 31000, shipping: 1000, customerId: createdCustomers[2].id },
  ]

  for (const o of ordersData) {
    await prisma.order.upsert({
      where: { number: o.number },
      update: {},
      create: o,
    })
  }

  // Create default theme
  await prisma.theme.upsert({
    where: { id: 1 },
    update: {},
    create: {},
  })

  console.log('✅ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
