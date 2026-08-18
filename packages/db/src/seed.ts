import argon2 from 'argon2';
import { db } from './index';

async function main() {
  console.log('🌱 Seeding PostgreSQL database...');

  const adminPasswordHash = await argon2.hash('AdminPassword123!', {
    type: argon2.argon2id,
  });

  const traderPasswordHash = await argon2.hash('TraderPassword123!', {
    type: argon2.argon2id,
  });

  // 1. Create Users
  const admin = await db.user.upsert({
    where: { username: 'admin' },
    update: {
      passwordHash: adminPasswordHash,
      email: 'admin@pasadium.tech',
      roles: 'SuperAdmin',
    },
    create: {
      username: 'admin',
      passwordHash: adminPasswordHash,
      email: 'admin@pasadium.tech',
      roles: 'SuperAdmin',
    },
  });

  const trader = await db.user.upsert({
    where: { username: 'trader_1' },
    update: {
      passwordHash: traderPasswordHash,
      email: 'trader@pasadium.tech',
      roles: 'Trader',
    },
    create: {
      username: 'trader_1',
      passwordHash: traderPasswordHash,
      email: 'trader@pasadium.tech',
      roles: 'Trader',
    },
  });

  // 2. Create Assets
  const btc = await db.asset.upsert({
    where: { ticker: 'BTC' },
    update: {},
    create: {
      ticker: 'BTC',
      name: 'Bitcoin',
    },
  });

  const eth = await db.asset.upsert({
    where: { ticker: 'ETH' },
    update: {},
    create: {
      ticker: 'ETH',
      name: 'Ethereum',
    },
  });

  const sol = await db.asset.upsert({
    where: { ticker: 'SOL' },
    update: {},
    create: {
      ticker: 'SOL',
      name: 'Solana',
    },
  });

  // 3. Create Portfolios
  await db.portfolio.deleteMany({
    where: { userId: trader.id },
  });

  await db.portfolio.createMany({
    data: [
      {
        userId: trader.id,
        assetId: btc.id,
        amount: '0.45',
        value: '28,903.72',
        pnl: '+1,200',
        up: true,
      },
      {
        userId: trader.id,
        assetId: eth.id,
        amount: '2.10',
        value: '7,245.25',
        pnl: '-150',
        up: false,
      },
    ],
  });

  // 4. Create Products
  const products = [
    {
      name: 'Premium Analytics Suite',
      price: 299,
      description: 'Advanced market intelligence tools.',
    },
    {
      name: 'API Access Tier 1',
      price: 49,
      description: 'Standard access to platform endpoints.',
    },
    {
      name: 'Enterprise Support',
      price: 999,
      description: '24/7 dedicated support for institutional clients.',
    },
  ];

  for (const product of products) {
    await db.product.upsert({
      where: { name: product.name },
      update: {
        price: product.price,
        description: product.description,
      },
      create: product,
    });
  }

  console.log('✅ Seeding completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
