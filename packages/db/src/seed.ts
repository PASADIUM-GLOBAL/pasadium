import { db } from './index';

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Create Users
  const admin = await db.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash: 'hashed_password_123',
      email: 'admin@pasadium.tech',
      roles: 'SuperAdmin',
    },
  });

  const trader = await db.user.upsert({
    where: { username: 'trader_1' },
    update: {},
    create: {
      username: 'trader_1',
      passwordHash: 'hashed_password_456',
      email: 'trader@pasadium.tech',
      roles: 'Trader',
    },
  });

  // 2. Create Assets
  const btc = await db.asset.upsert({
    where: { ticker: 'BTC' },
    update: {},
    create: { ticker: 'BTC', name: 'Bitcoin' },
  });

  const eth = await db.asset.upsert({
    where: { ticker: 'ETH' },
    update: {},
    create: { ticker: 'ETH', name: 'Ethereum' },
  });

  const sol = await db.asset.upsert({
    where: { ticker: 'SOL' },
    update: {},
    create: { ticker: 'SOL', name: 'Solana' },
  });

  // 3. Create Portfolios
  await db.portfolio.createMany({
    data: [
      { userId: trader.id, assetId: btc.id, amount: '0.45', value: '28,903.72', pnl: '+1,200', up: true },
      { userId: trader.id, assetId: eth.id, amount: '2.10', value: '7,245.25', pnl: '-150', up: false },
    ],
  });

  // 4. Create Products
  await db.product.createMany({
    data: [
      { name: 'Premium Analytics Suite', price: 299, description: 'Advanced market intelligence tools.' },
      { name: 'API Access Tier 1', price: 49, description: 'Standard access to platform endpoints.' },
      { name: 'Enterprise Support', price: 999, description: '24/7 dedicated support for institutional clients.' },
    ],
  });

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
