import argon2 from 'argon2';
import { db } from './index';

async function main() {
  const isProd = process.env.NODE_ENV === 'production';
  const rawPassword = process.env.DEV_SEED_PASSWORD;

  // Production Fail-Closed Rule
  if (isProd && !rawPassword) {
    throw new Error('CRITICAL_FAILURE: Production seed requires DEV_SEED_PASSWORD');
  }

  console.log('🌱 Seeding PostgreSQL database...');

  const finalPassword = rawPassword || 'pasadium_default_2026';
  const passwordHash = await argon2.hash(finalPassword, {
    type: argon2.argon2id,
  });

  // 1. Create the Sovereign Owner
  const sovereign = await db.user.upsert({
    where: { username: 'svrn_owner' },
    update: { passwordHash },
    create: {
      username: 'svrn_owner',
      email: 'sovereign@pasadium.tech',
      passwordHash,
      roles: 'SuperAdmin,Trader',
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

  // 3. Create Portfolios for sovereign owner
  await db.portfolio.deleteMany({
    where: { userId: sovereign.id },
  });

  const portfolios = [
    {
      assetId: btc.id,
      amount: '0.45',
      value: '28903.72',
      pnl: '1200',
      up: true,
    },
    {
      assetId: eth.id,
      amount: '2.10',
      value: '7245.25',
      pnl: '-150',
      up: false,
    },
  ];

  for (const p of portfolios) {
    await db.portfolio.create({
      data: {
        userId: sovereign.id,
        ...p,
      },
    });
  }

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

  console.log(`SVRN_TRUTH_SYNCED: Target: ${isProd ? 'PRODUCTION' : 'DEVELOPMENT'}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
