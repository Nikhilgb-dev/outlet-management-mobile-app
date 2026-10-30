import prisma from '../src/config/prisma';

const sample = [
  { name: 'Bangalore Central Store', contactPerson: 'Ramesh Kumar', phone: '+919876543210', address: 'MG Road, Bengaluru', latitude: 12.9716, longitude: 77.5946 },
  { name: 'Mumbai Marine Outlet', contactPerson: 'Priya Sharma', phone: '+919812345678', address: 'Marine Drive, Mumbai', latitude: 18.9439, longitude: 72.8231 },
];

async function main() {
  for (const o of sample) {
    const exists = await prisma.outlet.findFirst({ where: { name: o.name } });
    if (!exists) await prisma.outlet.create({ data: o });
  }
  console.log('Seed complete');
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
